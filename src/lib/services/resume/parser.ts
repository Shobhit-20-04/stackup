/**
 * StackUp Resume Document Parser
 * Supports PDF, DOCX, and TXT with layout diagnostics, scanned PDF detection, and section extraction.
 */

import mammoth from 'mammoth';
import type { ParsingReport, ExtractedSection, ConfidenceRating } from './types';

// Ensure Node.js global polyfills for PDF.js runtime
if (typeof (globalThis as unknown as { DOMMatrix: unknown }).DOMMatrix === 'undefined') {
  (globalThis as unknown as { DOMMatrix: unknown }).DOMMatrix = class DOMMatrix {};
}
if (typeof (globalThis as unknown as { ImageData: unknown }).ImageData === 'undefined') {
  (globalThis as unknown as { ImageData: unknown }).ImageData = class ImageData {};
}
if (typeof (globalThis as unknown as { Path2D: unknown }).Path2D === 'undefined') {
  (globalThis as unknown as { Path2D: unknown }).Path2D = class Path2D {};
}

export async function parseResumeDocument(
  fileBuffer: Buffer,
  filename: string,
  fileExt: string
): Promise<ParsingReport> {
  const ext = fileExt.toLowerCase().replace(/^\./, '');
  let rawText = '';
  let pageCount = 1;
  let isScanned = false;
  let isEncrypted = false;
  let hasEncodingIssues = false;
  const layoutWarnings: string[] = [];

  if (ext === 'pdf') {
    // 1. Check for PDF Encryption before parsing
    const bufferStr = fileBuffer.toString('latin1', 0, Math.min(fileBuffer.length, 4096));
    if (bufferStr.includes('/Encrypt')) {
      isEncrypted = true;
    }

    try {
      const uint8 = new Uint8Array(fileBuffer);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PDFParse } = require('pdf-parse');
      const parser = new PDFParse({ data: uint8 });
      
      const pdfData = await parser.getText();
      rawText = pdfData?.text ? pdfData.text.trim() : '';

      try {
        const info = await parser.getInfo();
        if (info?.pages && typeof info.pages === 'number') {
          pageCount = info.pages;
        }
      } catch {
        // Info retrieval is optional
      }

      try {
        await parser.destroy();
      } catch {
        // Ignore destroy cleanup notice
      }
    } catch (err: unknown) {
      const errStr = String(err);
      if (errStr.includes('Password') || errStr.includes('encrypted')) {
        isEncrypted = true;
      }
    }

    // Secondary fallback extraction if primary returned little or no text
    if (!rawText || rawText.length < 50) {
      try {
        const textStream = fileBuffer.toString('latin1');
        const parenthesized = textStream.match(/\(([^)]+)\)/g);
        if (parenthesized && parenthesized.length >= 3) {
          rawText = parenthesized
            .map((m) => m.slice(1, -1).trim())
            .filter((s) => s.length > 2 && !s.startsWith('/') && !s.startsWith('Length'))
            .join(' ');
        }
      } catch {
        // Keep existing
      }
    }

    // Check for image-only scanned PDF characteristics:
    // A document with multiple pages or >100KB size but virtually no extractable words
    const wordList = rawText.trim().split(/\s+/).filter(Boolean);
    const wordsPerPage = wordList.length / Math.max(1, pageCount);
    
    // Check if binary contains image objects without corresponding text blocks
    const hasImageObjects = bufferStr.includes('/Image') || bufferStr.includes('/XObject');

    if (wordList.length < 35 && hasImageObjects) {
      isScanned = true;
    } else if (wordsPerPage < 25 && pageCount >= 1) {
      isScanned = true;
    }

  } else if (ext === 'docx') {
    try {
      const docxResult = await mammoth.extractRawText({ buffer: fileBuffer });
      rawText = (docxResult && docxResult.value) ? docxResult.value.trim() : '';
      if (docxResult?.messages && docxResult.messages.length > 0) {
        for (const msg of docxResult.messages) {
          if (msg.type === 'warning') layoutWarnings.push(msg.message);
        }
      }
    } catch (err) {
      console.warn('DOCX parsing warning:', err);
    }
  } else if (ext === 'txt') {
    rawText = fileBuffer.toString('utf-8');
  }

  // 2. Clean up text and evaluate encoding issues
  let cleanText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Detect replacement characters or broken unicode glyphs
  const replacementCharMatches = cleanText.match(/\uFFFD|\?{4,}/g);
  if (replacementCharMatches && replacementCharMatches.length > 3) {
    hasEncodingIssues = true;
    layoutWarnings.push('Detected non-standard font encoding or unmapped character glyphs in document text.');
  }

  // Detect multi-column / wide spacing indicators
  const multiSpaceLines = cleanText.split('\n').filter((l) => /\s{5,}\S+/.test(l));
  if (multiSpaceLines.length >= 5) {
    layoutWarnings.push('Potential multi-column layout detected: text across adjacent columns may parse out of chronological reading order.');
  }

  const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const characterCount = cleanText.length;

  // 3. Extraction Quality Score & Confidence
  let qualityScore = 100;
  if (isEncrypted) qualityScore = 0;
  else if (isScanned) qualityScore = 10;
  else {
    if (wordCount < 100) qualityScore -= 40;
    else if (wordCount < 250) qualityScore -= 20;
    if (hasEncodingIssues) qualityScore -= 25;
    if (layoutWarnings.length > 2) qualityScore -= 15;
  }
  qualityScore = Math.max(0, Math.min(100, qualityScore));

  let confidence: ConfidenceRating = 'High';
  if (isScanned || isEncrypted) {
    confidence = 'Scanned/OCR Required';
  } else if (qualityScore < 50) {
    confidence = 'Low';
  } else if (qualityScore < 75) {
    confidence = 'Medium';
  }

  // 4. Contact & Link Detection
  const emailMatch = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = cleanText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/);
  const linkedInMatch = cleanText.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i) || cleanText.match(/linkedin:\s*([^\s]+)/i);
  const githubMatch = cleanText.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+/i) || cleanText.match(/github:\s*([^\s]+)/i);
  const portfolioMatch = cleanText.match(/(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(dev|io|me|app|site|tech|com)\/?[a-zA-Z0-9_.-]*/i);

  // 5. Section Segmentation
  const sections = segmentSections(cleanText);

  // 6. Date Consistency Checking
  const { detectedDates, dateConsistencyIssues } = evaluateDates(cleanText);

  return {
    text: rawText,
    cleanText,
    filename,
    fileSizeBytes: fileBuffer.length,
    mimeType: ext === 'pdf' ? 'application/pdf' : ext === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'text/plain',
    pageCount,
    wordCount,
    characterCount,
    isScanned,
    isEncrypted,
    hasEncodingIssues,
    extractionQualityScore: qualityScore,
    confidence,
    detectedLayoutWarnings: layoutWarnings,
    sections,
    detectedDates,
    dateConsistencyIssues,
    links: {
      email: emailMatch ? emailMatch[0] : undefined,
      phone: phoneMatch ? phoneMatch[0] : undefined,
      linkedIn: linkedInMatch ? linkedInMatch[0] : undefined,
      github: githubMatch ? githubMatch[0] : undefined,
      portfolio: portfolioMatch ? portfolioMatch[0] : undefined,
      otherUrls: [],
    },
  };
}

/**
 * Segments raw text into structured resume sections.
 */
function segmentSections(text: string): ParsingReport['sections'] {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const sections: ParsingReport['sections'] = {};

  const sectionHeaders: { type: keyof ParsingReport['sections']; regex: RegExp }[] = [
    { type: 'experience', regex: /^(work\s+|professional\s+|employment\s+|relevant\s+)?(experience|history|employment|internships)/i },
    { type: 'education', regex: /^(education|academic\s+(background|qualifications|history)|academics|qualifications)/i },
    { type: 'skills', regex: /^(technical\s+|core\s+)?(skills|technologies|competencies|tools(\s*(&|and)\s*technologies)?)/i },
    { type: 'projects', regex: /^(academic\s*(&|and)\s*)?(personal\s*)?(key\s*|technical\s*|selected\s*|featured\s*|capstone\s*)?projects/i },
    { type: 'summary', regex: /^(professional\s+|career\s+)?(summary|profile|about\s+me|objective)/i },
    { type: 'certifications', regex: /^(certifications|licenses|courses|awards)$/i },
  ];

  let currentSection: keyof ParsingReport['sections'] | null = null;
  const sectionLines: Record<string, string[]> = {};

  for (const line of lines) {
    let matchedHeader: keyof ParsingReport['sections'] | null = null;
    for (const sh of sectionHeaders) {
      if (sh.regex.test(line)) {
        matchedHeader = sh.type;
        break;
      }
    }

    if (matchedHeader) {
      currentSection = matchedHeader;
      if (!sectionLines[currentSection]) sectionLines[currentSection] = [];
    } else if (currentSection) {
      sectionLines[currentSection].push(line);
    }
  }

  for (const [secKey, sLines] of Object.entries(sectionLines)) {
    const content = sLines.join('\n');
    const bulletPoints = sLines
      .filter((l) => /^[•\-\*\u2022\u2023\u25E6\d+\.]\s+/.test(l) || l.length > 25)
      .map((l) => l.replace(/^[•\-\*\u2022\u2023\u25E6\d+\.]\s+/, '').trim())
      .filter((b) => b.length > 15);

    sections[secKey as keyof ParsingReport['sections']] = {
      title: secKey.charAt(0).toUpperCase() + secKey.slice(1),
      content,
      bulletPoints,
    };
  }

  return sections;
}

/**
 * Extracts date patterns and verifies formatting consistency across work history.
 */
function evaluateDates(text: string): {
  detectedDates: { raw: string; normalized?: string }[];
  dateConsistencyIssues: string[];
} {
  const dateRegex = /\b(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?|\d{1,2}\/\d{4}|\d{4})\s*[-–—to]+\s*(present|current|\d{4}|jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?|\d{1,2}\/\d{4})/gi;

  const matches = text.match(dateRegex) || [];
  const detectedDates = matches.map((m) => ({ raw: m.trim() }));

  const dateConsistencyIssues: string[] = [];

  // Check for mixed date formats (e.g. Month YYYY vs MM/YYYY vs just YYYY)
  const hasMonthWord = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(text);
  const hasSlashDate = /\b\d{1,2}\/\d{2,4}\b/.test(text);

  if (hasMonthWord && hasSlashDate) {
    dateConsistencyIssues.push('Mixed date conventions detected (e.g. "05/2023" and "June 2023"). Standardize all employment dates to one consistent format (e.g., "MMM YYYY - Present").');
  }

  if (detectedDates.length === 0) {
    dateConsistencyIssues.push('No standard employment or project date ranges detected. Recruiters and ATS engines require clear date intervals to compute years of experience.');
  }

  return { detectedDates, dateConsistencyIssues };
}

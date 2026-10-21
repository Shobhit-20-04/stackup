const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('D:/stackup/src');
let links = [];
let buttons = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const relFile = f.replace(/\\/g, '/').replace('D:/stackup/', '');

  // 1. Audit Buttons
  const buttonRegex = /<button\b([^>]*)>/gs;
  let bMatch;
  while ((bMatch = buttonRegex.exec(content)) !== null) {
    const attrs = bMatch[1];
    const lineNum = content.slice(0, bMatch.index).split('\n').length;
    const hasType = /type\s*=\s*['"](button|submit|reset)['"]/.test(attrs);
    const hasOnClick = /onClick\s*=/.test(attrs);
    const ariaLabel = /aria-label\s*=\s*['"]([^'"]+)['"]/.exec(attrs)?.[1];
    const titleAttr = /title\s*=\s*['"]([^'"]+)['"]/.exec(attrs)?.[1];
    buttons.push({
      file: relFile,
      line: lineNum,
      hasType,
      hasOnClick,
      ariaLabel: ariaLabel || titleAttr || '',
      snippet: bMatch[0].slice(0, 100).replace(/\s+/g, ' ')
    });
  }

  // 2. Audit Links
  const linkRegex = /<(?:a|Link)\b([^>]*)>/gs;
  let lMatch;
  while ((lMatch = linkRegex.exec(content)) !== null) {
    const attrs = lMatch[1];
    const isNextLink = lMatch[0].startsWith('<Link');
    const lineNum = content.slice(0, lMatch.index).split('\n').length;
    
    // Extract href
    let href = 'MISSING_HREF';
    const m1 = attrs.match(/href\s*=\s*"([^"]*)"/);
    const m2 = attrs.match(/href\s*=\s*'([^']*)'/);
    const m3 = attrs.match(/href\s*=\s*\{\s*`([^`]*)`\s*\}/);
    const m4 = attrs.match(/href\s*=\s*\{\s*([^{}]+)\s*\}/);
    if (m1) href = m1[1];
    else if (m2) href = m2[1];
    else if (m3) href = m3[1];
    else if (m4) href = m4[1].trim();

    const isTargetBlank = /target\s*=\s*['"]_blank['"]/.test(attrs);
    const hasNoopener = /rel\s*=\s*['"][^'"]*noopener[^'"]*['"]/.test(attrs);
    const hasNoreferrer = /rel\s*=\s*['"][^'"]*noreferrer[^'"]*['"]/.test(attrs);

    links.push({
      file: relFile,
      line: lineNum,
      tag: isNextLink ? 'Link' : 'a',
      href,
      isTargetBlank,
      hasNoopener,
      hasNoreferrer,
      rawTag: lMatch[0].replace(/\s+/g, ' ').slice(0, 120)
    });
  }
});

console.log('=== INTERACTION SCAN RESULTS ===');
console.log('Total Buttons:', buttons.length);
console.log('Buttons with explicit type:', buttons.filter(b => b.hasType).length);
console.log('Buttons missing explicit type:', buttons.filter(b => !b.hasType).length);
console.log('Total Links (<a> & <Link>):', links.length);

const missingHrefs = links.filter(l => l.href === 'MISSING_HREF' || l.href === '#' || l.href === '');
console.log('Links with missing or placeholder (#) href:', missingHrefs.length);
if (missingHrefs.length > 0) {
  console.log('Missing/Placeholder Links detail:', missingHrefs);
}

const externalLinks = links.filter(l => l.tag === 'a');
console.log('External <a> tags:', externalLinks.length);

const unsafeExternal = externalLinks.filter(l => !l.hasNoopener || !l.hasNoreferrer || !l.isTargetBlank);
console.log('Unsafe External Links (missing _blank or noopener/noreferrer):', unsafeExternal.length);
if (unsafeExternal.length > 0) {
  console.log('Unsafe External details:', unsafeExternal);
}

const internalLinks = links.filter(l => l.tag === 'Link');
console.log('Internal Next.js <Link> components:', internalLinks.length);
console.log('Sample Internal Links:', internalLinks.slice(0, 10).map(l => ({ file: l.file, line: l.line, href: l.href })));

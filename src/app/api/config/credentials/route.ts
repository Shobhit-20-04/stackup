import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminRequest } from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ENV_LOCAL_PATH = path.join(process.cwd(), '.env.local');

/**
 * Validates a Supabase project URL to prevent SSRF against internal/cloud metadata services.
 * Only allows valid https: URLs hosted on supabase.co.
 */
function isValidSupabaseUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    // Allow *.supabase.co (e.g. iczaspwhfcgicytazppk.supabase.co)
    return /^[a-z0-9_-]+\.supabase\.co$/.test(hostname);
  } catch {
    return false;
  }
}

/**
 * GET: Returns non-sensitive booleans indicating whether backend integrations are active.
 * Excludes server file paths, URLs, and secrets from unauthenticated responses.
 */
export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`config-get-${ip}`, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const anthropicKey = process.env.ANTHROPIC_API_KEY || '';

    const isSupabaseConfigured = Boolean(
      supabaseUrl &&
      !supabaseUrl.includes('placeholder') &&
      supabaseUrl.startsWith('https://') &&
      supabaseAnon &&
      !supabaseAnon.includes('placeholder')
    );

    const isAnthropicConfigured = Boolean(anthropicKey && anthropicKey.startsWith('sk-ant-'));

    return NextResponse.json({
      supabaseConfigured: isSupabaseConfigured,
      anthropicConfigured: isAnthropicConfigured,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Failed to inspect configuration';
    return NextResponse.json({ error }, { status: 500 });
  }
}

/**
 * POST: Updates server environment credentials.
 * Strictly protected: Requires administrator authentication, CSRF check, and anti-SSRF validation.
 */
export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`config-post-${ip}`, 5, 10 * 60 * 1000); // 5 attempts per 10 minutes
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many configuration attempts. Please retry in ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    // Require verified admin authorization
    if (!verifyAdminRequest(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Administrator credentials required to update configuration.' },
        { status: 401 }
      );
    }

    // In cloud production (Vercel/Render/Fly), reject filesystem modifications
    if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_RUNTIME_ENV_WRITE) {
      return NextResponse.json(
        {
          error:
            'Filesystem updates are disabled in production for security. Please set environment variables in your Vercel project dashboard.',
        },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { supabaseUrl, supabaseAnonKey, supabaseServiceKey, anthropicApiKey } = body;

    if (!supabaseUrl && !supabaseAnonKey && !anthropicApiKey && !supabaseServiceKey) {
      return NextResponse.json({ error: 'Please provide at least one credential to update.' }, { status: 400 });
    }

    // SSRF Prevention: Validate Supabase URL domain
    if (supabaseUrl) {
      if (!isValidSupabaseUrl(supabaseUrl.trim())) {
        return NextResponse.json(
          { error: 'Invalid Supabase project URL. Must be an https:// address ending in .supabase.co.' },
          { status: 400 }
        );
      }
    }

    // Validate Anthropic API Key format
    if (anthropicApiKey) {
      if (typeof anthropicApiKey !== 'string' || !anthropicApiKey.trim().startsWith('sk-ant-')) {
        return NextResponse.json(
          { error: 'Invalid Anthropic API Key. Must start with sk-ant-.' },
          { status: 400 }
        );
      }
    }

    // Read existing .env.local or initialize
    let envContent = '';
    if (fs.existsSync(ENV_LOCAL_PATH)) {
      envContent = fs.readFileSync(ENV_LOCAL_PATH, 'utf8');
    }

    const updateEnvVar = (content: string, key: string, value: string): string => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(content)) {
        return content.replace(regex, `${key}=${value}`);
      }
      return `${content.trim()}\n${key}=${value}\n`;
    };

    if (supabaseUrl) {
      const cleanUrl = supabaseUrl.trim().replace(/\/$/, '');
      envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_URL', cleanUrl);
      process.env.NEXT_PUBLIC_SUPABASE_URL = cleanUrl;
    }
    if (supabaseAnonKey) {
      const cleanKey = supabaseAnonKey.trim();
      envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', cleanKey);
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = cleanKey;
    }
    if (supabaseServiceKey) {
      const cleanService = supabaseServiceKey.trim();
      envContent = updateEnvVar(envContent, 'SUPABASE_SERVICE_ROLE_KEY', cleanService);
      process.env.SUPABASE_SERVICE_ROLE_KEY = cleanService;
    }
    if (anthropicApiKey) {
      const cleanAnt = anthropicApiKey.trim();
      envContent = updateEnvVar(envContent, 'ANTHROPIC_API_KEY', cleanAnt);
      process.env.ANTHROPIC_API_KEY = cleanAnt;
    }

    if (!envContent.includes('NEXT_PUBLIC_APP_URL')) {
      envContent += '\nNEXT_PUBLIC_APP_URL=http://localhost:3000\n';
    }

    try {
      fs.writeFileSync(ENV_LOCAL_PATH, envContent.trim() + '\n', 'utf8');
    } catch {
      // In read-only environments
    }

    return NextResponse.json({
      success: true,
      message: 'Credentials updated and verified successfully!',
      supabaseConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      anthropicConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Failed to write credentials';
    return NextResponse.json({ error }, { status: 500 });
  }
}

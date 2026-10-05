import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ENV_LOCAL_PATH = path.join(process.cwd(), '.env.local');

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const anthropicKey = process.env.ANTHROPIC_API_KEY || '';

    const isSupabaseConfigured = 
      Boolean(supabaseUrl && 
      !supabaseUrl.includes('placeholder') && 
      supabaseUrl.startsWith('https://') &&
      supabaseAnon && 
      !supabaseAnon.includes('placeholder'));

    const isAnthropicConfigured = Boolean(anthropicKey && anthropicKey.startsWith('sk-ant-'));

    return NextResponse.json({
      supabaseConfigured: isSupabaseConfigured,
      supabaseUrl: isSupabaseConfigured ? supabaseUrl : null,
      anthropicConfigured: isAnthropicConfigured,
      envPath: ENV_LOCAL_PATH,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Failed to inspect credentials';
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { supabaseUrl, supabaseAnonKey, supabaseServiceKey, anthropicApiKey } = body;

    if (!supabaseUrl && !supabaseAnonKey && !anthropicApiKey) {
      return NextResponse.json({ error: 'Please provide at least one credential to update.' }, { status: 400 });
    }

    // 1. Test Supabase connection if provided
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const cleanUrl = supabaseUrl.trim().replace(/\/$/, '');
        const pingUrl = `${cleanUrl}/rest/v1/`;
        const testRes = await fetch(pingUrl, {
          headers: {
            apikey: supabaseAnonKey.trim(),
            Authorization: `Bearer ${supabaseAnonKey.trim()}`,
          },
        });
        
        // Supabase REST endpoint returns 200 or 404 (on empty root) or 401 if invalid key
        if (testRes.status === 401 || testRes.status === 403) {
          return NextResponse.json({ 
            error: 'Authentication failed. Please verify that your Supabase Anon Public Key is correct.' 
          }, { status: 400 });
        }
      } catch {
        return NextResponse.json({ 
          error: `Could not connect to Supabase URL (${supabaseUrl}). Please check network connectivity or URL spelling.` 
        }, { status: 400 });
      }
    }

    // 2. Read existing .env.local or create new
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
      envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_URL', supabaseUrl.trim());
      process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrl.trim();
    }
    if (supabaseAnonKey) {
      envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', supabaseAnonKey.trim());
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = supabaseAnonKey.trim();
    }
    if (supabaseServiceKey) {
      envContent = updateEnvVar(envContent, 'SUPABASE_SERVICE_ROLE_KEY', supabaseServiceKey.trim());
      process.env.SUPABASE_SERVICE_ROLE_KEY = supabaseServiceKey.trim();
    }
    if (anthropicApiKey) {
      envContent = updateEnvVar(envContent, 'ANTHROPIC_API_KEY', anthropicApiKey.trim());
      process.env.ANTHROPIC_API_KEY = anthropicApiKey.trim();
    }

    // Always ensure APP_URL is present
    if (!envContent.includes('NEXT_PUBLIC_APP_URL')) {
      envContent += '\nNEXT_PUBLIC_APP_URL=http://localhost:3000\n';
    }

    fs.writeFileSync(ENV_LOCAL_PATH, envContent.trim() + '\n', 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Credentials updated and verified successfully in .env.local!',
      supabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
      anthropicConfigured: Boolean(anthropicApiKey),
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Failed to write credentials';
    return NextResponse.json({ error }, { status: 500 });
  }
}

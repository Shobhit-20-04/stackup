import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const supabaseUrl = body.supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = body.serviceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      return NextResponse.json(
        { error: 'Cannot run migration: Supabase URL is not configured or is a placeholder.' },
        { status: 400 }
      );
    }

    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20260923000000_initial_schema.sql');
    if (!fs.existsSync(migrationPath)) {
      return NextResponse.json({ error: 'Migration file not found on disk.' }, { status: 404 });
    }

    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    // If service role key is provided, test administrative client connection
    if (serviceRoleKey && !serviceRoleKey.includes('placeholder')) {
      const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // Check if tables already exist or if we can query sections
      const { error: secErr } = await adminClient.from('sections').select('count');
      if (!secErr) {
        return NextResponse.json({
          success: true,
          message: 'Supabase connected! Database tables are already created and verified.',
          tablesReady: true,
        });
      }
    }

    // Return the migration script so the user or runner can execute
    return NextResponse.json({
      success: true,
      message: 'Migration script ready. Please execute in Supabase SQL Editor.',
      sql: sqlContent,
      tablesReady: false,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Migration execution error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

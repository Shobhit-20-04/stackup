import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminRequest } from '@/lib/security/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const requested = searchParams.get('file') || searchParams.get('migration') || 'latest';

    const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
    let targetFilename = '20261014000000_security_hardening.sql';

    if (requested === 'initial') {
      targetFilename = '20260923000000_initial_schema.sql';
    } else if (requested === 'all') {
      const files = ['20260923000000_initial_schema.sql', '20261014000000_security_hardening.sql'];
      const combined = files
        .filter((f) => fs.existsSync(path.join(migrationsDir, f)))
        .map((f) => fs.readFileSync(path.join(migrationsDir, f), 'utf8'))
        .join('\n\n-- =============================================================================\n\n');
      return NextResponse.json({ sql: combined, filename: 'all_migrations_combined.sql' });
    } else if (requested !== 'latest' && requested.endsWith('.sql')) {
      targetFilename = path.basename(requested);
    }

    const migrationPath = path.join(migrationsDir, targetFilename);
    if (fs.existsSync(migrationPath)) {
      const sqlContent = fs.readFileSync(migrationPath, 'utf8');
      return NextResponse.json({ sql: sqlContent, filename: targetFilename });
    }
    return NextResponse.json({ error: `Migration file ${targetFilename} not found.` }, { status: 404 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to read migration file';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20260923000000_initial_schema.sql');
    if (fs.existsSync(migrationPath)) {
      const sqlContent = fs.readFileSync(migrationPath, 'utf8');
      return NextResponse.json({ sql: sqlContent, filename: '20260923000000_initial_schema.sql' });
    }
    return NextResponse.json({ error: 'Migration file not found.' }, { status: 404 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to read migration file';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

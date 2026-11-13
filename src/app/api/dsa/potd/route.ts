import { NextResponse } from 'next/server';
import { getProblemOfTheDay } from '@/lib/data/dsa';
import { getCustomDsaProblems } from '@/lib/services/dsa/leetcode-sync';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const todayKey = new Date().toISOString().slice(0, 10);
    const custom = getCustomDsaProblems();
    const matched = custom.find((p) => p.scheduledForDate === todayKey);

    const problem = matched || getProblemOfTheDay();
    return NextResponse.json({
      success: true,
      date: todayKey,
      isCustom: !!matched,
      problem,
    });
  } catch {
    return NextResponse.json({
      success: true,
      date: new Date().toISOString().slice(0, 10),
      isCustom: false,
      problem: getProblemOfTheDay(),
    });
  }
}

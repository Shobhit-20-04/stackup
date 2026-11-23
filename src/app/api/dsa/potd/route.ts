import { NextRequest, NextResponse } from 'next/server';
import { getProblemOfTheDay } from '@/lib/data/dsa';
import { getCustomDsaProblems } from '@/lib/services/dsa/leetcode-sync';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getKolkataDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parseInt(parts.find((p) => p.type === type)?.value || '0', 10);
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');
  const second = getPart('second');

  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const secondsPastMidnight = hour * 3600 + minute * 60 + second;
  const msUntilMidnight = Math.max(0, (86400 - secondsPastMidnight) * 1000);

  return { dateString, year, month, day, hour, minute, second, msUntilMidnight };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedDateStr = searchParams.get('date');

    const nowParts = getKolkataDateParts(new Date());
    const todayKey = nowParts.dateString;

    let targetDate = new Date();
    let effectiveDateKey = todayKey;

    if (requestedDateStr && /^\d{4}-\d{2}-\d{2}$/.test(requestedDateStr)) {
      effectiveDateKey = requestedDateStr;
      const [y, m, d] = requestedDateStr.split('-').map(Number);
      targetDate = new Date(y, m - 1, d, 12, 0, 0); // Noon to prevent timezone boundary wrap
    }

    const custom = getCustomDsaProblems();
    const matched = custom.find((p) => p.scheduledForDate === effectiveDateKey);
    const problem = matched || getProblemOfTheDay(targetDate);

    return NextResponse.json({
      success: true,
      date: effectiveDateKey,
      today: todayKey,
      timezone: 'Asia/Kolkata',
      msUntilMidnight: nowParts.msUntilMidnight,
      isCustom: !!matched,
      problem,
    });
  } catch {
    const fallbackParts = getKolkataDateParts(new Date());
    return NextResponse.json({
      success: true,
      date: fallbackParts.dateString,
      today: fallbackParts.dateString,
      timezone: 'Asia/Kolkata',
      msUntilMidnight: fallbackParts.msUntilMidnight,
      isCustom: false,
      problem: getProblemOfTheDay(),
    });
  }
}

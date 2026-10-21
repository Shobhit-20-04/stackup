import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { SECTION_TOTAL_ITEMS } from '@/lib/services/progress';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { sanitizeText, verifyCsrfOrigin } from '@/lib/security/sanitize';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfOrigin(request)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate Limiting (30 attempts/min per IP)
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`quiz-attempt-${ip}`, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const { userId: explicitUserId, topicId, topicTitle, sectionSlug, score, total } = body;

    if (!topicId || !sectionSlug || typeof score !== 'number' || typeof total !== 'number' || total <= 0 || score < 0 || score > total) {
      return NextResponse.json({ error: 'Missing or invalid required quiz attempt attributes' }, { status: 400 });
    }

    const cleanTopicId = sanitizeText(topicId, 100);
    const cleanTopicTitle = sanitizeText(topicTitle, 150);
    const cleanSectionSlug = sanitizeText(sectionSlug, 50);

    const percentage = Math.round((score / total) * 100);
    const attemptedAt = new Date().toISOString();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isLive = supabaseUrl && !supabaseUrl.includes('placeholder');

    if (isLive) {
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Enforce user ownership: Authenticated user can only submit for their own id.
        // Unauthenticated callers cannot forge a userId to mutate remote database records.
        if (user && explicitUserId && user.id !== explicitUserId) {
          return NextResponse.json({ error: 'Forbidden: Cannot submit attempt for another user.' }, { status: 403 });
        }

        const effectiveUserId = user?.id || null;

        if (effectiveUserId) {
          // 1. Resolve section ID from sections table if available
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: sectionData } = await (supabase.from('sections') as any)
            .select('id')
            .eq('slug', cleanSectionSlug)
            .maybeSingle();

          const sectionId = sectionData?.id;

          // 2. Resolve topic ID from topics table if available, or if topicId is already a UUID
          let dbTopicId: string | null = null;
          const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanTopicId);

          if (isUUID) {
            dbTopicId = cleanTopicId;
          } else if (sectionId) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: topicData } = await (supabase.from('topics') as any)
              .select('id')
              .eq('slug', cleanTopicId)
              .eq('section_id', sectionId)
              .maybeSingle();

            if (topicData?.id) {
              dbTopicId = topicData.id;
            }
          }

          // 3. Insert into quiz_attempts if valid UUID topic found
          if (dbTopicId) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('quiz_attempts') as any).insert({
              user_id: effectiveUserId,
              topic_id: dbTopicId,
              score,
              total,
              attempted_at: attemptedAt,
            });
          }

          // 4. Update progress table if section exists
          if (sectionId) {
            // Fetch total unique attempted topics for this section
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: attempts } = await (supabase.from('quiz_attempts') as any)
              .select('topic_id')
              .eq('user_id', effectiveUserId);

            const uniqueAttempted = new Set((attempts || []).map((a: { topic_id: string }) => a.topic_id)).size;
            const totalItems = SECTION_TOTAL_ITEMS[cleanSectionSlug] || 10;
            const percentComplete = Math.min(100, Math.round((Math.max(1, uniqueAttempted) / totalItems) * 100));

            // Upsert user progress
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('progress') as any).upsert(
              {
                user_id: effectiveUserId,
                section_id: sectionId,
                percent_complete: percentComplete,
                updated_at: attemptedAt,
              },
              { onConflict: 'user_id,section_id' }
            );
          }
        }
      } catch (err) {
        console.warn('Supabase remote quiz attempt recording note:', err);
      }
    }

    return NextResponse.json({
      success: true,
      attempt: {
        topicId: cleanTopicId,
        topicTitle: cleanTopicTitle,
        sectionSlug: cleanSectionSlug,
        score,
        total,
        percentage,
        attemptedAt,
      },
    });
  } catch (error) {
    console.error('Failed to record attempt:', error);
    return NextResponse.json({ error: 'Failed to record quiz attempt due to an unexpected server error.' }, { status: 500 });
  }
}

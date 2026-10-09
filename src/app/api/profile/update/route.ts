import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, fullName, phone, targetRole, college, gradYear, githubUrl, linkedinUrl } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User identifier is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isLive = supabaseUrl && !supabaseUrl.includes('placeholder');

    if (isLive) {
      try {
        const supabase = await createClient();
        // Update user metadata in auth.users
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            target_role: targetRole,
            college,
            grad_year: gradYear,
            github_url: githubUrl,
            linkedin_url: linkedinUrl,
          },
        });

        // Update public.profiles
        await (supabase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .from('profiles') as any)
          .update({
            full_name: fullName || null,
            phone: phone || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);
      } catch (err) {
        console.warn('Supabase remote profile sync note:', err);
      }
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: userId,
        full_name: fullName,
        phone,
        target_role: targetRole,
        college,
        grad_year: gradYear,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
      },
    });
  } catch (error) {
    console.error('Error in profile update handler:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

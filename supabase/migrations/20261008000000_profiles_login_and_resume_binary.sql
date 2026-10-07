-- Migration: Add email, last_sign_in_at to profiles, and file_data to uploaded_resumes

ALTER TABLE public.uploaded_resumes ADD COLUMN IF NOT EXISTS file_data text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz;

-- Update handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, phone, last_sign_in_at)
    VALUES (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', null),
        new.phone,
        new.last_sign_in_at
    )
    ON CONFLICT (id) DO UPDATE SET
        email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        last_sign_in_at = coalesce(excluded.last_sign_in_at, public.profiles.last_sign_in_at);
    RETURN new;
END;
$$;

DROP POLICY IF EXISTS "Allow anon select profiles" ON public.profiles;
CREATE POLICY "Allow anon select profiles" ON public.profiles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow anon delete on uploaded_resumes" ON public.uploaded_resumes;
CREATE POLICY "Allow anon delete on uploaded_resumes" ON public.uploaded_resumes FOR DELETE TO anon, authenticated USING (true);

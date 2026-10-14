-- =============================================================================
-- Migration: Production Security Hardening & RLS Remediation (Idempotent & Self-Healing)
-- Fixes broken object authorization, creates required tables if missing, revokes dangerous
-- public delete/select policies, and locks down user-scoped telemetry.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Ensure public.uploaded_resumes table exists and is fully structured
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.uploaded_resumes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    filename text NOT NULL,
    file_size bigint,
    mime_type text,
    resume_text text,
    ats_score integer DEFAULT 0,
    user_id uuid,
    user_email text,
    ip_address text,
    file_data text,
    analysis jsonb,
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.uploaded_resumes ADD COLUMN IF NOT EXISTS file_data text;
ALTER TABLE public.uploaded_resumes ADD COLUMN IF NOT EXISTS user_email text;
ALTER TABLE public.uploaded_resumes ADD COLUMN IF NOT EXISTS ip_address text;

-- uploaded_resumes RLS Policies
ALTER TABLE public.uploaded_resumes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon delete on uploaded_resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Allow anon select on uploaded_resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Allow anon select uploaded_resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Users can only view their own uploaded resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Users can only delete their own uploaded resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Users can insert their own uploaded resumes" ON public.uploaded_resumes;

CREATE POLICY "Users can only view their own uploaded resumes"
    ON public.uploaded_resumes FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own uploaded resumes"
    ON public.uploaded_resumes FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own uploaded resumes"
    ON public.uploaded_resumes FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 2. Ensure public.user_login_logs table exists and is securely locked down
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_login_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text,
    email text NOT NULL,
    full_name text,
    auth_method text NOT NULL,
    ip_address text,
    user_agent text,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- user_login_logs RLS Policies
ALTER TABLE public.user_login_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select login logs" ON public.user_login_logs;
DROP POLICY IF EXISTS "Users can select their own login logs" ON public.user_login_logs;
DROP POLICY IF EXISTS "Allow insert login logs" ON public.user_login_logs;

CREATE POLICY "Users can select their own login logs"
    ON public.user_login_logs FOR SELECT
    TO authenticated
    USING (auth.uid()::text = user_id);

CREATE POLICY "Allow insert login logs"
    ON public.user_login_logs FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_user_login_logs_created ON public.user_login_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_login_logs_email ON public.user_login_logs(email);

-- -----------------------------------------------------------------------------
-- 3. Profiles: Lock down updates and restrict unrestricted anonymous scraping
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name text,
    avatar_url text,
    phone text,
    email text,
    last_sign_in_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon select profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view public profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view public profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- 4. Ensure RLS is active on all core tables (if they exist)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_attempts') THEN
        ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'progress') THEN
        ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'resume_analyses') THEN
        ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'chat_messages') THEN
        ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

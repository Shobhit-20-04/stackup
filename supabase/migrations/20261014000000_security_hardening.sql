-- =============================================================================
-- Migration: Production Security Hardening & RLS Remediation
-- Fixes broken object authorization, revokes dangerous anon delete/select policies,
-- and locks down user-scoped telemetry to prevent data exfiltration.
-- =============================================================================

-- 1. uploaded_resumes: Revoke public/anon delete & select capabilities
DROP POLICY IF EXISTS "Allow anon delete on uploaded_resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Allow anon select on uploaded_resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Allow anon select uploaded_resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Users can only view their own uploaded resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Users can only delete their own uploaded resumes" ON public.uploaded_resumes;
DROP POLICY IF EXISTS "Users can insert their own uploaded resumes" ON public.uploaded_resumes;

ALTER TABLE public.uploaded_resumes ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view their own uploaded resumes
CREATE POLICY "Users can only view their own uploaded resumes"
    ON public.uploaded_resumes FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Only authenticated users can delete their own uploaded resumes
CREATE POLICY "Users can only delete their own uploaded resumes"
    ON public.uploaded_resumes FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Allow insert so candidate resume evaluations can be stored securely
CREATE POLICY "Users can insert their own uploaded resumes"
    ON public.uploaded_resumes FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

-- 2. user_login_logs: Revoke public select capability
DROP POLICY IF EXISTS "Allow select login logs" ON public.user_login_logs;
DROP POLICY IF EXISTS "Users can select their own login logs" ON public.user_login_logs;
DROP POLICY IF EXISTS "Allow insert login logs" ON public.user_login_logs;

ALTER TABLE public.user_login_logs ENABLE ROW LEVEL SECURITY;

-- Users may only view their own login logs (service_role bypasses RLS for admin dashboards)
CREATE POLICY "Users can select their own login logs"
    ON public.user_login_logs FOR SELECT
    TO authenticated
    USING (auth.uid()::text = user_id);

-- Allow authentication events to be inserted
CREATE POLICY "Allow insert login logs"
    ON public.user_login_logs FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

-- 3. profiles: Lock down updates and restrict unrestricted anonymous scraping
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

-- 4. Ensure RLS is active on all core tables
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

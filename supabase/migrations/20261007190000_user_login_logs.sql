-- =============================================================================
-- Migration: User Login & Access Audit Logging
-- Tracks who logged in, how they logged in, and when they logged in
-- =============================================================================

create table if not exists public.user_login_logs (
    id uuid primary key default gen_random_uuid(),
    user_id text,
    email text not null,
    full_name text,
    auth_method text not null, -- 'Google OAuth', 'Email & Password', 'Phone SMS OTP', 'Email OTP'
    ip_address text,
    user_agent text,
    created_at timestamptz default now() not null
);

alter table public.user_login_logs enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow insert login logs" on public.user_login_logs;
drop policy if exists "Allow select login logs" on public.user_login_logs;

-- Allow insert so login events can be recorded from client & server
create policy "Allow insert login logs"
    on public.user_login_logs for insert
    to public
    with check (true);

-- Allow select so admin can audit login activity
create policy "Allow select login logs"
    on public.user_login_logs for select
    to public
    using (true);

-- Indexes for fast ordering & lookups
create index if not exists idx_user_login_logs_created on public.user_login_logs(created_at desc);
create index if not exists idx_user_login_logs_email on public.user_login_logs(email);

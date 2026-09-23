-- =============================================================================
-- StackUp — Initial Production Database Schema Migration
-- =============================================================================

-- Enable uuid generation if not already enabled
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Profiles Table
-- Linked to Supabase auth.users
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
    id uuid primary key references auth.users on delete cascade,
    full_name text,
    avatar_url text,
    phone text,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- -----------------------------------------------------------------------------
-- 2. Sections Table (e.g. Aptitude, Core CS Subjects, DSA)
-- -----------------------------------------------------------------------------
create table if not exists public.sections (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text unique not null,
    order_index integer default 0 not null,
    created_at timestamptz default now() not null
);

-- -----------------------------------------------------------------------------
-- 3. Topics Table (Under each Section)
-- -----------------------------------------------------------------------------
create table if not exists public.topics (
    id uuid primary key default gen_random_uuid(),
    section_id uuid not null references public.sections(id) on delete cascade,
    title text not null,
    slug text not null,
    notes_markdown text default '' not null,
    order_index integer default 0 not null,
    created_at timestamptz default now() not null,
    unique(section_id, slug)
);

-- -----------------------------------------------------------------------------
-- 4. Quiz Questions Table
-- -----------------------------------------------------------------------------
create table if not exists public.quiz_questions (
    id uuid primary key default gen_random_uuid(),
    topic_id uuid not null references public.topics(id) on delete cascade,
    question text not null,
    options jsonb not null, -- Array of string options, e.g. ["A", "B", "C", "D"]
    correct_option integer not null, -- 0-based index of correct option
    explanation text,
    created_at timestamptz default now() not null
);

-- -----------------------------------------------------------------------------
-- 5. Quiz Attempts Table (User results per topic attempt)
-- -----------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    topic_id uuid not null references public.topics(id) on delete cascade,
    score integer not null,
    total integer not null,
    attempted_at timestamptz default now() not null
);

-- -----------------------------------------------------------------------------
-- 6. Progress Table (User percent completion per section)
-- -----------------------------------------------------------------------------
create table if not exists public.progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    section_id uuid not null references public.sections(id) on delete cascade,
    percent_complete integer default 0 not null check (percent_complete >= 0 and percent_complete <= 100),
    updated_at timestamptz default now() not null,
    unique(user_id, section_id)
);

-- -----------------------------------------------------------------------------
-- 7. DSA Problems Table (Curated directory)
-- -----------------------------------------------------------------------------
create table if not exists public.dsa_problems (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
    pattern_tag text not null, -- e.g. "Two Pointers", "Sliding Window", "Graph BFS"
    leetcode_url text,
    striver_url text,
    youtube_url text,
    created_at timestamptz default now() not null
);

-- -----------------------------------------------------------------------------
-- 8. Resume Analyses Table (ATS score & structured feedback)
-- -----------------------------------------------------------------------------
create table if not exists public.resume_analyses (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    filename text not null,
    ats_score integer not null check (ats_score >= 0 and ats_score <= 100),
    feedback jsonb not null, -- Structured suggestions, missing keywords, formatting issues
    created_at timestamptz default now() not null
);

-- -----------------------------------------------------------------------------
-- 9. Chat Messages Table (Context-aware AI assistant history)
-- -----------------------------------------------------------------------------
create table if not exists public.chat_messages (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null check (role in ('user', 'assistant', 'system')),
    content text not null,
    created_at timestamptz default now() not null
);

-- =============================================================================
-- PERFORMANCE INDEXES (Non-negotiable for scale)
-- =============================================================================
create index if not exists idx_quiz_attempts_user_topic on public.quiz_attempts(user_id, topic_id);
create index if not exists idx_quiz_attempts_user_attempted on public.quiz_attempts(user_id, attempted_at desc);
create index if not exists idx_progress_user_section on public.progress(user_id, section_id);
create index if not exists idx_topics_section_id on public.topics(section_id);
create index if not exists idx_quiz_questions_topic_id on public.quiz_questions(topic_id);
create index if not exists idx_resume_analyses_user_created on public.resume_analyses(user_id, created_at desc);
create index if not exists idx_chat_messages_user_created on public.chat_messages(user_id, created_at asc);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.sections enable row level security;
alter table public.topics enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.progress enable row level security;
alter table public.dsa_problems enable row level security;
alter table public.resume_analyses enable row level security;
alter table public.chat_messages enable row level security;

-- Profiles: Authenticated users can view profiles, users can only update their own profile
create policy "Users can view all public profiles"
    on public.profiles for select
    to authenticated
    using (true);

create policy "Users can update their own profile"
    on public.profiles for update
    to authenticated
    using (auth.uid() = id);

create policy "Users can insert their own profile"
    on public.profiles for insert
    to authenticated
    with check (auth.uid() = id);

-- Sections & Topics: Read-only for authenticated users
create policy "Authenticated users can read sections"
    on public.sections for select
    to authenticated
    using (true);

create policy "Authenticated users can read topics"
    on public.topics for select
    to authenticated
    using (true);

create policy "Authenticated users can read quiz questions"
    on public.quiz_questions for select
    to authenticated
    using (true);

create policy "Authenticated users can read dsa problems"
    on public.dsa_problems for select
    to authenticated
    using (true);

-- User-scoped private data: Quiz Attempts
create policy "Users can view their own quiz attempts"
    on public.quiz_attempts for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert their own quiz attempts"
    on public.quiz_attempts for insert
    to authenticated
    with check (auth.uid() = user_id);

-- User-scoped private data: Progress
create policy "Users can view their own progress"
    on public.progress for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert/update their own progress"
    on public.progress for all
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- User-scoped private data: Resume Analyses
create policy "Users can view their own resume analyses"
    on public.resume_analyses for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert their own resume analyses"
    on public.resume_analyses for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can delete their own resume analyses"
    on public.resume_analyses for delete
    to authenticated
    using (auth.uid() = user_id);

-- User-scoped private data: Chat Messages
create policy "Users can view their own chat messages"
    on public.chat_messages for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert their own chat messages"
    on public.chat_messages for insert
    to authenticated
    with check (auth.uid() = user_id);

-- =============================================================================
-- AUTOMATED USER CREATION TRIGGER
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name, avatar_url, phone)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', null),
        new.phone
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- =============================================================================
-- SEED DATA (Core Sections)
-- =============================================================================
insert into public.sections (name, slug, order_index)
values
    ('Aptitude', 'aptitude', 1),
    ('Core CS Subjects', 'core-cs', 2),
    ('DSA Hub', 'dsa', 3)
on conflict (slug) do nothing;

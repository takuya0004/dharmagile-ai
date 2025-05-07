-- Dharmagile AI - Supabase Schema v0.1 (MVP Core - Phase 1)

-- Users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  -- Consider adding other user profile fields later, e.g., display_name, avatar_url
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Sessions table to group chat messages
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text, -- Optional: For user to name a session
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Chat Messages table
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  branch_id uuid, -- For future branching feature (F-04)
  role text not null check (role in ('user', 'assistant', 'system')), -- Added 'system' for potential future use
  content text not null,
  parent_id uuid references chat_messages(id) on delete set null, -- For threading/branching (F-04)
  metadata jsonb, -- For storing additional info like model used, tokens, etc.
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()) -- For message editing (F-03)
);

-- Insight Records table to store structured YAML summaries
create table if not exists insight_records (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  -- project_id uuid references projects(id) on delete set null, -- For linking to projects (F-08, post-MVP core chat)
  yaml_content text not null, -- Storing the generated Insight.yaml content
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Indexes for performance
create index if not exists idx_sessions_user_id on sessions(user_id);
create index if not exists idx_chat_messages_session_id on chat_messages(session_id);
create index if not exists idx_chat_messages_parent_id on chat_messages(parent_id);
create index if not exists idx_insight_records_session_id on insight_records(session_id);

-- RLS Policies (to be added after initial table setup)
-- Example for users table (allow users to read their own data)
-- alter table users enable row level security;
-- create policy "Users can view their own data" on users for select using (auth.uid() = id);
-- create policy "Users can update their own data" on users for update using (auth.uid() = id);

-- Note: Further tables like 'projects', 'goals', 'user_plans', 'plan_tiers'
-- will be added in subsequent phases as per the functional specification.

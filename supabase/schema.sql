-- Dharmagile AI - Supabase Schema v0 (Phase 0)

-- Users table stub (to be expanded in later phases)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Add additional tables and relations in later phases as per the functional spec.

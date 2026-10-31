export const SUPABASE_INIT_SQL = `-- HERITEC SUPABASE DATABASE SCHEMA INITIALIZATION SCRIPT
-- Run this in your Supabase SQL Editor (supabase.com/dashboard/project/_/sql)

CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  travel_mode TEXT DEFAULT 'solo',
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.civic_reports (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
  site_name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  description TEXT NOT NULL,
  reporter_name TEXT,
  status TEXT DEFAULT 'verified',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.traveler_checkpoints (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  site_id INTEGER NOT NULL,
  site_name TEXT NOT NULL,
  visited_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  notes TEXT,
  rating INTEGER DEFAULT 5
);

CREATE TABLE IF NOT EXISTS public.group_expeditions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  heritage_route TEXT NOT NULL,
  member_count INTEGER DEFAULT 1,
  departure_date TEXT NOT NULL,
  status TEXT DEFAULT 'planning',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traveler_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_expeditions ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read access to civic reports" 
  ON public.civic_reports FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert into civic reports" 
  ON public.civic_reports FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public read access to group expeditions" 
  ON public.group_expeditions FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated/service access to users" 
  ON public.users FOR ALL USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated access to checkpoints" 
  ON public.traveler_checkpoints FOR ALL USING (true);
`;

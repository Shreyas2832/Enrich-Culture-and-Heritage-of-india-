-- ==============================================================================
-- HERITEC SUPABASE DATABASE SCHEMA INITIALIZATION SCRIPT
-- Run this script in your Supabase SQL Editor (supabase.com/dashboard/project/_/sql)
-- to initialize the required tables and security policies with 1 click.
-- ==============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  travel_mode TEXT DEFAULT 'solo',
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CIVIC REPORTS TABLE
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

-- 3. TRAVELER CHECKPOINTS TABLE
CREATE TABLE IF NOT EXISTS public.traveler_checkpoints (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  site_id INTEGER NOT NULL,
  site_name TEXT NOT NULL,
  visited_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  notes TEXT,
  rating INTEGER DEFAULT 5
);

-- 4. GROUP EXPEDITIONS TABLE
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

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traveler_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_expeditions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to civic reports and expeditions so visitors can explore heritage data
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

-- 6. SEED INITIAL SAMPLE DATA IF EMPTY
INSERT INTO public.civic_reports (site_name, location, category, severity, description, reporter_name, status)
SELECT 
  'Hampi Virupaksha Temple Outer Wall', 
  '15.3350° N, 76.4600° E, Karnataka', 
  'Plastic & Waste Pollution', 
  'high', 
  'Severe plastic bottle and food wrapper accumulation along the ancient canal stone embankment.', 
  'Hampi NSS Student Volunteer Unit',
  'NSS Drive Scheduled'
WHERE NOT EXISTS (SELECT 1 FROM public.civic_reports LIMIT 1);

INSERT INTO public.civic_reports (site_name, location, category, severity, description, reporter_name, status)
SELECT 
  'Ajanta Cave 9 Exterior Gateway', 
  '20.5519° N, 75.7033° E, Maharashtra', 
  'Graffiti & Vandalism', 
  'critical', 
  'Carved names and scratching detected on basalt rock surface near the visitor staircase.', 
  'Archaeological Survey Patrol',
  'Under Inspection'
WHERE (SELECT count(*) FROM public.civic_reports) < 2;

INSERT INTO public.group_expeditions (title, heritage_route, member_count, departure_date, status)
SELECT 
  'Spiritual Varanasi Dawn Ghats Cohort',
  'Varanasi Ghats & Sarnath Buddhist Route',
  6,
  'Tomorrow, 05:30 AM',
  'confirmed'
WHERE NOT EXISTS (SELECT 1 FROM public.group_expeditions LIMIT 1);

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get server-side credentials with fallbacks
export function getServerSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  try {
    return createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.error('Failed to initialize server-side Supabase client:', err);
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(url && key);
}

export function getSupabaseDetails() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  let projectRef = '';
  if (url) {
    try {
      const parsed = new URL(url);
      projectRef = parsed.hostname.split('.')[0] || '';
    } catch {
      // ignore
    }
  }
  return {
    isConfigured: isSupabaseConfigured(),
    url: url ? url.replace(/(https?:\/\/[^.]+).*/, '$1.supabase.co') : '',
    projectRef,
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAnonKey: Boolean(process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY),
  };
}

// 1. Civic Reports in Supabase
export async function getSupabaseCivicReports() {
  const client = getServerSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('civic_reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Supabase query error for civic_reports:', error.message);
    return null;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    siteName: row.site_name,
    location: row.location,
    category: row.category,
    severity: row.severity,
    description: row.description,
    reporterName: row.reporter_name,
    status: row.status,
    createdAt: row.created_at,
    source: 'supabase',
  }));
}

export async function createSupabaseCivicReport(data: {
  userId?: number;
  siteName: string;
  location: string;
  category: string;
  severity: string;
  description: string;
  reporterName?: string;
}) {
  const client = getServerSupabaseClient();
  if (!client) return null;

  const payload: any = {
    site_name: data.siteName,
    location: data.location,
    category: data.category,
    severity: data.severity,
    description: data.description,
    reporter_name: data.reporterName || 'Citizen Ranger',
    status: 'verified',
  };

  if (data.userId) {
    payload.user_id = data.userId;
  }

  const { data: inserted, error } = await client
    .from('civic_reports')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.warn('Supabase insert error for civic_reports:', error.message);
    return null;
  }

  return {
    id: inserted.id,
    userId: inserted.user_id,
    siteName: inserted.site_name,
    location: inserted.location,
    category: inserted.category,
    severity: inserted.severity,
    description: inserted.description,
    reporterName: inserted.reporter_name,
    status: inserted.status,
    createdAt: inserted.created_at,
    source: 'supabase',
  };
}

// 2. Users in Supabase
export async function getOrCreateSupabaseUser(uid: string, email: string, name?: string) {
  const client = getServerSupabaseClient();
  if (!client) return null;

  // Check if user exists
  const { data: existing, error: fetchErr } = await client
    .from('users')
    .select('*')
    .eq('uid', uid)
    .maybeSingle();

  if (fetchErr) {
    console.warn('Supabase users fetch error:', fetchErr.message);
  }

  if (existing) {
    if (name && existing.name !== name) {
      const { data: updated } = await client
        .from('users')
        .update({ name })
        .eq('uid', uid)
        .select()
        .single();
      return updated || existing;
    }
    return existing;
  }

  // Create new user in Supabase
  const { data: created, error: insertErr } = await client
    .from('users')
    .insert({
      uid,
      email,
      name: name || '',
    })
    .select()
    .single();

  if (insertErr) {
    console.warn('Supabase user creation error:', insertErr.message);
    return null;
  }

  return created;
}

// 3. Checkpoints in Supabase
export async function getSupabaseCheckpoints(userId: number) {
  const client = getServerSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('traveler_checkpoints')
    .select('*')
    .eq('user_id', userId)
    .order('visited_at', { ascending: false });

  if (error) {
    console.warn('Supabase checkpoints fetch error:', error.message);
    return null;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    siteId: row.site_id,
    siteName: row.site_name,
    visitedAt: row.visited_at,
    notes: row.notes,
    rating: row.rating,
    source: 'supabase',
  }));
}

export async function addSupabaseCheckpoint(data: {
  userId: number;
  siteId: number;
  siteName: string;
  notes?: string;
  rating?: number;
}) {
  const client = getServerSupabaseClient();
  if (!client) return null;

  const { data: inserted, error } = await client
    .from('traveler_checkpoints')
    .insert({
      user_id: data.userId,
      site_id: data.siteId,
      site_name: data.siteName,
      notes: data.notes || '',
      rating: data.rating || 5,
    })
    .select()
    .single();

  if (error) {
    console.warn('Supabase checkpoint insert error:', error.message);
    return null;
  }

  return inserted;
}

// 4. Expeditions in Supabase
export async function getSupabaseExpeditions() {
  const client = getServerSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('group_expeditions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Supabase expeditions fetch error:', error.message);
    return null;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    heritageRoute: row.heritage_route,
    memberCount: row.member_count,
    departureDate: row.departure_date,
    status: row.status,
    createdAt: row.created_at,
    source: 'supabase',
  }));
}

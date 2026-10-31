import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'heritec_supabase_url';
const STORAGE_KEY_ANON = 'heritec_supabase_anon';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isCustom: boolean;
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  if (typeof window === 'undefined') {
    return { url: envUrl, anonKey: envKey, isCustom: false };
  }

  const customUrl = localStorage.getItem(STORAGE_KEY_URL) || '';
  const customKey = localStorage.getItem(STORAGE_KEY_ANON) || '';

  if (customUrl && customKey) {
    return { url: customUrl, anonKey: customKey, isCustom: true };
  }

  return { url: envUrl, anonKey: envKey, isCustom: false };
}

export function saveCustomSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    if (url && anonKey) {
      localStorage.setItem(STORAGE_KEY_URL, url.trim());
      localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_ANON);
    }
  }
}

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (!url || !anonKey) {
    return null;
  }

  if (!cachedClient || lastUsedUrl !== url) {
    try {
      cachedClient = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      lastUsedUrl = url;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return cachedClient;
}

export async function testSupabaseConnection(url?: string, anonKey?: string): Promise<{ success: boolean; message: string }> {
  try {
    const targetUrl = url || getStoredSupabaseConfig().url;
    const targetKey = anonKey || getStoredSupabaseConfig().anonKey;

    if (!targetUrl || !targetKey) {
      return { success: false, message: 'Supabase URL or Anon Key is missing.' };
    }

    const testClient = createClient(targetUrl, targetKey);
    // Simple ping to check connection
    const { error } = await testClient.from('civic_reports').select('id', { count: 'exact', head: true });
    
    // Even if the table doesn't exist yet, if it connects to Supabase it returns either 200 or 404/relation not found, not network failure
    if (error && error.message.includes('FetchError')) {
      return { success: false, message: `Connection failed: ${error.message}` };
    }

    return { 
      success: true, 
      message: 'Successfully connected to Supabase PostgreSQL instance!' 
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to ping Supabase.' };
  }
}

export function openSupabaseInBrowser(projectUrl?: string): void {
  if (projectUrl && projectUrl.includes('.supabase.co')) {
    try {
      // Extract project ref (e.g. https://xyz.supabase.co -> xyz)
      const parsed = new URL(projectUrl);
      const ref = parsed.hostname.split('.')[0];
      if (ref && ref !== 'supabase') {
        window.open(`https://supabase.com/dashboard/project/${ref}`, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch {
      // Fallback
    }
  }
  // Default to Supabase dashboard
  window.open('https://supabase.com/dashboard', '_blank', 'noopener,noreferrer');
}

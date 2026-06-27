import { getSupabaseOrNull } from '../lib/supabase';
import type { ContentStatus } from '../types/database';

type TableName =
  | 'packages'
  | 'destinations'
  | 'continents'
  | 'featured_destinations'
  | 'visa_countries'
  | 'cruises'
  | 'services'
  | 'guide_articles'
  | 'hero_slides'
  | 'festivals_events'
  | 'fixed_departures'
  | 'featured_experiences'
  | 'testimonials'
  | 'gallery_items'
  | 'media_videos'
  | 'media_events'
  | 'faq_categories'
  | 'faq_items'
  | 'contact_submissions'
  | 'payment_submissions'
  | 'package_enquiries'
  | 'site_settings'
  | 'about_page'
  | 'nav_config'
  | 'journey_beyond_banner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function table(supabase: NonNullable<ReturnType<typeof getSupabaseOrNull>>, name: TableName) {
  return supabase.from(name) as any;
}

export async function fetchPublished<T>(tableName: TableName, orderBy = 'sort_order'): Promise<T[]> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const { data, error } = await table(supabase, tableName).select('*').eq('status', 'published').order(orderBy, { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function fetchAllAdmin<T>(tableName: TableName, orderBy = 'sort_order'): Promise<T[]> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const { data, error } = await table(supabase, tableName).select('*').order(orderBy, { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function fetchBySlug<T>(tableName: TableName, slug: string, admin = false): Promise<T | null> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return null;
  let query = table(supabase, tableName).select('*').eq('slug', slug);
  if (!admin) query = query.eq('status', 'published');
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data as T | null;
}

export async function fetchById<T>(tableName: TableName, id: string): Promise<T | null> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return null;
  const { data, error } = await table(supabase, tableName).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as T | null;
}

export async function upsertRow<T extends Record<string, unknown>>(
  tableName: TableName,
  row: T,
  id?: string
): Promise<T> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  if (id) {
    const { data, error } = await table(supabase, tableName).update(row).eq('id', id).select().single();
    if (error) throw error;
    return data as T;
  }
  const { data, error } = await table(supabase, tableName).insert(row).select().single();
  if (error) throw error;
  return data as T;
}

export async function deleteRow(tableName: TableName, id: string): Promise<void> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await table(supabase, tableName).delete().eq('id', id);
  if (error) throw error;
}

export async function updateStatus(tableName: TableName, id: string, status: ContentStatus): Promise<void> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await table(supabase, tableName).update({ status }).eq('id', id);
  if (error) throw error;
}

export async function fetchFaqWithItems() {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const { data: categories, error: catErr } = await table(supabase, 'faq_categories').select('*').eq('status', 'published').order('sort_order');
  if (catErr) throw catErr;
  if (!categories?.length) return [];

  const { data: items, error: itemErr } = await table(supabase, 'faq_items').select('*').in('category_id', categories.map((c: { id: string }) => c.id)).order('sort_order');
  if (itemErr) throw itemErr;

  return categories.map((cat: { id: string; name: string }) => ({
    ...cat,
    questions: (items ?? []).filter((i: { category_id: string }) => i.category_id === cat.id),
  }));
}

export async function fetchSingleton<T>(tableName: 'journey_beyond_banner' | 'about_page' | 'nav_config'): Promise<T | null> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return null;
  const { data, error } = await table(supabase, tableName).select('*').limit(1).maybeSingle();
  if (error) throw error;
  return data as T | null;
}

export async function fetchSiteSetting<T>(key: string): Promise<T | null> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return null;
  const { data, error } = await table(supabase, 'site_settings').select('value').eq('key', key).maybeSingle();
  if (error) throw error;
  return (data?.value as T) ?? null;
}

export async function upsertSiteSetting(key: string, value: unknown): Promise<void> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await table(supabase, 'site_settings').upsert({ key, value }, { onConflict: 'key' });
  if (error) throw error;
}

export async function upsertSingleton(
  tableName: 'journey_beyond_banner' | 'about_page' | 'nav_config',
  payload: Record<string, unknown>,
  id?: string
): Promise<void> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  if (id) {
    const { error } = await table(supabase, tableName).update(payload).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await table(supabase, tableName).insert(payload);
    if (error) throw error;
  }
}

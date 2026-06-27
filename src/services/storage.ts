import { getSupabaseOrNull } from '../lib/supabase';

export async function uploadMedia(file: File, folder = 'uploads'): Promise<string> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const ext = file.name.split('.').pop() ?? 'bin';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadPaymentProof(file: File): Promise<string> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `proofs/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('payment-proofs').upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('payment-proofs').getPublicUrl(path);
  return data.publicUrl;
}

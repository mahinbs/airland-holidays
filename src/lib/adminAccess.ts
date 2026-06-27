import type { SupabaseClient } from '@supabase/supabase-js';
import { PRIMARY_ADMIN_EMAIL } from './adminConfig';
import { getSupabaseOrNull } from './supabase';
import type { AdminAccessRequestRow } from '../types/database';

type UntypedClient = SupabaseClient<any>;

const MIGRATION_003_HINT =
  'The admin approval migration has not been applied yet. In Supabase Dashboard → SQL Editor, run the file supabase/migrations/003_admin_access_approval.sql (or run: npm run migrate:access with SUPABASE_DB_PASSWORD set).';

function isMissingRpc(error: { code?: string; message?: string } | null): boolean {
  return (
    error?.code === 'PGRST202' ||
    Boolean(error?.message?.includes('request_admin_access')) ||
    Boolean(error?.message?.includes('Could not find the function'))
  );
}

export async function rpcRequestAdminAccess(fullName?: string | null): Promise<string> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.rpc('request_admin_access', {
    p_full_name: fullName ?? null,
  });

  if (!error) return data as string;

  if (isMissingRpc(error)) {
    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email?.trim().toLowerCase();

    if (email === PRIMARY_ADMIN_EMAIL) {
      const { error: regErr } = await supabase.rpc('register_admin_user');
      if (regErr) throw new Error(`${MIGRATION_003_HINT} (${regErr.message})`);
      return 'approved';
    }

    throw new Error(MIGRATION_003_HINT);
  }

  throw error;
}

export async function fetchAdminUser(userId: string) {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) return null;

  const { data } = await supabase
    .from('admin_users')
    .select('id, is_super_admin')
    .eq('user_id', userId)
    .maybeSingle();

  return data as { id: string; is_super_admin: boolean } | null;
}

export async function fetchAdminAccessRequest(userId: string) {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) return null;

  const { data } = await supabase
    .from('admin_access_requests')
    .select('status')
    .eq('user_id', userId)
    .maybeSingle();

  return data as { status: 'pending' | 'approved' | 'rejected' } | null;
}

export async function fetchPendingAdminRequests(): Promise<AdminAccessRequestRow[]> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) return [];

  const { data, error } = await supabase.rpc('list_pending_admin_requests');
  if (error) throw error;
  return (data ?? []) as AdminAccessRequestRow[];
}

export async function approveAdminRequest(requestId: string) {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase.rpc('approve_admin_request', { p_request_id: requestId });
  if (error) throw error;
}

export async function rejectAdminRequest(requestId: string) {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase.rpc('reject_admin_request', { p_request_id: requestId });
  if (error) throw error;
}

export async function countPendingAdminRequests(): Promise<number> {
  const requests = await fetchPendingAdminRequests();
  return requests.length;
}

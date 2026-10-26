import type { SupabaseClient } from '@supabase/supabase-js';
import { PRIMARY_ADMIN_EMAIL } from './adminConfig';
import { getSupabaseOrNull } from './supabase';
import { createClient } from '@supabase/supabase-js';
import type { AdminAccessRequestRow, AdminUserRow } from '../types/database';
import {
  ALL_PERMISSION_KEYS,
  diffFromRole,
  isRole,
  resolvePermissions,
  type PermissionKey,
  type PermissionMap,
  type Role,
} from '../admin/config/permissions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export type AdminProfile = {
  id: string;
  userId: string;
  email: string;
  name: string;
  mobile: string;
  isSuperAdmin: boolean;
  role: Role;
  /** Per-user overrides on top of the role defaults */
  overrides: PermissionMap;
  /** Effective permissions (role defaults + overrides) */
  permissions: Record<PermissionKey, boolean>;
  active: boolean;
  createdAt?: string;
};

type SettingsFallback = {
  roles: Record<string, string>;
  permissions: Record<string, PermissionMap>;
  status: Record<string, boolean>;
  profiles: Record<string, { name?: string; mobile?: string }>;
};

async function readSetting<T>(supabase: UntypedClient, key: string): Promise<T | null> {
  const { data } = await supabase.from('site_settings').select('value').eq('key', key).maybeSingle();
  return ((data as { value?: T } | null)?.value as T) ?? null;
}

/** site_settings fallback used when the 005 migration (role/permissions columns) has not been applied yet. */
export async function fetchSettingsFallback(supabase: UntypedClient): Promise<SettingsFallback> {
  const [roles, permissions, status, profiles] = await Promise.all([
    readSetting<Record<string, string>>(supabase, 'user_roles'),
    readSetting<Record<string, PermissionMap>>(supabase, 'user_permissions'),
    readSetting<Record<string, boolean>>(supabase, 'user_status'),
    readSetting<Record<string, { name?: string; mobile?: string }>>(supabase, 'user_profiles'),
  ]);
  return { roles: roles ?? {}, permissions: permissions ?? {}, status: status ?? {}, profiles: profiles ?? {} };
}

export function toAdminProfile(row: AdminUserRow, fallback?: SettingsFallback): AdminProfile {
  const hasColumns = 'role' in row;
  const isSuper = Boolean(row.is_super_admin);
  const rawRole = hasColumns ? row.role : fallback?.roles[row.user_id];
  const role: Role = isSuper ? 'Super Admin' : isRole(rawRole) && rawRole !== 'Super Admin' ? rawRole : 'Admin';
  const overrides = (hasColumns ? row.permissions : fallback?.permissions[row.user_id]) ?? {};
  const active = hasColumns && typeof row.active === 'boolean' ? row.active : (fallback?.status[row.user_id] ?? true);
  const profile = fallback?.profiles[row.user_id];
  return {
    id: row.id,
    userId: row.user_id,
    email: row.email,
    name: row.name ?? profile?.name ?? '',
    mobile: row.mobile ?? profile?.mobile ?? '',
    isSuperAdmin: isSuper,
    role,
    overrides: overrides as PermissionMap,
    permissions: resolvePermissions(role, overrides as PermissionMap),
    active,
    createdAt: row.created_at,
  };
}

/** Loads the signed-in admin's role, permissions and active flag. Returns null if they have no admin row. */
export async function fetchAdminProfile(userId: string): Promise<AdminProfile | null> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) return null;

  const { data } = await supabase.from('admin_users').select('*').eq('user_id', userId).maybeSingle();
  if (!data) return null;
  const row = data as AdminUserRow;
  const fallback = 'role' in row ? undefined : await fetchSettingsFallback(supabase).catch(() => undefined);
  return toAdminProfile(row, fallback);
}

/** Kept for callers that only need the admin flag. */
export async function fetchAdminUser(userId: string) {
  const profile = await fetchAdminProfile(userId);
  return profile ? { id: profile.id, is_super_admin: profile.isSuperAdmin } : null;
}

export async function listAdminProfiles(): Promise<AdminProfile[]> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) return [];
  const { data, error } = await supabase.from('admin_users').select('*').order('created_at');
  if (error) throw error;
  const rows = (data ?? []) as AdminUserRow[];
  const needsFallback = rows.some((r) => !('role' in r));
  const fallback = needsFallback ? await fetchSettingsFallback(supabase).catch(() => undefined) : undefined;
  return rows.map((r) => toAdminProfile(r, fallback));
}

function missingColumn(message: string): boolean {
  return /Could not find the '[^']+' column|column "?\w+"? .*does not exist/i.test(message);
}

async function mergeSetting<T extends Record<string, unknown>>(supabase: UntypedClient, key: string, patch: (current: T) => T) {
  const current = (await readSetting<T>(supabase, key)) ?? ({} as T);
  const { error } = await supabase.from('site_settings').upsert({ key, value: patch(current) }, { onConflict: 'key' });
  if (error) throw error;
}

export type AccessUpdate = {
  role?: Role;
  /** Effective permission map — only the differences from the role defaults are stored. */
  permissions?: Record<PermissionKey, boolean>;
  active?: boolean;
  name?: string;
  mobile?: string;
};

/**
 * Updates a team member's role / permissions / status. Order of attempts:
 *  1. admin_update_user RPC (migration 005 — works even if admin_users RLS is strict)
 *  2. direct admin_users update
 *  3. site_settings fallback (user_roles, user_permissions, user_status, user_profiles)
 */
export async function saveAdminAccess(target: Pick<AdminProfile, 'userId' | 'role'>, update: AccessUpdate): Promise<void> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) throw new Error('Supabase not configured');

  const role = update.role ?? target.role;
  const overrides = update.permissions ? diffFromRole(role, update.permissions) : undefined;

  const rpc = await supabase.rpc('admin_update_user', {
    p_user_id: target.userId,
    p_role: update.role ?? null,
    p_permissions: overrides ?? null,
    p_active: update.active ?? null,
    p_name: update.name ?? null,
    p_mobile: update.mobile ?? null,
  });
  if (!rpc.error) return;

  const payload: Record<string, unknown> = {};
  if (update.role !== undefined) payload.role = update.role;
  if (overrides !== undefined) payload.permissions = overrides;
  if (update.active !== undefined) payload.active = update.active;
  if (update.name !== undefined) payload.name = update.name;
  if (update.mobile !== undefined) payload.mobile = update.mobile;

  const direct = await supabase.from('admin_users').update(payload).eq('user_id', target.userId).select('id');
  if (!direct.error && (direct.data?.length ?? 0) > 0) return;
  if (direct.error && !missingColumn(direct.error.message)) throw direct.error;

  // Columns missing (migration 005 not applied): store in site_settings so the roles still work.
  if (update.role !== undefined) await mergeSetting<Record<string, string>>(supabase, 'user_roles', (c) => ({ ...c, [target.userId]: role }));
  if (overrides !== undefined) await mergeSetting<Record<string, PermissionMap>>(supabase, 'user_permissions', (c) => ({ ...c, [target.userId]: overrides }));
  if (update.active !== undefined) await mergeSetting<Record<string, boolean>>(supabase, 'user_status', (c) => ({ ...c, [target.userId]: update.active as boolean }));
  if (update.name !== undefined || update.mobile !== undefined) {
    await mergeSetting<Record<string, { name?: string; mobile?: string }>>(supabase, 'user_profiles', (c) => ({
      ...c,
      [target.userId]: { ...c[target.userId], ...(update.name !== undefined ? { name: update.name } : {}), ...(update.mobile !== undefined ? { mobile: update.mobile } : {}) },
    }));
  }
}

/** Removes CMS access (the auth account itself is kept — delete it in Supabase → Authentication if required). */
export async function removeAdminAccess(userId: string): Promise<void> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) throw new Error('Supabase not configured');
  const rpc = await supabase.rpc('admin_remove_user', { p_user_id: userId });
  if (!rpc.error) return;
  const { error } = await supabase.from('admin_users').delete().eq('user_id', userId);
  if (error) throw error;
}

export type NewAdminUser = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: Role;
  permissions: Record<PermissionKey, boolean>;
};

export type CreateUserResult = { userId: string; needsEmailConfirmation: boolean };

/**
 * Creates the Supabase auth account on a throw-away client (no session persistence) so the signed-in super
 * admin stays logged in, then registers the account as a CMS user with the chosen role and permissions.
 */
export async function createAdminUser(input: NewAdminUser): Promise<CreateUserResult> {
  const supabase = getSupabaseOrNull() as UntypedClient | null;
  if (!supabase) throw new Error('Supabase not configured');

  const url = import.meta.env.VITE_SUPABASE_URL as string;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
  const isolated = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: 'airland-create-user' },
  });

  const email = input.email.trim().toLowerCase();
  const { data, error } = await isolated.auth.signUp({
    email,
    password: input.password,
    options: { data: { full_name: input.name, mobile: input.mobile } },
  });
  if (error) throw new Error(error.message.includes('already registered') ? 'An account with this email already exists.' : error.message);
  const user = data.user;
  if (!user) throw new Error('Supabase did not return the new user.');
  // Supabase returns an obfuscated user with no identities when the email is already taken (email-enumeration protection).
  if (Array.isArray(user.identities) && user.identities.length === 0) throw new Error('An account with this email already exists.');

  const overrides = diffFromRole(input.role, input.permissions);
  const rpc = await supabase.rpc('admin_upsert_user', {
    p_user_id: user.id,
    p_email: email,
    p_name: input.name,
    p_mobile: input.mobile,
    p_role: input.role,
    p_permissions: overrides,
  });

  if (rpc.error) {
    // Fallback: direct insert (needs an RLS policy that lets super admins write admin_users).
    let insert = await supabase
      .from('admin_users')
      .insert({ user_id: user.id, email, is_super_admin: false, name: input.name, mobile: input.mobile, role: input.role, permissions: overrides, active: true });
    if (insert.error && missingColumn(insert.error.message)) {
      insert = await supabase.from('admin_users').insert({ user_id: user.id, email, is_super_admin: false });
      if (!insert.error) {
        await saveAdminAccess({ userId: user.id, role: input.role }, { role: input.role, permissions: input.permissions, active: true, name: input.name, mobile: input.mobile });
      }
    }
    if (insert.error) {
      throw new Error(
        `The login was created but could not be registered as a CMS user (${insert.error.message}). Run supabase/migrations/005_admin_roles_and_proofs.sql in Supabase, then use "Re-register" or ask the user to sign in and request access.`
      );
    }
  }

  return { userId: user.id, needsEmailConfirmation: !data.session };
}

export async function sendPasswordReset(email: string): Promise<void> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/login` });
  if (error) throw error;
}

export { ALL_PERMISSION_KEYS };

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

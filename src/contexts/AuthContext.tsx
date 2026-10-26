import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { PRIMARY_ADMIN_EMAIL, type AdminAccessStatus } from '../lib/adminConfig';
import {
  fetchAdminAccessRequest,
  fetchAdminProfile,
  rpcRequestAdminAccess,
  type AdminProfile,
} from '../lib/adminAccess';
import { resolvePermissions, type PermissionKey, type Role } from '../admin/config/permissions';
import { getSupabaseOrNull, isSupabaseConfigured } from '../lib/supabase';

interface SignUpResult {
  needsEmailConfirmation: boolean;
  accessStatus: AdminAccessStatus;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  /** false when a super admin has deactivated this account */
  isActive: boolean;
  role: Role | null;
  /** Effective permissions (role defaults + per-user overrides). Super admins pass every check. */
  permissions: Record<PermissionKey, boolean>;
  profile: AdminProfile | null;
  can: (permission: PermissionKey) => boolean;
  accessStatus: AdminAccessStatus;
  signIn: (email: string, password: string) => Promise<AdminAccessStatus>;
  signUp: (email: string, password: string, fullName?: string) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
  requestAdminAccess: (fullName?: string, userId?: string) => Promise<AdminAccessStatus>;
  refreshAccess: () => Promise<AdminAccessStatus>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function friendlyAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Please confirm your email before signing in. Check your inbox for the confirmation link.';
  }
  if (message.includes('User already registered')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (message.includes('Password should be at least')) {
    return 'Password must be at least 6 characters.';
  }
  return message;
}

function mapRpcAccessStatus(result: string | null): AdminAccessStatus {
  if (result === 'approved' || result === 'already_approved') return 'approved';
  if (result === 'pending') return 'pending';
  return 'none';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [accessStatus, setAccessStatus] = useState<AdminAccessStatus>('none');

  async function loadAccessState(
    userId?: string
  ): Promise<{ isAdmin: boolean; isSuperAdmin: boolean; accessStatus: AdminAccessStatus }> {
    if (!userId) {
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setProfile(null);
      setAccessStatus('none');
      return { isAdmin: false, isSuperAdmin: false, accessStatus: 'none' };
    }

    const adminProfile = await fetchAdminProfile(userId);

    if (adminProfile) {
      setIsAdmin(true);
      setIsSuperAdmin(adminProfile.isSuperAdmin);
      setProfile(adminProfile);
      setAccessStatus('approved');
      return { isAdmin: true, isSuperAdmin: adminProfile.isSuperAdmin, accessStatus: 'approved' };
    }

    setIsAdmin(false);
    setIsSuperAdmin(false);
    setProfile(null);

    const requestRow = await fetchAdminAccessRequest(userId);

    const status = requestRow?.status;
    const accessStatus: AdminAccessStatus =
      status === 'pending' || status === 'rejected' ? status : 'none';
    setAccessStatus(accessStatus);
    return { isAdmin: false, isSuperAdmin: false, accessStatus };
  }

  useEffect(() => {
    const supabase = getSupabaseOrNull();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      void loadAccessState(data.session?.user?.id).finally(() => setLoading(false));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      void loadAccessState(nextSession?.user?.id);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function requestAdminAccess(fullName?: string, userId?: string): Promise<AdminAccessStatus> {
    const uid = userId ?? session?.user?.id;
    if (!uid) return 'none';

    try {
      const data = await rpcRequestAdminAccess(fullName);
      const status = mapRpcAccessStatus(data);
      const supabase = getSupabaseOrNull();
      if (supabase) await loadAccessState(uid);
      return status;
    } catch (err) {
      console.error('request_admin_access failed:', err);
      if (err instanceof Error && err.message.includes('admin approval migration')) {
        throw err;
      }
      throw new Error(
        err instanceof Error && err.message
          ? err.message
          : 'Could not submit your access request. Ask the administrator to run migration 003_admin_access_approval.sql in Supabase.'
      );
    }
  }

  async function refreshAccess(): Promise<AdminAccessStatus> {
    const supabase = getSupabaseOrNull();
    if (!supabase || !session?.user?.id) return 'none';
    const state = await loadAccessState(session.user.id);
    return state.accessStatus;
  }

  async function signIn(email: string, password: string): Promise<AdminAccessStatus> {
    const supabase = getSupabaseOrNull();
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(friendlyAuthError(error.message));

    if (!data.session) return 'none';

    setSession(data.session);
    const state = await loadAccessState(data.session.user.id);
    if (state.isAdmin) return 'approved';

    const status = await requestAdminAccess(undefined, data.session.user.id);
    if (status === 'rejected') {
      throw new Error('Your admin access request was declined. Please contact the primary administrator.');
    }

    return status;
  }

  async function signUp(email: string, password: string, fullName?: string): Promise<SignUpResult> {
    const supabase = getSupabaseOrNull();
    if (!supabase) throw new Error('Supabase not configured');

    const normalizedEmail = email.trim().toLowerCase();
    const isPrimary = normalizedEmail === PRIMARY_ADMIN_EMAIL;

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: fullName ? { data: { full_name: fullName } } : undefined,
    });
    if (error) throw new Error(friendlyAuthError(error.message));

    if (!data.session?.user) {
      return { needsEmailConfirmation: true, accessStatus: isPrimary ? 'approved' : 'pending' };
    }

    setSession(data.session);
    const accessStatus = await requestAdminAccess(fullName, data.session.user.id);
    return { needsEmailConfirmation: false, accessStatus };
  }

  async function signOut() {
    const supabase = getSupabaseOrNull();
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setProfile(null);
    setAccessStatus('none');
  }

  const role: Role | null = profile?.role ?? (isSuperAdmin ? 'Super Admin' : null);
  const permissions = profile?.permissions ?? resolvePermissions(role ?? 'Admin', null);
  const can = (permission: PermissionKey) => isSuperAdmin || permissions[permission] === true;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        isAdmin,
        isSuperAdmin,
        isActive: profile?.active ?? true,
        role,
        permissions,
        profile,
        can,
        accessStatus,
        signIn,
        signUp,
        signOut,
        requestAdminAccess,
        refreshAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { isSupabaseConfigured, PRIMARY_ADMIN_EMAIL };

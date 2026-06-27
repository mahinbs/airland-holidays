import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Save, Shield, UserPlus, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { getSupabaseOrNull } from '../../lib/supabase';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { useAuth } from '../../contexts/AuthContext';
import type { AdminUserRow } from '../../types/database';

const ROLES = ['Super Admin', 'Admin', 'Sales Manager', 'Content Manager', 'Finance Manager', 'Operations Manager'] as const;
type Role = (typeof ROLES)[number];

const ROLE_PERMISSIONS: Record<Role, string[]> = {
  'Super Admin': ['All permissions — full system access'],
  'Admin': ['All content modules', 'Submissions', 'Export data', 'User role assignment'],
  'Sales Manager': ['Submissions', 'Packages', 'Fixed Departures', 'Export leads'],
  'Content Manager': ['Packages', 'Visa', 'Cruises', 'Destinations', 'Continents', 'Services', 'Guides', 'Festivals', 'About', 'Homepage', 'FAQs', 'Gallery'],
  'Finance Manager': ['Payment page', 'Payment submissions', 'Export payment data'],
  'Operations Manager': ['Fixed Departures', 'Festivals & Events', 'Header utility', 'Submissions view'],
};

type UserRolesConfig = Record<string, Role>;

async function fetchAdminUsers() {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const { data } = await supabase.from('admin_users').select('*').order('created_at');
  return (data ?? []) as AdminUserRow[];
}

export default function AdminUsers() {
  const { isSuperAdmin } = useAuth();
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery({ queryKey: ['admin', 'users'], queryFn: fetchAdminUsers });
  const [roles, setRoles] = useState<UserRolesConfig>({});
  const [saving, setSaving] = useState(false);

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('Content Manager');
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    fetchSiteSetting<UserRolesConfig>('user_roles').then((r) => setRoles(r ?? {}));
  }, []);

  const saveRoles = async () => {
    setSaving(true);
    await upsertSiteSetting('user_roles', roles);
    setSaving(false);
    alert('User roles saved.');
  };

  const inviteUser = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setInviteMessage(null);
    try {
      const supabase = getSupabaseOrNull();
      if (!supabase) throw new Error('Supabase not configured');
      // Use Supabase auth.admin.inviteUserByEmail if service role key available,
      // otherwise insert a pending access request that they can approve
      const { error } = await (supabase.from('admin_access_requests') as any).insert({
        email: inviteEmail.trim(),
        requested_role: inviteRole,
        status: 'approved', // pre-approved invite
        message: `Invited by admin with role: ${inviteRole}`,
      });
      if (error) throw error;
      setInviteMessage({ type: 'ok', text: `Invite request created for ${inviteEmail}. The user can now request access and will be auto-approved.` });
      setInviteEmail('');
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    } catch (e) {
      setInviteMessage({ type: 'err', text: e instanceof Error ? e.message : 'Failed to invite user' });
    }
    setInviting(false);
  };

  const inputClass = 'w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none';

  if (!isSuperAdmin) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900">
        <Shield className="w-8 h-8 mb-2" />
        <p className="font-bold">Super Admin access required</p>
        <p className="text-sm mt-1">Only super admins can manage user roles and invites.</p>
      </div>
    );
  }

  if (isLoading) return <div className="animate-pulse h-48 bg-white rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage roles for approved CMS users and invite new team members.</p>
        </div>
        <button onClick={saveRoles} disabled={saving} className="btn-primary gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Roles'}
        </button>
      </div>

      {/* Invite New User */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><UserPlus className="w-4 h-4 text-primary" /> Invite Team Member</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                className={`${inputClass} pl-9`}
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && inviteUser()}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign Role</label>
            <select className={inputClass} value={inviteRole} onChange={(e) => setInviteRole(e.target.value as Role)}>
              {ROLES.filter((r) => r !== 'Super Admin').map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={inviteUser}
              disabled={inviting || !inviteEmail.trim()}
              className="btn-primary gap-2 w-full disabled:opacity-50"
            >
              {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              {inviting ? 'Sending…' : 'Create Invite'}
            </button>
          </div>
        </div>
        {inviteMessage && (
          <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl text-sm ${inviteMessage.type === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
            {inviteMessage.type === 'ok' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
            {inviteMessage.text}
          </div>
        )}
      </div>

      {/* Existing Users */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Admin Users</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Super Admin</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Role</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const currentRole = (roles[user.user_id] ?? (user.is_super_admin ? 'Super Admin' : 'Admin')) as Role;
              return (
                <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    {user.is_super_admin ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Yes</span>
                    ) : (
                      <span className="text-slate-400 text-xs">No</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <select
                      className="border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-primary"
                      value={currentRole}
                      onChange={(e) => setRoles({ ...roles, [user.user_id]: e.target.value as Role })}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-xs text-slate-500 max-w-xs">{ROLE_PERMISSIONS[currentRole]?.join(', ')}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-slate-500 text-center py-12">No admin users yet. Users who request access will appear here.</p>}
      </div>

      {/* Role Reference */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-3">Role Permissions Reference</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(Object.entries(ROLE_PERMISSIONS) as [Role, string[]][]).map(([role, perms]) => (
            <div key={role} className="bg-white rounded-xl p-3 border border-slate-100">
              <p className="text-sm font-semibold text-slate-800 mb-1">{role}</p>
              <p className="text-xs text-slate-500">{perms.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

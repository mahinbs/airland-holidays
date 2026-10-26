import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, CheckCircle, ChevronDown, Eye, EyeOff, KeyRound, Loader2, Mail, Save, Shield, Trash2, UserPlus, Wand2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  createAdminUser,
  listAdminProfiles,
  removeAdminAccess,
  saveAdminAccess,
  sendPasswordReset,
  type AdminProfile,
} from '../../lib/adminAccess';
import {
  PERMISSIONS,
  ROLES,
  ROLE_DESCRIPTIONS,
  resolvePermissions,
  type PermissionKey,
  type Role,
} from '../config/permissions';
import { Toggle } from '../components/fields/shared';

const ASSIGNABLE_ROLES = ROLES.filter((r) => r !== 'Super Admin');
const inputClass = 'w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none';

type PermissionState = Record<PermissionKey, boolean>;
type Draft = { role: Role; permissions: PermissionState; active: boolean; name: string; mobile: string };
type Notice = { type: 'ok' | 'err'; text: string };

const draftFrom = (user: AdminProfile): Draft => ({
  role: user.role,
  permissions: { ...user.permissions },
  active: user.active,
  name: user.name,
  mobile: user.mobile,
});

function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
  const bytes = new Uint32Array(14);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

function PermissionGrid({ value, onChange, disabled }: { value: PermissionState; onChange: (key: PermissionKey, on: boolean) => void; disabled?: boolean }) {
  const groups = ['Operations', 'Content', 'Site'] as const;
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {groups.map((group) => (
        <div key={group}>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">{group}</p>
          <div className="space-y-2">
            {PERMISSIONS.filter((p) => p.group === group).map((p) => (
              <Toggle key={p.key} checked={value[p.key]} onChange={(v) => onChange(p.key, v)} label={p.label} disabled={disabled} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminUsers() {
  const { isSuperAdmin, user: me } = useAuth();
  const qc = useQueryClient();
  const { data: users = [], isLoading, error: loadError } = useQuery({ queryKey: ['admin', 'users'], queryFn: listAdminProfiles });

  // Create form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>('Content Manager');
  const [permissions, setPermissions] = useState<PermissionState>(resolvePermissions('Content Manager'));
  const [showPerms, setShowPerms] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createNotice, setCreateNotice] = useState<Notice | null>(null);

  // Existing users
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [rowNotice, setRowNotice] = useState<Record<string, Notice>>({});

  const changeRole = (next: Role) => {
    setRole(next);
    setPermissions(resolvePermissions(next));
  };

  const create = async () => {
    setCreateNotice(null);
    if (!name.trim() || !email.trim() || !mobile.trim() || !password) {
      setCreateNotice({ type: 'err', text: 'Name, email, mobile and password are all required.' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setCreateNotice({ type: 'err', text: 'Enter a valid email address.' });
      return;
    }
    if (password.length < 8) {
      setCreateNotice({ type: 'err', text: 'Password must be at least 8 characters.' });
      return;
    }
    setCreating(true);
    try {
      const result = await createAdminUser({ name: name.trim(), email, mobile: mobile.trim(), password, role, permissions });
      setCreateNotice({
        type: 'ok',
        text: result.needsEmailConfirmation
          ? `${email} was created as ${role}. They must confirm their email before signing in. Share the temporary password with them securely and ask them to change it.`
          : `${email} was created as ${role} and can sign in now. Share the temporary password with them securely.`,
      });
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      changeRole('Content Manager');
      void qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    } catch (e) {
      setCreateNotice({ type: 'err', text: e instanceof Error ? e.message : 'Could not create the user.' });
    }
    setCreating(false);
  };

  const setNotice = (userId: string, notice: Notice | null) =>
    setRowNotice((n) => {
      const next = { ...n };
      if (notice) next[userId] = notice;
      else delete next[userId];
      return next;
    });

  const patchDraft = (user: AdminProfile, patch: Partial<Draft>) =>
    setDrafts((d) => ({ ...d, [user.userId]: { ...(d[user.userId] ?? draftFrom(user)), ...patch } }));

  const save = async (user: AdminProfile) => {
    const draft = drafts[user.userId];
    if (!draft) return;
    setBusy(`save:${user.userId}`);
    setNotice(user.userId, null);
    try {
      await saveAdminAccess(user, {
        role: user.isSuperAdmin ? undefined : draft.role,
        permissions: user.isSuperAdmin ? undefined : draft.permissions,
        active: user.isSuperAdmin ? undefined : draft.active,
        name: draft.name,
        mobile: draft.mobile,
      });
      setDrafts((d) => {
        const next = { ...d };
        delete next[user.userId];
        return next;
      });
      setNotice(user.userId, { type: 'ok', text: 'Saved. Changes apply the next time they load the CMS.' });
      await qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    } catch (e) {
      setNotice(user.userId, { type: 'err', text: e instanceof Error ? e.message : 'Could not save changes.' });
    }
    setBusy(null);
  };

  const reset = async (user: AdminProfile) => {
    setBusy(`reset:${user.userId}`);
    setNotice(user.userId, null);
    try {
      await sendPasswordReset(user.email);
      setNotice(user.userId, { type: 'ok', text: `Password reset email sent to ${user.email}.` });
    } catch (e) {
      setNotice(user.userId, { type: 'err', text: e instanceof Error ? e.message : 'Could not send the reset email.' });
    }
    setBusy(null);
  };

  const remove = async (user: AdminProfile) => {
    if (!confirm(`Remove CMS access for ${user.email}? Their login stays in Supabase Authentication but they can no longer open the CMS.`)) return;
    setBusy(`remove:${user.userId}`);
    try {
      await removeAdminAccess(user.userId);
      await qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    } catch (e) {
      setNotice(user.userId, { type: 'err', text: e instanceof Error ? e.message : 'Could not remove access.' });
    }
    setBusy(null);
  };

  if (!isSuperAdmin) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900">
        <Shield className="w-8 h-8 mb-2" />
        <p className="font-bold">Super Admin access required</p>
        <p className="text-sm mt-1">Only super admins can manage users, roles and permissions.</p>
      </div>
    );
  }

  const activeAdmins = users.filter((u) => u.active).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-500 text-sm mt-1">
          Create team logins with a role and fine-grained permissions so day-to-day work never depends on a single admin account.
        </p>
        {activeAdmins <= 1 && (
          <div className="mt-3 flex items-start gap-2 p-3 rounded-xl text-sm bg-amber-50 text-amber-900 border border-amber-200">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            Only one active CMS login exists. Create at least one more Admin so the business is not blocked if that account is unavailable.
          </div>
        )}
      </div>

      {/* Create user */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-primary" /> Create Team Member
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input className={`${inputClass} pl-9`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colleague@company.com" autoComplete="off" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile number</label>
            <input className={inputClass} type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Temporary password</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  className={`${inputClass} pr-9`}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPassword(generatePassword());
                  setShowPassword(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 rounded-xl border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Wand2 className="w-4 h-4" /> Generate
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {ASSIGNABLE_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => changeRole(r)}
                  className={`text-left p-3 rounded-xl border transition-colors ${role === r ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  <p className="text-sm font-semibold text-slate-900">{r}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ROLE_DESCRIPTIONS[r]}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="button" onClick={() => setShowPerms((s) => !s)} className="mt-4 text-sm text-primary flex items-center gap-1 hover:underline">
          <ChevronDown className={`w-4 h-4 transition-transform ${showPerms ? 'rotate-180' : ''}`} /> Customise permissions (defaults come from the role)
        </button>
        {showPerms && (
          <div className="mt-3 p-4 bg-slate-50 rounded-xl">
            <PermissionGrid value={permissions} onChange={(k, v) => setPermissions((p) => ({ ...p, [k]: v }))} />
          </div>
        )}

        <div className="mt-5 flex items-center gap-3">
          <button type="button" onClick={() => void create()} disabled={creating} className="btn-primary gap-2 disabled:opacity-50">
            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {creating ? 'Creating…' : 'Create user'}
          </button>
          <p className="text-xs text-slate-400">The new login is created without signing you out.</p>
        </div>
        {createNotice && <NoticeBox notice={createNotice} />}
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Team ({users.length})</h2>
        </div>
        {isLoading && <div className="animate-pulse h-24 m-4 bg-slate-100 rounded-xl" />}
        {loadError && <p className="p-4 text-sm text-red-600">{loadError instanceof Error ? loadError.message : 'Could not load users.'}</p>}
        <div className="divide-y divide-slate-100">
          {users.map((user) => {
            const draft = drafts[user.userId] ?? draftFrom(user);
            const dirty = Boolean(drafts[user.userId]) && JSON.stringify(drafts[user.userId]) !== JSON.stringify(draftFrom(user));
            const isMe = user.userId === me?.id;
            const locked = user.isSuperAdmin;
            const open = expanded === user.userId;
            return (
              <div key={user.id} className={`p-5 ${draft.active ? '' : 'bg-slate-50'}`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[220px]">
                    <p className="font-semibold text-slate-900 flex items-center gap-2 flex-wrap">
                      {user.name || user.email}
                      {user.isSuperAdmin && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold">SUPER ADMIN</span>}
                      {isMe && <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold">YOU</span>}
                      {!draft.active && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">DEACTIVATED</span>}
                    </p>
                    <p className="text-sm text-slate-500">
                      {user.email}
                      {user.mobile ? ` · ${user.mobile}` : ''}
                    </p>
                  </div>

                  <select
                    className="border border-slate-300 rounded-lg px-2.5 py-2 text-sm focus:ring-1 focus:ring-primary disabled:bg-slate-100"
                    value={draft.role}
                    disabled={locked}
                    onChange={(e) => {
                      const next = e.target.value as Role;
                      patchDraft(user, { role: next, permissions: resolvePermissions(next) });
                    }}
                  >
                    {(locked ? ROLES : ASSIGNABLE_ROLES).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <Toggle checked={draft.active} disabled={locked || isMe} onChange={(v) => patchDraft(user, { active: v })} label={draft.active ? 'Active' : 'Inactive'} />

                  <button type="button" onClick={() => setExpanded(open ? null : user.userId)} className="text-sm text-primary flex items-center gap-1 hover:underline">
                    <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} /> Permissions
                  </button>

                  <button
                    type="button"
                    onClick={() => void save(user)}
                    disabled={!dirty || busy !== null}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-40"
                  >
                    {busy === `save:${user.userId}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                  </button>
                </div>

                {open && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                        <input className={inputClass} value={draft.name} onChange={(e) => patchDraft(user, { name: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Mobile</label>
                        <input className={inputClass} value={draft.mobile} onChange={(e) => patchDraft(user, { mobile: e.target.value })} />
                      </div>
                    </div>
                    {locked ? (
                      <p className="text-sm text-slate-500">Super admins always have every permission.</p>
                    ) : (
                      <PermissionGrid value={draft.permissions} onChange={(k, v) => patchDraft(user, { permissions: { ...draft.permissions, [k]: v } })} />
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => void reset(user)}
                        disabled={busy !== null}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-700 hover:text-primary disabled:opacity-50"
                      >
                        {busy === `reset:${user.userId}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />} Send password reset email
                      </button>
                      {!locked && !isMe && (
                        <button
                          type="button"
                          onClick={() => void remove(user)}
                          disabled={busy !== null}
                          className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 disabled:opacity-50 ml-auto"
                        >
                          <Trash2 className="w-4 h-4" /> Remove CMS access
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      To set a password directly, use Supabase Dashboard → Authentication → Users. The reset email links back to this CMS login page.
                    </p>
                  </div>
                )}
                {rowNotice[user.userId] && <NoticeBox notice={rowNotice[user.userId]} />}
              </div>
            );
          })}
          {!isLoading && users.length === 0 && <p className="text-slate-500 text-center py-12">No admin users yet.</p>}
        </div>
      </div>

      {/* Role reference */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-3">Role defaults</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {ROLES.map((r) => (
            <div key={r} className="bg-white rounded-xl p-3 border border-slate-100">
              <p className="text-sm font-semibold text-slate-800 mb-1">{r}</p>
              <p className="text-xs text-slate-500">{ROLE_DESCRIPTIONS[r]}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Menu items and pages are hidden/blocked in the CMS for anything a user lacks permission for. For data-level protection, apply the RLS policies suggested in
          supabase/migrations/005_admin_roles_and_proofs.sql.
        </p>
      </div>
    </div>
  );
}

function NoticeBox({ notice }: { notice: Notice }) {
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl text-sm ${notice.type === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
      {notice.type === 'ok' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
      {notice.text}
    </div>
  );
}

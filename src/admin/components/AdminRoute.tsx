import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Clock, Loader2, LogOut, ShieldAlert, ShieldX } from 'lucide-react';
import { useAuth, isSupabaseConfigured, PRIMARY_ADMIN_EMAIL } from '../../contexts/AuthContext';
import AdminLayout from './AdminLayout';

function AccessPending() {
  const { signOut, user, accessStatus, refreshAccess } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  async function handleRefresh() {
    setChecking(true);
    const status = await refreshAccess();
    setChecking(false);
    if (status === 'approved') {
      window.location.href = '/admin/dashboard';
    }
  }

  const isRejected = accessStatus === 'rejected';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
            isRejected ? 'bg-red-50' : 'bg-amber-50'
          }`}
        >
          {isRejected ? (
            <ShieldX className="w-7 h-7 text-red-600" />
          ) : (
            <Clock className="w-7 h-7 text-amber-600" />
          )}
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">
          {isRejected ? 'Access request declined' : 'Awaiting admin approval'}
        </h1>
        <p className="text-slate-600 text-sm mb-2">
          Signed in as <span className="font-medium text-slate-800">{user?.email}</span>
        </p>
        <p className="text-slate-500 text-xs mb-6 leading-relaxed">
          {isRejected ? (
            <>
              Your request to access the CMS was not approved. Contact the primary administrator at{' '}
              <span className="font-medium text-slate-700">{PRIMARY_ADMIN_EMAIL}</span> if you believe this is an
              error.
            </>
          ) : (
            <>
              Your signup has been sent to the primary administrator ({PRIMARY_ADMIN_EMAIL}) for approval. You will be
              able to access the dashboard once approved.
            </>
          )}
        </p>

        <div className="flex flex-col gap-3">
          {!isRejected && (
            <button
              type="button"
              onClick={handleRefresh}
              disabled={checking}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Check approval status
            </button>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountDeactivated() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <ShieldX className="w-7 h-7 text-red-600" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">Account deactivated</h1>
        <p className="text-slate-600 text-sm mb-6">
          <span className="font-medium text-slate-800">{user?.email}</span> no longer has CMS access. Contact a super
          admin ({PRIMARY_ADMIN_EMAIL}) to have it restored.
        </p>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            navigate('/admin/login');
          }}
          className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

function AccessDenied() {
  const { signOut, user, requestAdminAccess } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleRequest() {
    setSubmitting(true);
    setError('');
    try {
      const status = await requestAdminAccess();
      if (status === 'approved') {
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit access request.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
          <ShieldAlert className="w-7 h-7 text-amber-600" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">CMS access required</h1>
        <p className="text-slate-600 text-sm mb-2">
          Signed in as <span className="font-medium text-slate-800">{user?.email}</span>, but this account does not
          have CMS access yet.
        </p>
        <p className="text-slate-500 text-xs mb-6">
          Submit a request and the primary admin will review it in the Access Requests panel.
        </p>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-red-700 text-sm mb-4 text-left">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRequest}
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Request CMS access
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminRoute() {
  const { session, loading, isAdmin, isActive, accessStatus } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Supabase Not Configured</h1>
          <p className="text-slate-600">Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  if (accessStatus === 'pending' || accessStatus === 'rejected') return <AccessPending />;
  if (!isAdmin) return <AccessDenied />;
  if (!isActive) return <AccountDeactivated />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export function AdminLoginRoute() {
  const { session, loading, isAdmin, accessStatus } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (session && isAdmin) return <Navigate to="/admin/dashboard" replace />;
  if (session && (accessStatus === 'pending' || accessStatus === 'rejected')) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Outlet />;
}

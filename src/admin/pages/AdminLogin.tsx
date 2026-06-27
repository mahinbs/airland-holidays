import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, Plane, ShieldCheck, User } from 'lucide-react';
import { useAuth, isSupabaseConfigured, PRIMARY_ADMIN_EMAIL } from '../../contexts/AuthContext';

type AuthMode = 'signin' | 'signup';

export default function AdminLogin() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const status = await signIn(email, password);
        if (status === 'approved' || status === 'pending') {
          navigate('/admin/dashboard');
        }
      } else {
        const result = await signUp(email, password, fullName.trim() || undefined);
        if (result.needsEmailConfirmation) {
          setSuccess(
            `Account created! Confirm your email, then sign in. Access requests (except ${PRIMARY_ADMIN_EMAIL}) require administrator approval.`
          );
          switchMode('signin');
        } else if (result.accessStatus === 'approved') {
          navigate('/admin/dashboard');
        } else {
          setSuccess(
            'Account created! Your access request has been sent to the administrator for approval. Sign in anytime to check your status.'
          );
          switchMode('signin');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="max-w-md text-center bg-white rounded-2xl shadow-xl p-8">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Supabase Not Configured</h1>
          <p className="text-slate-600 text-sm">
            Add <code className="text-primary">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative bg-primary-dark overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary/95 to-primary-light/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <img src="/logo-white.png" alt="Airland Holidays" className="h-14 w-auto mb-10" />
            <p className="text-secondary text-xs uppercase tracking-[0.25em] font-semibold mb-4">Content Management</p>
            <h1 className="text-4xl xl:text-5xl font-serif leading-tight mb-6">
              Manage your travel brand with ease
            </h1>
            <p className="text-white/70 text-lg max-w-md leading-relaxed">
              Update packages, destinations, visas, and enquiries — all in one beautiful dashboard built for Airland
              Holidays.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: Plane, text: 'Packages, cruises & destinations' },
              { icon: ShieldCheck, text: 'Secure admin access' },
              { icon: Mail, text: 'Lead & payment inbox' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-white/80">
                <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-secondary" />
                </span>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <img src="/logo.png" alt="Airland Holidays" className="h-12 w-auto mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Admin Content Management</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {mode === 'signin'
                  ? 'Sign in to access the Airland CMS dashboard'
                  : `New team members need approval from ${PRIMARY_ADMIN_EMAIL} before accessing the CMS`}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@airlandholidays.com"
                    className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                    className="w-full border border-slate-200 rounded-xl pl-11 pr-12 py-3 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-emerald-700 text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : mode === 'signin' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-8">
              <Link to="/" className="hover:text-primary transition-colors">
                ← Back to website
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

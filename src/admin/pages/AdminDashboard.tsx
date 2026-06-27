import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Package, MessageSquare, CreditCard, Inbox, MapPin, Globe, UserPlus, Ship, FileText, Sparkles, Calendar } from 'lucide-react';
import { fetchSubmissionCounts, fetchSubmissions } from '../../services/submissions';
import { countPendingAdminRequests } from '../../lib/adminAccess';
import { getSupabaseOrNull } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

async function fetchContentCounts() {
  const supabase = getSupabaseOrNull();
  if (!supabase) return { packages: 0, destinations: 0, continents: 0, guides: 0, visas: 0, cruises: 0, festivals: 0, fixedDepartures: 0 };
  const [p, d, c, g, v, cr, f, fd] = await Promise.all([
    supabase.from('packages').select('id', { count: 'exact', head: true }),
    supabase.from('destinations').select('id', { count: 'exact', head: true }),
    supabase.from('continents').select('id', { count: 'exact', head: true }),
    supabase.from('guide_articles').select('id', { count: 'exact', head: true }),
    supabase.from('visa_countries').select('id', { count: 'exact', head: true }),
    supabase.from('cruises').select('id', { count: 'exact', head: true }),
    supabase.from('festivals_events').select('id', { count: 'exact', head: true }),
    supabase.from('fixed_departures').select('id', { count: 'exact', head: true }),
  ]);
  return {
    packages: p.count ?? 0,
    destinations: d.count ?? 0,
    continents: c.count ?? 0,
    guides: g.count ?? 0,
    visas: v.count ?? 0,
    cruises: cr.count ?? 0,
    festivals: f.count ?? 0,
    fixedDepartures: fd.count ?? 0,
  };
}

export default function AdminDashboard() {
  const { isSuperAdmin } = useAuth();
  const { data: counts } = useQuery({ queryKey: ['admin', 'submission-counts'], queryFn: fetchSubmissionCounts });
  const { data: contentCounts } = useQuery({ queryKey: ['admin', 'content-counts'], queryFn: fetchContentCounts });
  const { data: recentContact = [] } = useQuery({ queryKey: ['admin', 'recent-contact'], queryFn: () => fetchSubmissions('contact') });
  const { data: pendingAccess = 0 } = useQuery({
    queryKey: ['admin', 'access-requests-count'],
    queryFn: countPendingAdminRequests,
    enabled: isSuperAdmin,
  });

  const newTotal = (counts?.contact ?? 0) + (counts?.payment ?? 0) + (counts?.package ?? 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* Submissions Overview */}
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Submissions</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Inbox} label="New Submissions" value={newTotal} href="/admin/submissions" color="bg-amber-500" />
        {isSuperAdmin && (
          <StatCard icon={UserPlus} label="Access Requests" value={pendingAccess} href="/admin/access-requests" color="bg-rose-500" />
        )}
        <StatCard icon={MessageSquare} label="Contact Leads" value={counts?.contact ?? 0} href="/admin/submissions" color="bg-blue-500" />
        <StatCard icon={CreditCard} label="Payment Proofs" value={counts?.payment ?? 0} href="/admin/submissions" color="bg-emerald-500" />
        <StatCard icon={Package} label="Package Enquiries" value={counts?.package ?? 0} href="/admin/submissions" color="bg-violet-500" />
      </div>

      {/* Content Counts */}
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Content Modules</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Packages" value={contentCounts?.packages ?? 0} href="/admin/packages" color="bg-primary" />
        <StatCard icon={MapPin} label="Destinations" value={contentCounts?.destinations ?? 0} href="/admin/destinations" color="bg-violet-500" />
        <StatCard icon={Globe} label="Continents" value={contentCounts?.continents ?? 0} href="/admin/continents" color="bg-indigo-500" />
        <StatCard icon={Globe} label="Visa Countries" value={contentCounts?.visas ?? 0} href="/admin/visas" color="bg-teal-500" />
        <StatCard icon={Ship} label="Cruises" value={contentCounts?.cruises ?? 0} href="/admin/cruises" color="bg-cyan-500" />
        <StatCard icon={Sparkles} label="Festivals & Events" value={contentCounts?.festivals ?? 0} href="/admin/festivals" color="bg-pink-500" />
        <StatCard icon={Calendar} label="Fixed Departures" value={contentCounts?.fixedDepartures ?? 0} href="/admin/fixed-departures" color="bg-orange-500" />
        <StatCard icon={FileText} label="Guide Articles" value={contentCounts?.guides ?? 0} href="/admin/guides" color="bg-slate-600" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Contact Submissions</h2>
        {recentContact.slice(0, 5).map((s: Record<string, unknown>) => (
          <div key={s.id as string} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
            <div>
              <p className="font-medium text-slate-900">{s.first_name as string} {s.last_name as string}</p>
              <p className="text-sm text-slate-500">{s.email as string} · {s.phone as string}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'new' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
              {s.status as string}
            </span>
          </div>
        ))}
        {recentContact.length === 0 && <p className="text-slate-500 text-sm">No submissions yet.</p>}
        <Link to="/admin/submissions" className="mt-4 inline-block text-sm text-primary hover:underline">View all submissions →</Link>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, href, color }: { icon: typeof Inbox; label: string; value: number; href: string; color: string }) {
  return (
    <Link to={href} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </Link>
  );
}

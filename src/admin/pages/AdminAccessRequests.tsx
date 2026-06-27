import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Clock, Loader2, ShieldCheck, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { approveAdminRequest, fetchPendingAdminRequests, rejectAdminRequest } from '../../lib/adminAccess';

export default function AdminAccessRequests() {
  const qc = useQueryClient();
  const [actingId, setActingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['admin', 'access-requests'],
    queryFn: fetchPendingAdminRequests,
    refetchInterval: 30_000,
  });

  async function handleAction(id: string, action: 'approve' | 'reject') {
    setActingId(id);
    setError('');

    try {
      if (action === 'approve') {
        await approveAdminRequest(id);
      } else {
        await rejectAdminRequest(id);
      }
      await qc.invalidateQueries({ queryKey: ['admin', 'access-requests'] });
      await qc.invalidateQueries({ queryKey: ['admin', 'access-requests-count'] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed.');
    } finally {
      setActingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-7 h-7 text-primary" />
            Access Requests
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Review and approve team members who signed up for CMS access. Only the primary admin can manage these
            requests.
          </p>
        </div>
        {requests.length > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            {requests.length} pending
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-red-700 text-sm">{error}</div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">No pending requests</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            When someone signs up with an email other than the primary admin, their request will appear here for your
            approval.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-slate-900">{req.full_name || 'Unnamed user'}</p>
                <p className="text-sm text-slate-600">{req.email}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Requested {req.requested_at ? new Date(req.requested_at).toLocaleString() : 'recently'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  disabled={actingId === req.id}
                  onClick={() => handleAction(req.id, 'approve')}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm disabled:opacity-60"
                >
                  {actingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Approve
                </button>
                <button
                  type="button"
                  disabled={actingId === req.id}
                  onClick={() => handleAction(req.id, 'reject')}
                  className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 font-semibold px-4 py-2.5 rounded-xl text-sm disabled:opacity-60"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

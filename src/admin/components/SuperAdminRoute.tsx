import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { isSuperAdmin } = useAuth();

  if (!isSuperAdmin) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-lg mx-auto">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-slate-900 mb-2">Primary admin only</h2>
        <p className="text-slate-600 text-sm">
          Only the primary administrator can manage CMS access requests.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

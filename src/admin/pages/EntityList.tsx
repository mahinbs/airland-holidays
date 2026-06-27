import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getSupabaseOrNull } from '../../lib/supabase';
import { getEntityConfig } from '../config/entities';

async function fetchEntities(table: string) {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from(table as 'packages') as any).select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export default function EntityList({ entityKey }: { entityKey: string }) {
  const config = getEntityConfig(entityKey);
  if (!config) return <p>Unknown entity</p>;

  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey: ['admin', config.table],
    queryFn: () => fetchEntities(config.table),
  });

  const getRowTitle = (row: Record<string, unknown>) => {
    if (typeof row.title === 'string' && row.title.trim()) return row.title;
    if (typeof row.name === 'string' && row.name.trim()) return row.name;
    if (typeof row.slug === 'string' && row.slug.trim()) return row.slug;
    return 'Untitled';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{config.plural}</h1>
          <p className="text-slate-500 text-sm mt-1">{rows.length} items</p>
        </div>
        <Link to={`/admin/${entityKey}/new`} className="btn-primary gap-2">
          <Plus className="w-4 h-4" /> Add {config.label}
        </Link>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-white rounded-xl" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: Record<string, unknown>) => (
                <tr key={row.id as string} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {getRowTitle(row)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {(row.status as string) ?? 'draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/${entityKey}/${row.id}`} className="p-2 text-slate-500 hover:text-primary rounded-lg hover:bg-slate-100">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this item?')) return;
                          const supabase = getSupabaseOrNull();
                          if (!supabase) return;
                          await supabase.from(config.table).delete().eq('id', row.id as string);
                          refetch();
                        }}
                        className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-12 text-center text-slate-500">No items yet. Create your first {config.label.toLowerCase()}.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function EntityListPage({ entityKey }: { entityKey: string }) {
  return <EntityList entityKey={entityKey} />;
}

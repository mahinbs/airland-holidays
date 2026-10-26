import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Copy, GripVertical, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { getSupabaseOrNull } from '../../lib/supabase';
import { getEntityConfig } from '../config/entities';
import { Toggle, useSortable } from '../components/fields/shared';

type Row = Record<string, unknown> & { id: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = (table: string) => (getSupabaseOrNull()?.from(table as 'packages') as any) ?? null;

async function fetchEntities(table: string): Promise<Row[]> {
  const q = db(table);
  if (!q) return [];
  const { data, error } = await q.select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export default function EntityList({ entityKey }: { entityKey: string }) {
  const config = getEntityConfig(entityKey);
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryKey = ['admin', config?.table];
  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchEntities(config!.table),
    enabled: Boolean(config),
  });

  const getRowTitle = (row: Row) => {
    if (typeof row.title === 'string' && row.title.trim()) return row.title;
    if (typeof row.name === 'string' && row.name.trim()) return row.name;
    if (typeof row.slug === 'string' && row.slug.trim()) return row.slug;
    return 'Untitled';
  };

  const filtering = Boolean(search.trim()) || statusFilter !== 'all';
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter !== 'all' && (row.status ?? 'draft') !== statusFilter) return false;
      if (!term) return true;
      return [row.title, row.name, row.slug, row.destination, row.category].some((v) => typeof v === 'string' && v.toLowerCase().includes(term));
    });
  }, [rows, search, statusFilter]);

  /** Persist a new display order — writes sort_order = position for every row that moved. */
  const persistOrder = async (next: Row[]) => {
    if (!config) return;
    qc.setQueryData(queryKey, next.map((r, i) => ({ ...r, sort_order: i })));
    setBusy(true);
    setError(null);
    try {
      const changed = next.map((r, i) => ({ r, i })).filter(({ r, i }) => r.sort_order !== i);
      const results = await Promise.all(changed.map(({ r, i }) => db(config.table)?.update({ sort_order: i }).eq('id', r.id)));
      const failed = results.find((res) => res?.error);
      if (failed?.error) throw failed.error;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save the new order');
      await refetch();
    }
    setBusy(false);
  };

  const sortable = useSortable(rows, (next) => void persistOrder(next as Row[]));

  const setStatus = async (row: Row, published: boolean) => {
    if (!config) return;
    const status = published ? 'published' : 'draft';
    qc.setQueryData(queryKey, rows.map((r) => (r.id === row.id ? { ...r, status } : r)));
    const { error: err } = (await db(config.table)?.update({ status }).eq('id', row.id)) ?? {};
    if (err) {
      setError(err.message);
      await refetch();
    }
  };

  const remove = async (row: Row) => {
    if (!config || !confirm(`Delete "${getRowTitle(row)}"? This cannot be undone.`)) return;
    const { error: err } = (await db(config.table)?.delete().eq('id', row.id)) ?? {};
    if (err) setError(err.message);
    await refetch();
  };

  const duplicate = async (row: Row) => {
    if (!config) return;
    const copy: Record<string, unknown> = { ...row, status: 'draft', sort_order: rows.length };
    delete copy.id;
    delete copy.created_at;
    delete copy.updated_at;
    if (typeof copy.slug === 'string') copy.slug = `${copy.slug}-copy-${Date.now().toString(36).slice(-4)}`;
    if (typeof copy.external_id === 'string') copy.external_id = `${copy.external_id}-copy-${Date.now().toString(36).slice(-4)}`;
    for (const key of ['title', 'name'] as const) if (typeof copy[key] === 'string') copy[key] = `${copy[key]} (Copy)`;
    const { error: err } = (await db(config.table)?.insert(copy)) ?? {};
    if (err) setError(err.message);
    await refetch();
  };

  if (!config) return <p>Unknown entity</p>;

  const hasStatus = config.fields.some((f) => f.name === 'status');

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{config.plural}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {rows.length} items · drag the handle to reorder{busy ? ' · saving order…' : ''}
          </p>
        </div>
        <Link to={`/admin/${entityKey}/new`} className="btn-primary gap-2">
          <Plus className="w-4 h-4" /> Add {config.label}
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder={`Search ${config.plural.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {hasStatus && (
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
            {(['all', 'published', 'draft'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${statusFilter === s ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {filtering && <p className="text-xs text-slate-400">Reordering is available when filters are cleared.</p>}
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-xl text-sm bg-red-50 text-red-700 border border-red-200">{error}</div>}

      {isLoading ? (
        <div className="animate-pulse space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-white rounded-xl" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="w-12" />
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Name</th>
                {hasStatus && <th className="text-left px-4 py-3 font-semibold text-slate-700">Visible on site</th>}
                <th className="text-right px-4 py-3 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => {
                const index = rows.findIndex((r) => r.id === row.id);
                const published = row.status === 'published';
                return (
                  <tr
                    key={row.id}
                    {...(filtering ? {} : sortable.rowProps(index))}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-opacity ${filtering ? '' : sortable.rowClass(index)}`}
                  >
                    <td className="pl-3">
                      <span
                        {...(filtering ? {} : sortable.handleProps(index))}
                        className={`inline-flex p-1 rounded ${filtering ? 'text-slate-200' : 'text-slate-400 cursor-grab active:cursor-grabbing hover:text-primary'}`}
                        title={filtering ? 'Clear filters to reorder' : 'Drag to reorder'}
                      >
                        <GripVertical className="w-4 h-4" />
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <Link to={`/admin/${entityKey}/${row.id}`} className="hover:text-primary">
                        {getRowTitle(row)}
                      </Link>
                      {typeof row.slug === 'string' && <p className="text-xs text-slate-400 font-normal">/{row.slug}</p>}
                    </td>
                    {hasStatus && (
                      <td className="px-4 py-3">
                        <Toggle checked={published} onChange={(v) => void setStatus(row, v)} label={published ? 'Published' : 'Draft'} />
                      </td>
                    )}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/admin/${entityKey}/${row.id}`} className="p-2 text-slate-500 hover:text-primary rounded-lg hover:bg-slate-100" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => void duplicate(row)} className="p-2 text-slate-500 hover:text-primary rounded-lg hover:bg-slate-100" title="Duplicate as draft">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={() => void remove(row)} className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                    {rows.length === 0 ? `No items yet. Create your first ${config.label.toLowerCase()}.` : 'No items match your filters.'}
                  </td>
                </tr>
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

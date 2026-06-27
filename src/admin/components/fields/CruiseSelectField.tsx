import { useQuery } from '@tanstack/react-query';
import { getSupabaseOrNull } from '../../../lib/supabase';
import { FieldLabel, parseArray } from './shared';

type CruiseRow = { id: string; slug: string; name: string; destination: string; status: string };

async function fetchAllCruises(): Promise<CruiseRow[]> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const { data } = await (supabase.from('cruises') as any).select('id,slug,name,destination,status').order('sort_order');
  return (data ?? []) as CruiseRow[];
}

export default function CruiseSelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: string[]) => void;
}) {
  const selected = parseArray<string>(value, []);
  const { data: cruises = [] } = useQuery({
    queryKey: ['admin', 'cruises-select'],
    queryFn: fetchAllCruises,
  });

  const toggle = (slug: string) => {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  };

  return (
    <div>
      <FieldLabel label={label} hint="Select related cruises to display on this page." />
      <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-3 space-y-1">
        {cruises.map((cruise) => (
          <label key={cruise.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(cruise.slug)}
              onChange={() => toggle(cruise.slug)}
              className="rounded border-slate-300 text-primary"
            />
            <span className="text-sm text-slate-700">{cruise.name}</span>
            <span className="text-xs text-slate-400 ml-auto">{cruise.destination}</span>
            {cruise.status !== 'published' && (
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">draft</span>
            )}
          </label>
        ))}
        {cruises.length === 0 && <p className="text-sm text-slate-400">No cruises yet.</p>}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-slate-400 mt-1">{selected.length} cruise(s) selected</p>
      )}
    </div>
  );
}

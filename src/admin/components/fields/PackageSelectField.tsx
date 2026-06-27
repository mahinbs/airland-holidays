import { useQuery } from '@tanstack/react-query';
import { fetchPublished } from '../../../services/content';
import type { PackageRow } from '../../../types/database';
import { FieldLabel, parseArray } from './shared';

export default function PackageSelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: string[]) => void;
}) {
  const selected = parseArray<string>(value, []);
  const { data: packages = [] } = useQuery({
    queryKey: ['admin', 'packages-select'],
    queryFn: () => fetchPublished<PackageRow>('packages'),
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
      <FieldLabel label={label} hint="Select related packages to display on this page." />
      <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-3 space-y-1">
        {packages.map((pkg) => (
          <label key={pkg.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(pkg.slug)}
              onChange={() => toggle(pkg.slug)}
              className="rounded border-slate-300 text-primary"
            />
            <span className="text-sm text-slate-700">{pkg.title}</span>
            <span className="text-xs text-slate-400 ml-auto">{pkg.destination}</span>
          </label>
        ))}
        {packages.length === 0 && <p className="text-sm text-slate-400">No published packages yet.</p>}
      </div>
    </div>
  );
}

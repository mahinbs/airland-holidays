import { uploadMedia } from '../../../services/storage';
import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray } from './shared';

export type RepeatableColumn = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'image' | 'number';
};

export default function RepeatableField({
  label,
  value,
  onChange,
  columns,
  defaultItem,
}: {
  label: string;
  value: unknown;
  onChange: (v: Record<string, unknown>[]) => void;
  columns: RepeatableColumn[];
  defaultItem?: Record<string, unknown>;
}) {
  const items = parseArray<Record<string, unknown>>(value, []);

  const update = (index: number, key: string, val: unknown) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    onChange(next);
  };

  const upload = async (index: number, key: string, file: File) => {
    try {
      const url = await uploadMedia(file, 'uploads');
      update(index, key, url);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  const blank = defaultItem ?? Object.fromEntries(columns.map((c) => [c.key, c.type === 'number' ? 0 : '']));

  return (
    <div>
      <FieldLabel label={label} hint="Use arrows to reorder items." />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
              {columns.map((col) => (
                <div key={col.key} className={col.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="text-xs text-slate-500">{col.label}</label>
                  {col.type === 'textarea' ? (
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={String(item[col.key] ?? '')}
                      onChange={(e) => update(i, col.key, e.target.value)}
                    />
                  ) : col.type === 'image' ? (
                    <div>
                      <input className={inputClass} value={String(item[col.key] ?? '')} onChange={(e) => update(i, col.key, e.target.value)} />
                      <input type="file" accept="image/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && upload(i, col.key, e.target.files[0])} />
                    </div>
                  ) : col.type === 'number' ? (
                    <input type="number" className={inputClass} value={Number(item[col.key] ?? 0)} onChange={(e) => update(i, col.key, Number(e.target.value))} />
                  ) : (
                    <input className={inputClass} value={String(item[col.key] ?? '')} onChange={(e) => update(i, col.key, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
            <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
      <AddButton label="Add item" onClick={() => onChange([...items, { ...blank }])} />
    </div>
  );
}

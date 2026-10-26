import { uploadMedia } from '../../../services/storage';
import { AddButton, DeleteButton, FieldLabel, ReorderButtons, Toggle, inputClass, moveItem, parseArray, useSortable } from './shared';

export type RepeatableColumn = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'image' | 'video' | 'number' | 'boolean' | 'select';
  options?: { value: string; label: string }[];
};

export default function RepeatableField({
  label,
  value,
  onChange,
  columns,
  defaultItem,
  withEnabled,
}: {
  label: string;
  value: unknown;
  onChange: (v: Record<string, unknown>[]) => void;
  columns: RepeatableColumn[];
  defaultItem?: Record<string, unknown>;
  /** Adds an Enable / Disable switch to every item (stored as `enabled`). */
  withEnabled?: boolean;
}) {
  const items = parseArray<Record<string, unknown>>(value, []);
  const sortable = useSortable(items, onChange);

  const update = (index: number, key: string, val: unknown) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    onChange(next);
  };

  const upload = async (index: number, key: string, file: File) => {
    try {
      const url = await uploadMedia(file, file.type.startsWith('video/') ? 'videos' : 'uploads');
      update(index, key, url);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  const blankFor = (c: RepeatableColumn) => {
    if (c.type === 'number') return 0;
    if (c.type === 'boolean') return false;
    return '';
  };
  const blank = defaultItem ?? {
    ...Object.fromEntries(columns.map((c) => [c.key, blankFor(c)])),
    ...(withEnabled ? { enabled: true } : {}),
  };

  return (
    <div>
      <FieldLabel label={label} hint="Drag the handle or use the arrows to reorder items." />
      <div className="space-y-3">
        {items.map((item, i) => {
          const enabled = item.enabled !== false;
          return (
            <div
              key={i}
              {...sortable.rowProps(i)}
              className={`flex gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 transition-opacity ${withEnabled && !enabled ? 'opacity-60' : ''} ${sortable.rowClass(i)}`}
            >
              <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} handleProps={sortable.handleProps(i)} />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                {columns.map((col) => (
                  <div key={col.key} className={col.type === 'textarea' ? 'md:col-span-2' : ''}>
                    {col.type !== 'boolean' && <label className="text-xs text-slate-500">{col.label}</label>}
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
                        {typeof item[col.key] === 'string' && item[col.key] ? (
                          <img src={String(item[col.key])} alt="" className="h-14 rounded-lg object-cover mt-1" />
                        ) : null}
                      </div>
                    ) : col.type === 'video' ? (
                      <div>
                        <input className={inputClass} value={String(item[col.key] ?? '')} placeholder="Paste a YouTube / video URL, or upload" onChange={(e) => update(i, col.key, e.target.value)} />
                        <input type="file" accept="video/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && upload(i, col.key, e.target.files[0])} />
                      </div>
                    ) : col.type === 'number' ? (
                      <input type="number" className={inputClass} value={Number(item[col.key] ?? 0)} onChange={(e) => update(i, col.key, Number(e.target.value))} />
                    ) : col.type === 'boolean' ? (
                      <div className="pt-5">
                        <Toggle checked={Boolean(item[col.key])} onChange={(v) => update(i, col.key, v)} label={col.label} />
                      </div>
                    ) : col.type === 'select' ? (
                      <select className={inputClass} value={String(item[col.key] ?? '')} onChange={(e) => update(i, col.key, e.target.value)}>
                        {col.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input className={inputClass} value={String(item[col.key] ?? '')} onChange={(e) => update(i, col.key, e.target.value)} />
                    )}
                  </div>
                ))}
                {withEnabled && (
                  <div className="md:col-span-2">
                    <Toggle checked={enabled} onChange={(v) => update(i, 'enabled', v)} label={enabled ? 'Enabled' : 'Disabled'} />
                  </div>
                )}
              </div>
              <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
            </div>
          );
        })}
      </div>
      <AddButton label="Add item" onClick={() => onChange([...items, { ...blank }])} />
    </div>
  );
}

import { AddButton, DeleteButton, FieldLabel, ReorderButtons, Toggle, inputClass, moveItem, parseArray, useSortable } from './shared';

export type FaqItem = { question: string; answer: string; enabled?: boolean };

export default function FaqListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: FaqItem[]) => void;
}) {
  const items = parseArray<FaqItem>(value, []);
  const sortable = useSortable(items, onChange);

  const update = (index: number, patch: Partial<FaqItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <div>
      <FieldLabel label={label} hint="Drag to reorder. Disabled FAQs stay saved but are hidden on the website." />
      <div className="space-y-3">
        {items.map((item, i) => {
          const enabled = item.enabled !== false;
          return (
            <div
              key={i}
              {...sortable.rowProps(i)}
              className={`flex gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 transition-opacity ${enabled ? '' : 'opacity-60'} ${sortable.rowClass(i)}`}
            >
              <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} handleProps={sortable.handleProps(i)} />
              <div className="flex-1 space-y-2">
                <input
                  className={inputClass}
                  value={item.question}
                  placeholder="Question"
                  onChange={(e) => update(i, { question: e.target.value })}
                />
                <textarea
                  rows={3}
                  className={inputClass}
                  value={item.answer}
                  placeholder="Answer"
                  onChange={(e) => update(i, { answer: e.target.value })}
                />
                <Toggle checked={enabled} onChange={(v) => update(i, { enabled: v })} label={enabled ? 'Enabled' : 'Disabled'} />
              </div>
              <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
            </div>
          );
        })}
      </div>
      <AddButton label="Add FAQ" onClick={() => onChange([...items, { question: '', answer: '', enabled: true }])} />
    </div>
  );
}

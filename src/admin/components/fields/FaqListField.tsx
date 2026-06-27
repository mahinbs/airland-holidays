import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray } from './shared';

type FaqItem = { question: string; answer: string };

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

  const update = (index: number, patch: Partial<FaqItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <div>
      <FieldLabel label={label} />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} />
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
            </div>
            <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
      <AddButton label="Add FAQ" onClick={() => onChange([...items, { question: '', answer: '' }])} />
    </div>
  );
}

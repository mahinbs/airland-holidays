import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray } from './shared';

export default function StringListField({
  label,
  value,
  onChange,
  placeholder = 'Enter item',
}: {
  label: string;
  value: unknown;
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const items = parseArray<string>(value, ['']);

  const update = (index: number, text: string) => {
    const next = [...items];
    next[index] = text;
    onChange(next.filter((_, i) => i < next.length - 1 || text || next.length === 1));
  };

  const add = () => onChange([...items, '']);
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const reorder = (from: number, to: number) => onChange(moveItem(items, from, to));

  return (
    <div>
      <FieldLabel label={label} />
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <ReorderButtons index={i} total={items.length} onMove={reorder} />
            <input
              className={inputClass}
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
            />
            {items.length > 1 && <DeleteButton onClick={() => remove(i)} />}
          </div>
        ))}
      </div>
      <AddButton label="Add item" onClick={add} />
    </div>
  );
}

import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray, useSortable } from './shared';

type TableRow = Record<string, string>;

export default function TableField({
  label,
  value,
  onChange,
  columns,
}: {
  label: string;
  value: unknown;
  onChange: (v: TableRow[]) => void;
  columns: { key: string; label: string }[];
}) {
  const rows = parseArray<TableRow>(value, []);
  const sortable = useSortable(rows, onChange);

  const update = (index: number, key: string, val: string) => {
    const next = [...rows];
    next[index] = { ...next[index], [key]: val };
    onChange(next);
  };

  return (
    <div>
      <FieldLabel label={label} hint="Add, edit, delete and drag rows to reorder." />
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-10" />
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2 text-left font-semibold text-slate-600">
                  {col.label}
                </th>
              ))}
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} {...sortable.rowProps(i)} className={`border-t border-slate-100 transition-opacity ${sortable.rowClass(i)}`}>
                <td className="px-1">
                  <ReorderButtons index={i} total={rows.length} onMove={(f, t) => onChange(moveItem(rows, f, t))} handleProps={sortable.handleProps(i)} />
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2">
                    <input
                      className={inputClass}
                      value={row[col.key] ?? ''}
                      onChange={(e) => update(i, col.key, e.target.value)}
                    />
                  </td>
                ))}
                <td className="px-2">
                  <DeleteButton onClick={() => onChange(rows.filter((_, idx) => idx !== i))} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="px-3 py-4 text-center text-slate-400 text-xs">
                  No rows yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddButton
        label="Add row"
        onClick={() => onChange([...rows, Object.fromEntries(columns.map((c) => [c.key, '']))])}
      />
    </div>
  );
}

import { AddButton, DeleteButton, FieldLabel, inputClass, parseArray } from './shared';

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

  const update = (index: number, key: string, val: string) => {
    const next = [...rows];
    next[index] = { ...next[index], [key]: val };
    onChange(next);
  };

  return (
    <div>
      <FieldLabel label={label} />
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
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
              <tr key={i} className="border-t border-slate-100">
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

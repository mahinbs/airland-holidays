import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2 } from 'lucide-react';

export const inputClass =
  'w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary text-sm';

export function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1.5">
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
  );
}

export function ReorderButtons({
  index,
  total,
  onMove,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5 shrink-0">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="p-1 text-slate-400 hover:text-primary disabled:opacity-30"
        aria-label="Move up"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <GripVertical className="w-4 h-4 text-slate-300 mx-auto" />
      <button
        type="button"
        disabled={index >= total - 1}
        onClick={() => onMove(index, index + 1)}
        className="p-1 text-slate-400 hover:text-primary disabled:opacity-30"
        aria-label="Move down"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-1.5 text-sm text-primary hover:underline mt-2">
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0" aria-label="Delete">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function parseArray<T>(value: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

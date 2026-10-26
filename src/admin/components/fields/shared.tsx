import { useState, type DragEvent, type HTMLAttributes } from 'react';
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

type HandleProps = Pick<HTMLAttributes<HTMLElement>, 'draggable' | 'onDragStart' | 'onDragEnd'>;
type RowProps = Pick<HTMLAttributes<HTMLElement>, 'onDragOver' | 'onDrop'> & { 'data-sortable-row': string };

/**
 * HTML5 drag & drop reordering. Spread `handleProps(i)` on the grip handle and `rowProps(i)` on the
 * row element, then wrap the row className with `rowClass(i)` for drop-target feedback.
 */
export function useSortable<T>(items: T[], onChange: (next: T[]) => void) {
  const [from, setFrom] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);

  const reset = () => {
    setFrom(null);
    setOver(null);
  };

  const handleProps = (index: number): HandleProps => ({
    draggable: true,
    onDragStart: (e: DragEvent<HTMLElement>) => {
      setFrom(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
      const row = (e.currentTarget as HTMLElement).closest('[data-sortable-row]');
      if (row) e.dataTransfer.setDragImage(row, 16, 16);
    },
    onDragEnd: reset,
  });

  const rowProps = (index: number): RowProps => ({
    'data-sortable-row': '',
    onDragOver: (e: DragEvent<HTMLElement>) => {
      if (from === null) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (over !== index) setOver(index);
    },
    onDrop: (e: DragEvent<HTMLElement>) => {
      if (from === null) return;
      e.preventDefault();
      if (from !== index) onChange(moveItem(items, from, index));
      reset();
    },
  });

  const rowClass = (index: number) => {
    if (from === index) return 'opacity-40';
    if (from !== null && over === index) return from < index ? 'ring-2 ring-primary/60 border-b-4 border-b-primary' : 'ring-2 ring-primary/60 border-t-4 border-t-primary';
    return '';
  };

  return { handleProps, rowProps, rowClass };
}

export function ReorderButtons({
  index,
  total,
  onMove,
  handleProps,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  /** Pass `useSortable().handleProps(index)` to make the grip draggable. */
  handleProps?: HandleProps;
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
      <span
        {...handleProps}
        className={`mx-auto p-0.5 rounded text-slate-300 ${handleProps ? 'cursor-grab active:cursor-grabbing hover:text-primary' : ''}`}
        title={handleProps ? 'Drag to reorder' : undefined}
      >
        <GripVertical className="w-4 h-4" />
      </span>
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

/** Accessible on/off switch used for Enable / Disable controls. */
export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <label className={`inline-flex items-center gap-2 text-sm text-slate-600 select-none ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
      >
        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
      {label}
    </label>
  );
}

import { useMemo, useRef, useState, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { FieldLabel, parseArray } from './shared';

export type MultiOption = { value: string; label: string };

/** Searchable multi-select dropdown. Stores a string[] of option values. */
export default function MultiSelectField({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select…',
  allowCustom = false,
}: {
  label: string;
  value: unknown;
  onChange: (v: string[]) => void;
  options: MultiOption[];
  placeholder?: string;
  /** Lets the editor add values that are not in `options` by pressing Enter. */
  allowCustom?: boolean;
}) {
  const selected = parseArray<string>(value, []).filter(Boolean);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const labelFor = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query]
  );

  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);

  return (
    <div ref={wrapRef} className="relative">
      <FieldLabel label={label} />
      <div
        className="min-h-[44px] w-full border border-slate-300 rounded-xl px-2 py-1.5 flex flex-wrap items-center gap-1.5 cursor-text focus-within:ring-2 focus-within:ring-primary bg-white"
        onClick={() => setOpen(true)}
      >
        {selected.map((v) => (
          <span key={v} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
            {labelFor(v)}
            <button type="button" aria-label={`Remove ${labelFor(v)}`} onClick={(e) => { e.stopPropagation(); toggle(v); }}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[120px] outline-none text-sm px-1 py-1"
          placeholder={selected.length ? '' : placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) {
              e.preventDefault();
              const match = options.find((o) => o.label.toLowerCase() === query.trim().toLowerCase());
              if (match) {
                if (!selected.includes(match.value)) toggle(match.value);
              } else if (allowCustom) {
                toggle(query.trim());
              }
              setQuery('');
            }
            if (e.key === 'Backspace' && !query && selected.length) toggle(selected[selected.length - 1]);
          }}
        />
        <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border border-slate-200 rounded-xl shadow-lg py-1">
          {filtered.map((o) => {
            const on = selected.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50"
                onClick={() => toggle(o.value)}
              >
                {o.label}
                {on && <Check className="w-4 h-4 text-primary" />}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-3 py-2 text-sm text-slate-400">{allowCustom ? 'Press Enter to add a custom value.' : 'No matches.'}</p>
          )}
        </div>
      )}
    </div>
  );
}

import { useRef } from 'react';
import { Bold, Italic, Link, List, Heading2 } from 'lucide-react';
import { FieldLabel, inputClass } from './shared';

export default function RichTextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const html = typeof value === 'string' ? value : '';

  const wrap = (before: string, after: string) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = html.slice(start, end);
    const next = html.slice(0, start) + before + selected + after + html.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length);
    });
  };

  const tools = [
    { icon: Heading2, action: () => wrap('<h2>', '</h2>'), title: 'Heading' },
    { icon: Bold, action: () => wrap('<strong>', '</strong>'), title: 'Bold' },
    { icon: Italic, action: () => wrap('<em>', '</em>'), title: 'Italic' },
    { icon: List, action: () => wrap('<ul><li>', '</li></ul>'), title: 'List' },
    { icon: Link, action: () => wrap('<a href="">', '</a>'), title: 'Link' },
  ];

  return (
    <div>
      <FieldLabel label={label} hint="HTML supported — use toolbar or write HTML directly." />
      <div className="flex gap-1 mb-2 p-1 bg-slate-100 rounded-lg w-fit">
        {tools.map(({ icon: Icon, action, title }) => (
          <button
            key={title}
            type="button"
            onClick={action}
            title={title}
            className="p-2 rounded-lg hover:bg-white text-slate-600 hover:text-primary transition-colors"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      <textarea
        ref={ref}
        rows={8}
        className={`${inputClass} font-mono text-xs`}
        value={html}
        onChange={(e) => onChange(e.target.value)}
      />
      {html && (
        <div className="mt-3 p-4 border border-slate-200 rounded-xl bg-white prose prose-sm max-w-none">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Preview</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}

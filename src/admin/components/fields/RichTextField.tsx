import { useEffect, useRef, useState } from 'react';
import {
  Bold,
  Code2,
  Film,
  Image as ImageIcon,
  Images,
  Italic,
  Link as LinkIcon,
  Link2,
  List,
  ListOrdered,
  Lightbulb,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Table as TableIcon,
  Underline,
  Undo2,
  HelpCircle,
} from 'lucide-react';
import { uploadMedia } from '../../../services/storage';
import { sanitizeHtml } from '../../../lib/sanitizeHtml';
import { FieldLabel, inputClass } from './shared';

const INTERNAL_PAGES: { label: string; href: string }[] = [
  { label: 'Packages', href: '/packages' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Visa Services', href: '/visa' },
  { label: 'Cruises', href: '/cruises' },
  { label: 'Travel Services', href: '/services' },
  { label: 'Travel Guide', href: '/guide' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Payment', href: '/payment' },
  { label: 'FAQ', href: '/faq' },
];

function youTubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  const v = url.match(/vimeo\.com\/(\d+)/);
  if (v) return `https://player.vimeo.com/video/${v[1]}`;
  return null;
}

const escapeAttr = (s: string) => s.replace(/"/g, '&quot;');

type ToolButton = { icon: typeof Bold; title: string; action: () => void };

export default function RichTextField({
  label,
  value,
  onChange,
  hint = 'Format text visually — add images, videos, galleries, tables, callouts and FAQs from the toolbar.',
  minHeight = 220,
}: {
  label: string;
  value: unknown;
  onChange: (v: string) => void;
  hint?: string;
  minHeight?: number;
}) {
  const html = typeof value === 'string' ? value : '';
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef<string>(html);
  const savedRange = useRef<Range | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState(false);
  const [busy, setBusy] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  // Sync external value changes (e.g. record loaded) into the editor without clobbering the caret while typing.
  useEffect(() => {
    const el = editorRef.current;
    if (!el || source) return;
    if (html === lastEmitted.current && el.innerHTML) return;
    el.innerHTML = sanitizeHtml(html);
    lastEmitted.current = html;
  }, [html, source]);

  const emit = () => {
    const el = editorRef.current;
    if (!el) return;
    const next = el.innerHTML;
    lastEmitted.current = next;
    onChange(next);
  };

  const rememberSelection = () => {
    const sel = window.getSelection();
    const el = editorRef.current;
    if (sel && sel.rangeCount && el && el.contains(sel.anchorNode)) savedRange.current = sel.getRangeAt(0).cloneRange();
  };

  const restoreSelection = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const exec = (command: string, arg?: string) => {
    restoreSelection();
    document.execCommand(command, false, arg);
    emit();
  };

  const insertHtml = (fragment: string) => {
    restoreSelection();
    document.execCommand('insertHTML', false, fragment);
    emit();
  };

  const selectedText = () => window.getSelection()?.toString() ?? '';

  const addLink = (external: boolean) => {
    rememberSelection();
    const url = window.prompt(external ? 'External link URL (https://…)' : 'Internal page path (e.g. /packages)', external ? 'https://' : '/');
    if (!url || url === 'https://') return;
    const text = selectedText() || url;
    const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : '';
    insertHtml(`<a href="${escapeAttr(url)}"${attrs}>${text}</a>`);
  };

  const addInternalLink = (href: string, label: string) => {
    setInternalOpen(false);
    const text = selectedText() || label;
    insertHtml(`<a href="${escapeAttr(href)}">${text}</a>`);
  };

  const addImage = (file?: File) => {
    if (!file) {
      const url = window.prompt('Image URL');
      if (url) insertHtml(`<figure><img src="${escapeAttr(url)}" alt="" /></figure><p></p>`);
      return;
    }
    setBusy(true);
    uploadMedia(file, 'content')
      .then((url) => insertHtml(`<figure><img src="${escapeAttr(url)}" alt="${escapeAttr(file.name.replace(/\.[^.]+$/, ''))}" /></figure><p></p>`))
      .catch((err) => alert(err instanceof Error ? err.message : 'Upload failed'))
      .finally(() => setBusy(false));
  };

  const addVideo = (file?: File) => {
    if (!file) {
      const url = window.prompt('Video URL (YouTube, Vimeo or direct .mp4 link)');
      if (!url) return;
      const embed = youTubeEmbed(url);
      insertHtml(
        embed
          ? `<figure><iframe src="${embed}" allowfullscreen loading="lazy"></iframe></figure><p></p>`
          : `<figure><video src="${escapeAttr(url)}" controls preload="metadata"></video></figure><p></p>`
      );
      return;
    }
    setBusy(true);
    uploadMedia(file, 'content')
      .then((url) => insertHtml(`<figure><video src="${escapeAttr(url)}" controls preload="metadata"></video></figure><p></p>`))
      .catch((err) => alert(err instanceof Error ? err.message : 'Upload failed'))
      .finally(() => setBusy(false));
  };

  const addGallery = async (files: FileList) => {
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await uploadMedia(f, 'content'));
      insertHtml(`<div class="cms-gallery">${urls.map((u) => `<img src="${escapeAttr(u)}" alt="" />`).join('')}</div><p></p>`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    setBusy(false);
  };

  const addTable = () => {
    rememberSelection();
    const input = window.prompt('Table size as rows x columns (e.g. 3x3)', '3x3');
    const m = input?.match(/^(\d+)\s*[x×]\s*(\d+)$/i);
    if (!m) return;
    const rows = Math.min(Number(m[1]), 30);
    const cols = Math.min(Number(m[2]), 10);
    const head = `<tr>${Array.from({ length: cols }, (_, i) => `<th>Heading ${i + 1}</th>`).join('')}</tr>`;
    const body = Array.from({ length: Math.max(rows - 1, 1) }, () => `<tr>${Array.from({ length: cols }, () => '<td>&nbsp;</td>').join('')}</tr>`).join('');
    insertHtml(`<table><thead>${head}</thead><tbody>${body}</tbody></table><p></p>`);
  };

  const addCallout = (kind: 'info' | 'tip' | 'warning') => {
    const text = selectedText() || 'Write your note here…';
    insertHtml(`<div class="cms-callout cms-callout-${kind}"><strong>${kind === 'warning' ? 'Important' : kind === 'tip' ? 'Tip' : 'Note'}:</strong> ${text}</div><p></p>`);
  };

  const addFaq = () => {
    insertHtml('<details open><summary>Question?</summary><p>Answer goes here…</p></details><p></p>');
  };

  const block = (tag: string) => exec('formatBlock', tag);

  const tools: (ToolButton | 'sep')[] = [
    { icon: Undo2, title: 'Undo', action: () => exec('undo') },
    { icon: Redo2, title: 'Redo', action: () => exec('redo') },
    'sep',
    { icon: Bold, title: 'Bold', action: () => exec('bold') },
    { icon: Italic, title: 'Italic', action: () => exec('italic') },
    { icon: Underline, title: 'Underline', action: () => exec('underline') },
    { icon: RemoveFormatting, title: 'Clear formatting', action: () => exec('removeFormat') },
    'sep',
    { icon: List, title: 'Bulleted list', action: () => exec('insertUnorderedList') },
    { icon: ListOrdered, title: 'Numbered list', action: () => exec('insertOrderedList') },
    { icon: Quote, title: 'Quote', action: () => block('blockquote') },
    { icon: Minus, title: 'Divider', action: () => exec('insertHorizontalRule') },
    'sep',
    { icon: LinkIcon, title: 'External link', action: () => addLink(true) },
    { icon: ImageIcon, title: 'Image (upload)', action: () => { rememberSelection(); imageInput.current?.click(); } },
    { icon: Film, title: 'Video (upload)', action: () => { rememberSelection(); videoInput.current?.click(); } },
    { icon: Images, title: 'Gallery (upload several images)', action: () => { rememberSelection(); galleryInput.current?.click(); } },
    { icon: TableIcon, title: 'Table', action: addTable },
    { icon: Lightbulb, title: 'Callout box', action: () => { rememberSelection(); addCallout('tip'); } },
    { icon: HelpCircle, title: 'FAQ (expandable)', action: () => { rememberSelection(); addFaq(); } },
  ];

  const btn = 'p-2 rounded-lg hover:bg-white text-slate-600 hover:text-primary transition-colors disabled:opacity-40';

  return (
    <div>
      <FieldLabel label={label} hint={hint} />
      <div className="border border-slate-300 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/40">
        <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-slate-100 border-b border-slate-200">
          <select
            className="text-xs border border-slate-300 rounded-lg px-1.5 py-1.5 bg-white mr-1"
            defaultValue=""
            disabled={source}
            onMouseDown={rememberSelection}
            onChange={(e) => {
              if (e.target.value) block(e.target.value);
              e.target.value = '';
            }}
          >
            <option value="">Style…</option>
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>
          {tools.map((t, i) =>
            t === 'sep' ? (
              <span key={`s${i}`} className="w-px h-5 bg-slate-300 mx-1" />
            ) : (
              <button
                key={t.title}
                type="button"
                title={t.title}
                aria-label={t.title}
                disabled={source || busy}
                className={btn}
                onMouseDown={(e) => {
                  e.preventDefault();
                  rememberSelection();
                }}
                onClick={t.action}
              >
                <t.icon className="w-4 h-4" />
              </button>
            )
          )}
          <div className="relative">
            <button
              type="button"
              title="Internal link"
              aria-label="Internal link"
              disabled={source || busy}
              className={btn}
              onMouseDown={(e) => {
                e.preventDefault();
                rememberSelection();
              }}
              onClick={() => setInternalOpen((o) => !o)}
            >
              <Link2 className="w-4 h-4" />
            </button>
            {internalOpen && (
              <div className="absolute z-20 left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 max-h-64 overflow-auto">
                {INTERNAL_PAGES.map((p) => (
                  <button
                    key={p.href}
                    type="button"
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => addInternalLink(p.href, p.label)}
                  >
                    {p.label} <span className="text-xs text-slate-400">{p.href}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm text-primary hover:bg-slate-50 border-t border-slate-100"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setInternalOpen(false);
                    addLink(false);
                  }}
                >
                  Other page path…
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            title={source ? 'Back to visual editor' : 'Edit HTML source'}
            className={`${btn} ml-auto flex items-center gap-1 text-xs ${source ? 'bg-white text-primary' : ''}`}
            onClick={() => setSource((s) => !s)}
          >
            <Code2 className="w-4 h-4" /> {source ? 'Visual' : 'HTML'}
          </button>
          {busy && <span className="text-xs text-slate-500 px-2">Uploading…</span>}
        </div>

        {source ? (
          <textarea
            rows={12}
            className={`${inputClass} !border-0 !rounded-none font-mono text-xs focus:!ring-0`}
            value={html}
            onChange={(e) => {
              lastEmitted.current = e.target.value;
              onChange(e.target.value);
            }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            className="cms-rich px-4 py-3 outline-none overflow-auto"
            style={{ minHeight }}
            onInput={emit}
            onBlur={() => {
              rememberSelection();
              emit();
            }}
            onKeyUp={rememberSelection}
            onMouseUp={rememberSelection}
          />
        )}
      </div>

      <input ref={imageInput} type="file" accept="image/*" className="hidden" onChange={(e) => { addImage(e.target.files?.[0]); e.target.value = ''; }} />
      <input ref={videoInput} type="file" accept="video/*" className="hidden" onChange={(e) => { addVideo(e.target.files?.[0]); e.target.value = ''; }} />
      <input ref={galleryInput} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) void addGallery(e.target.files); e.target.value = ''; }} />
      <div className="flex gap-4 mt-1.5 text-xs">
        <button type="button" className="text-primary hover:underline" onClick={() => { rememberSelection(); addImage(); }}>
          + Image by URL
        </button>
        <button type="button" className="text-primary hover:underline" onClick={() => { rememberSelection(); addVideo(); }}>
          + Video / YouTube by URL
        </button>
        <button type="button" className="text-primary hover:underline" onClick={() => { rememberSelection(); addCallout('info'); }}>
          + Info callout
        </button>
        <button type="button" className="text-primary hover:underline" onClick={() => { rememberSelection(); addCallout('warning'); }}>
          + Warning callout
        </button>
      </div>
    </div>
  );
}

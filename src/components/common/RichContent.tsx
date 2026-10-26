/* eslint-disable react-refresh/only-export-components */
import { useMemo } from 'react';
import { sanitizeHtml } from '../../lib/sanitizeHtml';

const HAS_TAGS = /<\/?[a-z][\s\S]*>/i;

/** Plain-text values (legacy content) become paragraphs; HTML values are used as-is. */
export function toHtml(value: string | null | undefined): string {
  const text = (value ?? '').trim();
  if (!text) return '';
  if (HAS_TAGS.test(text)) return text;
  const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);
  return text
    .split(/\n{2,}/)
    .map((para) => `<p>${esc(para).replace(/\n/g, '<br />')}</p>`)
    .join('');
}

/** Renders CMS rich-text (HTML or legacy plain text) safely with the shared `.cms-rich` typography. */
export default function RichContent({ html, className = '' }: { html: string | null | undefined; className?: string }) {
  const clean = useMemo(() => sanitizeHtml(toHtml(html)), [html]);
  if (!clean) return null;
  return <div className={`cms-rich ${className}`} dangerouslySetInnerHTML={{ __html: clean }} />;
}

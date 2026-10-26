import { useEffect } from 'react';

type SeoInput = { title?: string | null; description?: string | null; image?: string | null };

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.dataset.cmsSeo = '1';
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Applies CMS-managed SEO title / description (and OG tags) for the current page and restores the
 * previous values on unmount. Does nothing when no values are provided.
 */
export function useSeo({ title, description, image }: SeoInput) {
  useEffect(() => {
    if (!title && !description) return;
    const prevTitle = document.title;
    const descEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.getAttribute('content') ?? null;

    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    }
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    }
    if (image) setMeta('meta[property="og:image"]', 'property', 'og:image', image);

    return () => {
      document.title = prevTitle;
      const el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (el && prevDesc !== null) el.setAttribute('content', prevDesc);
    };
  }, [title, description, image]);
}

/** Reads `{ seo: { title, description } }` (or seoTitle / seoDescription) from a CMS JSON blob. */
export function readSeo(blob: unknown): SeoInput {
  if (!blob || typeof blob !== 'object') return {};
  const b = blob as Record<string, unknown>;
  const seo = (b.seo && typeof b.seo === 'object' ? b.seo : {}) as Record<string, unknown>;
  const title = (seo.title ?? b.seoTitle) as string | undefined;
  const description = (seo.description ?? b.seoDescription) as string | undefined;
  return { title: title || undefined, description: description || undefined };
}

/**
 * Allow-list HTML sanitizer for CMS rich text (guide articles, overviews, FAQ answers…).
 * Dependency-free: parses with DOMParser and rebuilds only whitelisted tags / attributes.
 */

const ALLOWED_TAGS = new Set([
  'a', 'b', 'blockquote', 'br', 'caption', 'details', 'div', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'hr', 'i', 'iframe', 'img', 'li', 'ol', 'p', 'pre', 'code', 's', 'source', 'span', 'strong', 'sub', 'sup',
  'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul', 'video',
]);

const GLOBAL_ATTRS = new Set(['class', 'title', 'id']);
const TAG_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading']),
  video: new Set(['src', 'controls', 'poster', 'width', 'height', 'muted', 'loop', 'playsinline', 'preload']),
  source: new Set(['src', 'type']),
  iframe: new Set(['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan', 'scope']),
  details: new Set(['open']),
};

const ALLOWED_IFRAME_HOSTS = ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'];

/** Only classes the CMS editor produces are kept, so authors cannot inject arbitrary utility classes. */
const ALLOWED_CLASS = /^(cms-[a-z0-9-]+)$/;

function isSafeUrl(value: string, { allowDataImage = false } = {}): boolean {
  const v = value.trim();
  if (!v) return false;
  if (v.startsWith('/') || v.startsWith('#')) return true;
  if (allowDataImage && /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(v)) return true;
  try {
    const url = new URL(v, 'https://placeholder.invalid');
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function cleanNode(node: Node, doc: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) return doc.createTextNode(node.textContent ?? '');
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();

  if (!ALLOWED_TAGS.has(tag)) {
    // Drop dangerous containers entirely; unwrap unknown-but-harmless ones.
    if (['script', 'style', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'link', 'meta', 'svg', 'math'].includes(tag)) {
      return null;
    }
    const frag = doc.createDocumentFragment();
    el.childNodes.forEach((child) => {
      const cleaned = cleanNode(child, doc);
      if (cleaned) frag.appendChild(cleaned);
    });
    return frag;
  }

  const out = doc.createElement(tag);
  const tagAttrs = TAG_ATTRS[tag];

  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase();
    const val = attr.value;
    if (name.startsWith('on')) continue;

    if (name === 'class') {
      const classes = val.split(/\s+/).filter((c) => ALLOWED_CLASS.test(c));
      if (classes.length) out.setAttribute('class', classes.join(' '));
      continue;
    }
    if (!GLOBAL_ATTRS.has(name) && !tagAttrs?.has(name)) continue;

    if (name === 'href') {
      if (!isSafeUrl(val)) continue;
    } else if (name === 'src' || name === 'poster') {
      if (!isSafeUrl(val, { allowDataImage: tag === 'img' })) continue;
      if (tag === 'iframe') {
        try {
          const host = new URL(val, 'https://placeholder.invalid').hostname;
          if (!ALLOWED_IFRAME_HOSTS.includes(host)) continue;
        } catch {
          continue;
        }
      }
    }
    out.setAttribute(name, val);
  }

  if (tag === 'iframe' && !out.getAttribute('src')) return null;
  if (tag === 'a' && out.getAttribute('target') === '_blank') out.setAttribute('rel', 'noopener noreferrer');

  el.childNodes.forEach((child) => {
    const cleaned = cleanNode(child, doc);
    if (cleaned) out.appendChild(cleaned);
  });
  return out;
}

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  if (typeof DOMParser === 'undefined') {
    // SSR / non-browser fallback: escape everything.
    return html.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
  }
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const container = doc.createElement('div');
  doc.body.childNodes.forEach((child) => {
    const cleaned = cleanNode(child, doc);
    if (cleaned) container.appendChild(cleaned);
  });
  return container.innerHTML;
}

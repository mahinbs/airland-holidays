/**
 * Google Map embed. Uses the CMS-provided embed URL when present; otherwise falls back to a keyless
 * `maps?q=<place>&output=embed` view so every package / contact page can show a map without an API key.
 */
function resolveSrc(src?: string, query?: string): string | null {
  const direct = (src ?? '').trim();
  if (direct) {
    // Accept a pasted <iframe ...> snippet as well as a bare URL.
    const m = direct.match(/src="([^"]+)"/);
    return m ? m[1] : direct;
  }
  const q = (query ?? '').trim();
  return q ? `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed` : null;
}

export default function MapEmbed({
  src,
  query,
  title = 'Location map',
  heightClass = 'h-72 md:h-96',
  className = '',
}: {
  src?: string;
  query?: string;
  title?: string;
  heightClass?: string;
  className?: string;
}) {
  const url = resolveSrc(src, query);
  if (!url) return null;
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm ${className}`}>
      <iframe
        title={title}
        src={url}
        className={`w-full ${heightClass}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

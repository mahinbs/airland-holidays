const KEY = 'airland_cms_preview';

/**
 * Preview mode lets signed-in admins see draft content on the public site.
 * Activated by `?preview=1` (set by the CMS "Save & Preview" button) and remembered for this browser tab only.
 * The database still decides what is returned — visitors without admin access only ever receive published rows.
 */
export function isPreviewMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const param = new URLSearchParams(window.location.search).get('preview');
    if (param === '1') sessionStorage.setItem(KEY, '1');
    if (param === '0') sessionStorage.removeItem(KEY);
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function exitPreviewMode() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('preview');
  window.location.replace(url.toString());
}

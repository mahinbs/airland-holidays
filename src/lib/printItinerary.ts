export type PrintableDay = { label: string; title: string; description: string; activities?: string[] };

export type PrintableItinerary = {
  title: string;
  subtitle?: string;
  days: PrintableDay[];
  inclusions?: string[];
  exclusions?: string[];
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
const plain = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Opens a clean, print-ready itinerary in a new window and triggers the browser print dialog
 * (choose "Save as PDF"). Dependency-free; content comes from the CMS data already on the page.
 */
export function printItinerary(data: PrintableItinerary): boolean {
  const win = window.open('', '_blank', 'width=900,height=1000');
  if (!win) return false;

  const list = (items: string[] | undefined, heading: string) =>
    items?.length ? `<h2>${esc(heading)}</h2><ul>${items.map((i) => `<li>${esc(plain(i))}</li>`).join('')}</ul>` : '';

  win.document.write(`<!doctype html><html><head><meta charset="utf-8" /><title>${esc(data.title)} — Itinerary</title>
<style>
  body{font-family:Georgia,'Times New Roman',serif;color:#1e293b;max-width:760px;margin:32px auto;padding:0 24px;line-height:1.55}
  header{border-bottom:3px solid #B8965A;padding-bottom:12px;margin-bottom:24px}
  h1{color:#0B3C49;margin:0 0 4px;font-size:26px}
  .sub{color:#64748b;margin:0}
  .brand{color:#B8965A;font-size:12px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:8px}
  .day{page-break-inside:avoid;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;margin-bottom:14px}
  .day h3{margin:0 0 6px;color:#0B3C49;font-size:17px}
  .day .label{display:inline-block;background:#0B3C49;color:#fff;border-radius:999px;padding:2px 10px;font-size:12px;margin-right:8px;font-family:Arial,sans-serif}
  .day p{margin:0 0 6px}
  .day ul{margin:4px 0 0;padding-left:20px;color:#475569;font-size:14px}
  h2{color:#0B3C49;font-size:19px;margin-top:26px}
  ul{padding-left:22px}
  footer{margin-top:32px;border-top:1px solid #e2e8f0;padding-top:10px;color:#94a3b8;font-size:12px}
  @media print{body{margin:0}}
</style></head><body>
<header><div class="brand">Airland Holidays</div><h1>${esc(data.title)}</h1>${data.subtitle ? `<p class="sub">${esc(data.subtitle)}</p>` : ''}</header>
${data.days
  .map(
    (d) => `<div class="day"><h3><span class="label">${esc(d.label)}</span>${esc(d.title)}</h3>${d.description ? `<p>${esc(plain(d.description))}</p>` : ''}${
      d.activities?.length ? `<ul>${d.activities.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''
    }</div>`
  )
  .join('')}
${list(data.inclusions, 'Inclusions')}${list(data.exclusions, 'Exclusions')}
<footer>Generated from airlandholidays.com — itinerary and prices are subject to change. Contact our team to confirm.</footer>
<script>window.addEventListener('load',function(){setTimeout(function(){window.focus();window.print();},300);});</script>
</body></html>`);
  win.document.close();
  return true;
}

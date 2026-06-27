import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Phone,
  Menu,
  Info,
} from 'lucide-react';
import {
  fetchSiteSetting,
  upsertSiteSetting,
  fetchSingleton,
  upsertSingleton,
} from '../../services/content';
import { headerConfig as defaultHeaderConfig } from '../../data/paymentConfig';
import { navStructure as defaultNavStructure } from '../../data/navConfig';
import type {
  HeaderConfig,
  NavItem,
  NavLink,
  MegaTab,
  MegaColumn,
} from '../../types/nav';

type Tab = 'utility' | 'navigation';

export default function AdminHeaderNav() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>('utility');
  const [header, setHeader] = useState<HeaderConfig>(defaultHeaderConfig);
  const [nav, setNav] = useState<NavItem[]>(defaultNavStructure as NavItem[]);
  const [navRowId, setNavRowId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedNav, setExpandedNav] = useState<Record<number, boolean>>({ 0: true });
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetchSiteSetting<HeaderConfig>('header_config'),
      fetchSingleton<{ id: string; structure: unknown }>('nav_config'),
    ]).then(([head, navRow]) => {
      setHeader({ ...defaultHeaderConfig, ...(head ?? {}) });
      if (navRow?.structure && Array.isArray(navRow.structure)) {
        setNav(navRow.structure as NavItem[]);
      } else {
        setNav(defaultNavStructure as NavItem[]);
      }
      if (navRow?.id) setNavRowId(navRow.id);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await upsertSiteSetting('header_config', header);
      if (navRowId) {
        await upsertSingleton('nav_config', { structure: nav }, navRowId);
      } else {
        await upsertSingleton('nav_config', { structure: nav });
        const row = await fetchSingleton<{ id: string }>('nav_config');
        if (row?.id) setNavRowId(row.id);
      }
      await qc.invalidateQueries({ queryKey: ['site_setting', 'header_config'] });
      await qc.invalidateQueries({ queryKey: ['nav_config'] });
      setMessage({ type: 'ok', text: 'Header and navigation saved. Changes appear on the live site immediately.' });
    } catch (e) {
      setMessage({ type: 'err', text: e instanceof Error ? e.message : 'Failed to save' });
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-white rounded-xl" />;
  }

  const tabs: { id: Tab; label: string; icon: typeof Phone }[] = [
    { id: 'utility', label: 'Utility Bar & CTAs', icon: Phone },
    { id: 'navigation', label: 'Navigation Menu', icon: Menu },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Header & Navigation</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage the top utility bar, menu links, dropdowns, and Holidays mega menu.
          </p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2 disabled:opacity-50 shrink-0">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm ${
            message.type === 'ok' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === t.id ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'utility' && <UtilityBarEditor header={header} onChange={setHeader} />}
      {activeTab === 'navigation' && (
        <NavigationEditor
          nav={nav}
          onChange={setNav}
          expanded={expandedNav}
          setExpanded={setExpandedNav}
        />
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none';

function UtilityBarEditor({ header, onChange }: { header: HeaderConfig; onChange: (h: HeaderConfig) => void }) {
  const update = (patch: Partial<HeaderConfig>) => onChange({ ...header, ...patch });

  const updateMarquee = (index: number, value: string) => {
    const items = [...header.marqueeItems];
    items[index] = value;
    update({ marqueeItems: items });
  };

  const updateSocial = (index: number, patch: Partial<{ platform: string; href: string }>) => {
    const socials = header.socials.map((s, i) => (i === index ? { ...s, ...patch } : s));
    update({ socials });
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="font-bold text-slate-900 mb-4">Contact & Social</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Phone Number">
            <input className={inputClass} value={header.phone} onChange={(e) => update({ phone: e.target.value })} />
          </Field>
          <Field label="WhatsApp Number (digits only, no +)">
            <input className={inputClass} value={header.whatsapp} onChange={(e) => update({ whatsapp: e.target.value })} />
          </Field>
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Social Links</p>
          {header.socials.map((social, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
              <input
                className={inputClass}
                placeholder="Platform"
                value={social.platform}
                onChange={(e) => updateSocial(i, { platform: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="URL"
                value={social.href}
                onChange={(e) => updateSocial(i, { href: e.target.value })}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900">Marquee Announcements</h2>
          <button
            type="button"
            onClick={() => update({ marqueeItems: [...header.marqueeItems, ''] })}
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add line
          </button>
        </div>
        <div className="space-y-2">
          {header.marqueeItems.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputClass}
                value={item}
                onChange={(e) => updateMarquee(i, e.target.value)}
                placeholder="e.g. ✈ 10,000+ Visas Processed"
              />
              <button
                type="button"
                onClick={() => update({ marqueeItems: header.marqueeItems.filter((_, j) => j !== i) })}
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl shrink-0"
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={header.marqueeSettings?.enabled !== false} onChange={(e) => update({ marqueeSettings: { ...header.marqueeSettings, enabled: e.target.checked, autoScroll: header.marqueeSettings?.autoScroll ?? true, scrollSpeed: header.marqueeSettings?.scrollSpeed ?? 30, pauseOnHover: header.marqueeSettings?.pauseOnHover ?? true } })} />
            Enable Marquee
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={header.marqueeSettings?.autoScroll !== false} onChange={(e) => update({ marqueeSettings: { enabled: header.marqueeSettings?.enabled ?? true, autoScroll: e.target.checked, scrollSpeed: header.marqueeSettings?.scrollSpeed ?? 30, pauseOnHover: header.marqueeSettings?.pauseOnHover ?? true } })} />
            Auto Scroll
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={header.marqueeSettings?.pauseOnHover !== false} onChange={(e) => update({ marqueeSettings: { enabled: header.marqueeSettings?.enabled ?? true, autoScroll: header.marqueeSettings?.autoScroll ?? true, scrollSpeed: header.marqueeSettings?.scrollSpeed ?? 30, pauseOnHover: e.target.checked } })} />
            Pause On Hover
          </label>
          <Field label="Scroll Speed (seconds)">
            <input type="number" className={inputClass} value={header.marqueeSettings?.scrollSpeed ?? 30} onChange={(e) => update({ marqueeSettings: { enabled: header.marqueeSettings?.enabled ?? true, autoScroll: header.marqueeSettings?.autoScroll ?? true, scrollSpeed: Number(e.target.value), pauseOnHover: header.marqueeSettings?.pauseOnHover ?? true } })} />
          </Field>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="font-bold text-slate-900 mb-4">Header Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Pay Now — Label">
            <input className={inputClass} value={header.payNowLabel ?? ''} onChange={(e) => update({ payNowLabel: e.target.value })} />
          </Field>
          <Field label="Pay Now — Link">
            <input className={inputClass} value={header.payNowHref ?? ''} onChange={(e) => update({ payNowHref: e.target.value })} />
          </Field>
          <Field label="Enquire Now — Label">
            <input className={inputClass} value={header.enquireLabel ?? ''} onChange={(e) => update({ enquireLabel: e.target.value })} />
          </Field>
          <Field label="Enquire Now — Link">
            <input className={inputClass} value={header.enquireHref ?? ''} onChange={(e) => update({ enquireHref: e.target.value })} />
          </Field>
        </div>
      </section>
    </div>
  );
}

function NavigationEditor({
  nav,
  onChange,
  expanded,
  setExpanded,
}: {
  nav: NavItem[];
  onChange: (n: NavItem[]) => void;
  expanded: Record<number, boolean>;
  setExpanded: (e: Record<number, boolean>) => void;
}) {
  const move = (index: number, dir: -1 | 1) => {
    const next = [...nav];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index: number) => {
    if (!confirm('Remove this menu item?')) return;
    onChange(nav.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, item: NavItem) => {
    onChange(nav.map((n, i) => (i === index ? item : n)));
  };

  const addItem = (type: NavItem['type']) => {
    const base = { label: 'New Item' };
    if (type === 'link') onChange([...nav, { ...base, type: 'link', href: '/' }]);
    else if (type === 'dropdown') onChange([...nav, { ...base, type: 'dropdown', items: [{ label: 'Sub link', href: '/' }] }]);
    else onChange([...nav, { ...base, type: 'mega', tabs: [], quickLinks: [] }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-900">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          <strong>Services dropdown:</strong> links are automatically synced from published Services in the CMS.
          Other menu items below are fully editable here.
        </p>
      </div>

      {nav.map((item, index) => (
        <div key={`${item.label}-${index}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setExpanded({ ...expanded, [index]: !expanded[index] })}
              className="p-1 hover:bg-slate-200 rounded-lg"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${expanded[index] ? 'rotate-90' : ''}`} />
            </button>
            <span className="font-semibold text-slate-900 flex-1">{item.label}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 uppercase">{item.type}</span>
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg disabled:opacity-30">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === nav.length - 1} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg disabled:opacity-30">
              <ChevronDown className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => remove(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {expanded[index] && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Menu Label">
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) => updateItem(index, { ...item, label: e.target.value } as NavItem)}
                  />
                </Field>
                <Field label="Type">
                  <select
                    className={inputClass}
                    value={item.type}
                    onChange={(e) => {
                      const type = e.target.value as NavItem['type'];
                      if (type === 'link') updateItem(index, { label: item.label, type: 'link', href: '/' });
                      else if (type === 'dropdown') updateItem(index, { label: item.label, type: 'dropdown', items: [] });
                      else updateItem(index, { label: item.label, type: 'mega', tabs: [], quickLinks: [] });
                    }}
                  >
                    <option value="link">Simple Link</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="mega">Mega Menu (Holidays)</option>
                  </select>
                </Field>
              </div>

              {item.type === 'link' && (
                <Field label="Link URL">
                  <input
                    className={inputClass}
                    value={item.href}
                    onChange={(e) => updateItem(index, { ...item, href: e.target.value })}
                  />
                </Field>
              )}

              {item.type === 'dropdown' && (
                <DropdownEditor
                  items={item.items}
                  onChange={(items) => updateItem(index, { ...item, items })}
                  readOnlyNote={item.label === 'Services'}
                />
              )}

              {item.type === 'mega' && (
                <MegaMenuEditor
                  tabs={item.tabs}
                  quickLinks={item.quickLinks}
                  onChange={(tabs, quickLinks) => updateItem(index, { ...item, tabs, quickLinks })}
                />
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-2 pt-2">
        <button type="button" onClick={() => addItem('link')} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50">
          + Link
        </button>
        <button type="button" onClick={() => addItem('dropdown')} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50">
          + Dropdown
        </button>
        <button type="button" onClick={() => addItem('mega')} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50">
          + Mega Menu
        </button>
      </div>
    </div>
  );
}

function DropdownEditor({
  items,
  onChange,
  readOnlyNote,
}: {
  items: NavLink[];
  onChange: (items: NavLink[]) => void;
  readOnlyNote?: boolean;
}) {
  if (readOnlyNote) {
    return (
      <p className="text-sm text-slate-500 italic">
        This dropdown is managed automatically from Admin → Services. Add or edit services there.
      </p>
    );
  }

  const update = (i: number, patch: Partial<NavLink>) => {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Dropdown Links</p>
      {items.map((sub, i) => (
        <div key={i} className="flex gap-2">
          <input className={inputClass} placeholder="Label" value={sub.label} onChange={(e) => update(i, { label: e.target.value })} />
          <input className={inputClass} placeholder="/path" value={sub.href} onChange={(e) => update(i, { href: e.target.value })} />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { label: 'New link', href: '/' }])} className="text-sm text-primary font-medium flex items-center gap-1">
        <Plus className="w-4 h-4" /> Add link
      </button>
    </div>
  );
}

function MegaMenuEditor({
  tabs,
  quickLinks,
  onChange,
}: {
  tabs: MegaTab[];
  quickLinks: NavLink[];
  onChange: (tabs: MegaTab[], quickLinks: NavLink[]) => void;
}) {
  const updateTab = (ti: number, tab: MegaTab) => {
    onChange(tabs.map((t, i) => (i === ti ? tab : t)), quickLinks);
  };

  const updateQuickLink = (i: number, patch: Partial<NavLink>) => {
    onChange(tabs, quickLinks.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Quick Links (bottom bar)</p>
          <button
            type="button"
            onClick={() => onChange(tabs, [...quickLinks, { label: 'New link', href: '/' }])}
            className="text-sm text-primary font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {quickLinks.map((q, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={inputClass} placeholder="Label" value={q.label} onChange={(e) => updateQuickLink(i, { label: e.target.value })} />
            <input className={inputClass} placeholder="/path" value={q.href} onChange={(e) => updateQuickLink(i, { href: e.target.value })} />
            <button type="button" onClick={() => onChange(tabs, quickLinks.filter((_, j) => j !== i))} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Tabs (International / India / Honeymoon)</p>
          <button
            type="button"
            onClick={() =>
              onChange(
                [...tabs, { id: `tab-${tabs.length + 1}`, label: 'New Tab', columns: [{ heading: 'Region', destinations: [] }] }],
                quickLinks
              )
            }
            className="text-sm text-primary font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add tab
          </button>
        </div>

        {tabs.map((tab, ti) => (
          <div key={ti} className="border border-slate-200 rounded-xl p-4 mb-4 bg-slate-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <Field label="Tab ID (international, india, honeymoon)">
                <input className={inputClass} value={tab.id} onChange={(e) => updateTab(ti, { ...tab, id: e.target.value })} />
              </Field>
              <Field label="Tab Label">
                <input className={inputClass} value={tab.label} onChange={(e) => updateTab(ti, { ...tab, label: e.target.value })} />
              </Field>
            </div>

            {tab.promoImage && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-white rounded-xl border border-slate-100">
                <p className="sm:col-span-2 text-xs font-semibold text-slate-600 uppercase">Promo Card</p>
                <input className={inputClass} placeholder="Image URL" value={tab.promoImage.src} onChange={(e) => updateTab(ti, { ...tab, promoImage: { ...tab.promoImage!, src: e.target.value } })} />
                <input className={inputClass} placeholder="Title" value={tab.promoImage.label} onChange={(e) => updateTab(ti, { ...tab, promoImage: { ...tab.promoImage!, label: e.target.value } })} />
                <input className={inputClass} placeholder="Subtitle" value={tab.promoImage.sub} onChange={(e) => updateTab(ti, { ...tab, promoImage: { ...tab.promoImage!, sub: e.target.value } })} />
                <input className={inputClass} placeholder="Button text" value={tab.promoImage.cta} onChange={(e) => updateTab(ti, { ...tab, promoImage: { ...tab.promoImage!, cta: e.target.value } })} />
                <input className={inputClass} placeholder="Button link" value={tab.promoImage.href} onChange={(e) => updateTab(ti, { ...tab, promoImage: { ...tab.promoImage!, href: e.target.value } })} />
              </div>
            )}
            {!tab.promoImage && (
              <button
                type="button"
                onClick={() =>
                  updateTab(ti, {
                    ...tab,
                    promoImage: { src: '', label: '', sub: '', cta: 'View All', href: '/packages' },
                  })
                }
                className="text-sm text-primary mb-3 hover:underline"
              >
                + Add promo card
              </button>
            )}

            <ColumnEditor
              columns={tab.columns}
              onChange={(columns) => updateTab(ti, { ...tab, columns })}
            />

            <button type="button" onClick={() => onChange(tabs.filter((_, j) => j !== ti), quickLinks)} className="mt-3 text-sm text-red-600 hover:underline">
              Remove tab
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColumnEditor({
  columns,
  onChange,
}: {
  columns: MegaColumn[];
  onChange: (columns: MegaColumn[]) => void;
}) {
  const updateCol = (ci: number, col: MegaColumn) => {
    onChange(columns.map((c, i) => (i === ci ? col : c)));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Destination Columns</p>
        <button
          type="button"
          onClick={() => onChange([...columns, { heading: 'New Region', destinations: [] }])}
          className="text-sm text-primary font-medium flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add column
        </button>
      </div>
      {columns.map((col, ci) => (
        <div key={ci} className="p-3 bg-white rounded-xl border border-slate-100">
          <input
            className={`${inputClass} mb-2`}
            placeholder="Column heading (e.g. Asia)"
            value={col.heading}
            onChange={(e) => updateCol(ci, { ...col, heading: e.target.value })}
          />
          <textarea
            className={`${inputClass} font-mono text-xs min-h-[100px]`}
            placeholder="One destination per line"
            value={col.destinations.join('\n')}
            onChange={(e) =>
              updateCol(ci, {
                ...col,
                destinations: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
          />
          <button type="button" onClick={() => onChange(columns.filter((_, j) => j !== ci))} className="mt-2 text-xs text-red-600 hover:underline">
            Remove column
          </button>
        </div>
      ))}
    </div>
  );
}

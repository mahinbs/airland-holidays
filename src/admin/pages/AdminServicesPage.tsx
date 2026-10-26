import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2, Search, Upload } from 'lucide-react';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { defaultServicesPageConfig } from '../../data/defaultCmsContent';
import type { ServicesPageConfig } from '../../types/cms';
import RepeatableField from '../components/fields/RepeatableField';
import { inputClass, moveItem, ReorderButtons, Toggle, useSortable } from '../components/fields/shared';
import { uploadMedia } from '../../services/storage';

type Tab = 'hero' | 'trust' | 'promos' | 'partners';
type Promo = ServicesPageConfig['promoBanners'][number];
type Partner = ServicesPageConfig['partnerLogos'][number];

const TRUST_ICONS = ['Award', 'Clock', 'Users', 'Globe', 'Handshake', 'Star', 'ShieldCheck', 'Trophy', 'Heart', 'Plane', 'MapPin', 'Headphones', 'Sparkles', 'TrendingUp'];
const PARTNER_CATEGORIES: { value: Partner['category']; label: string }[] = [
  { value: 'airline', label: 'Airline' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'resort', label: 'Resort' },
  { value: 'insurance', label: 'Insurance' },
];
const PROMO_CATEGORIES: { value: NonNullable<Promo['category']>; label: string }[] = [
  { value: 'airline', label: 'Airline promotion' },
  { value: 'resort', label: 'Resort promotion' },
  { value: 'hotel', label: 'Hotel promotion' },
  { value: 'insurance', label: 'Insurance promotion' },
];

const nameFromFile = (file: File) =>
  file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function AdminServicesPage() {
  const qc = useQueryClient();
  const [config, setConfig] = useState<ServicesPageConfig>(defaultServicesPageConfig);
  const [tab, setTab] = useState<Tab>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    fetchSiteSetting<ServicesPageConfig>('services_page_config').then((data) => {
      if (data) {
        setConfig({
          ...defaultServicesPageConfig,
          ...data,
          hero: { ...defaultServicesPageConfig.hero, ...data.hero },
          trustStats: data.trustStats?.length ? data.trustStats : defaultServicesPageConfig.trustStats,
          promoBanners: data.promoBanners ?? [],
          partnerLogos: data.partnerLogos ?? [],
        });
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await upsertSiteSetting('services_page_config', config);
      await qc.invalidateQueries({ queryKey: ['site_setting', 'services_page_config'] });
      setMessage({ type: 'ok', text: 'Services page saved. Changes are live on the website.' });
    } catch (e) {
      setMessage({ type: 'err', text: e instanceof Error ? e.message : 'Failed to save' });
    }
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'trust', label: 'Trust Statistics' },
    { id: 'promos', label: 'Promotional Banners' },
    { id: 'partners', label: 'Partner Logos' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services Page</h1>
          <p className="text-slate-500 text-sm mt-1">Hero, trust stats, promotional banners and partner logos.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2 disabled:opacity-50"><Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}</button>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm border ${message.type === 'ok' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>{message.text}</div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t.id ? 'bg-primary text-white' : 'bg-white border border-slate-200'}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {tab === 'hero' && (
          <>
            <label className="block text-sm font-medium">Hero Title<input className={inputClass} value={config.hero.heading} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, heading: e.target.value } })} /></label>
            <label className="block text-sm font-medium">Description<textarea className={inputClass} rows={2} value={config.hero.subtext} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtext: e.target.value } })} /></label>
            <label className="block text-sm font-medium">Background Image
              <input className={inputClass} value={config.hero.image} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, image: e.target.value } })} />
              <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setConfig({ ...config, hero: { ...config.hero, image: await uploadMedia(f) } }); }} />
              {config.hero.image && <img src={config.hero.image} alt="" className="h-20 rounded-lg object-cover mt-2" />}
            </label>
            <label className="block text-sm font-medium">Background Video (optional — replaces the image)
              <input className={inputClass} value={config.hero.videoUrl ?? ''} placeholder="https://…/video.mp4" onChange={(e) => setConfig({ ...config, hero: { ...config.hero, videoUrl: e.target.value || null } })} />
              <input type="file" accept="video/*" className="text-xs mt-1" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setConfig({ ...config, hero: { ...config.hero, videoUrl: await uploadMedia(f, 'videos') } }); }} />
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block text-sm font-medium">Primary CTA Label<input className={inputClass} value={config.hero.primaryCta.label} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCta: { ...config.hero.primaryCta, label: e.target.value } } })} /></label>
              <label className="block text-sm font-medium">Primary CTA Link<input className={inputClass} value={config.hero.primaryCta.href} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCta: { ...config.hero.primaryCta, href: e.target.value } } })} /></label>
              <label className="block text-sm font-medium">Secondary CTA Label<input className={inputClass} value={config.hero.secondaryCta?.label ?? ''} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, secondaryCta: { ...config.hero.secondaryCta, label: e.target.value } } })} /></label>
              <label className="block text-sm font-medium">Secondary CTA Link<input className={inputClass} value={config.hero.secondaryCta?.href ?? ''} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, secondaryCta: { ...config.hero.secondaryCta, href: e.target.value } } })} /></label>
            </div>
          </>
        )}

        {tab === 'trust' && (
          <RepeatableField
            label="Trust Statistics"
            value={config.trustStats}
            withEnabled
            onChange={(v) => setConfig({ ...config, trustStats: v as ServicesPageConfig['trustStats'] })}
            columns={[
              { key: 'icon', label: 'Icon', type: 'select', options: TRUST_ICONS.map((n) => ({ value: n, label: n })) },
              { key: 'value', label: 'Value (e.g. 20,000+ — Happy Customers)' },
              { key: 'label', label: 'Label' },
              { key: 'numeric', label: 'Animated counter', type: 'boolean' },
              { key: 'target', label: 'Counter target number', type: 'number' },
            ]}
          />
        )}

        {tab === 'promos' && <PromoEditor banners={config.promoBanners} onChange={(promoBanners) => setConfig({ ...config, promoBanners })} />}

        {tab === 'partners' && <PartnerEditor logos={config.partnerLogos} onChange={(partnerLogos) => setConfig({ ...config, partnerLogos })} />}
      </div>
    </div>
  );
}

function PromoEditor({ banners, onChange }: { banners: Promo[]; onChange: (b: Promo[]) => void }) {
  const sortable = useSortable(banners, onChange);
  const patch = (i: number, p: Partial<Promo>) => onChange(banners.map((b, idx) => (idx === i ? { ...b, ...p } : b)));

  return (
    <>
      <p className="text-xs text-slate-400">These banners rotate above the Quick Enquiry form on the Services page. Drag to change the order.</p>
      {banners.map((banner, i) => (
        <div key={i} {...sortable.rowProps(i)} className={`flex gap-2 p-4 border border-slate-200 rounded-xl ${banner.enabled ? '' : 'opacity-60'} ${sortable.rowClass(i)}`}>
          <ReorderButtons index={i} total={banners.length} onMove={(f, t) => onChange(moveItem(banners, f, t))} handleProps={sortable.handleProps(i)} />
          <div className="flex-1 grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Promotion type</label>
              <select className={inputClass} value={banner.category ?? 'airline'} onChange={(e) => patch(i, { category: e.target.value as Promo['category'] })}>
                {PROMO_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500">Banner Title</label>
              <input className={inputClass} value={banner.title} placeholder="Title" onChange={(e) => patch(i, { title: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Banner Description</label>
              <textarea className={inputClass} rows={2} value={banner.description} placeholder="Description" onChange={(e) => patch(i, { description: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-slate-500">CTA Button Label</label>
              <input className={inputClass} value={banner.ctaLabel} placeholder="Enquire" onChange={(e) => patch(i, { ctaLabel: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-slate-500">CTA Button Link</label>
              <input className={inputClass} value={banner.ctaHref} placeholder="/contact" onChange={(e) => patch(i, { ctaHref: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Banner Image</label>
              <input className={inputClass} value={banner.image} placeholder="Image URL" onChange={(e) => patch(i, { image: e.target.value })} />
              <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => {
                const f = e.target.files?.[0]; if (!f) return;
                patch(i, { image: await uploadMedia(f, 'banners') });
              }} />
              {banner.image && <img src={banner.image} alt="" className="h-20 rounded-lg object-cover mt-1" />}
            </div>
            <div className="md:col-span-2">
              <Toggle checked={banner.enabled} onChange={(v) => patch(i, { enabled: v })} label={banner.enabled ? 'Enabled' : 'Disabled'} />
            </div>
          </div>
          <button type="button" onClick={() => onChange(banners.filter((_, idx) => idx !== i))} className="text-red-500 self-start p-1.5" aria-label="Remove banner"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button type="button" className="text-sm text-primary flex items-center gap-1" onClick={() => onChange([...banners, { title: '', description: '', image: '', ctaLabel: 'Enquire', ctaHref: '/contact', enabled: true, category: 'airline' }])}><Plus className="w-4 h-4" /> Add Banner</button>
    </>
  );
}

function PartnerEditor({ logos, onChange }: { logos: Partner[]; onChange: (l: Partner[]) => void }) {
  const [category, setCategory] = useState<'all' | Partner['category']>('all');
  const [search, setSearch] = useState('');
  const [uploadCategory, setUploadCategory] = useState<Partner['category']>('airline');
  const [uploading, setUploading] = useState(false);
  const sortable = useSortable(logos, onChange);
  const filtering = category !== 'all' || Boolean(search.trim());

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return logos
      .map((logo, index) => ({ logo, index }))
      .filter(({ logo }) => (category === 'all' || logo.category === category) && (!term || logo.name.toLowerCase().includes(term)));
  }, [logos, category, search]);

  const patch = (i: number, p: Partial<Partner>) => onChange(logos.map((l, idx) => (idx === i ? { ...l, ...p } : l)));

  const bulkUpload = async (files: FileList) => {
    setUploading(true);
    try {
      const added: Partner[] = [];
      for (const file of Array.from(files)) {
        added.push({ name: nameFromFile(file), image: await uploadMedia(file, 'partners'), category: uploadCategory, enabled: true });
      }
      onChange([...logos, ...added]);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    setUploading(false);
  };

  const counts = (c: Partner['category']) => logos.filter((l) => l.category === c).length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input className={`${inputClass} pl-9`} placeholder="Search partners…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
          {([{ value: 'all', label: `All (${logos.length})` }, ...PARTNER_CATEGORIES.map((c) => ({ value: c.value, label: `${c.label} (${counts(c.value)})` }))] as { value: 'all' | Partner['category']; label: string }[]).map((c) => (
            <button key={c.value} type="button" onClick={() => setCategory(c.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${category === c.value ? 'bg-primary text-white' : 'text-slate-600 hover:bg-white'}`}>{c.label}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <Upload className="w-4 h-4 text-primary" />
        <span className="text-sm text-slate-600">Bulk add logos as</span>
        <select className={`${inputClass} !w-auto`} value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value as Partner['category'])}>
          {PARTNER_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <label className="text-sm text-primary hover:underline cursor-pointer">
          {uploading ? 'Uploading…' : 'Choose multiple images'}
          <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => { if (e.target.files?.length) void bulkUpload(e.target.files); e.target.value = ''; }} />
        </label>
        <span className="text-xs text-slate-400">Names are taken from the file names — edit them below.</span>
      </div>
      {filtering && <p className="text-xs text-slate-400">Clear the search and category filter to drag-reorder.</p>}

      {visible.map(({ logo: partner, index: i }) => (
        <div key={i} {...(filtering ? {} : sortable.rowProps(i))} className={`flex gap-3 items-center p-3 border border-slate-200 rounded-xl ${partner.enabled ? '' : 'opacity-60'} ${filtering ? '' : sortable.rowClass(i)}`}>
          <ReorderButtons index={i} total={logos.length} onMove={(f, t) => onChange(moveItem(logos, f, t))} handleProps={filtering ? undefined : sortable.handleProps(i)} />
          <div className="w-24 h-14 shrink-0 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center p-1.5">
            {partner.image ? <img src={partner.image} alt={partner.name} className="max-h-full max-w-full object-contain" /> : <span className="text-[10px] text-slate-400">No logo</span>}
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-2 min-w-0">
            <input className={inputClass} value={partner.name} placeholder="Partner name" onChange={(e) => patch(i, { name: e.target.value })} />
            <select className={inputClass} value={partner.category} onChange={(e) => patch(i, { category: e.target.value as Partner['category'] })}>
              {PARTNER_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input className={inputClass} value={partner.image} placeholder="Logo image URL" onChange={(e) => patch(i, { image: e.target.value })} />
            <input type="file" accept="image/*" className="text-xs self-center" onChange={async (e) => { const f = e.target.files?.[0]; if (f) patch(i, { image: await uploadMedia(f, 'partners') }); }} />
          </div>
          <Toggle checked={partner.enabled} onChange={(v) => patch(i, { enabled: v })} label={partner.enabled ? 'Show' : 'Hidden'} />
          <button type="button" onClick={() => onChange(logos.filter((_, idx) => idx !== i))} className="text-red-500 p-1.5" aria-label="Remove partner"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      {visible.length === 0 && <p className="text-sm text-slate-400 py-6 text-center">{logos.length === 0 ? 'No partner logos yet — the built-in logos are shown on the website until you add some.' : 'No partners match your filters.'}</p>}
      <button type="button" className="text-sm text-primary flex items-center gap-1" onClick={() => onChange([...logos, { name: '', image: '', category: category === 'all' ? 'airline' : category, enabled: true }])}><Plus className="w-4 h-4" /> Add Partner Logo</button>
    </>
  );
}

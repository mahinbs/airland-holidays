import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2 } from 'lucide-react';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { defaultServicesPageConfig } from '../../data/defaultCmsContent';
import type { ServicesPageConfig } from '../../types/cms';
import { inputClass, moveItem, ReorderButtons } from '../components/fields/shared';
import { uploadMedia } from '../../services/storage';

type Tab = 'hero' | 'trust' | 'promos' | 'partners';

export default function AdminServicesPage() {
  const qc = useQueryClient();
  const [config, setConfig] = useState<ServicesPageConfig>(defaultServicesPageConfig);
  const [tab, setTab] = useState<Tab>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSiteSetting<ServicesPageConfig>('services_page_config').then((data) => {
      if (data) setConfig({ ...defaultServicesPageConfig, ...data, hero: { ...defaultServicesPageConfig.hero, ...data.hero } });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await upsertSiteSetting('services_page_config', config);
    await qc.invalidateQueries({ queryKey: ['site_setting', 'services_page_config'] });
    setSaving(false);
    alert('Services page saved!');
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
        <button onClick={save} disabled={saving} className="btn-primary gap-2"><Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}</button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t.id ? 'bg-primary text-white' : 'bg-white border border-slate-200'}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {tab === 'hero' && (
          <>
            <label className="text-sm font-medium">Heading<input className={inputClass} value={config.hero.heading} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, heading: e.target.value } })} /></label>
            <label className="text-sm font-medium">Subtext<textarea className={inputClass} rows={2} value={config.hero.subtext} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtext: e.target.value } })} /></label>
            <label className="text-sm font-medium">Background Image<input className={inputClass} value={config.hero.image} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, image: e.target.value } })} />
              <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setConfig({ ...config, hero: { ...config.hero, image: await uploadMedia(f) } }); }} />
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm font-medium">Primary CTA Label<input className={inputClass} value={config.hero.primaryCta.label} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCta: { ...config.hero.primaryCta, label: e.target.value } } })} /></label>
              <label className="text-sm font-medium">Primary CTA Link<input className={inputClass} value={config.hero.primaryCta.href} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCta: { ...config.hero.primaryCta, href: e.target.value } } })} /></label>
            </div>
          </>
        )}

        {tab === 'trust' && config.trustStats.map((stat, i) => (
          <div key={i} className="grid md:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl">
            <input className={inputClass} value={stat.icon} placeholder="Icon" onChange={(e) => { const trustStats = [...config.trustStats]; trustStats[i] = { ...trustStats[i], icon: e.target.value }; setConfig({ ...config, trustStats }); }} />
            <input className={inputClass} value={stat.value} placeholder="Value" onChange={(e) => { const trustStats = [...config.trustStats]; trustStats[i] = { ...trustStats[i], value: e.target.value }; setConfig({ ...config, trustStats }); }} />
            <input className={inputClass} value={stat.label} placeholder="Label" onChange={(e) => { const trustStats = [...config.trustStats]; trustStats[i] = { ...trustStats[i], label: e.target.value }; setConfig({ ...config, trustStats }); }} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={stat.numeric} onChange={(e) => { const trustStats = [...config.trustStats]; trustStats[i] = { ...trustStats[i], numeric: e.target.checked }; setConfig({ ...config, trustStats }); }} /> Animated counter</label>
          </div>
        ))}

        {tab === 'promos' && (
          <>
            {config.promoBanners.map((banner, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl space-y-2">
                <ReorderButtons index={i} total={config.promoBanners.length} onMove={(f, t) => setConfig({ ...config, promoBanners: moveItem(config.promoBanners, f, t) })} />
                <input className={inputClass} value={banner.title} placeholder="Title" onChange={(e) => { const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], title: e.target.value }; setConfig({ ...config, promoBanners }); }} />
                <textarea className={inputClass} value={banner.description} placeholder="Description" onChange={(e) => { const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], description: e.target.value }; setConfig({ ...config, promoBanners }); }} />
                <input className={inputClass} value={banner.ctaLabel} placeholder="CTA Label" onChange={(e) => { const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], ctaLabel: e.target.value }; setConfig({ ...config, promoBanners }); }} />
                <input className={inputClass} value={banner.ctaHref} placeholder="CTA Link" onChange={(e) => { const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], ctaHref: e.target.value }; setConfig({ ...config, promoBanners }); }} />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Banner Image</p>
                  <input className={inputClass} value={banner.image} placeholder="Image URL" onChange={(e) => { const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], image: e.target.value }; setConfig({ ...config, promoBanners }); }} />
                  <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => {
                    const f = e.target.files?.[0]; if (!f) return;
                    const url = await uploadMedia(f, 'banners');
                    const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], image: url }; setConfig({ ...config, promoBanners });
                  }} />
                  {banner.image && <img src={banner.image} alt="" className="h-20 rounded-lg object-cover mt-1" />}
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={banner.enabled} onChange={(e) => { const promoBanners = [...config.promoBanners]; promoBanners[i] = { ...promoBanners[i], enabled: e.target.checked }; setConfig({ ...config, promoBanners }); }} /> Enabled
                </label>
                <button type="button" onClick={() => setConfig({ ...config, promoBanners: config.promoBanners.filter((_, idx) => idx !== i) })} className="text-red-500 text-sm flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
              </div>
            ))}
            <button type="button" className="text-sm text-primary flex items-center gap-1" onClick={() => setConfig({ ...config, promoBanners: [...config.promoBanners, { title: '', description: '', image: '', ctaLabel: 'Enquire', ctaHref: '/contact', enabled: true }] })}><Plus className="w-4 h-4" /> Add Banner</button>
          </>
        )}

        {tab === 'partners' && (
          <>
            {config.partnerLogos.map((partner, i) => (
              <div key={i} className="p-3 border border-slate-200 rounded-xl space-y-2">
                <div className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <input className={inputClass} value={partner.name} placeholder="Partner Name" onChange={(e) => { const partnerLogos = [...config.partnerLogos]; partnerLogos[i] = { ...partnerLogos[i], name: e.target.value }; setConfig({ ...config, partnerLogos }); }} />
                    <select className={inputClass} value={partner.category} onChange={(e) => { const partnerLogos = [...config.partnerLogos]; partnerLogos[i] = { ...partnerLogos[i], category: e.target.value as ServicesPageConfig['partnerLogos'][0]['category'] }; setConfig({ ...config, partnerLogos }); }}>
                      <option value="airline">Airline</option>
                      <option value="hotel">Hotel</option>
                      <option value="resort">Resort</option>
                      <option value="insurance">Insurance</option>
                    </select>
                    <div>
                      <input className={inputClass} value={partner.image} placeholder="Logo Image URL" onChange={(e) => { const partnerLogos = [...config.partnerLogos]; partnerLogos[i] = { ...partnerLogos[i], image: e.target.value }; setConfig({ ...config, partnerLogos }); }} />
                      <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => {
                        const f = e.target.files?.[0]; if (!f) return;
                        const url = await uploadMedia(f, 'partners');
                        const partnerLogos = [...config.partnerLogos]; partnerLogos[i] = { ...partnerLogos[i], image: url }; setConfig({ ...config, partnerLogos });
                      }} />
                    </div>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="checkbox" checked={partner.enabled} onChange={(e) => { const partnerLogos = [...config.partnerLogos]; partnerLogos[i] = { ...partnerLogos[i], enabled: e.target.checked }; setConfig({ ...config, partnerLogos }); }} /> Show
                    </label>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    {partner.image && <img src={partner.image} alt={partner.name} className="h-12 w-20 object-contain border border-slate-100 rounded p-1" />}
                    <button type="button" onClick={() => setConfig({ ...config, partnerLogos: config.partnerLogos.filter((_, idx) => idx !== i) })} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="text-sm text-primary flex items-center gap-1" onClick={() => setConfig({ ...config, partnerLogos: [...config.partnerLogos, { name: '', image: '', category: 'airline', enabled: true }] })}><Plus className="w-4 h-4" /> Add Partner Logo</button>
          </>
        )}
      </div>
    </div>
  );
}

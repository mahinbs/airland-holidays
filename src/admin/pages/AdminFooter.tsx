import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2 } from 'lucide-react';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { defaultFooterConfig } from '../../data/defaultCmsContent';
import type { FooterConfig } from '../../types/cms';
import RichTextField from '../components/fields/RichTextField';
import { inputClass, moveItem, ReorderButtons } from '../components/fields/shared';

export default function AdminFooter() {
  const qc = useQueryClient();
  const [config, setConfig] = useState<FooterConfig>(defaultFooterConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSiteSetting<FooterConfig>('footer_config').then((data) => {
      if (data) setConfig({ ...defaultFooterConfig, ...data });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const contactInfo = {
      address: config.corporateAddress,
      phones: [config.phone, config.mobile].filter(Boolean),
      emails: [config.email],
      whatsapp: config.whatsapp.replace(/\D/g, ''),
      office_hours: `${config.businessHours.weekdays}; ${config.businessHours.weekend}`,
    };
    await Promise.all([
      upsertSiteSetting('footer_config', config),
      upsertSiteSetting('contact_info', contactInfo),
    ]);
    await qc.invalidateQueries({ queryKey: ['site_setting', 'footer_config'] });
    await qc.invalidateQueries({ queryKey: ['site_setting', 'contact_info'] });
    setSaving(false);
    alert('Footer saved!');
  };

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Footer Management</h1>
          <p className="text-slate-500 text-sm mt-1">Contact info, business hours, social links and quick links.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="space-y-6">
        <Panel title="Brand">
          <label className="text-sm font-medium text-slate-700">Tagline</label>
          <textarea className={inputClass} rows={2} value={config.tagline} onChange={(e) => setConfig({ ...config, tagline: e.target.value })} />
        </Panel>

        <Panel title="Contact Information">
          <div className="grid md:grid-cols-2 gap-4">
            {([
              ['corporateAddress', 'Corporate Office Address'],
              ['registeredAddress', 'Registered Office Address'],
              ['email', 'Email'],
              ['phone', 'Phone Number'],
              ['mobile', 'Mobile Number'],
              ['whatsapp', 'WhatsApp Number'],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="text-sm font-medium text-slate-700">{label}</label>
                <input className={inputClass} value={config[key]} onChange={(e) => setConfig({ ...config, [key]: e.target.value })} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Business Hours">
          <div className="grid md:grid-cols-3 gap-4">
            {(['weekdays', 'weekend', 'holidays'] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium text-slate-700 capitalize">{key}</label>
                <input className={inputClass} value={config.businessHours[key]} onChange={(e) => setConfig({ ...config, businessHours: { ...config.businessHours, [key]: e.target.value } })} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Social Media">
          {config.socials.map((social, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input className={inputClass} value={social.platform} placeholder="Platform" onChange={(e) => {
                const socials = [...config.socials];
                socials[i] = { ...socials[i], platform: e.target.value };
                setConfig({ ...config, socials });
              }} />
              <input className={inputClass} value={social.href} placeholder="URL" onChange={(e) => {
                const socials = [...config.socials];
                socials[i] = { ...socials[i], href: e.target.value };
                setConfig({ ...config, socials });
              }} />
              <label className="flex items-center gap-1 text-sm shrink-0">
                <input type="checkbox" checked={social.enabled} onChange={(e) => {
                  const socials = [...config.socials];
                  socials[i] = { ...socials[i], enabled: e.target.checked };
                  setConfig({ ...config, socials });
                }} /> On
              </label>
              <button type="button" onClick={() => setConfig({ ...config, socials: config.socials.filter((_, idx) => idx !== i) })} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => setConfig({ ...config, socials: [...config.socials, { platform: '', href: '', enabled: true }] })} className="text-sm text-primary flex items-center gap-1"><Plus className="w-4 h-4" /> Add Social</button>
        </Panel>

        <Panel title="Quick Links">
          {config.quickLinks.map((link, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <ReorderButtons index={i} total={config.quickLinks.length} onMove={(f, t) => setConfig({ ...config, quickLinks: moveItem(config.quickLinks, f, t) })} />
              <input className={inputClass} value={link.label} placeholder="Label" onChange={(e) => {
                const quickLinks = [...config.quickLinks];
                quickLinks[i] = { ...quickLinks[i], label: e.target.value };
                setConfig({ ...config, quickLinks });
              }} />
              <input className={inputClass} value={link.href} placeholder="URL" onChange={(e) => {
                const quickLinks = [...config.quickLinks];
                quickLinks[i] = { ...quickLinks[i], href: e.target.value };
                setConfig({ ...config, quickLinks });
              }} />
              <label className="flex items-center gap-1 text-sm shrink-0">
                <input type="checkbox" checked={link.enabled} onChange={(e) => {
                  const quickLinks = [...config.quickLinks];
                  quickLinks[i] = { ...quickLinks[i], enabled: e.target.checked };
                  setConfig({ ...config, quickLinks });
                }} /> On
              </label>
              <button type="button" onClick={() => setConfig({ ...config, quickLinks: config.quickLinks.filter((_, idx) => idx !== i) })} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => setConfig({ ...config, quickLinks: [...config.quickLinks, { label: '', href: '', enabled: true }] })} className="text-sm text-primary flex items-center gap-1"><Plus className="w-4 h-4" /> Add Link</button>
        </Panel>

        <Panel title="Map & SEO">
          <label className="text-sm font-medium text-slate-700">Google Maps Embed URL</label>
          <input className={inputClass} value={config.mapEmbedUrl} onChange={(e) => setConfig({ ...config, mapEmbedUrl: e.target.value })} />
          <div className="mt-4">
            <RichTextField label="Footer SEO Content" value={config.seoContent} onChange={(v) => setConfig({ ...config, seoContent: v })} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

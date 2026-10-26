import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2 } from 'lucide-react';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { defaultHomepageConfig, defaultAchievements, defaultGoogleReviews } from '../../data/defaultCmsContent';
import type { HomepageConfig, MilestoneItem } from '../../types/cms';
import StringListField from '../components/fields/StringListField';
import RichTextField from '../components/fields/RichTextField';
import RepeatableField from '../components/fields/RepeatableField';
import { inputClass, moveItem, ReorderButtons, Toggle, useSortable } from '../components/fields/shared';
import { uploadMedia } from '../../services/storage';

type Tab = 'whyus' | 'achievements' | 'google' | 'founder' | 'milestones' | 'authority' | 'visa' | 'contact';

const ACHIEVEMENT_ICONS = ['Award', 'Users', 'Globe', 'Star', 'Clock', 'ShieldCheck', 'Plane', 'Heart', 'MapPin'].map((v) => ({ value: v, label: v }));

export default function AdminHomepage() {
  const qc = useQueryClient();
  const [config, setConfig] = useState<HomepageConfig>(defaultHomepageConfig);
  const [tab, setTab] = useState<Tab>('whyus');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSiteSetting<HomepageConfig>('homepage_config').then((data) => {
      if (data) setConfig({ ...defaultHomepageConfig, ...data, founder: { ...defaultHomepageConfig.founder, ...data.founder }, visaHighlight: { ...defaultHomepageConfig.visaHighlight, ...data.visaHighlight }, contactBlock: { ...defaultHomepageConfig.contactBlock, ...data.contactBlock } });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    // Rewrite display order from the current (drag & drop) order.
    const withOrder = (items: MilestoneItem[]) => items.map((m, i) => ({ ...m, sortOrder: i }));
    await upsertSiteSetting('homepage_config', {
      ...config,
      founderMilestones: withOrder(config.founderMilestones),
      industryAuthority: withOrder(config.industryAuthority),
    });
    await qc.invalidateQueries({ queryKey: ['site_setting', 'homepage_config'] });
    setSaving(false);
    alert('Homepage sections saved!');
  };

  const updateMilestones = (key: 'founderMilestones' | 'industryAuthority', items: MilestoneItem[]) =>
    setConfig({ ...config, [key]: items });

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'whyus', label: 'Why Choose Us' },
    { id: 'achievements', label: 'Company Achievements' },
    { id: 'google', label: 'Google Reviews' },
    { id: 'founder', label: 'Founder Profile' },
    { id: 'milestones', label: 'Founder Milestones' },
    { id: 'authority', label: 'Industry Authority' },
    { id: 'visa', label: 'Visa Highlight' },
    { id: 'contact', label: 'Contact Block' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Homepage Sections</h1>
          <p className="text-slate-500 text-sm mt-1">Why Us, Founder profile, milestones and industry authority cards.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2"><Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}</button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t.id ? 'bg-primary text-white' : 'bg-white border border-slate-200'}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {tab === 'whyus' && (
          <>
            <Field label="Badge"><input className={inputClass} value={config.whyUs.badge} onChange={(e) => setConfig({ ...config, whyUs: { ...config.whyUs, badge: e.target.value } })} /></Field>
            <Field label="Headline"><input className={inputClass} value={config.whyUs.headline} onChange={(e) => setConfig({ ...config, whyUs: { ...config.whyUs, headline: e.target.value } })} /></Field>
            <RichTextField label="Brand Story" value={config.whyUs.brandStory} onChange={(v) => setConfig({ ...config, whyUs: { ...config.whyUs, brandStory: v } })} />
            <Field label="Emotional Line"><textarea className={inputClass} rows={2} value={config.whyUs.emotionalLine} onChange={(e) => setConfig({ ...config, whyUs: { ...config.whyUs, emotionalLine: e.target.value } })} /></Field>
            <StringListField label="Trust Points" value={config.whyUs.trustPoints.map((p) => p.text)} onChange={(texts) => setConfig({ ...config, whyUs: { ...config.whyUs, trustPoints: texts.map((text, i) => ({ icon: config.whyUs.trustPoints[i]?.icon ?? 'Check', text })) } })} />
          </>
        )}

        {tab === 'achievements' && (
          <RepeatableField
            label="Company achievements / trust statistics (shown on the homepage track-record strip)"
            value={config.achievements ?? defaultAchievements}
            onChange={(v) => setConfig({ ...config, achievements: v as NonNullable<HomepageConfig['achievements']> })}
            withEnabled
            columns={[
              { key: 'icon', label: 'Icon', type: 'select', options: ACHIEVEMENT_ICONS },
              { key: 'value', label: 'Value (e.g. 20+)' },
              { key: 'label', label: 'Label' },
              { key: 'featured', label: 'Highlight (larger card)', type: 'boolean' },
            ]}
          />
        )}

        {tab === 'google' && (
          <>
            <Field label="Section Heading"><input className={inputClass} value={(config.googleReviews ?? defaultGoogleReviews).heading} onChange={(e) => setConfig({ ...config, googleReviews: { ...(config.googleReviews ?? defaultGoogleReviews), heading: e.target.value } })} /></Field>
            <Field label="Sub-heading"><input className={inputClass} value={(config.googleReviews ?? defaultGoogleReviews).subheading} onChange={(e) => setConfig({ ...config, googleReviews: { ...(config.googleReviews ?? defaultGoogleReviews), subheading: e.target.value } })} /></Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Overall Google Rating (e.g. 4.9)"><input className={inputClass} value={(config.googleReviews ?? defaultGoogleReviews).rating} onChange={(e) => setConfig({ ...config, googleReviews: { ...(config.googleReviews ?? defaultGoogleReviews), rating: e.target.value } })} /></Field>
              <Field label="Total Reviews (e.g. 1,200+)"><input className={inputClass} value={(config.googleReviews ?? defaultGoogleReviews).totalReviews} onChange={(e) => setConfig({ ...config, googleReviews: { ...(config.googleReviews ?? defaultGoogleReviews), totalReviews: e.target.value } })} /></Field>
            </div>
            <Field label="Google Reviews Profile Link"><input className={inputClass} value={(config.googleReviews ?? defaultGoogleReviews).profileUrl} onChange={(e) => setConfig({ ...config, googleReviews: { ...(config.googleReviews ?? defaultGoogleReviews), profileUrl: e.target.value } })} /></Field>
            <p className="text-xs text-slate-500">The review cards come from published written Testimonials. Paste real Google reviews there (Testimonials admin) to show them in this section.</p>
          </>
        )}

        {tab === 'founder' && (
          <>
            <Field label="Founder Name"><input className={inputClass} value={config.founder.name} onChange={(e) => setConfig({ ...config, founder: { ...config.founder, name: e.target.value } })} /></Field>
            <Field label="Designation"><input className={inputClass} value={config.founder.designation} onChange={(e) => setConfig({ ...config, founder: { ...config.founder, designation: e.target.value } })} /></Field>
            <Field label="Founder Image">
              <input className={inputClass} value={config.founder.image} onChange={(e) => setConfig({ ...config, founder: { ...config.founder, image: e.target.value } })} />
              <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setConfig({ ...config, founder: { ...config.founder, image: await uploadMedia(f) } }); }} />
            </Field>
            <RichTextField label="Founder Description" value={config.founder.description} onChange={(v) => setConfig({ ...config, founder: { ...config.founder, description: v } })} />
            <Field label="Founder Quote"><textarea className={inputClass} rows={2} value={config.founder.quote} onChange={(e) => setConfig({ ...config, founder: { ...config.founder, quote: e.target.value } })} /></Field>
            <StringListField label="Key Achievements" value={config.founder.achievements} onChange={(v) => setConfig({ ...config, founder: { ...config.founder, achievements: v } })} />
            <StringListField label="Roles" value={config.founder.roles} onChange={(v) => setConfig({ ...config, founder: { ...config.founder, roles: v } })} />
          </>
        )}

        {(tab === 'milestones' || tab === 'authority') && (
          <MilestoneEditor
            items={tab === 'milestones' ? config.founderMilestones : config.industryAuthority}
            onChange={(items) => updateMilestones(tab === 'milestones' ? 'founderMilestones' : 'industryAuthority', items)}
          />
        )}

        {tab === 'visa' && (
          <>
            <Field label="Section Title"><input className={inputClass} value={config.visaHighlight.title} onChange={(e) => setConfig({ ...config, visaHighlight: { ...config.visaHighlight, title: e.target.value } })} /></Field>
            <Field label="Subtitle"><textarea className={inputClass} rows={3} value={config.visaHighlight.subtitle} onChange={(e) => setConfig({ ...config, visaHighlight: { ...config.visaHighlight, subtitle: e.target.value } })} /></Field>
            <Field label="Primary CTA"><input className={inputClass} value={config.visaHighlight.primaryCta} onChange={(e) => setConfig({ ...config, visaHighlight: { ...config.visaHighlight, primaryCta: e.target.value } })} /></Field>
            <Field label="Secondary CTA"><input className={inputClass} value={config.visaHighlight.secondaryCta} onChange={(e) => setConfig({ ...config, visaHighlight: { ...config.visaHighlight, secondaryCta: e.target.value } })} /></Field>
            <Field label="WhatsApp Link"><input className={inputClass} value={config.visaHighlight.whatsappHref} onChange={(e) => setConfig({ ...config, visaHighlight: { ...config.visaHighlight, whatsappHref: e.target.value } })} /></Field>
            <Field label="Micro Copy"><input className={inputClass} value={config.visaHighlight.microCopy} onChange={(e) => setConfig({ ...config, visaHighlight: { ...config.visaHighlight, microCopy: e.target.value } })} /></Field>
            <p className="text-xs text-slate-500">Featured visa countries are pulled from published visas marked as Featured in the Visas admin.</p>
          </>
        )}

        {tab === 'contact' && (
          <>
            <Field label="Section Title"><input className={inputClass} value={config.contactBlock.sectionTitle} onChange={(e) => setConfig({ ...config, contactBlock: { ...config.contactBlock, sectionTitle: e.target.value } })} /></Field>
            <Field label="Heading"><input className={inputClass} value={config.contactBlock.heading} onChange={(e) => setConfig({ ...config, contactBlock: { ...config.contactBlock, heading: e.target.value } })} /></Field>
            <Field label="Description"><textarea className={inputClass} rows={3} value={config.contactBlock.description} onChange={(e) => setConfig({ ...config, contactBlock: { ...config.contactBlock, description: e.target.value } })} /></Field>
            <Field label="Badge Label"><input className={inputClass} value={config.contactBlock.badgeLabel} onChange={(e) => setConfig({ ...config, contactBlock: { ...config.contactBlock, badgeLabel: e.target.value } })} /></Field>
            <Field label="CTA Label"><input className={inputClass} value={config.contactBlock.ctaLabel} onChange={(e) => setConfig({ ...config, contactBlock: { ...config.contactBlock, ctaLabel: e.target.value } })} /></Field>
            <Field label="CTA Link"><input className={inputClass} value={config.contactBlock.ctaHref} onChange={(e) => setConfig({ ...config, contactBlock: { ...config.contactBlock, ctaHref: e.target.value } })} /></Field>
            <p className="text-xs text-slate-500">Phone, email and address come from Footer Management.</p>
          </>
        )}
      </div>
    </div>
  );
}

function MilestoneEditor({ items, onChange }: { items: MilestoneItem[]; onChange: (items: MilestoneItem[]) => void }) {
  const sortable = useSortable(items, onChange);
  const patch = (i: number, p: Partial<MilestoneItem>) => onChange(items.map((m, idx) => (idx === i ? { ...m, ...p } : m)));

  return (
    <>
      <p className="text-xs text-slate-400">Drag the handle (or use the arrows) to reorder. Inactive items are hidden on the homepage.</p>
      {items.map((item, i) => (
        <div key={item.id} {...sortable.rowProps(i)} className={`flex gap-2 p-4 border border-slate-200 rounded-xl transition-opacity ${item.active ? '' : 'opacity-60'} ${sortable.rowClass(i)}`}>
          <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} handleProps={sortable.handleProps(i)} />
          <div className="flex-1 grid md:grid-cols-2 gap-2">
            <input className={inputClass} value={item.title} placeholder="Title" onChange={(e) => patch(i, { title: e.target.value })} />
            <input className={inputClass} value={item.eventName} placeholder="Event / Recognition" onChange={(e) => patch(i, { eventName: e.target.value })} />
            <input className={inputClass} value={item.location} placeholder="Location" onChange={(e) => patch(i, { location: e.target.value })} />
            <input className={inputClass} value={item.year} placeholder="Year" onChange={(e) => patch(i, { year: e.target.value })} />
            <input className={inputClass} value={item.image} placeholder="Image URL" onChange={(e) => patch(i, { image: e.target.value })} />
            <input type="file" accept="image/*" className="text-xs self-center" onChange={async (e) => {
              const f = e.target.files?.[0]; if (!f) return;
              patch(i, { image: await uploadMedia(f, 'milestones') });
            }} />
            {item.image && <img src={item.image} alt="" className="h-16 rounded-lg object-cover mt-1" />}
            <textarea className={`${inputClass} md:col-span-2`} value={item.description} placeholder="Description" onChange={(e) => patch(i, { description: e.target.value })} />
            <Toggle checked={item.active} onChange={(v) => patch(i, { active: v })} label={item.active ? 'Active' : 'Inactive'} />
          </div>
          <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="text-red-500 self-start p-1.5" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button type="button" className="text-sm text-primary flex items-center gap-1" onClick={() => onChange([...items, { id: String(Date.now()), image: '', title: '', eventName: '', location: '', year: '', description: '', sortOrder: items.length, active: true }])}><Plus className="w-4 h-4" /> Add Item</button>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

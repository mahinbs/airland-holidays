import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2 } from 'lucide-react';
import { fetchSingleton, upsertSingleton } from '../../services/content';
import { defaultAboutContent } from '../../data/defaultCmsContent';
import type { AboutPageContent } from '../../types/cms';
import StringListField from '../components/fields/StringListField';
import RichTextField from '../components/fields/RichTextField';
import RepeatableField from '../components/fields/RepeatableField';
import { inputClass, moveItem, ReorderButtons, Toggle, useSortable } from '../components/fields/shared';
import { uploadMedia } from '../../services/storage';

type Tab = 'hero' | 'story' | 'founder' | 'credentials' | 'network' | 'promise' | 'team' | 'recognition' | 'cta';

export default function AdminAbout() {
  const qc = useQueryClient();
  const [content, setContent] = useState<AboutPageContent>(defaultAboutContent);
  const [rowId, setRowId] = useState<string>();
  const [tab, setTab] = useState<Tab>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSingleton<{ id: string; content: AboutPageContent }>('about_page').then((row) => {
      if (row?.content) setContent({ ...defaultAboutContent, ...row.content });
      if (row?.id) setRowId(row.id);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    // Rewrite display order from the current (drag & drop) order so the website matches the CMS.
    const normalized: AboutPageContent = {
      ...content,
      recognition: content.recognition.map((r, i) => ({ ...r, id: r.id || `r${Date.now().toString(36)}${i}`, sortOrder: i, active: r.active !== false })),
    };
    if (rowId) await upsertSingleton('about_page', { content: normalized }, rowId);
    else await upsertSingleton('about_page', { content: normalized });
    await qc.invalidateQueries({ queryKey: ['about_page'] });
    setSaving(false);
    alert('About page saved!');
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'story', label: 'Our Story' },
    { id: 'founder', label: 'Founder & CEO' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'network', label: 'Global Network' },
    { id: 'promise', label: 'Our Promise' },
    { id: 'team', label: 'Team' },
    { id: 'recognition', label: 'Recognition' },
    { id: 'cta', label: 'CTA & Brand' },
  ];

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">About Page</h1>
          <p className="text-slate-500 text-sm mt-1">Manage founder content, team, milestones and recognition gallery.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2"><Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}</button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t.id ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {tab === 'hero' && (
          <>
            <Field label="Heading"><input className={inputClass} value={content.hero.heading} onChange={(e) => setContent({ ...content, hero: { ...content.hero, heading: e.target.value } })} /></Field>
            <Field label="Subtext"><textarea className={inputClass} rows={2} value={content.hero.subtext} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtext: e.target.value } })} /></Field>
            <Field label="Hero Image">
              <input className={inputClass} value={content.hero.image} onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })} />
              <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setContent({ ...content, hero: { ...content.hero, image: await uploadMedia(f) } }); }} />
            </Field>
          </>
        )}

        {tab === 'story' && (
          <>
            <Field label="Section Label"><input className={inputClass} value={content.story.sectionLabel} onChange={(e) => setContent({ ...content, story: { ...content.story, sectionLabel: e.target.value } })} /></Field>
            <Field label="Title"><input className={inputClass} value={content.story.title} onChange={(e) => setContent({ ...content, story: { ...content.story, title: e.target.value } })} /></Field>
            <StringListField label="Story Paragraphs" value={content.story.paragraphs} onChange={(v) => setContent({ ...content, story: { ...content.story, paragraphs: v } })} />
            <RepeatableField
              label="Company Milestones"
              value={content.story.milestones}
              onChange={(v) => setContent({ ...content, story: { ...content.story, milestones: v as AboutPageContent['story']['milestones'] } })}
              columns={[
                { key: 'year', label: 'Year' },
                { key: 'title', label: 'Title' },
                { key: 'desc', label: 'Description', type: 'textarea' },
              ]}
            />
          </>
        )}

        {tab === 'credentials' && (
          <>
            <Field label="Section Label"><input className={inputClass} value={content.credentials.sectionLabel} onChange={(e) => setContent({ ...content, credentials: { ...content.credentials, sectionLabel: e.target.value } })} /></Field>
            <Field label="Title"><input className={inputClass} value={content.credentials.title} onChange={(e) => setContent({ ...content, credentials: { ...content.credentials, title: e.target.value } })} /></Field>
            <RepeatableField
              label="Credential Items"
              value={content.credentials.items}
              onChange={(v) => setContent({ ...content, credentials: { ...content.credentials, items: v as AboutPageContent['credentials']['items'] } })}
              columns={[{ key: 'icon', label: 'Icon (Lucide name)' }, { key: 'text', label: 'Text', type: 'textarea' }]}
            />
          </>
        )}

        {tab === 'network' && (
          <>
            <Field label="Section Label"><input className={inputClass} value={content.globalNetwork.sectionLabel} onChange={(e) => setContent({ ...content, globalNetwork: { ...content.globalNetwork, sectionLabel: e.target.value } })} /></Field>
            <Field label="Title"><input className={inputClass} value={content.globalNetwork.title} onChange={(e) => setContent({ ...content, globalNetwork: { ...content.globalNetwork, title: e.target.value } })} /></Field>
            <Field label="Intro"><textarea className={inputClass} rows={2} value={content.globalNetwork.intro} onChange={(e) => setContent({ ...content, globalNetwork: { ...content.globalNetwork, intro: e.target.value } })} /></Field>
            <RepeatableField
              label="Partners"
              value={content.globalNetwork.partners}
              onChange={(v) => setContent({ ...content, globalNetwork: { ...content.globalNetwork, partners: v as AboutPageContent['globalNetwork']['partners'] } })}
              columns={[{ key: 'icon', label: 'Icon' }, { key: 'label', label: 'Label' }]}
            />
            <Field label="Value Statement"><input className={inputClass} value={content.globalNetwork.valueStatement} onChange={(e) => setContent({ ...content, globalNetwork: { ...content.globalNetwork, valueStatement: e.target.value } })} /></Field>
          </>
        )}

        {tab === 'promise' && (
          <>
            <Field label="Section Label"><input className={inputClass} value={content.promise.sectionLabel} onChange={(e) => setContent({ ...content, promise: { ...content.promise, sectionLabel: e.target.value } })} /></Field>
            <Field label="Title"><input className={inputClass} value={content.promise.title} onChange={(e) => setContent({ ...content, promise: { ...content.promise, title: e.target.value } })} /></Field>
            <Field label="Text"><textarea className={inputClass} rows={3} value={content.promise.text} onChange={(e) => setContent({ ...content, promise: { ...content.promise, text: e.target.value } })} /></Field>
            <StringListField label="Promise Points" value={content.promise.points} onChange={(v) => setContent({ ...content, promise: { ...content.promise, points: v } })} />
          </>
        )}

        {tab === 'cta' && (
          <>
            <Field label="Brand Line 1"><input className={inputClass} value={content.brandStatement.line1} onChange={(e) => setContent({ ...content, brandStatement: { ...content.brandStatement, line1: e.target.value } })} /></Field>
            <Field label="Brand Line 2"><input className={inputClass} value={content.brandStatement.line2} onChange={(e) => setContent({ ...content, brandStatement: { ...content.brandStatement, line2: e.target.value } })} /></Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Primary CTA Label"><input className={inputClass} value={content.cta.primary.label} onChange={(e) => setContent({ ...content, cta: { ...content.cta, primary: { ...content.cta.primary, label: e.target.value } } })} /></Field>
              <Field label="Primary CTA Link"><input className={inputClass} value={content.cta.primary.href} onChange={(e) => setContent({ ...content, cta: { ...content.cta, primary: { ...content.cta.primary, href: e.target.value } } })} /></Field>
              <Field label="Secondary CTA Label"><input className={inputClass} value={content.cta.secondary.label} onChange={(e) => setContent({ ...content, cta: { ...content.cta, secondary: { ...content.cta.secondary, label: e.target.value } } })} /></Field>
              <Field label="Secondary CTA Link"><input className={inputClass} value={content.cta.secondary.href} onChange={(e) => setContent({ ...content, cta: { ...content.cta, secondary: { ...content.cta.secondary, href: e.target.value } } })} /></Field>
            </div>
          </>
        )}

        {tab === 'founder' && (
          <>
            <Toggle checked={content.founder.active !== false} onChange={(v) => setContent({ ...content, founder: { ...content.founder, active: v } })} label={content.founder.active !== false ? 'Display Status: shown on the About page' : 'Display Status: hidden'} />
            <Field label="Founder Name"><input className={inputClass} value={content.founder.name} onChange={(e) => setContent({ ...content, founder: { ...content.founder, name: e.target.value } })} /></Field>
            <Field label="Designation"><input className={inputClass} value={content.founder.title} onChange={(e) => setContent({ ...content, founder: { ...content.founder, title: e.target.value } })} /></Field>
            <RichTextField label="About Founder" value={content.founder.about} onChange={(v) => setContent({ ...content, founder: { ...content.founder, about: v } })} />
            <Field label="Leadership & Industry Influence — Heading"><input className={inputClass} value={content.founder.leadershipTitle} onChange={(e) => setContent({ ...content, founder: { ...content.founder, leadershipTitle: e.target.value } })} /></Field>
            <StringListField label="Leadership & Industry Influence Content" value={content.founder.leadershipPoints} onChange={(v) => setContent({ ...content, founder: { ...content.founder, leadershipPoints: v } })} />
            <Field label="Strategic Strength & Global Network — Heading"><input className={inputClass} value={content.founder.networkTitle} onChange={(e) => setContent({ ...content, founder: { ...content.founder, networkTitle: e.target.value } })} /></Field>
            <RichTextField label="Strategic Strength & Global Network Content" value={content.founder.networkDesc} onChange={(v) => setContent({ ...content, founder: { ...content.founder, networkDesc: v } })} />
            <Field label="Founder Vision / Quote"><textarea className={inputClass} rows={2} value={content.founder.vision} onChange={(e) => setContent({ ...content, founder: { ...content.founder, vision: e.target.value } })} /></Field>
            <Field label="Founder Portrait">
              <input className={inputClass} value={content.founder.portraitSrc} onChange={(e) => setContent({ ...content, founder: { ...content.founder, portraitSrc: e.target.value } })} />
              <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setContent({ ...content, founder: { ...content.founder, portraitSrc: await uploadMedia(f) } }); }} />
            </Field>
          </>
        )}

        {tab === 'team' && (
          <>
            <Field label="Section Title"><input className={inputClass} value={content.team.title} onChange={(e) => setContent({ ...content, team: { ...content.team, title: e.target.value } })} /></Field>
            <Field label="Description"><textarea className={inputClass} rows={2} value={content.team.desc} onChange={(e) => setContent({ ...content, team: { ...content.team, desc: e.target.value } })} /></Field>
            <TeamEditor members={content.team.members} onChange={(members) => setContent({ ...content, team: { ...content.team, members } })} />
          </>
        )}

        {tab === 'recognition' && (
          <RepeatableField
            label="Recognition & Industry Presence"
            value={content.recognition}
            defaultItem={{ id: '', image: '', eventName: '', title: '', location: '', year: '', description: '', sortOrder: 0, active: true }}
            onChange={(v) => setContent({ ...content, recognition: v as AboutPageContent['recognition'] })}
            columns={[
              { key: 'image', label: 'Image Upload', type: 'image' },
              { key: 'eventName', label: 'Event Name' },
              { key: 'title', label: 'Recognition Title' },
              { key: 'location', label: 'Location' },
              { key: 'year', label: 'Year' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'active', label: 'Active', type: 'boolean' },
            ]}
          />
        )}
      </div>
    </div>
  );
}

function TeamEditor({ members, onChange }: { members: AboutPageContent['team']['members']; onChange: (m: AboutPageContent['team']['members']) => void }) {
  const sortable = useSortable(members, onChange);
  const patch = (i: number, p: Partial<AboutPageContent['team']['members'][number]>) => onChange(members.map((m, idx) => (idx === i ? { ...m, ...p } : m)));

  return (
    <>
      <p className="text-xs text-slate-400">Drag the handle to reorder. Inactive members are hidden on the About page.</p>
      <div className="space-y-3">
        {members.map((member, i) => (
          <div key={i} {...sortable.rowProps(i)} className={`flex gap-2 p-4 border border-slate-200 rounded-xl transition-opacity ${member.active === false ? 'opacity-60' : ''} ${sortable.rowClass(i)}`}>
            <ReorderButtons index={i} total={members.length} onMove={(f, t) => onChange(moveItem(members, f, t))} handleProps={sortable.handleProps(i)} />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-500">Member {i + 1}</span>
                <Toggle checked={member.active !== false} onChange={(v) => patch(i, { active: v })} label={member.active !== false ? 'Active' : 'Inactive'} />
              </div>
              <Field label="Team Title"><input className={inputClass} value={member.role} onChange={(e) => patch(i, { role: e.target.value })} /></Field>
              <Field label="Team Description"><textarea className={inputClass} rows={2} value={member.desc} onChange={(e) => patch(i, { desc: e.target.value })} /></Field>
              <Field label="Team Image">
                <input className={inputClass} value={member.image} onChange={(e) => patch(i, { image: e.target.value })} placeholder="Image URL" />
                <input type="file" accept="image/*" className="text-xs mt-1" onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  patch(i, { image: await uploadMedia(f, 'team') });
                }} />
                {member.image && <img src={member.image} alt="" className="h-20 rounded-lg object-cover mt-2" />}
              </Field>
            </div>
            <button type="button" onClick={() => onChange(members.filter((_, idx) => idx !== i))} className="text-red-500 hover:bg-red-50 p-1.5 rounded self-start" aria-label="Remove member"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <button type="button" className="text-sm text-primary flex items-center gap-1" onClick={() => onChange([...members, { role: '', desc: '', image: '', active: true }])}><Plus className="w-4 h-4" /> Add Team Member</button>
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

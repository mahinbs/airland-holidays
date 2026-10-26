import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2 } from 'lucide-react';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { defaultInstagramReelsConfig } from '../../data/defaultCmsContent';
import type { InstagramReelItem, InstagramReelsConfig } from '../../types/cms';
import { inputClass, moveItem, ReorderButtons, Toggle, useSortable } from '../components/fields/shared';
import { uploadMedia } from '../../services/storage';

export const INSTAGRAM_SETTING_KEY = 'instagram_reels';

const newReel = (): InstagramReelItem => ({ id: `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, image: '', video: '', href: '', caption: '', enabled: true });

export default function AdminInstagram() {
  const qc = useQueryClient();
  const [config, setConfig] = useState<InstagramReelsConfig>(defaultInstagramReelsConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const sortable = useSortable(config.reels, (reels) => setConfig((c) => ({ ...c, reels })));

  useEffect(() => {
    fetchSiteSetting<InstagramReelsConfig>(INSTAGRAM_SETTING_KEY).then((data) => {
      if (data) setConfig({ ...defaultInstagramReelsConfig, ...data, reels: data.reels ?? [] });
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await upsertSiteSetting(INSTAGRAM_SETTING_KEY, config);
      await qc.invalidateQueries({ queryKey: ['site_setting', INSTAGRAM_SETTING_KEY] });
      setMessage({ type: 'ok', text: 'Instagram section saved. Changes are live on the homepage.' });
    } catch (e) {
      setMessage({ type: 'err', text: e instanceof Error ? e.message : 'Failed to save' });
    }
    setSaving(false);
  };

  const patch = (i: number, p: Partial<InstagramReelItem>) =>
    setConfig((c) => ({ ...c, reels: c.reels.map((r, idx) => (idx === i ? { ...r, ...p } : r)) }));

  const upload = async (i: number, field: 'image' | 'video', file: File) => {
    const key = `${i}-${field}`;
    setUploading(key);
    try {
      patch(i, { [field]: await uploadMedia(file, field === 'video' ? 'videos' : 'reels') });
    } catch (err) {
      setMessage({ type: 'err', text: err instanceof Error ? err.message : 'Upload failed' });
    }
    setUploading(null);
  };

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Instagram Reels</h1>
          <p className="text-slate-500 text-sm mt-1">Reels, travel highlight videos and customer clips shown in the homepage Instagram section.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2 disabled:opacity-50"><Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}</button>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm border ${message.type === 'ok' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>{message.text}</div>
      )}

      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-4">Section Heading & Button</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block text-sm font-medium">Section Title<input className={inputClass} value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} /></label>
            <label className="block text-sm font-medium">Subtitle<input className={inputClass} value={config.subtitle} onChange={(e) => setConfig({ ...config, subtitle: e.target.value })} /></label>
            <label className="block text-sm font-medium">Button Label (leave empty to hide)<input className={inputClass} value={config.ctaLabel} onChange={(e) => setConfig({ ...config, ctaLabel: e.target.value })} /></label>
            <label className="block text-sm font-medium">Button Link<input className={inputClass} value={config.ctaHref} placeholder="https://instagram.com/…" onChange={(e) => setConfig({ ...config, ctaHref: e.target.value })} /></label>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Reels ({config.reels.length})</h2>
            <button type="button" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline" onClick={() => setConfig({ ...config, reels: [...config.reels, newReel()] })}>
              <Plus className="w-4 h-4" /> Add Reel
            </button>
          </div>
          <p className="text-xs text-slate-400">Drag the handle to reorder. Disabled reels are hidden. When no reel is enabled the website falls back to the built-in highlights.</p>

          {config.reels.map((reel, i) => (
            <div key={reel.id} {...sortable.rowProps(i)} className={`flex gap-2 p-4 border border-slate-200 rounded-xl transition-opacity ${reel.enabled ? '' : 'opacity-60'} ${sortable.rowClass(i)}`}>
              <ReorderButtons index={i} total={config.reels.length} onMove={(f, t) => setConfig({ ...config, reels: moveItem(config.reels, f, t) })} handleProps={sortable.handleProps(i)} />
              <div className="w-20 shrink-0">
                <div className="aspect-[9/16] rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  {reel.image ? <img src={reel.image} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] text-slate-400 text-center px-1">No thumbnail</span>}
                </div>
              </div>
              <div className="flex-1 grid md:grid-cols-2 gap-3 min-w-0">
                <div>
                  <label className="text-xs text-slate-500">Thumbnail image</label>
                  <input className={inputClass} value={reel.image} placeholder="Image URL" onChange={(e) => patch(i, { image: e.target.value })} />
                  <input type="file" accept="image/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && void upload(i, 'image', e.target.files[0])} />
                  {uploading === `${i}-image` && <span className="text-xs text-slate-500 ml-2">Uploading…</span>}
                </div>
                <div>
                  <label className="text-xs text-slate-500">Video (optional — plays on hover)</label>
                  <input className={inputClass} value={reel.video ?? ''} placeholder="https://…/reel.mp4" onChange={(e) => patch(i, { video: e.target.value })} />
                  <input type="file" accept="video/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && void upload(i, 'video', e.target.files[0])} />
                  {uploading === `${i}-video` && <span className="text-xs text-slate-500 ml-2">Uploading…</span>}
                </div>
                <div>
                  <label className="text-xs text-slate-500">Reel / post link</label>
                  <input className={inputClass} value={reel.href} placeholder="https://www.instagram.com/reel/…" onChange={(e) => patch(i, { href: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Caption</label>
                  <input className={inputClass} value={reel.caption} placeholder="e.g. Bali Sunrise" onChange={(e) => patch(i, { caption: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Toggle checked={reel.enabled} onChange={(v) => patch(i, { enabled: v })} label={reel.enabled ? 'Enabled' : 'Disabled'} />
                </div>
              </div>
              <button type="button" onClick={() => setConfig({ ...config, reels: config.reels.filter((_, idx) => idx !== i) })} className="text-red-500 self-start p-1.5" aria-label="Remove reel"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          {config.reels.length === 0 && <p className="text-sm text-slate-400 py-6 text-center">No reels yet — add your first reel above.</p>}
        </section>
      </div>
    </div>
  );
}

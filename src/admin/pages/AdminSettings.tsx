import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, PanelTop, CreditCard } from 'lucide-react';
import { fetchSingleton, upsertSingleton } from '../../services/content';
import { journeyBeyondBanner } from '../../data/journeyBeyondBanner';

type BannerForm = {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export default function AdminSettings() {
  const [bannerConfig, setBannerConfig] = useState<BannerForm>({
    eyebrow: journeyBeyondBanner.eyebrow,
    title: journeyBeyondBanner.title,
    ctaLabel: journeyBeyondBanner.primaryCta?.label ?? 'Explore Packages',
    ctaHref: journeyBeyondBanner.primaryCta?.href ?? '/packages',
    image: journeyBeyondBanner.media.type === 'video' ? journeyBeyondBanner.media.poster : journeyBeyondBanner.media.src,
  });
  const [bannerRowId, setBannerRowId] = useState<string>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSingleton<{ id: string; config: Partial<BannerForm> }>('journey_beyond_banner').then((banner) => {
      if (banner?.config) setBannerConfig((prev) => ({ ...prev, ...banner.config }));
      if (banner?.id) setBannerRowId(banner.id);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const config = {
        ...journeyBeyondBanner,
        eyebrow: bannerConfig.eyebrow,
        title: bannerConfig.title,
        primaryCta: { label: bannerConfig.ctaLabel, href: bannerConfig.ctaHref },
        media: { type: 'image' as const, src: bannerConfig.image, alt: bannerConfig.title },
      };
      if (bannerRowId) await upsertSingleton('journey_beyond_banner', { config }, bannerRowId);
      else await upsertSingleton('journey_beyond_banner', { config });
      alert('Settings saved!');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to save');
    }
    setSaving(false);
  };

  const inputClass = 'w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <button onClick={save} disabled={saving} className="btn-primary gap-2 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="grid gap-4 mb-6">
        <Link to="/admin/header" className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors">
          <PanelTop className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="font-bold text-slate-900">Header & Navigation</p>
            <p className="text-sm text-slate-600">Utility bar, marquee items, menu links and mega menu.</p>
          </div>
        </Link>
        <Link to="/admin/payment" className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors">
          <CreditCard className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="font-bold text-slate-900">Payment Page</p>
            <p className="text-sm text-slate-600">Bank details, UPI, Razorpay, policies and form settings.</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="font-bold text-slate-900 mb-4">Journey Beyond Banner (Homepage)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm font-medium">Eyebrow<input className={inputClass} value={bannerConfig.eyebrow} onChange={(e) => setBannerConfig({ ...bannerConfig, eyebrow: e.target.value })} /></label>
          <label className="text-sm font-medium">Title<input className={inputClass} value={bannerConfig.title} onChange={(e) => setBannerConfig({ ...bannerConfig, title: e.target.value })} /></label>
          <label className="text-sm font-medium">CTA Label<input className={inputClass} value={bannerConfig.ctaLabel} onChange={(e) => setBannerConfig({ ...bannerConfig, ctaLabel: e.target.value })} /></label>
          <label className="text-sm font-medium">CTA Link<input className={inputClass} value={bannerConfig.ctaHref} onChange={(e) => setBannerConfig({ ...bannerConfig, ctaHref: e.target.value })} /></label>
          <label className="text-sm font-medium md:col-span-2">Background Image URL<input className={inputClass} value={bannerConfig.image} onChange={(e) => setBannerConfig({ ...bannerConfig, image: e.target.value })} /></label>
        </div>
      </div>
    </div>
  );
}

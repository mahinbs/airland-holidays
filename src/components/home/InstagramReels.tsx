import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import PackageCardStack from '../common/PackageCardStack';
import { useMediaVideos, useSiteSetting } from '../../hooks/useContent';
import { mapMediaVideo } from '../../lib/mapContent';
import { defaultInstagramReelsConfig } from '../../data/defaultCmsContent';
import type { InstagramReelsConfig } from '../../types/cms';

type Reel = { id: string | number; title: string; thumb: string; href: string; video?: string };

/** Thumbnail that plays its video on hover (desktop) while keeping the image as poster. */
function ReelMedia({ reel, className }: { reel: Reel; className: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    if (!reel.video) return <img src={reel.thumb} alt={reel.title} className={className} loading="lazy" />;
    return (
        <video
            ref={ref}
            src={reel.video}
            poster={reel.thumb}
            muted
            loop
            playsInline
            preload="none"
            className={className}
            onMouseEnter={() => void ref.current?.play().catch(() => undefined)}
            onMouseLeave={() => {
                if (ref.current) {
                    ref.current.pause();
                    ref.current.currentTime = 0;
                }
            }}
        />
    );
}

const staticReels = [
    { id: 1, title: 'Bali Sunrise', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', href: '#' },
    { id: 2, title: 'Swiss Alps', thumb: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', href: '#' },
    { id: 3, title: 'Maldives', thumb: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800', href: '#' },
    { id: 4, title: 'Dubai Skyline', thumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', href: '#' },
    { id: 5, title: 'Greece', thumb: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', href: '#' },
    { id: 6, title: 'Kashmir', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800', href: '#' },
];

function youtubeThumb(id: string) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export default function InstagramReels() {
    const { data: cmsVideos } = useMediaVideos();
    const { data: cmsConfig } = useSiteSetting<InstagramReelsConfig>('instagram_reels');
    const config: InstagramReelsConfig = { ...defaultInstagramReelsConfig, ...(cmsConfig ?? {}) };

    const reels = useMemo<Reel[]>(() => {
        // 1) Reels managed in CMS → Instagram Reels (enabled only, in saved order)
        const managed = (cmsConfig?.reels ?? []).filter((r) => r.enabled !== false && (r.image || r.video));
        if (managed.length) {
            return managed.map((r) => ({ id: r.id, title: r.caption, thumb: r.image, href: r.href || '#', video: r.video || undefined }));
        }
        // 2) Published media videos  3) built-in highlights
        if (cmsVideos?.length) {
            return cmsVideos.map((v) => {
                const mapped = mapMediaVideo(v);
                return {
                    id: mapped.id,
                    title: mapped.title,
                    thumb: mapped.youtubeId ? youtubeThumb(mapped.youtubeId) : staticReels[0].thumb,
                    href: mapped.youtubeId ? `https://www.youtube.com/watch?v=${mapped.youtubeId}` : '#',
                };
            });
        }
        return staticReels;
    }, [cmsVideos, cmsConfig]);

    return (
        <section className="section-padding bg-white">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Follow Our Journey</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{config.title}</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">{config.subtitle}</p>
                    {config.ctaLabel && config.ctaHref && (
                        <a
                            href={config.ctaHref}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary inline-flex items-center gap-2 mt-6"
                        >
                            <Instagram className="w-4 h-4" /> {config.ctaLabel}
                        </a>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="w-full"
                >
                    <div className="md:hidden flex justify-center py-10">
                        <PackageCardStack>
                            {reels.map((r) => (
                                <a
                                    key={r.id}
                                    href={r.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-[280px] rounded-2xl overflow-hidden shadow-xl bg-white"
                                >
                                    <div className="relative aspect-[9/16]">
                                        <ReelMedia reel={r} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                                            <Instagram className="w-5 h-5 shrink-0" />
                                            <span className="font-semibold text-sm">{r.title || 'Watch on Instagram'}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </PackageCardStack>
                    </div>

                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {reels.map((r) => (
                            <a
                                key={r.id}
                                href={r.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative rounded-2xl overflow-hidden aspect-[9/16] shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <ReelMedia reel={r} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                                    <Instagram className="w-5 h-5 shrink-0" />
                                    <span className="font-semibold text-sm line-clamp-2">{r.title || 'Watch on Instagram'}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

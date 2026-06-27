import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import PackageCardStack from '../common/PackageCardStack';
import { useMediaVideos } from '../../hooks/useContent';
import { mapMediaVideo } from '../../lib/mapContent';

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
    const reels = useMemo(() => {
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
    }, [cmsVideos]);

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
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Instagram Reels & Travel Highlights</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Explore our latest travel moments and customer travel clips.</p>
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
                                        <img src={r.thumb} alt={r.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                                            <Instagram className="w-5 h-5 shrink-0" />
                                            <span className="font-semibold text-sm">{r.title}</span>
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
                                <img
                                    src={r.thumb}
                                    alt={r.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                                    <Instagram className="w-5 h-5 shrink-0" />
                                    <span className="font-semibold text-sm line-clamp-2">{r.title}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

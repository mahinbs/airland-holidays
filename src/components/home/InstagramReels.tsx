import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import PackageCardStack from '../common/PackageCardStack';

const reels = [
    { id: 1, title: 'Bali Sunrise', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Swiss Alps', thumb: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Maldives', thumb: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Dubai Skyline', thumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Greece', thumb: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Kashmir', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800' },
];

export default function InstagramReels() {

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
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full h-full block"
                                >
                                    <img src={r.thumb} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
                                        <Instagram className="w-10 h-10 text-white opacity-90" />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/50 rounded-full px-4 py-1.5 text-white text-xs font-bold backdrop-blur-md">
                                        Reel
                                    </div>
                                </a>
                            ))}
                        </PackageCardStack>
                    </div>

                    <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {reels.map((r) => (
                            <a
                                key={r.id}
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-[9/16] rounded-xl overflow-hidden"
                            >
                                <img src={r.thumb} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
                                    <Instagram className="w-8 h-8 text-white opacity-90" />
                                </div>
                                <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1 text-white text-xs font-medium">
                                    Reel
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                    >
                        <Instagram className="w-5 h-5" /> Follow @airlandholidays
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

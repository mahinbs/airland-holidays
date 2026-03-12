import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const videos = [
    { id: 1, title: 'Bali Honeymoon Experience', name: 'Sarah & James', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Swiss Alps Adventure', name: 'Michael T.', thumb: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Maldives Paradise', name: 'Emily & David', thumb: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
];

export default function VideoTestimonials() {
    return (
        <section className="section-padding bg-slate-50">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Real Stories</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Client Video Testimonials</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Hear directly from travelers who experienced our curated journeys.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {videos.map((v) => (
                        <div key={v.id} className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-200 cursor-pointer">
                            <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <PlayCircle className="w-10 h-10 text-primary ml-1 -translate-x-0.5" />
                                </div>
                                <p className="text-white font-bold mt-4 text-center px-4">{v.title}</p>
                                <p className="text-slate-200 text-sm">{v.name}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

import { Star, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const writtenReviews = [
    { name: 'Sarah Mitchell', location: 'Bali', text: 'Airland Holidays managed everything flawlessly. From the seamless airport transfers to the stunning cliffside villa, it was the perfect honeymoon experience.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
    { name: 'James Rodriguez', location: 'Swiss Alps', text: 'The best travel agency I have ever used. Their attention to detail and 24/7 concierge support made our family ski trip completely stress-free.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Emily Chen', location: 'Dubai', text: 'Incredible value for the premium service received. The guided tours were exclusive and we felt like VIPs throughout the entire week.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
];

const videoTestimonials = [
    { title: 'Bali Honeymoon', name: 'Sarah & James', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { title: 'Swiss Alps Adventure', name: 'Michael T.', thumb: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' },
];

export default function Testimonials() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Testimonials & Reviews</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Hear from travelers who experienced our curated journeys. Written reviews and video testimonials.
                    </p>
                </div>
            </div>

            <div className="content-container mt-16">
                {/* Google Reviews Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Google Reviews</h2>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-current" />)}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">4.9</p>
                            <p className="text-slate-500 text-sm">Based on 500+ reviews</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {writtenReviews.map((r, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="flex text-yellow-500 mb-3">
                                    {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-700 mb-4">&ldquo;{r.text}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <p className="font-bold text-slate-900">{r.name}</p>
                                        <p className="text-slate-500 text-sm">{r.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Video Testimonials */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Client Video Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {videoTestimonials.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-200 cursor-pointer"
                            >
                                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-10 h-10 text-primary ml-1" />
                                    </div>
                                    <p className="text-white font-bold mt-4">{v.title}</p>
                                    <p className="text-slate-200 text-sm">{v.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

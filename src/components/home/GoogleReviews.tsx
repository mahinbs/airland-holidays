import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
    { name: 'Raj K.', rating: 5, text: 'Exceptional service! Our Bali trip was perfectly planned.', date: '2 weeks ago' },
    { name: 'Priya M.', rating: 5, text: 'Best travel agency. Highly recommend for honeymoon packages.', date: '1 month ago' },
    { name: 'Amit S.', rating: 5, text: 'Smooth visa processing and great customer support.', date: '3 weeks ago' },
];

export default function GoogleReviews() {
    return (
        <section className="section-padding bg-white">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Trusted by Travelers</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Google Reviews</h2>
                        <p className="text-slate-600 max-w-xl">See what our customers say about us on Google.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-8 h-8 fill-current" />
                            ))}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">4.9</p>
                            <p className="text-slate-500 text-sm">Based on 500+ reviews</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {reviews.map((r, i) => (
                        <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex items-center gap-2 text-yellow-500 mb-3">
                                {[...Array(r.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-slate-700 mb-4">&ldquo;{r.text}&rdquo;</p>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-slate-900">{r.name}</span>
                                <span className="text-slate-200 text-sm">{r.date}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                    >
                        View All Reviews on Google <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

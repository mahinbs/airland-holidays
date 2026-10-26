import { useMemo } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTestimonials } from '../../hooks/useContent';
import { mapTestimonialToCard } from '../../lib/mapContent';
import { useSiteSetting } from '../../hooks/useContent';
import { defaultGoogleReviews } from '../../data/defaultCmsContent';
import type { HomepageConfig } from '../../types/cms';

const staticReviews = [
    { name: 'Raj K.', rating: 5, text: 'Exceptional service! Our Bali trip was perfectly planned.', date: '2 weeks ago' },
    { name: 'Priya M.', rating: 5, text: 'Best travel agency. Highly recommend for honeymoon packages.', date: '1 month ago' },
    { name: 'Amit S.', rating: 5, text: 'Smooth visa processing and great customer support.', date: '3 weeks ago' },
];

export default function GoogleReviews() {
    const { data: cmsTestimonials } = useTestimonials();
    const { data: homepage } = useSiteSetting<HomepageConfig>('homepage_config');
    const gr = { ...defaultGoogleReviews, ...(homepage?.googleReviews ?? {}) };
    const reviews = useMemo(() => {
        if (cmsTestimonials?.length) {
            const written = cmsTestimonials
                .filter((t) => t.testimonial_type !== 'video')
                .slice(0, 6)
                .map(mapTestimonialToCard);
            if (written.length) {
                return written.map((r) => ({
                    name: r.name,
                    rating: r.rating,
                    text: r.text,
                    date: r.location || 'Verified review',
                }));
            }
        }
        return staticReviews;
    }, [cmsTestimonials]);

    const avgRating = gr.rating.trim()
        ? gr.rating.trim()
        : reviews.length
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : '4.9';

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
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{gr.heading}</h2>
                        <p className="text-slate-600 max-w-xl">{gr.subheading}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-8 h-8 fill-current" />
                            ))}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{avgRating}</p>
                            <p className="text-slate-600 text-sm">Based on {gr.totalReviews.trim() || `${reviews.length}+`} reviews</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                {[...Array(review.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-slate-700 mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-900">{review.name}</p>
                                    <p className="text-slate-500 text-sm">{review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <div className="text-center mt-10">
                    <a
                        href={gr.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                        View all reviews on Google
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}

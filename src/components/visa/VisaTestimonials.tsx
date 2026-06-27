import { useMemo, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTestimonials } from '../../hooks/useContent';
import { mapTestimonialToCard, type TestimonialCardItem } from '../../lib/mapContent';
import { testimonials as staticVisaTestimonials } from '../../data/visaData';

export const VisaTestimonials = () => {
    const { data: cmsTestimonials } = useTestimonials();
    const items: TestimonialCardItem[] = useMemo(() => {
        if (cmsTestimonials?.length) {
            return cmsTestimonials.filter((t) => t.testimonial_type !== 'video').map(mapTestimonialToCard);
        }
        return staticVisaTestimonials.map((t, i) => ({
            id: String(i),
            name: t.name,
            location: t.role,
            text: t.text,
            rating: t.rating,
            avatar: t.avatar,
            type: 'written' as const,
        }));
    }, [cmsTestimonials]);

    const [testiLoaded, setTestiLoaded] = useState(false);
    const [testiRef, testiInstanceRef] = useKeenSlider(
        {
            initial: 0,
            loop: true,
            created() {
                setTestiLoaded(true);
            },
            slides: {
                perView: 1.1,
                spacing: 16,
            },
            breakpoints: {
                '(min-width: 768px)': {
                    slides: { perView: 2.1, spacing: 24 },
                },
                '(min-width: 1024px)': {
                    slides: { perView: 3, spacing: 32 },
                },
            },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 4000);
                }
                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', nextTimeout);
                slider.on('updated', nextTimeout);
            },
        ]
    );

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="content-container relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Client Stories</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Trusted by Thousands of Travelers</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => testiInstanceRef.current?.next()}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                        Next Story <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div ref={testiRef} className={`keen-slider ${testiLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                    {items.concat(items).map((t, idx) => (
                        <div key={`${t.id}-${idx}`} className="keen-slider__slide">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col"
                            >
                                <div className="flex text-yellow-500 mb-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-slate-600 leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <p className="font-bold text-slate-900">{t.name}</p>
                                        <p className="text-slate-500 text-sm">{t.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

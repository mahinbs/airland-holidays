import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/visaData';

export const VisaTestimonials = () => {
    const [testiSlide, setTestiSlide] = useState(0);
    const [testiLoaded, setTestiLoaded] = useState(false);
    const [testiRef, testiInstanceRef] = useKeenSlider(
        {
            initial: 0,
            loop: true,
            slideChanged(slider) {
                setTestiSlide(slider.track.details.rel);
            },
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
                let timeout: any;
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
        <div className="py-24 bg-slate-50 relative">
            <div className="content-container">
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-6 h-6 text-amber-400 fill-current" />
                        ))}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Trusted by 20,000+ Travelers
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Read what our clients have to say about our services.
                    </p>
                </div>

                <div className="relative">
                    <div ref={testiRef} className="keen-slider py-4">
                        {testimonials.concat(testimonials).map((t, idx) => (
                            <div key={idx} className="keen-slider__slide">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow h-full"
                                >
                                    <div className="flex items-center gap-1 mb-6 text-amber-400">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 mb-8 italic">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-12 h-12 rounded-full ring-2 ring-slate-100"
                                        />
                                        <div>
                                            <div className="font-bold text-slate-900">{t.name}</div>
                                            <div className="text-sm text-slate-500">{t.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Testimonials Navigation Buttons Below */}
                    {testiLoaded && testiInstanceRef.current && (
                        <div className="flex justify-center items-center gap-4 mt-10">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    testiInstanceRef.current?.prev();
                                }}
                                className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-slate-900 border border-slate-100 hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    testiInstanceRef.current?.next();
                                }}
                                className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-slate-900 border border-slate-100 hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

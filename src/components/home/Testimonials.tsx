import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

const reviews = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        location: 'Travelled to Bali',
        text: 'Airland Holidays managed everything flawlessly. From the seamless airport transfers to the stunning cliffside villa, it was the perfect honeymoon experience.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: 2,
        name: 'James Rodriguez',
        location: 'Travelled to Swiss Alps',
        text: 'The best travel agency I have ever used. Their attention to detail and 24/7 concierge support made our family ski trip completely stress-free.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: 3,
        name: 'Emily Chen',
        location: 'Travelled to Dubai',
        text: 'Incredible value for the premium service received. The guided tours were exclusive and we felt like VIPs throughout the entire week.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: 4,
        name: 'Michael Thompson',
        location: 'Travelled to Maldives',
        text: "An unforgettable escape. The overwater villa exceeded all expectations. Airland's concierge team anticipated every need before we even asked.",
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: 5,
        name: 'Priya Sharma',
        location: 'Travelled to India',
        text: 'The Golden Triangle tour was perfectly paced. Our guide brought history to life. Every hotel and transfer was seamless.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    }
];

function TestimonialCard({ review }: { review: (typeof reviews)[0] }) {
    return (
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-6 lg:p-8 rounded-3xl shadow-2xl h-full flex flex-col">
            <div className="flex text-secondary mb-4">
                {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>

            <p className="text-slate-300 leading-relaxed italic mb-6 relative text-base lg:text-lg flex-1">
                <span className="text-4xl text-slate-700 absolute -top-2 -left-1 opacity-50">&ldquo;</span>
                {review.text}
            </p>

            <div className="flex items-center gap-4 border-t border-slate-700 pt-5">
                <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                    <h4 className="text-white font-semibold">{review.name}</h4>
                    <p className="text-slate-200 text-sm">{review.location}</p>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slides: {
                perView: 1,
                spacing: 24
            },
            breakpoints: {
                '(min-width: 1024px)': {
                    slides: {
                        perView: 2,
                        spacing: 24
                    }
                }
            },
            slideChanged(slider) {
                setCurrentIndex(slider.track.details.rel);
            }
        }
    );

    useEffect(() => {
        const timer = setInterval(() => {
            instanceRef.current?.next();
        }, 5000);
        return () => clearInterval(timer);
    }, [instanceRef]);

    const goToSlide = (index: number) => {
        instanceRef.current?.moveToIdx(index);
    };

    return (
        <section className="section-padding bg-slate-900 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&h=1080&q=80" alt="" className="absolute inset-0 w-full h-full object-cover brightness-50" aria-hidden />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="content-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block drop-shadow-sm">Traveler Stories</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Don&apos;t Just Take Our Word For It</h2>
                    <p className="text-slate-200 text-lg">Read what thousands of satisfied adventurers have to say about their experiences with us.</p>
                </motion.div>

                <div className="relative">
                    <div ref={sliderRef} className="keen-slider overflow-visible">
                        {reviews.map((review) => (
                            <div key={review.id} className="keen-slider__slide">
                                <TestimonialCard review={review} />
                            </div>
                        ))}
                    </div>

                    {/* Custom navigation */}
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <button
                            onClick={() => instanceRef.current?.prev()}
                            aria-label="Previous testimonials"
                            className="w-12 h-12 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {reviews.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'w-8 bg-primary'
                                            : 'w-2 bg-slate-600 hover:bg-slate-500'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => instanceRef.current?.next()}
                            aria-label="Next testimonials"
                            className="w-12 h-12 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
    {
        id: 1,
        title: 'INSPIRE',
        subtitle: 'Top Destinations for Hassle-Free Visa Processing',
        topText: 'Welcome To',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    {
        id: 2,
        title: 'WILDLIFE',
        subtitle: 'EXPLORE THE UNTAMED BEAUTY OF NATURE',
        topText: 'Welcome To',
        image: 'https://images.pexels.com/photos/5521696/pexels-photo-5521696.jpeg',
    },
    {
        id: 3,
        title: 'ROMANCE',
        subtitle: 'CURATED EXPERIENCES FOR COUPLES AND HONEYMOONERS',
        topText: 'Welcome To',
        image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?_gl=1*r9hdrp*_ga*NTE3NTM4ODA1LjE3Njg0NTU1MDM.*_ga_8JE65Q40S6*czE3NzMyOTUwMTgkbzEyJGcxJHQxNzczMjk1MDY0JGoxNCRsMCRoMA..',
    },
    {
        id: 4,
        title: 'HERITAGE',
        subtitle: 'DISCOVER ANCIENT WONDERS AND RICH CULTURES',
        topText: 'Welcome To',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    {
        id: 5,
        title: 'BEACHES',
        subtitle: 'RELAX ON PRISTINE WHITE SANDS AND CRYSTAL WATERS',
        topText: 'Welcome To',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1920&h=1080&q=80',
    }
];

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const currentSlide = slides[activeIndex];

    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-slate-900 flex flex-col">
            {/* Swiper Carousel - Background */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="absolute inset-0 !z-0"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="!h-full">
                        <div className="relative w-full h-full overflow-hidden">
                            <motion.img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                transition={{ duration: 10, ease: "linear" }}
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content Overlay - Centered, with animations */}
            <div className="flex-1 flex flex-col justify-center relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl mx-auto flex flex-col items-start">
                    <div className="flex-1 w-full max-w-3xl min-h-[200px] flex flex-col justify-center items-start">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${currentSlide.id}`}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                                    exit: { opacity: 0, transition: { duration: 0.3 } }
                                }}
                                className="flex flex-col items-start"
                            >
                                <div className="flex items-center gap-2 mb-4 overflow-hidden">
                                    <motion.span
                                        variants={{
                                            hidden: { y: "100%" },
                                            visible: { y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        className="font-serif italic text-3xl md:text-4xl text-[#f59e0b] tracking-wide block"
                                    >
                                        {currentSlide.topText}
                                    </motion.span>
                                </div>

                                <div className="mb-6 overflow-hidden">
                                    <motion.h1
                                        variants={{
                                            hidden: { clipPath: "inset(0 0 100% 0)" },
                                            visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        className="text-5xl md:text-6xl lg:text-7xl leading-none font-sans text-white tracking-[0.2em] uppercase font-normal drop-shadow-md pb-2"
                                    >
                                        {currentSlide.title}
                                    </motion.h1>
                                    <motion.div
                                        variants={{
                                            hidden: { scaleX: 0, originX: 0 },
                                            visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } }
                                        }}
                                        className="mt-4 relative ml-4"
                                    >
                                        <svg className="w-64 h-3 text-[#f59e0b]" preserveAspectRatio="none" viewBox="0 0 250 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 8.5C50 4 150 2 240 7C175 4 80 5 10 9C6.5 9.2 4 9 5 8.5Z" fill="currentColor" />
                                            <path d="M25 11C70 8 160 8 220 10C170 8.5 80 9.5 20 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </motion.div>
                                </div>

                                <div className="overflow-hidden">
                                    <motion.p
                                        variants={{
                                            hidden: { y: "100%", opacity: 0 },
                                            visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } }
                                        }}
                                        className="text-sm md:text-[15px] font-sans font-medium tracking-widest text-slate-100 uppercase max-w-2xl leading-relaxed drop-shadow-md"
                                    >
                                        {currentSlide.subtitle}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Enquiry Form - Fixed at bottom, full-width bar */}
            <div className="relative z-20 w-full bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent pt-12 pb-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-3 sm:gap-4">
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 outline-none placeholder-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Travel dates"
                            className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 outline-none placeholder-slate-400"
                        />
                        <a
                            href="/contact"
                            className="btn-primary py-3 px-8 rounded-xl whitespace-nowrap text-center sm:col-span-2 lg:col-span-1 order-last sm:order-none"
                        >
                            Enquire Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Navigation Controls - Above the form */}
            <div className="absolute lg:flex hidden bottom-36 left-1/2 -translate-x-1/2 items-center justify-center gap-6 z-30">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous slide"
                    className="w-12 h-12 rounded-full border border-[#f59e0b] flex items-center justify-center text-[#f59e0b] hover:bg-[#f59e0b] hover:text-slate-900 transition-all backdrop-blur-sm group shadow-lg"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next slide"
                    className="w-12 h-12 rounded-full border border-[#f59e0b] flex items-center justify-center text-[#f59e0b] hover:bg-[#f59e0b] hover:text-slate-900 transition-all backdrop-blur-sm group shadow-lg"
                >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}

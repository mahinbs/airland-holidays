import { useState, useEffect } from 'react';
import {
    Sparkles, Award, ShieldCheck, Headphones, Globe, ArrowRight, ArrowLeft, Grid, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const mainServices = [
    {
        title: 'Flight Booking',
        desc: 'Expert route planning with the best fares and ultimate comfort.',
        path: '/services/flight-booking',
        badge: 'Most Booked',
        visuals: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', // Airplane wing
            'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80', // Luxury terminal
            'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=80', // Aircraft interior
        ]
    },
    {
        title: 'Visa Assistance',
        desc: 'High-success visa processing with complete expert guidance.',
        path: '/visa',
        badge: '99% Success Rate',
        visuals: [
            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', // Passports
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', // Travel context
        ]
    },
    {
        title: 'Forex & Currency',
        desc: 'Secure and best-rate currency exchange for all your destinations.',
        path: '/services/forex',
        badge: 'Best Rates',
        visuals: [
            'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80', // Currency exchange
            'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80', // Money lifestyle
        ]
    },
    {
        title: 'Travel Insurance',
        desc: 'Complete protection for safe, secure, and worry-free journeys.',
        path: '/services/travel-insurance',
        badge: 'Full Coverage',
        visuals: [
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', // Protection/umbrella/family
            'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80', // Safe travel lifestyle
        ]
    }
];

const trustItems = [
    { icon: Award, text: 'Globally Accredited Travel Experts' },
    { icon: ShieldCheck, text: 'Trusted by Thousands of Happy Travellers' },
    { icon: Globe, text: 'Extensive Global Airline & Hotel Network' },
    { icon: Headphones, text: 'Dedicated Personal Travel Assistance' },
];

function CardVisuals({ visuals }: { visuals: string[] }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (visuals.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent(p => (p + 1) % visuals.length);
        }, 3000 + Math.random() * 1000); // slightly offset timings so they don't sync
        return () => clearInterval(timer);
    }, [visuals]);

    return (
        <div className="w-full h-full relative bg-slate-100">
            {visuals.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt="Service Visual"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    loading="lazy"
                    decoding="async"
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-multiply" />
        </div>
    );
}

export default function ServicesOverview() {
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        created() {
            setLoaded(true);
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: { perView: 2, spacing: 20 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 3.25, spacing: 30 },
            },
            '(min-width: 1280px)': {
                slides: { perView: 3.75, spacing: 30 },
            },
        },
        slides: { perView: 1.15, spacing: 16 },
    });

    return (
        <section className="section-padding bg-[#FAFAFA] overflow-hidden">
            <div className="">
                {/* Section Header */}
                <div className="content-container flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                            <Sparkles className="w-3.5 h-3.5" /> Premium Services
                        </span>
                        <h2 className="font-['Marcellus'] text-3xl md:text-5xl text-slate-900 mt-2 mb-4">
                            Our Core Offerings
                        </h2>
                        <p className="text-slate-600 max-w-xl text-base md:text-lg leading-relaxed">
                            Discover tailored, end-to-end travel solutions crafted specifically to elevate your journey.
                        </p>
                    </motion.div>

                    {/* Desktop Navigation Arrows */}
                    {loaded && instanceRef.current && (
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={(e) => { e.stopPropagation(); instanceRef.current?.prev(); }}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all text-slate-700 hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); instanceRef.current?.next(); }}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all text-slate-700 hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Services Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="relative"
                >
                    <div ref={sliderRef} className="keen-slider -mx-4 px-4 pb-8 md:mx-0 md:px-0">
                        {mainServices.map((srv) => (
                            <div key={srv.title} className="keen-slider__slide">
                                <a
                                    href={srv.path}
                                    className="group rounded-[2.5rem] overflow-hidden bg-white transition-all duration-700 border border-slate-100 flex flex-col relative h-[500px] md:h-[540px]"
                                >
                                    {/* Top Visual with Frame Effect */}
                                    <div className="h-[60%] md:h-[65%] relative overflow-hidden m-4 rounded-[1.8rem] shrink-0">
                                        <CardVisuals visuals={srv.visuals} />

                                        <div className="absolute top-4 left-4 z-30">
                                            <span className="bg-white/95 backdrop-blur-md text-primary text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.15em] shadow-sm border border-primary/5">
                                                {srv.badge}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Content Area */}
                                    <div className="flex-1 px-8 pb-8 pt-2 flex flex-col">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-['Marcellus'] text-xl md:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-500">
                                                {srv.title}
                                            </h3>
                                        </div>

                                        <p className="text-slate-500 text-base leading-relaxed line-clamp-2 pr-4 mb-6">
                                            {srv.desc}
                                        </p>

                                        <div className="mt-auto flex items-center gap-3">
                                            <div className="h-px flex-1 bg-slate-100 group-hover:bg-primary/20 transition-colors" />
                                            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 flex items-center gap-2">
                                                Discover <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Trust Section - Redesigned */}
                <div className="content-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 md:mt-0 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-[2rem] px-8 py-10 md:py-12 shadow-sm"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                            {trustItems.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.text}
                                        className={`flex flex-col items-center text-center group ${idx !== 3 ? 'lg:border-r lg:border-slate-100 lg:pr-8' : ''}`}
                                    >
                                        <div className="w-14 h-14 bg-primary/5 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-5 transition-colors border border-primary/10">
                                            <Icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <span className="text-slate-800 font-bold text-base md:text-lg leading-snug font-['Marcellus'] max-w-[200px]">
                                            {item.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* View All CTA */}
                <div className="content-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12 md:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4"
                    >
                        <a href="/services" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base w-full sm:w-auto shadow-lg shadow-primary/20">
                            <Grid className="w-5 h-5" /> View All Services
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50 font-semibold px-8 py-4 rounded-xl transition-all text-base w-full sm:w-auto bg-white">
                            <Phone className="w-5 h-5" /> Talk to an Expert
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
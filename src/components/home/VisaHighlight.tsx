import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Users, CheckCircle, Shield, ArrowRight, Globe } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

const sectionCopy = {
    badge: "Premium Trust Authority",
    title: "Secure Your Global Visa With Confidence",
    subtitle: "Navigate complex immigration processes with our expert guidance. We ensure a smooth, hassle-free experience for your international travel.",
    emotionalLine: "Join thousands of successful travelers who trusted our expertise for their global journeys.",
    primaryCta: "Start Your Visa Process Now",
    secondaryCta: "Check Your Eligibility",
    specialistSub: "USA • UK • Schengen • Australia • Canada",
    viewAll: "View All Destinations"
};

const trustPoints = [
    { icon: Award, title: "99% Success Rate", subtitle: "For USA Visas", special: true },
    { icon: Clock, title: "Fast Processing", subtitle: "Express Services" },
    { icon: Users, title: "Expert Support", subtitle: "Dedicated Agents" },
    { icon: CheckCircle, title: "Secure Process", subtitle: "Data Protection" }
];

const featuredCountries = [
    { name: "USA", slug: "usa", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800", flag: "🇺🇸", highlight: "B1/B2 Visa" },
    { name: "UK", slug: "uk", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800", flag: "🇬🇧", highlight: "Standard Visitor" },
    { name: "Schengen", slug: "schengen", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800", flag: "🇪🇺", highlight: "Tourist Visa" },
    { name: "Australia", slug: "australia", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800", flag: "🇦🇺", highlight: "Subclass 600" },
    { name: "Canada", slug: "canada", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800", flag: "🇨🇦", highlight: "Visitor Visa" }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function VisaHighlight() {
    const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        drag: true,
        slides: {
            perView: 1.15,
            spacing: 16
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: {
                    perView: 1.5,
                    spacing: 20
                }
            },
            '(min-width: 1024px)': {
                slides: {
                    perView: 2,
                    spacing: 24
                }
            }
        }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            sliderInstanceRef.current?.next();
        }, 3200);

        return () => clearInterval(timer);
    }, [sliderInstanceRef]);

    return (
        <section className="py-14 md:py-20 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16 items-center">
                    
                    {/* Left Authority Block (55%) */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full lg:w-[55%] flex flex-col gap-5 md:gap-6"
                    >
                        {/* Top badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-full w-fit">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider">{sectionCopy.badge}</span>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 leading-tight">
                                {sectionCopy.title}
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium">
                                {sectionCopy.subtitle}
                            </p>
                        </motion.div>

                        {/* Trust Badge Grid */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 my-2 md:my-4">
                            {trustPoints.map((point, idx) => {
                                const Icon = point.icon;
                                return (
                                    <div 
                                        key={idx} 
                                        className={`flex flex-col gap-2 p-4 rounded-xl border ${point.special ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}
                                    >
                                        <div className={`p-2 rounded-lg w-fit ${point.special ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className={`font-bold ${point.special ? 'text-amber-900' : 'text-slate-900'}`}>{point.title}</p>
                                            <p className={`text-sm ${point.special ? 'text-amber-700' : 'text-slate-500'}`}>{point.subtitle}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Emotional line */}
                        <motion.div variants={itemVariants} className="border-l-4 border-amber-400 pl-3 sm:pl-4 py-1">
                            <p className="text-primary font-semibold italic text-sm sm:text-base">{sectionCopy.emotionalLine}</p>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 md:mt-4">
                            <a href="/visa" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto text-sm sm:text-base">
                                {sectionCopy.primaryCta}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="/visa" className="inline-flex items-center justify-center gap-2 bg-transparent text-primary border-2 border-primary font-bold px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-primary/5 transition-colors w-full sm:w-auto text-sm sm:text-base">
                                {sectionCopy.secondaryCta}
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Country Cards Horizontal Scroll (45%) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-[45%]"
                    >
                        <div className="mb-5 md:mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">Specialised in High-Demand Destinations</h3>
                            </div>
                            
                            {/* Flag pills row */}
                            <div className="flex flex-wrap gap-2">
                                {sectionCopy.specialistSub.split('•').map((pill, idx) => (
                                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                                        {pill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Auto moving + swipe enabled carousel */}
                        <div ref={sliderRef} className="keen-slider overflow-visible pb-6 md:pb-8">
                            {featuredCountries.map((country) => (
                                <div key={country.slug} className="keen-slider__slide">
                                    <a
                                        href={`/visa/${country.slug}`}
                                        className="group relative block w-full h-[300px] sm:h-[320px] rounded-2xl overflow-hidden"
                                    >
                                        <img
                                            src={country.image}
                                            alt={country.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                        {/* Top-left flag pill */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-2 py-1 rounded-md text-sm font-bold shadow-sm flex items-center gap-1">
                                                {country.flag} {country.slug.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Bottom-left highlight badge & Content */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="inline-block bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                                                {country.highlight}
                                            </span>
                                            <h4 className="text-xl font-bold text-white mb-3">{country.name}</h4>

                                            {/* Hover CTA row */}
                                            <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                                                <span className="flex-1 bg-primary text-white text-center py-1.5 rounded text-sm font-bold">
                                                    Apply Visa
                                                </span>
                                                <span className="flex-1 bg-white/20 backdrop-blur-md text-white text-center py-1.5 rounded text-sm font-medium hover:bg-white hover:text-slate-900 transition-colors">
                                                    Details
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2 flex justify-start sm:justify-end">
                            <a href="/visa" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                {sectionCopy.viewAll} <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

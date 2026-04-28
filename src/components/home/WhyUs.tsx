import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef } from 'react';
import {
    Clock,
    Users,
    Award,
    Globe,
    Handshake,
    Heart,
    Sparkles,
    Crown,
    CheckCircle2
} from 'lucide-react';

const content = {
    badge: 'Why Choose Airland',
    headline: "We Don't Just Plan Travel. We Take Responsibility For Your Journey.",
    brandStory: "Since 2005, Airland Tours & Holidays has been delivering thoughtfully curated travel experiences with a strong focus on trust, quality, and personal care. With over 20,000+ satisfied travellers, the brand has built a reputation for reliability, long-term relationships, and consistently delivering journeys that exceed expectations.",
    brandStorySub: "Every itinerary is a commitment to comfort, safety, and memorable experiences.",
    emotionalLine: "We don't just plan trips. We take complete responsibility to make every journey smooth, comfortable, and memorable.",
    ctas: [
        { label: 'Start Planning Your Journey', href: '/contact', primary: true },
        { label: 'Explore Our Story', href: '/about', primary: false },
    ],
};

const founderBlock = {
    sectionLabel: 'Leadership That Builds Trust',
    name: 'Mr. C.K. Raja',
    title: 'Founder & CEO – Airland Group of Companies',
    roles: [
        'Chairman – Travel Agents Federation of India (TAFI), Tamil Nadu Chapter',
        'Former Secretary – TAFI Tamil Nadu',
        'Active member of national and international travel bodies',
    ],
    impactStatement: 'Strong relationships with tourism boards, global partners, and industry bodies contribute to higher credibility and global access.',
    // Founder portrait — local image, developer will import
    photoPlaceholder: '/whychooseus/5.jpeg',
};

const trustPoints = [
    { icon: Clock, text: '21+ Years of proven expertise' },
    { icon: Users, text: '20,000+ happy travellers worldwide' },
    { icon: Award, text: 'IATA accredited travel company' },
    { icon: Globe, text: 'Strong global network and tourism board connections' },
    { icon: Handshake, text: 'Direct partnerships with airlines, hotels, and local experts' },
    { icon: Heart, text: 'Personalised travel with dedicated support' },
];

// Gallery images — local files, developer will import actual paths
const galleryImages = [
    { src: '/whychooseus/1.jpeg', alt: 'Airland in The Hindu – 3.75 Lakh Indians Visited Sri Lanka', aspect: 'portrait' },
    { src: '/whychooseus/2.jpeg', alt: 'Industry event – national tourism board', aspect: 'landscape' },
    { src: '/whychooseus/3.jpeg', alt: 'Sri Lanka National Day event', aspect: 'landscape' },
    { src: '/whychooseus/4.jpeg', alt: 'Sri Lanka Tourism Awareness Session, Chennai', aspect: 'landscape' },
    { src: '/whychooseus/5.jpeg', alt: 'Mr. C.K. Raja – Founder portrait', aspect: 'portrait' },
    { src: '/whychooseus/6.jpeg', alt: 'Boardroom discussion with travel industry leaders', aspect: 'landscape' },
];

const animation = { duration: 20000, easing: (t: number) => t };

export default function WhyUs() {
    const mouseOver = useRef(false);
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        drag: false,
        created(s) {
            s.container.addEventListener("mouseover", () => {
                mouseOver.current = true;
                s.animator.stop();
            });
            s.container.addEventListener("mouseout", () => {
                mouseOver.current = false;
                s.moveToIdx(s.track.details.abs + 5, true, animation);
            });
            s.moveToIdx(5, true, animation);
        },
        updated(s) {
            if (!mouseOver.current) {
                s.moveToIdx(s.track.details.abs + 5, true, animation);
            }
        },
        animationEnded(s) {
            if (!mouseOver.current) {
                s.moveToIdx(s.track.details.abs + 5, true, animation);
            }
        },
        slides: {
            perView: "auto",
            spacing: 16,
        },
    });

    return (
        <>
            {/* TOP ZONE — Brand Story + Trust Points */}
            <section className="section-padding bg-white overflow-hidden">
                <div className="content-container">
                    <div className="flex flex-col lg:flex-row items-start gap-16">

                        {/* Left Column (Brand Story) */}
                        <motion.div
                            className="flex-1"
                            initial={{ x: -40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-5">
                                <Sparkles className="w-3.5 h-3.5" />
                                {content.badge}
                            </div>

                            <h2 className="font-['Marcellus'] text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-[1.15] mb-6">
                                We Don't Just Plan Travel. <span className="text-primary">We Take Responsibility For Your Journey.</span>
                            </h2>

                            <p className="text-slate-600 font-light text-base md:text-lg leading-[1.9] mb-4">
                                {content.brandStory}
                            </p>

                            <div className="text-slate-600 text-base italic border-l-4 border-primary/30 pl-4 py-1 mb-8">
                                {content.brandStorySub}
                            </div>

                            <div className="bg-primary/5 border border-primary/15 rounded-2xl px-6 py-5 mb-8">
                                <Heart className="w-5 h-5 text-primary inline mr-2" />
                                <span className="text-primary font-semibold text-base leading-relaxed italic">
                                    {content.emotionalLine}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={content.ctas[0].href} className="btn-primary flex items-center justify-center gap-2 min-h-[48px]">
                                    {content.ctas[0].label}
                                </Link>
                                <Link to={content.ctas[1].href} className="btn-outline flex items-center justify-center gap-2 min-h-[48px]">
                                    {content.ctas[1].label}
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Column (Trust Points) */}
                        <motion.div
                            className="flex-1 w-full"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.07 } }
                            }}
                        >
                            <div className="font-['Marcellus'] text-xs uppercase tracking-widest font-bold text-slate-400 mb-5">
                                Our Commitments
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {trustPoints.map((point, index) => {
                                    const Icon = point.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            variants={{
                                                hidden: { y: 20, opacity: 0 },
                                                visible: { y: 0, opacity: 1 }
                                            }}
                                            className="bg-slate-50 border border-slate-700/80 rounded-2xl px-5 py-4 flex items-start gap-4 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-md transition-all duration-300 group cursor-default"
                                        >
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="text-slate-700 text-sm font-medium leading-snug pt-0.5">
                                                {point.text}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* BOTTOM ZONE — Founder Authority + Gallery */}
            <section className="bg-primary-dark section-padding overflow-hidden">
                <div className="">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-12"></div>

                    <div className="content-container flex flex-col lg:flex-row items-start gap-12 mb-16">
                        {/* Left - Founder Photo */}
                        <motion.div
                            className="max-w-[240px] mx-auto lg:mx-0 lg:w-[280px] shrink-0"
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                        >
                            <div className="relative">
                                <img
                                    src={founderBlock.photoPlaceholder}
                                    alt={founderBlock.name}
                                    className="w-full object-cover object-center rounded-3xl aspect-[3/4]"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 translate-x-3 translate-y-3 -z-10"></div>
                            </div>

                            <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-center">
                                <div className="font-['Marcellus'] text-white font-bold text-lg">
                                    {founderBlock.name}
                                </div>
                                <div className="text-white/55 text-xs mt-0.5">
                                    {founderBlock.title}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Founder Content */}
                        <motion.div
                            className="flex-1 w-full"
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6">
                                <Crown className="w-3.5 h-3.5" />
                                <span className="font-['Marcellus']">{founderBlock.sectionLabel}</span>
                            </div>

                            <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-white font-bold mb-2">
                                {founderBlock.name}
                            </h3>
                            <p className="text-secondary-light text-base font-semibold mb-6">
                                {founderBlock.title}
                            </p>

                            <div className="space-y-3 mb-8">
                                {founderBlock.roles.map((role, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-secondary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-3 h-3 text-secondary-light" />
                                        </div>
                                        <span className="text-white/75 text-sm leading-relaxed">
                                            {role}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
                                <p className="text-white/80 text-sm leading-relaxed italic">
                                    "{founderBlock.impactStatement}"
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Gallery Strip */}
                    <motion.div
                        className="mt-12"
                        initial={{ x: 40, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="content-container flex items-center justify-between mb-6">
                            <div className="font-['Marcellus'] text-white/40 text-xs uppercase tracking-widest font-bold">
                                Recognition & Industry Presence
                            </div>
                        </div>

                        <div className="overflow-hidden -mx-4 px-4 md:-mx-8 md:px-8">
                            <div ref={sliderRef} className="keen-slider">
                                {galleryImages.concat(galleryImages).map((img, i) => (
                                    <div
                                        key={i}
                                        className={`keen-slider__slide rounded-2xl overflow-hidden border border-white/10 group ${img.aspect === 'portrait'
                                            ? 'min-w-[130px] h-[180px] sm:min-w-[160px] sm:h-[220px]'
                                            : 'min-w-[260px] h-[180px] sm:min-w-[320px] sm:h-[220px]'
                                            }`}
                                        style={{
                                            width: img.aspect === 'portrait' ? '160px' : '320px',
                                            flex: 'none'
                                        }}
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    );
}

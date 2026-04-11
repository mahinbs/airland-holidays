import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import {
    Plane,
    Banknote,
    Shield,
    PlaneTakeoff,
    Briefcase,
    Ship,
    Car,
    Crown,
    Building2,
    FileCheck,
    Users,
    Palette,
    Award,
    Clock,
    Globe,
    Handshake,
    Sparkles,
    Layers,
    ArrowRight,
    MessageCircle,
    type LucideIcon,
} from 'lucide-react';

const heroContent = {
    heading: 'Complete Travel Solutions Worldwide',
    subtext:
        'From flights to luxury experiences, we deliver personalised travel services backed by global partnerships and expert guidance.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2000&q=80',
    videoUrl: null as string | null,
    primaryCta: { label: 'Explore Services', href: '#services' },
    secondaryCta: { label: 'Plan Your Trip', href: '/contact' },
};

const trustItems: {
    icon: LucideIcon;
    value: string;
    label: string;
    numeric: boolean;
    target?: number;
}[] = [
    { icon: Award, value: 'IATA', label: 'Certified Agency', numeric: false },
    { icon: Clock, value: '20+', label: 'Years of Experience', numeric: true, target: 20 },
    { icon: Users, value: '10,000+', label: 'Happy Customers', numeric: true, target: 10000 },
    { icon: Globe, value: '100+', label: 'Countries Covered', numeric: true, target: 100 },
    { icon: Handshake, value: 'Global', label: 'Airline & Hotel Partnerships', numeric: false },
];

const services = [
    {
        id: 'flight-booking',
        icon: 'Plane' as const,
        title: 'Flight Booking',
        desc: 'Expert route planning with best fares across all major airlines worldwide.',
        valueStatement: 'Best fares. Every route. Every airline.',
        href: '/services/flight-booking',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
        badge: 'Most Booked',
        priority: true,
    },
    {
        id: 'forex',
        icon: 'Banknote' as const,
        title: 'Forex & Currency',
        desc: 'Secure, competitive currency exchange for all your travel destinations.',
        valueStatement: 'Competitive rates. Instant exchange.',
        href: '/services/forex',
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80',
        badge: 'Best Rates',
        priority: true,
    },
    {
        id: 'travel-insurance',
        icon: 'Shield' as const,
        title: 'Travel Insurance',
        desc: 'Complete protection for medical emergencies, cancellations, and lost baggage.',
        valueStatement: "Travel safe. We've got you covered.",
        href: '/services/travel-insurance',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        badge: 'Full Coverage',
        priority: true,
    },
    {
        id: 'charter',
        icon: 'PlaneTakeoff' as const,
        title: 'Chartered Flights & Helicopters',
        desc: 'Private and premium air travel for elite, remote, and exclusive journeys.',
        valueStatement: 'Fly private. Arrive in style.',
        href: '/services/charter',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
        badge: 'Premium',
        priority: true,
    },
    {
        id: 'corporate-travel',
        icon: 'Briefcase' as const,
        title: 'Corporate Travel Services',
        desc: 'Efficient, scalable travel management and 24/7 support for businesses of all sizes.',
        valueStatement: 'Business travel. Simplified.',
        href: '/services/corporate-travel',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
        badge: 'B2B',
        priority: false,
    },
    {
        id: 'cruise-booking',
        icon: 'Ship' as const,
        title: 'Cruise Bookings',
        desc: "Luxury cruise experiences and ocean voyages to the world's most scenic destinations.",
        valueStatement: 'Sail the world in absolute luxury.',
        href: '/services/cruise-booking',
        image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
        badge: 'Luxury',
        priority: false,
    },
    {
        id: 'transport',
        icon: 'Car' as const,
        title: 'Transport & Transfers',
        desc: 'Chauffeured airport transfers, car rentals, and seamless inter-city transport.',
        valueStatement: 'From runway to resort. Seamlessly.',
        href: '/services/transport',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
        badge: 'Door to Door',
        priority: false,
    },
    {
        id: 'luxury-tours',
        icon: 'Crown' as const,
        title: 'Private Luxury Tours',
        desc: 'Fully bespoke travel planning crafted around your desires, timeline, and style.',
        valueStatement: 'Your journey. Your rules. Our expertise.',
        href: '/services/luxury-tours',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        badge: 'Bespoke',
        priority: false,
    },
    {
        id: 'hotel-reservation',
        icon: 'Building2' as const,
        title: 'Hotel Reservations',
        desc: 'Exclusive perks at over 1,000 premium luxury hotels worldwide.',
        valueStatement: 'The best room. The best rate.',
        href: '/services/hotel-reservation',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        badge: 'Exclusive',
        priority: false,
    },
    {
        id: 'visa-assistance',
        icon: 'FileCheck' as const,
        title: 'Visa Assistance',
        desc: 'Expert visa processing for 50+ countries with 99% success rate.',
        valueStatement: 'We handle the paperwork. You travel.',
        href: '/visa',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
        badge: '99% Success',
        priority: false,
    },
    {
        id: 'group-travel',
        icon: 'Users' as const,
        title: 'Group Travel Planning',
        desc: 'Custom itineraries for corporate groups, weddings, and large travel parties.',
        valueStatement: 'Every group. Every destination.',
        href: '/services/group-travel',
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80',
        badge: 'Groups',
        priority: false,
    },
    {
        id: 'holiday-customisation',
        icon: 'Palette' as const,
        title: 'Holiday Customisation',
        desc: 'Tailor-made itineraries designed around your unique travel preferences.',
        valueStatement: 'Exactly how you imagined it.',
        href: '/services/holiday-customisation',
        image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80',
        badge: 'Tailored',
        priority: false,
    },
];

const partners = {
    airlines: [
        {
            name: 'Emirates',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
        },
        {
            name: 'Singapore Airlines',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/200px-Singapore_Airlines_Logo_2.svg.png',
        },
        {
            name: 'Qatar Airways',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/300px-Qatar_Airways_Logo.svg.png',
        },
        {
            name: 'Air India',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Air_India_Logo_2023.svg/300px-Air_India_Logo_2023.svg.png',
        },
        {
            name: 'British Airways',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png',
        },
        {
            name: 'IndiGo',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IndiGo_Airlines_logo.svg/300px-IndiGo_Airlines_logo.svg.png',
        },
    ],
    hotels: [
        {
            name: 'Marriott',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Marriott_logo.svg/200px-Marriott_logo.svg.png',
        },
        {
            name: 'Hilton',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hilton_Hotels_%26_Resorts_logo.svg/200px-Hilton_Hotels_%26_Resorts_logo.svg.png',
        },
        {
            name: 'Hyatt',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Hyatt_Logo.svg/200px-Hyatt_Logo.svg.png',
        },
        {
            name: 'IHG',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/IHG_Hotels_%26_Resorts_logo.svg/200px-IHG_Hotels_%26_Resorts_logo.svg.png',
        },
        {
            name: 'Accor',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Accor_Hotels_logo.svg/200px-Accor_Hotels_logo.svg.png',
        },
    ],
};

const premiumExperiences = [
    {
        title: 'Luxury Travel',
        sub: 'World-class hotels, private transfers, and curated experiences.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        href: '/experiences/luxury',
    },
    {
        title: 'Honeymoon Planning',
        sub: 'Romantic escapes tailored to your perfect love story.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        href: '/experiences/honeymoon',
    },
    {
        title: 'Corporate Travel',
        sub: 'Seamless business travel management for growing teams.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        href: '/services/corporate-travel',
    },
    {
        title: 'Custom Itineraries',
        sub: 'Every detail crafted around your unique travel vision.',
        image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
        href: '/services/holiday-customisation',
    },
];

const serviceIcons: Record<(typeof services)[number]['icon'], LucideIcon> = {
    Plane,
    Banknote,
    Shield,
    PlaneTakeoff,
    Briefcase,
    Ship,
    Car,
    Crown,
    Building2,
    FileCheck,
    Users,
    Palette,
};

const priorityServices = services.filter((s) => s.priority);
const secondaryServices = services.filter((s) => !s.priority);

function formatCountDisplay(count: number, target: number): string {
    if (target >= 1000) {
        return `${Math.round((count / 1000) * 10) / 10}K+`;
    }
    return `${count}+`;
}

function useCountUp(target: number, active: boolean) {
    const [count, setCount] = useState(0);
    const doneRef = useRef(false);

    useEffect(() => {
        if (!active || doneRef.current) return;
        doneRef.current = true;
        let rafId = 0;
        let cancelled = false;
        const start = performance.now();
        const duration = 1500;
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
            if (cancelled) return;
            const elapsed = now - start;
            const p = Math.min(1, elapsed / duration);
            setCount(Math.round(easeOut(p) * target));
            if (p < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => {
            cancelled = true;
            cancelAnimationFrame(rafId);
        };
    }, [active, target]);

    return count;
}

function TrustNumericValue({ target, active }: { target: number; active: boolean }) {
    const c = useCountUp(target, active);
    return (
        <span className="font-['Marcellus'] font-bold text-slate-900 text-xl md:text-2xl">
            {formatCountDisplay(c, target)}
        </span>
    );
}

function TrustValue({
    item,
    active,
}: {
    item: (typeof trustItems)[number];
    active: boolean;
}) {
    if (!item.numeric || item.target === undefined) {
        return (
            <span className="font-['Marcellus'] font-bold text-slate-900 text-xl md:text-2xl">
                {item.value}
            </span>
        );
    }
    return <TrustNumericValue target={item.target} active={active} />;
}

const heroContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const heroChild = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

const trustContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const trustChild = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const priorityContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const priorityChild = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1 },
};

const secondaryContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const secondaryChild = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

const experiencesContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const experiencesChild = {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
};

export default function Services() {
    const trustRef = useRef(null);
    const trustInView = useInView(trustRef, { once: true, margin: '-80px' });

    const [airlinesRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            renderMode: 'performance',
            drag: false,
            slides: { perView: 'auto', spacing: 56 },
            created(s) {
                s.moveToIdx(5, true, { duration: 15000, easing: (t) => t });
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, { duration: 15000, easing: (t) => t });
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, { duration: 15000, easing: (t) => t });
            },
        },
        [
            (slider) => {
                slider.container.addEventListener('mouseover', () => {
                    slider.animator.stop();
                });
                slider.container.addEventListener('mouseout', () => {
                    slider.moveToIdx(slider.track.details.abs + 5, true, { duration: 15000, easing: (t) => t });
                });
            },
        ]
    );

    const [hotelsRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            renderMode: 'performance',
            drag: false,
            slides: { perView: 'auto', spacing: 56 },
            created(s) {
                s.moveToIdx(5, true, { duration: 20000, easing: (t) => t });
            },
            updated(s) {
                s.moveToIdx(s.track.details.abs + 5, true, { duration: 20000, easing: (t) => t });
            },
            animationEnded(s) {
                s.moveToIdx(s.track.details.abs + 5, true, { duration: 20000, easing: (t) => t });
            },
        },
        [
            (slider) => {
                slider.container.addEventListener('mouseover', () => {
                    slider.animator.stop();
                });
                slider.container.addEventListener('mouseout', () => {
                    slider.moveToIdx(slider.track.details.abs + 5, true, { duration: 20000, easing: (t) => t });
                });
            },
        ]
    );

    return (
        <div className="bg-slate-50 min-h-screen overflow-x-clip pb-20 md:pb-0">
            {/* —— Hero —— */}
            <section className="relative min-h-[100svh] flex flex-col">
                <div className="absolute inset-0">
                    {heroContent.videoUrl ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                            src={heroContent.videoUrl}
                        />
                    ) : (
                        <img
                            src={heroContent.image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="eager"
                            decoding="async"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/55 to-slate-900/15" />
                </div>

                <motion.div
                    className="relative z-20 mt-auto flex w-full justify-center px-6 pb-14 md:justify-start md:px-16"
                    variants={heroContainer}
                    initial="hidden"
                    animate="show"
                >
                    <div className="w-full max-w-3xl text-center md:text-left">
                        <motion.span
                            variants={heroChild}
                            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-md"
                        >
                            <Sparkles className="h-3.5 w-3.5 shrink-0" />
                            Premium Travel Services
                        </motion.span>
                        <motion.h1
                            variants={heroChild}
                            className="font-['Marcellus'] leading-[1.08] text-white [font-size:clamp(2.8rem,5vw,5.5rem)]"
                        >
                            {heroContent.heading}
                        </motion.h1>
                        <motion.p
                            variants={heroChild}
                            className="mx-auto mt-4 max-w-2xl text-lg font-light text-white/75 md:mx-0 md:text-xl"
                        >
                            {heroContent.subtext}
                        </motion.p>
                        <motion.div
                            variants={heroChild}
                            className="mt-8 flex min-h-[48px] flex-wrap justify-center gap-4 md:justify-start"
                        >
                            <a
                                href={heroContent.primaryCta.href}
                                className="btn-primary flex min-h-[48px] items-center gap-2 px-8 py-4"
                            >
                                {heroContent.primaryCta.label}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={heroContent.secondaryCta.href}
                                className="flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                            >
                                {heroContent.secondaryCta.label}
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* —— Trust strip —— */}
            <div ref={trustRef} className="border-b border-slate-100 bg-white py-7">
                <div className="content-container">
                    <motion.div
                        className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-4"
                        variants={trustContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-40px' }}
                    >
                        {trustItems.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.label}
                                    variants={trustChild}
                                    className={`flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left ${
                                        idx !== trustItems.length - 1 ? 'md:border-r md:border-slate-200 md:pr-4' : ''
                                    }`}
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <TrustValue item={item} active={trustInView} />
                                        <p className="text-xs font-medium leading-tight text-slate-500">
                                            {item.label}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* —— Services —— */}
            <section id="services" className="section-padding bg-slate-50">
                <div className="content-container">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                            <Layers className="h-3.5 w-3.5" />
                            What We Offer
                        </span>
                        <h2 className="mb-4 mt-3 font-['Marcellus'] text-3xl text-slate-900 md:text-5xl">
                            Our Service Portfolio
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-slate-500">
                            Trusted by regular travellers and corporate clients for personalised,
                            end-to-end travel solutions.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
                        variants={priorityContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {priorityServices.map((srv) => {
                            const Icon = serviceIcons[srv.icon];
                            return (
                                <motion.div key={srv.id} variants={priorityChild}>
                                    <a
                                        href={srv.href}
                                        className="group relative block h-[240px] overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:h-[280px] md:h-[320px]"
                                    >
                                        <img
                                            src={srv.image}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/40 to-black/10" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100" />
                                        <span className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                                            {srv.badge}
                                        </span>
                                        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end p-6">
                                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm">
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="mb-1.5 font-['Marcellus'] text-xl font-bold leading-tight text-white">
                                                {srv.title}
                                            </h3>
                                            <p className="text-sm font-light leading-snug text-white/80">
                                                {srv.valueStatement}
                                            </p>
                                            <span className="mt-3 inline-flex translate-y-3 items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 w-fit">
                                                Learn more
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        className="mt-2 space-y-4"
                        variants={secondaryContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-40px' }}
                    >
                        {secondaryServices.map((srv) => {
                            const Icon = serviceIcons[srv.icon];
                            return (
                                <motion.div key={srv.id} variants={secondaryChild}>
                                    <a
                                        href={srv.href}
                                        className="group flex min-h-[48px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:border-primary/25 hover:shadow-xl sm:flex-row sm:items-stretch"
                                    >
                                        <div className="relative h-[140px] w-full shrink-0 overflow-hidden sm:h-auto sm:w-[180px] md:w-[220px]">
                                            <img
                                                src={srv.image}
                                                alt=""
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center p-5 md:p-7">
                                            <span className="mb-3 inline-block self-start rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-primary/60">
                                                {srv.badge}
                                            </span>
                                            <div className="mb-1 flex items-center gap-2">
                                                <Icon className="h-5 w-5 shrink-0 text-primary/70" />
                                                <h3 className="font-['Marcellus'] text-lg text-slate-900 transition-colors group-hover:text-primary md:text-xl">
                                                    {srv.title}
                                                </h3>
                                            </div>
                                            <p className="mb-2 text-sm font-semibold text-primary">
                                                {srv.valueStatement}
                                            </p>
                                            <p className="text-sm leading-relaxed text-slate-500">{srv.desc}</p>
                                            <div className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-bold text-primary transition-all group-hover:gap-3">
                                                View service
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* —— Partnerships —— */}
            <section className="bg-slate-900 py-16">
                <div className="content-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-2 text-center font-['Marcellus'] text-3xl text-white md:text-4xl">
                            Our Global Travel Network
                        </h2>
                        <p className="mb-12 text-center font-light text-white/55">
                            Partnered with leading airlines and hotel groups worldwide
                        </p>
                    </motion.div>

                    <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-white/40">
                        Airline Partners
                    </p>
                    <div className="overflow-hidden">
                        <div ref={airlinesRef} className="keen-slider">
                            {[...partners.airlines, ...partners.airlines].map((p, i) => (
                                <div key={`${p.name}-${i}`} className="keen-slider__slide flex items-center justify-center" style={{ minWidth: 140, maxWidth: 140 }}>
                                    <img
                                        src={p.logo}
                                        alt={p.name}
                                        className="h-8 w-full cursor-pointer object-contain opacity-100 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 brightness-200"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="my-10 border-t border-white/10" />

                    <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-white/40">
                        Hotel Partners
                    </p>
                    <div className="overflow-hidden">
                        <div ref={hotelsRef} className="keen-slider">
                            {[...partners.hotels, ...partners.hotels].map((p, i) => (
                                <div key={`${p.name}-${i}`} className="keen-slider__slide flex items-center justify-center" style={{ minWidth: 140, maxWidth: 140 }}>
                                    <img
                                        src={p.logo}
                                        alt={p.name}
                                        className="h-8 w-full cursor-pointer object-contain grayscale-0 brightness-200 transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* —— Premium experiences —— */}
            <section className="section-padding bg-white">
                <div className="content-container">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-3 font-['Marcellus'] text-3xl text-slate-900 md:text-4xl">
                            Curated Premium Travel Experiences
                        </h2>
                        <p className="font-light text-slate-500">
                            Crafted for those who expect the extraordinary
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        variants={experiencesContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        {premiumExperiences.map((exp) => (
                            <motion.div key={exp.title} variants={experiencesChild}>
                                <a
                                    href={exp.href}
                                    className="group relative block h-[300px] cursor-pointer overflow-hidden rounded-3xl shadow-md transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-2xl md:h-[360px]"
                                >
                                    <img
                                        src={exp.image}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                                    <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
                                        <h3 className="mb-2 font-['Marcellus'] text-2xl font-bold text-white">
                                            {exp.title}
                                        </h3>
                                        <p className="mb-5 text-sm font-light leading-snug text-white/70">{exp.sub}</p>
                                        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary">
                                            Explore
                                            <ArrowRight className="h-3 w-3" />
                                        </span>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* —— Final CTA —— */}
            <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=2000&q=80"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/50" />
                <motion.div
                    className="relative z-10 mx-auto max-w-3xl px-6 text-center py-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                >
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/80">
                        <Sparkles className="h-3.5 w-3.5" />
                        Start Planning Today
                    </span>
                    <h2 className="mb-5 font-['Marcellus'] leading-[1.1] text-white [font-size:clamp(2.5rem,5vw,4.5rem)]">
                        Your Perfect Journey Starts Here
                    </h2>
                    <p className="mx-auto mb-10 max-w-xl text-xl font-light text-white/65">
                        Let our experts craft a travel experience that exceeds every expectation.
                    </p>
                    <div className="flex min-h-[48px] flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                        <a
                            href="/contact"
                            className="btn-primary flex min-h-[48px] items-center justify-center gap-2 px-10 py-5 text-lg"
                        >
                            Plan My Trip
                            <ArrowRight className="h-5 w-5" />
                        </a>
                        <a
                            href="https://wa.me/919090403075"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-white/10"
                        >
                            <MessageCircle className="h-5 w-5" />
                            WhatsApp Us
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
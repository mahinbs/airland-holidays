import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { motion } from 'framer-motion';
import {
    MapPin, Sun, Info, Clock, Wallet, FileCheck, Plane, Star,
    Heart, Users, User, Briefcase, Utensils, ShoppingBag,
    AlertTriangle, CheckCircle2, XCircle, ArrowRight, Instagram, ArrowLeft
} from 'lucide-react';

const mockCountryData = {
    name: 'Indonesia',
    slug: 'indonesia',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2000&q=80',
    description: 'A tropical archipelago of 17,000+ islands where ancient temples meet turquoise waters, lush rice terraces, and one of the world\'s most vibrant cultures.',

    overview: {
        timeZone: 'WIB UTC+7 / WITA UTC+8 / WIT UTC+9',
        currency: 'Indonesian Rupiah (IDR)',
        language: 'Bahasa Indonesia',
        callingCode: '+62',
        visaType: 'Visa on Arrival',
        visaBadge: 'voa',
        bestTime: 'Apr – Oct (Dry Season)',
        capital: 'Jakarta',
        continent: 'Asia',
    },

    insights: {
        annualVisitors: '16.1M',
        genderSplit: { male: 54, female: 46 },
        travelPurpose: [
            { type: 'Couples & Honeymoon', percent: 38, icon: Heart },
            { type: 'Family', percent: 27, icon: Users },
            { type: 'Solo Travellers', percent: 21, icon: User },
            { type: 'Business', percent: 14, icon: Briefcase },
        ],
        topIndianCities: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'],
    },

    about: 'Indonesia is not a single destination — it is a universe of experiences. From the spiritual serenity of Bali\'s rice terraces to the raw wildness of Komodo Island, from Jakarta\'s electric energy to the untouched beauty of Raja Ampat, every island tells a different story. It is one of the most biodiverse nations on earth, with a culture that is as warm as its tropical climate.',

    whyIndians: [
        { icon: FileCheck, title: 'Visa on Arrival', desc: 'Indian passport holders get 30-day VOA — no pre-approval needed.' },
        { icon: Wallet, title: 'Budget Friendly', desc: 'Outstanding value for money. INR goes far in Bali and Java.' },
        { icon: Plane, title: 'Direct Flights', desc: 'Direct flights from Mumbai, Delhi, and Chennai to Bali (DPS).' },
        { icon: Star, title: 'World-Famous Attractions', desc: 'Bali, Komodo, Borobudur — iconic destinations at every turn.' },
    ],

    bestTime: [
        { month: 'Jan', weather: 'Rainy', score: 2 },
        { month: 'Feb', weather: 'Rainy', score: 2 },
        { month: 'Mar', weather: 'Transition', score: 3 },
        { month: 'Apr', weather: 'Dry Start', score: 4 },
        { month: 'May', weather: 'Best', score: 5 },
        { month: 'Jun', weather: 'Best', score: 5 },
        { month: 'Jul', weather: 'Best', score: 5 },
        { month: 'Aug', weather: 'Best', score: 5 },
        { month: 'Sep', weather: 'Best', score: 5 },
        { month: 'Oct', weather: 'Good', score: 4 },
        { month: 'Nov', weather: 'Transition', score: 3 },
        { month: 'Dec', weather: 'Rainy', score: 2 },
    ],

    attractions: [
        { name: 'Tegalalang Rice Terraces', category: 'Nature', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80' },
        { name: 'Uluwatu Temple', category: 'Cultural', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80' },
        { name: 'Mount Bromo', category: 'Adventure', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80' },
        { name: 'Komodo Island', category: 'Nature', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80' },
        { name: 'Kuta Beach', category: 'City', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
        { name: 'Borobudur Temple', category: 'Cultural', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80' },
    ],

    cultural: {
        food: ['Nasi Goreng', 'Satay', 'Rendang', 'Gado-Gado', 'Babi Guling (Bali)'],
        shopping: ['Batik Fabric', 'Silver Jewelry (Ubud)', 'Wooden Carvings', 'Kopi Luwak Coffee'],
        etiquette: [
            'Remove shoes before entering temples and homes',
            'Dress modestly at religious sites — sarongs provided',
            'Use right hand for giving and receiving',
            'Avoid pointing feet at people or sacred objects',
        ],
        dosDonts: [
            'Do: Greet with "Selamat" and a slight bow',
            'Don\'t: Touch anyone\'s head — considered sacred',
            'Do: Bargain respectfully at local markets',
            'Don\'t: Raise your voice — locals prefer calm interaction',
        ],
    },

    instagramSpots: [
        { name: 'Bali Swing, Ubud', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=400&q=80' },
        { name: 'Gates of Heaven, Lempuyang', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80' },
        { name: 'Pink Beach, Komodo', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80' },
        { name: 'Tanah Lot at Sunset', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
        { name: 'Mount Batur Sunrise', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=400&q=80' },
        { name: 'Tegalalang Rice Terrace View', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80' },
    ],

    packages: [
        { id: 1, title: 'Bali Bliss & Temples', destination: 'Bali, Indonesia', duration: '7 Days', price: 1200, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80', tags: ['Best Seller'], category: 'Family' },
        { id: 4, title: 'Romantic Bali Escape', destination: 'Bali, Indonesia', duration: '5 Days', price: 950, rating: 4.7, reviews: 88, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', tags: ['Honeymoon'], category: 'Honeymoon' },
        { id: 9, title: 'Komodo & Lombok Explorer', destination: 'Lombok, Indonesia', duration: '8 Days', price: 1800, rating: 4.9, reviews: 56, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', tags: ['Adventure'], category: 'Solo' },
        { id: 11, title: 'Java & Bali Cultural Circuit', destination: 'Java & Bali', duration: '10 Days', price: 2100, rating: 4.8, reviews: 42, image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80', tags: ['Culture'], category: 'Family' },
    ],

    audienceSuggestions: [
        {
            type: 'Honeymoon',
            emoji: '💍',
            tagline: 'Romance in Paradise',
            desc: 'Overwater villas, sunset dinners, and secluded beaches. Bali is consistently rated Asia\'s top honeymoon destination.',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
            filterCategory: 'Honeymoon',
        },
        {
            type: 'Family',
            emoji: '👨‍👩‍👧',
            tagline: 'Memories for Everyone',
            desc: 'Cultural temples, wildlife parks, and safe beaches. Indonesia offers something magical for every age group.',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
            filterCategory: 'Family',
        },
        {
            type: 'Solo Trip',
            emoji: '🧔',
            tagline: 'Adventure Awaits',
            desc: 'Surf breaks, volcano treks, dive sites, and world-class nightlife. Indonesia is built for adventure seekers.',
            image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80',
            filterCategory: 'Solo',
        },
        {
            type: 'Girls Trip',
            emoji: '👩',
            tagline: 'Bliss, Beauty & Beyond',
            desc: 'Wellness retreats in Ubud, spa days, beach clubs, and vibrant markets. Bali is the ultimate girls\' getaway.',
            image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80',
            filterCategory: 'Solo',
        },
    ],
};

export default function DestinationDetail() {
    const { country } = useParams();
    // Using simple mock data logic for now
    const data = mockCountryData;

    // In a real app we would pick based on country parameter

    const [activeAttractionCat, setActiveAttractionCat] = useState('All');
    const [activePackageCat, setActivePackageCat] = useState('All');

    const filteredAttractions = activeAttractionCat === 'All'
        ? data.attractions
        : data.attractions.filter(a => a.category === activeAttractionCat);

    const filteredPackages = activePackageCat === 'All'
        ? data.packages
        : data.packages.filter(p => p.category === activePackageCat);

    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            renderMode: "performance",
            drag: true,
            slides: {
                perView: 2.2,
                spacing: 12,
            },
            breakpoints: {
                '(min-width: 640px)': {
                    slides: { perView: 3.2, spacing: 16 },
                },
                '(min-width: 1024px)': {
                    slides: { perView: 4.2, spacing: 20 },
                },
                '(min-width: 1280px)': {
                    slides: { perView: 5.2, spacing: 24 },
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
                    }, 2500);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    const handleExplorePackages = () => {
        const el = document.getElementById('packages');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen pb-20 md:pb-0 font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90svh] w-full bg-slate-900 overflow-hidden flex items-end">
                <img
                    src={data.heroImage}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />

                <Link to="/destinations" className="absolute top-8 left-6 md:left-16 z-20 text-white/70 hover:text-white text-sm flex items-center gap-2 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> All Destinations
                </Link>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="relative z-20 pb-14 px-6 md:px-16 w-full text-center md:text-left flex flex-col md:items-start items-center"
                >
                    <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="text-secondary font-bold text-xs uppercase tracking-widest mb-3 block">
                        {data.overview.continent}
                    </motion.span>

                    <motion.h1 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="text-white font-marcellus text-[clamp(3rem,6vw,6rem)] leading-[1.05] mb-4 drop-shadow-lg capitalize">
                        {country?.replace('-', ' ') || data.name}
                    </motion.h1>

                    <motion.p variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="text-white/75 font-light text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
                        {data.description}
                    </motion.p>

                    <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                        {data.overview.visaBadge === 'voa' && (
                            <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md">
                                Visa On Arrival
                            </span>
                        )}
                        {data.overview.visaBadge === 'free' && (
                            <span className="bg-green-500/20 border border-green-400/40 text-green-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md">
                                Visa Free
                            </span>
                        )}
                        {data.overview.visaBadge === 'required' && (
                            <span className="bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md">
                                Visa Required
                            </span>
                        )}
                        <button onClick={handleExplorePackages} className="btn-primary flex items-center gap-2 px-8 py-4 text-base shadow-xl">
                            Explore Packages <ArrowRight className="w-5 h-5" />
                        </button>
                        <Link to="/contact" className="border-2 border-white/40 text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm">
                            Plan My Trip
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. QUICK COUNTRY OVERVIEW BAR */}
            <div className="bg-white border-b border-slate-100 py-5 shadow-sm relative w-full overflow-hidden hidden md:block">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="content-container overflow-x-auto scrollbar-hide"
                >
                    <div className="flex items-center justify-between gap-8 md:gap-4 lg:gap-8 min-w-max w-full px-4 md:px-0">
                        <div className="flex flex-col items-center text-center gap-1 md:pr-4 lg:pr-8 md:border-r border-slate-100">
                            <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1" />
                            <span className="text-slate-200 text-[10px] uppercase tracking-widest font-bold">Time Zone</span>
                            <span className="text-slate-900 font-bold text-[13px] lg:text-sm font-marcellus whitespace-nowrap">{data.overview.timeZone}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 md:pr-4 lg:pr-8 md:border-r border-slate-100">
                            <Wallet className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1" />
                            <span className="text-slate-200 text-[10px] uppercase tracking-widest font-bold">Currency</span>
                            <span className="text-slate-900 font-bold text-[13px] lg:text-sm font-marcellus whitespace-nowrap">{data.overview.currency}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 md:pr-4 lg:pr-8 md:border-r border-slate-100">
                            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1" />
                            <span className="text-slate-200 text-[10px] uppercase tracking-widest font-bold">Language</span>
                            <span className="text-slate-900 font-bold text-[13px] lg:text-sm font-marcellus whitespace-nowrap">{data.overview.language}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 md:pr-4 lg:pr-8 md:border-r border-slate-100">
                            <Info className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1" />
                            <span className="text-slate-200 text-[10px] uppercase tracking-widest font-bold">Calling Code</span>
                            <span className="text-slate-900 font-bold text-[13px] lg:text-sm font-marcellus whitespace-nowrap">{data.overview.callingCode}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 md:pr-4 lg:pr-8 md:border-r border-slate-100">
                            <FileCheck className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1" />
                            <span className="text-slate-200 text-[10px] uppercase tracking-widest font-bold">Visa Type</span>
                            <span className="text-slate-900 font-bold text-[13px] lg:text-sm font-marcellus whitespace-nowrap">{data.overview.visaType}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <Sun className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1" />
                            <span className="text-slate-200 text-[10px] uppercase tracking-widest font-bold">Best Time</span>
                            <span className="text-slate-900 font-bold text-[13px] lg:text-sm font-marcellus whitespace-nowrap">{data.overview.bestTime}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="content-container mt-8 flex flex-col xl:flex-row gap-8 lg:px-4">
                <main className="xl:w-2/3">

                    {/* 3. TRAVEL INSIGHTS & VISITOR STATISTICS */}
                    <section className="bg-slate-50 rounded-3xl p-5 md:p-6 mb-8 border border-slate-100 overflow-hidden">
                        <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 mb-1">Who Travels to {data.name}?</h2>
                        <p className="text-slate-500 font-light text-sm mb-6">Real visitor data to help you plan with confidence</p>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {/* Key Metrics */}
                            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-center">
                                <div className="mb-4 border-b border-slate-100 pb-3">
                                    <h4 className="font-marcellus text-4xl text-primary mb-1">{data.insights.annualVisitors}</h4>
                                    <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">Annual Visitors</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-700">
                                        <span>👨 {data.insights.genderSplit.male}% Male</span>
                                        <span>👩 {data.insights.genderSplit.female}% Female</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex w-full">
                                        <motion.div initial={{ width: "0%" }} whileInView={{ width: `${data.insights.genderSplit.male}%` }} viewport={{ once: true }} className="bg-primary h-full transition-all duration-1000" />
                                        <motion.div initial={{ width: "0%" }} whileInView={{ width: `${data.insights.genderSplit.female}%` }} viewport={{ once: true }} className="bg-secondary h-full transition-all duration-1000" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Travel Purpose */}
                            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                                <h3 className="font-marcellus text-lg text-slate-900 mb-4">Travel Purpose</h3>
                                <div className="flex flex-col gap-3">
                                    {data.insights.travelPurpose.map((p, i) => (
                                        <div key={i}>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                                    <p.icon className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="flex-1 flex justify-between items-center">
                                                    <span className="font-semibold text-slate-700 text-xs">{p.type}</span>
                                                    <span className="font-black text-primary text-xs">{p.percent}%</span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden">
                                                <motion.div initial={{ width: "0%" }} whileInView={{ width: `${p.percent}%` }} viewport={{ once: true }} className="h-full bg-primary transition-all duration-1000" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Top Cities */}
                            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <h3 className="font-marcellus text-xl text-slate-900 mb-5">Top Cities from India</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.insights.topIndianCities.map((city, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                                            <span>🇮🇳</span> {city}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* 4. ABOUT THE DESTINATION */}
                    <section className="mb-10">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 lg:w-3/5">
                                <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-2 block">Destination Deep Dive</span>
                                <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 mb-4">About {data.name}</h2>
                                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">{data.about}</p>
                            </motion.div>
                            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 lg:w-2/5 w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 shrink-0">
                                <img src={data.heroImage} alt="About destination" className="w-full h-full object-cover" loading="lazy" />
                            </motion.div>
                        </div>
                    </section>

                    {/* 5. WHY INDIANS PREFER THIS DESTINATION */}
                    <section className="mb-10 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                        <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 text-center mb-6">Why Indians Love {data.name}</h2>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {data.whyIndians.map((reason, i) => (
                                <motion.div key={i} variants={{ hidden: { y: 20, scale: 0.97, opacity: 0 }, visible: { y: 0, scale: 1, opacity: 1 } }} className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                            <reason.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-marcellus text-lg text-slate-900">{reason.title}</h3>
                                    </div>
                                    <p className="text-slate-500 text-xs leading-relaxed">{reason.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                    {/* 6. BEST TIME TO VISIT */}
                    <section className="mb-10">
                        <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 mb-1">Best Time to Visit {data.name}</h2>
                        <p className="text-slate-500 font-light text-sm mb-6">Plan your trip around the best weather and seasonal experiences.</p>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
                            className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-0 snap-x"
                        >
                            {data.bestTime.map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 min-w-[50px] snap-center">
                                    <div className="w-full h-[80px] bg-slate-100 rounded-lg relative overflow-hidden">
                                        <motion.div
                                            variants={{ hidden: { height: "0%" }, visible: { height: `${item.score * 20}%` } }}
                                            className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all duration-1000 ${item.score === 5 ? 'bg-green-400' :
                                                item.score === 4 ? 'bg-primary/70' :
                                                    item.score === 3 ? 'bg-amber-300' : 'bg-slate-300'
                                                }`}
                                        />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase">{item.month}</span>
                                    <span className="text-[9px] text-slate-200 text-center uppercase tracking-tighter hidden md:block">{item.weather}</span>
                                </div>
                            ))}
                        </motion.div>

                        <div className="flex gap-4 justify-center mt-6 md:mt-8 flex-wrap">
                            <span className="flex items-center gap-1.5 text-xs text-slate-600 font-bold"><span className="w-3 h-3 rounded-full bg-green-400 block" /> Best</span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-600 font-bold"><span className="w-3 h-3 rounded-full bg-primary/70 block" /> Good</span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-600 font-bold"><span className="w-3 h-3 rounded-full bg-amber-300 block" /> Transition</span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-600 font-bold"><span className="w-3 h-3 rounded-full bg-slate-300 block" /> Rainy</span>
                        </div>
                    </section>

                    {/* 7. ATTRACTIONS & EXPERIENCES */}
                    <section className="mb-14 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100">
                        <h2 className="font-marcellus text-3xl md:text-4xl text-slate-900 mb-8">Top Attractions</h2>

                        <div className="flex gap-2 flex-wrap mb-8">
                            {['All', 'Nature', 'Cultural', 'Adventure', 'City'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveAttractionCat(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border ${activeAttractionCat === cat ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <motion.div
                            key={activeAttractionCat}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        >
                            {filteredAttractions.map((attr, i) => (
                                <motion.div key={i} variants={{ hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 } }} className="relative rounded-2xl overflow-hidden group cursor-pointer h-[200px] md:h-[240px] shadow-sm">
                                    <img src={attr.image} alt={attr.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                        {attr.category}
                                    </span>
                                    <h4 className="absolute bottom-4 left-4 right-4 font-marcellus text-white text-lg font-bold leading-tight drop-shadow-md">{attr.name}</h4>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                    {/* 8. CULTURAL & PRACTICAL INSIGHTS */}
                    <section className="mb-14">
                        <h2 className="font-marcellus text-3xl md:text-4xl text-slate-900 text-center mb-10">Cultural & Travel Insights</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <Utensils className="w-5 h-5 text-orange-500" />
                                    <h3 className="font-marcellus text-lg text-slate-900">Food to Try</h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {data.cultural.food.map((item, i) => (
                                        <span key={i} className="bg-white border border-orange-200 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">{item}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 shadow-sm flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <ShoppingBag className="w-5 h-5 text-purple-500" />
                                    <h3 className="font-marcellus text-lg text-slate-900">Shopping</h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {data.cultural.shopping.map((item, i) => (
                                        <span key={i} className="bg-white border border-purple-200 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">{item}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <Info className="w-5 h-5 text-blue-500" />
                                    <h3 className="font-marcellus text-lg text-slate-900">Etiquette</h3>
                                </div>
                                <ul className="space-y-2">
                                    {data.cultural.etiquette.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-tight">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-900 rounded-2xl p-5 shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                                    <h3 className="font-marcellus text-lg text-white">Do's & Don'ts</h3>
                                </div>
                                <ul className="space-y-2">
                                    {data.cultural.dosDonts.map((item, i) => {
                                        const isDo = item.startsWith('Do:');
                                        return (
                                            <li key={i} className="flex items-start gap-2 text-xs leading-tight">
                                                {isDo ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />}
                                                <span className="text-white/80">{item.replace(/^(Do:|Don't:)\s*/, '')}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 9. INSTAGRAM SPOTS */}
                    <section className="mb-10 overflow-hidden bg-slate-50 p-5 md:p-8 rounded-3xl border border-slate-100">
                        <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 mb-1">Instagram Spots</h2>
                        <p className="text-slate-500 font-light text-sm mb-6">Trending locations for your travel gallery</p>

                        <div ref={sliderRef} className="keen-slider py-4">
                            {data.instagramSpots.map((spot, i) => (
                                <div key={i} className="keen-slider__slide">
                                    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-slate-100/10">
                                        <img src={spot.image} alt={spot.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-700" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                            <Instagram className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h4 className="font-marcellus text-white text-sm font-bold leading-tight drop-shadow-lg group-hover:text-secondary transition-colors line-clamp-2">{spot.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 10. PACKAGE LISTING */}
                    <section id="packages" className="mb-10 pt-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                            <div>
                                <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 mb-1">Packages for {data.name}</h2>
                                <p className="text-slate-500 font-light text-sm">Curated itineraries crafted by destination experts.</p>
                            </div>
                            <div className="flex justify-between items-center bg-white border border-slate-200 shadow-sm rounded-lg px-3 py-2 shrink-0">
                                <select className="bg-transparent text-xs font-bold text-slate-700 outline-none w-full cursor-pointer">
                                    <option>Popular</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Duration</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-1.5 flex-wrap">
                                {['All', 'Honeymoon', 'Family', 'Solo', 'Adventure', 'Culture'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActivePackageCat(cat)}
                                        className={`px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-bold transition-all shadow-sm border ${activePackageCat === cat ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <p className="text-slate-200 text-xs font-bold uppercase tracking-wider hidden sm:block">{filteredPackages.length} found</p>
                        </div>

                        <motion.div
                            key={activePackageCat}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                            {filteredPackages.map((pkg) => (
                                <motion.div key={pkg.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                    <Link to={`/packages/${pkg.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 h-full flex flex-col">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500" loading="lazy" />
                                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                                {pkg.tags?.map((tag, i) => (
                                                    <span key={i} className="bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-900 rounded-sm shadow-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-slate-700 shadow-sm flex items-center gap-1 border border-white/20">
                                                <Clock className="w-3 h-3 text-primary" /> {pkg.duration}
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold mb-2 uppercase tracking-widest">
                                                <MapPin className="w-3 h-3 text-secondary" /> {pkg.destination}
                                            </div>
                                            <h3 className="text-lg font-marcellus font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                {pkg.title}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-4 text-xs">
                                                <Star className="w-3 h-3 fill-secondary text-secondary" />
                                                <span className="font-bold text-slate-700">{pkg.rating}</span>
                                                <span className="text-slate-200">({pkg.reviews})</span>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] uppercase tracking-widest text-slate-200 font-bold mb-0.5">From</span>
                                                    <div className="flex items-baseline gap-0.5">
                                                        <span className="text-base font-bold text-slate-900">${pkg.price}</span>
                                                    </div>
                                                </div>
                                                <Link to="/contact" className="bg-primary/5 hover:bg-primary text-primary hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                                    Enquire
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="text-center mt-8">
                            <Link to={`/packages?destination=${data.slug}`} className="btn-outline inline-flex items-center gap-2 mx-auto">
                                View All Packages <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </section>

                    {/* 11. AUDIENCE-BASED SUGGESTIONS */}
                    <section className="mb-10 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                        <h2 className="font-marcellus text-2xl md:text-3xl text-slate-900 text-center mb-1">Plan by Travel Style</h2>
                        <p className="text-slate-500 font-light text-sm text-center mb-6">Select a curated path tailored to your group.</p>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {data.audienceSuggestions.map((aud, i) => (
                                <motion.div key={i} variants={{ hidden: { y: 30, scale: 0.96, opacity: 0 }, visible: { y: 0, scale: 1, opacity: 1 } }} >
                                    <div
                                        className="relative rounded-2xl overflow-hidden group cursor-pointer h-[220px] md:h-[260px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 border border-slate-200/50"
                                        onClick={() => {
                                            setActivePackageCat(aud.filterCategory);
                                            handleExplorePackages();
                                        }}
                                    >
                                        <img src={aud.image} alt={aud.type} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />

                                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col items-start">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl drop-shadow-md block">{aud.emoji}</span>
                                                <h3 className="font-marcellus text-xl text-white font-bold drop-shadow-md">{aud.type}</h3>
                                            </div>
                                            <p className="text-secondary font-bold text-[10px] mb-2 uppercase tracking-widest drop-shadow-sm">{aud.tagline}</p>
                                            <p className="text-white/80 text-xs font-medium leading-relaxed mb-4 line-clamp-2">{aud.desc}</p>

                                            <button className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-white hover:text-primary transition-all shadow-lg">
                                                Packages <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                </main>

                {/* SIDEBAR */}
                <aside className="xl:w-1/3 mt-8 xl:mt-0 pb-10">
                    <div className="sticky top-28 space-y-5">

                        {/* Sidebar Package Minis */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg">
                            <h3 className="font-marcellus text-xl text-slate-900 mb-3 pb-3 border-b border-slate-100">
                                Packages for {data.name}
                            </h3>

                            <div className="space-y-2">
                                {data.packages.slice(0, 4).map(pkg => (
                                    <Link key={pkg.id} to={`/packages/${pkg.id}`} className="group flex gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all">
                                        <div className="w-[60px] h-[60px] shrink-0 rounded-lg overflow-hidden shadow-sm">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center py-0.5">
                                            <h4 className="font-marcellus font-bold text-slate-900 text-xs mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{pkg.title}</h4>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{pkg.duration}</span>
                                                <span className="text-primary font-bold text-xs">${pkg.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Link to={`/packages?destination=${data.slug}`} className="btn-outline w-full mt-4 py-2 text-xs flex justify-center shadow-sm">
                                View All
                            </Link>
                        </div>

                        {/* Direct Enquiry Card */}
                        <div className="bg-primary rounded-3xl p-7 mt-5 shadow-xl relative overflow-hidden">
                            <h3 className="font-marcellus text-2xl text-white mb-2 relative z-10">Ready to Visit {data.name}?</h3>
                            <p className="text-white/70 text-sm mb-5 relative z-10">
                                Let our experts craft your perfect itinerary.
                            </p>
                            <Link to="/contact" className="bg-white text-primary font-bold px-6 py-3.5 rounded-xl hover:bg-slate-50 w-full flex items-center justify-center gap-2 transition-all relative z-10">
                                Enquire Now
                            </Link>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
}

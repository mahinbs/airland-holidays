import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Map, Calendar, Users, Maximize, Share2, Volume2, VolumeX, ShieldCheck, Download,
    Coffee, Moon, ShoppingBag, Info, Plane, Hotel, MessageCircle, CheckCircle2, XCircle, ChevronDown,
    Send, ArrowRight, Phone, Camera, PlayCircle, Briefcase, ChevronLeft, ChevronRight, FileText
} from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import PackageCardStack from '../components/common/PackageCardStack';
import VisualExperience from '../components/common/VisualExperience';

const packageData = {
    title: 'Bali 5 Nights / 6 Days – Premium Island Escape',
    subtitle: 'Luxury stays, curated experiences and seamless travel planning',
    destination: 'Bali, Indonesia',
    duration: '5N / 6D',
    travelType: 'Couple / Friends / Family',
    bestTime: 'April to October',
    visaInfo: 'Visa Assistance Included',
    price: 1200,
    rating: 4.8,
    reviews: 124,
    images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000'
    ],
    videoUrl: '/hero/2.mp4',
    overview: "Experience the perfect blend of relaxation, adventure and culture in Bali. From stunning beaches and luxury resorts to ancient temples and vibrant nightlife, this journey is designed to give you unforgettable moments with complete comfort and expert planning.",
    highlights: ['Uluwatu Temple Sunset', 'Ubud Rice Terraces', 'Luxury Balinese Spa', 'Snorkeling in Nusa Penida', 'Private Beach Dinner'],
    itinerary: [
        {
            day: 1,
            title: 'Arrival in Denpasar & VIP Transfer',
            desc: 'Welcome to Bali! Our representative will meet you at the airport and transfer you to your luxury resort in Seminyak. Rest and recover from your flight in your private villa.',
            attractions: ['VIP Fast Track', 'Welcome Drink', 'Private Villa'],
            images: [
                'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'
            ]
        },
        {
            day: 2,
            title: 'Uluwatu Temple & Sunset Culture',
            desc: 'Morning at leisure. In the afternoon, visit the iconic Uluwatu Temple perched on a cliff edge. Watch the traditional Kecak Fire Dance as the sun sets over the Indian Ocean.',
            attractions: ['Uluwatu Temple', 'Kecak Fire Dance', 'Jimbaran Seafood Dinner'],
            images: [
                'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800'
            ]
        },
        {
            day: 3,
            title: 'Cultural Heart of Ubud & Rice Terraces',
            desc: 'Head to the cultural heart of Bali, Ubud. Explore the Sacred Monkey Forest, vibrant art markets, and the breathtaking Tegalalang Rice Terraces.',
            attractions: ['Monkey Forest', 'Ubud Market', 'Tegalalang Terraces'],
            images: [
                'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800'
            ]
        },
    ],
    inclusions: [
        '5-Star Luxury Accommodation (5 Nights)',
        'Daily Gourmet Breakfast',
        'Private Airport Transfers',
        'English-Speaking Expert Guide',
        'Sightseeing as per itinerary',
        'Visa Assistance'
    ],
    exclusions: [
        'International Flights',
        'Travel Insurance',
        'Personal Expenses',
        'Gratuities'
    ],
    insights: {
        food: 'Balinese cuisine is incredibly diverse. Don\'t miss Nasi Goreng, Babi Guling, and Sate Lilit. We highly recommend trying local warungs along with fine dining.',
        nightlife: 'Seminyak and Canggu offer world-class beach clubs like Potato Head and Finns. Enjoy sunset cocktails with international DJs.',
        shopping: 'From high-end boutiques in Seminyak to traditional crafts at the Ubud Art Market, there\'s something for every shopper.',
        tips: 'Dress modestly when visiting temples (sarongs are usually provided). Tap water is not safe to drink; stick to bottled water.',
        essentials: 'Currency: Indonesian Rupiah (IDR). Plugs: Type C/F. Transport: Gojek/Grab are the best local ride-hailing apps. Sim Cards: Easily available at the airport.'
    },
    faqs: [
        { question: "Do I need a visa to visit Bali?", answer: "Visa requirements depend on your nationality. For many countries, a Visa on Arrival (VoA) is available. Our package includes Visa Assistance to make this process seamless." },
        { question: "Is this package suitable for families with children?", answer: "Yes, absolutely! Bali is very family-friendly, and we can customize the itinerary to include kid-friendly activities and ensure your accommodation is suitable for your family's needs." },
        { question: "Can I customize the itinerary?", answer: "Yes, all our premium escapes are fully customizable. Once you submit an enquiry, our expert travel advisors will work with you to tailor the experiences to your exact preferences." },
        { question: "Are flights included in the price?", answer: "No, international flights are not included in the starting price. However, our team can assist you with booking the best available flights from your departure city." }
    ],
    socialGallery: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000', user: 'Michael Chen', text: 'Our private villa was stunning. Perfect for relaxing after a day of exploring.' },
        { type: 'video', src: '/hero/2.mp4', user: 'Sarah Jenkins', text: 'Watching the sunset at Uluwatu was the highlight of our trip. Truly magical!' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000', user: 'Emma Thompson', text: 'The Balinese people are so welcoming. I loved learning about their culture.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=2000', user: 'David Miller', text: 'The rice terraces in Ubud are a must-see. The views are breathtaking.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2000', user: 'Sarah Jenkins', text: 'The food in Bali is delicious. Nasi Goreng is my new favorite dish!' }
    ],
    related: [
        { id: 2, title: 'Maldives Paradise Escape', duration: '4N/5D', price: 1800, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
        { id: 3, title: 'Swiss Alps Luxury', duration: '6N/7D', price: 3400, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' },
        { id: 4, title: 'Dubai City Glamour', duration: '3N/4D', price: 950, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' },
        { id: 5, title: 'Parisian Romance', duration: '5N/6D', price: 2100, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800' }
    ]
};

// 1. HERO SECTION
const HeroSection = ({ data, scrollToForm }: { data?: typeof packageData, scrollToForm?: () => void, [key: string]: unknown }) => {
    return (
        <section className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-center bg-primary-dark overflow-hidden pb-10">
            <img src={data?.images[0]} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-[0.95]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 via-transparent to-transparent" />

            <div className="relative z-10 content-container px-6 lg:px-8 w-full mt-16 md:mt-20 pb-8 flex flex-col justify-between h-full min-h-[60vh]">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-marcellus text-white mb-4 leading-[1.1] drop-shadow-lg">
                        {data?.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/95 mb-6 max-w-2xl font-medium drop-shadow">
                        {data?.subtitle}
                    </p>

                    <div className="flex flex-col md:flex-row md:items-end gap-6 mb-7">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl inline-block shadow-lg shrink-0">
                            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Starting Price</p>
                            <p className="text-4xl md:text-5xl font-bold text-secondary drop-shadow-md flex items-end gap-2">
                                ${data?.price} <span className="text-lg text-white/70 font-medium mb-1">/ person</span>
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2.5 pb-1">
                            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm flex items-center gap-1.5 hover:bg-white/20 transition-colors">
                                <Clock className="w-3.5 h-3.5" /> {data?.duration}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm flex items-center gap-1.5 hover:bg-white/20 transition-colors">
                                <Map className="w-3.5 h-3.5" /> {data?.destination}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm flex items-center gap-1.5 hover:bg-white/20 transition-colors">
                                <Users className="w-3.5 h-3.5" /> {data?.travelType}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm flex items-center gap-1.5 hover:bg-white/20 transition-colors">
                                <Calendar className="w-3.5 h-3.5" /> Best Time: {data?.bestTime}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <button onClick={scrollToForm} className="bg-secondary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary-dark transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 duration-300 text-lg">
                            Get Free Quote <ArrowRight className="w-5 h-5" />
                        </button>
                        <a href="tel:+18001234567" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex justify-center items-center gap-2 text-lg">
                            <Phone className="w-5 h-5" /> Talk to Expert
                        </a>
                    </div>
                </motion.div>

                {/* Trust Badges at bottom */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white">
                        <ShieldCheck className="w-5 h-5 text-secondary drop-shadow" />
                        <span className="text-sm font-semibold tracking-wide drop-shadow">Trusted by 20,000+ Travellers</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Briefcase className="w-5 h-5 text-secondary drop-shadow" />
                        <span className="text-sm font-semibold tracking-wide drop-shadow">20+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <CheckCircle2 className="w-5 h-5 text-secondary drop-shadow" />
                        <span className="text-sm font-semibold tracking-wide drop-shadow">Expert Assistance Tours</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// 2. STICKY NAV SECTION
const StickyNav = ({ activeSection }: { activeSection: string }) => {
    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'itinerary', label: 'Itinerary' },
        { id: 'inclusions', label: 'Inclusions/Exclusions' },
        { id: 'insights', label: 'Travel Information' },
        { id: 'faq', label: 'FAQ' },
        { id: 'experiences', label: 'Guest Experiences' }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -90;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="sticky top-[4.25rem] md:top-[4rem] lg:top-[6.5rem] z-40 bg-white border-b border-slate-200 shadow-sm w-full font-sans hide-scrollbar">
            <div className="content-container px-6 lg:px-8">
                <div className="flex overflow-x-auto gap-4 md:gap-8 no-scrollbar scroll-smooth py-3">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`px-4 py-2 whitespace-nowrap text-[13px] md:text-sm font-bold uppercase tracking-wider transition-all rounded-lg shrink-0 ${activeSection === item.id ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-slate-800 font-semibold hover:bg-primary/8 hover:text-primary'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. OVERVIEW + VISUAL EXPERIENCE BLOCK
const OverviewExperience = ({ data, onMediaClick }: { data?: typeof packageData, onMediaClick: (src: string) => void, [key: string]: unknown }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullScreen = () => {
        if (data?.videoUrl) onMediaClick(data.videoUrl);
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: data?.title, url: window.location.href });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Experience link copied!');
            }
        } catch (err) {
            console.log("Error sharing:", err);
        }
    };

    return (
        <div className="flex flex-col gap-8 pt-4">
            <div className="space-y-4 max-w-4xl">
                <h2 className="text-3xl font-marcellus text-primary mb-2">The Experience</h2>
                <p className="text-slate-700 leading-relaxed text-lg font-medium">{data?.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl group bg-slate-900 aspect-[4/3] md:aspect-auto md:h-[400px] border border-slate-100">
                    <video
                        ref={videoRef}
                        src={data?.videoUrl}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        autoPlay loop muted playsInline
                    />
                    <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-secondary transition-colors" title="Toggle Sound">
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <button onClick={toggleFullScreen} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-secondary transition-colors" title="Full Screen">
                            <Maximize className="w-5 h-5" />
                        </button>
                        <button onClick={handleShare} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-secondary transition-colors" title="Share Experience">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-[200px] md:h-[400px]">
                    <div
                        onClick={() => onMediaClick("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000")}
                        className="rounded-3xl overflow-hidden border border-slate-100 relative group cursor-pointer"
                    >
                        <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Experience preview" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="text-white w-6 h-6" />
                        </div>
                    </div>
                    <div
                        onClick={() => onMediaClick("https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2000")}
                        className="rounded-3xl overflow-hidden border border-slate-100 relative group cursor-pointer"
                    >
                        <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Experience preview" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="text-white w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. ITINERARY
const Itinerary = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const [openDay, setOpenDay] = useState<number | null>(1);

    const handleDownload = () => {
        alert("Downloading itinerary PDF... (Simulation)");
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-3xl font-marcellus text-primary mb-2">Itinerary</h2>
                    <p className="text-slate-600">Your curated schedule for the ultimate experience.</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 shrink-0"
                >
                    <Download className="w-4 h-4" /> Download PDF
                </button>
            </div>

            <div className="space-y-4">
                {data?.itinerary.map((day: { day: number, title: string, desc: string, attractions: string[], images: string[] }) => (
                    <div key={day.day} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openDay === day.day ? 'border-primary/30 shadow-md ring-1 ring-primary/10' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
                        <button
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none group bg-white"
                            onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`font-bold text-sm px-4 py-2.5 rounded-xl shrink-0 transition-colors ${openDay === day.day ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                    Day {day.day}
                                </div>
                                <h3 className={`font-bold text-lg md:text-xl transition-colors ${openDay === day.day ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>{day.title}</h3>
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 ${openDay === day.day ? 'rotate-180 text-primary' : 'text-slate-400 group-hover:text-primary'}`} />
                        </button>
                        <AnimatePresence>
                            {openDay === day.day && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-6 pt-2 border-t border-slate-50 flex flex-col gap-6">
                                        {/* Media at top */}
                                        <div className="w-full flex gap-3 overflow-x-auto snap-x hide-scrollbar pb-2">
                                            {day.images.map((img, idx) => (
                                                <div key={idx} className="w-full sm:w-[280px] md:w-[320px] h-48 md:h-56 rounded-xl overflow-hidden shrink-0 shadow-sm snap-center">
                                                    <img src={img} alt={`${day.title} - ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Content below media */}
                                        <div className="flex-1 md:pl-2">
                                            <p className="text-slate-700 leading-relaxed mb-6">{day.desc}</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {day.attractions.map((attr: string, idx: number) => (
                                                    <span key={idx} className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 transition-colors">
                                                        <Map className="w-3 h-3 text-secondary" /> {attr}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 5. INCLUSIONS & EXCLUSIONS
const InclusionsExclusions = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const [inclExpanded, setInclExpanded] = useState(false);
    const [exclExpanded, setExclExpanded] = useState(false);
    const SHOW_LIMIT = 4;

    const visibleInclusions = inclExpanded ? data?.inclusions : data?.inclusions.slice(0, SHOW_LIMIT);
    const visibleExclusions = exclExpanded ? data?.exclusions : data?.exclusions.slice(0, SHOW_LIMIT);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <CheckCircle2 className="w-32 h-32 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-marcellus text-emerald-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" /> What's Included
                </h3>
                <div className="relative z-10">
                    <ul className="space-y-4">
                        {visibleInclusions?.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                </span>
                                <span className="text-emerald-900/80 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                    {(data?.inclusions.length ?? 0) > SHOW_LIMIT && (
                        <button
                            onClick={() => setInclExpanded(!inclExpanded)}
                            className="mt-4 text-emerald-700 font-bold text-sm flex items-center gap-1.5 hover:text-emerald-900 transition-colors"
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${inclExpanded ? 'rotate-180' : ''}`} />
                            {inclExpanded ? 'Show Less' : `Show ${(data?.inclusions.length ?? 0) - SHOW_LIMIT} More`}
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <XCircle className="w-32 h-32 text-rose-600" />
                </div>
                <h3 className="text-2xl font-marcellus text-rose-900 mb-6 flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-rose-500" /> What's Excluded
                </h3>
                <div className="relative z-10">
                    <ul className="space-y-4">
                        {visibleExclusions?.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <XCircle className="w-4 h-4 text-rose-500" />
                                </span>
                                <span className="text-rose-900/80 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                    {(data?.exclusions.length ?? 0) > SHOW_LIMIT && (
                        <button
                            onClick={() => setExclExpanded(!exclExpanded)}
                            className="mt-4 text-rose-700 font-bold text-sm flex items-center gap-1.5 hover:text-rose-900 transition-colors"
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${exclExpanded ? 'rotate-180' : ''}`} />
                            {exclExpanded ? 'Show Less' : `Show ${(data?.exclusions.length ?? 0) - SHOW_LIMIT} More`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// 6. DESTINATION INSIGHTS & TERMS
const DestinationInsights = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const tabs = [
        { id: 'food', icon: Coffee, label: 'Local Cuisine' },
        { id: 'nightlife', icon: Moon, label: 'Nightlife' },
        { id: 'shopping', icon: ShoppingBag, label: 'Shopping' },
        { id: 'tips', icon: Info, label: 'Travel Tips' },
        { id: 'essentials', icon: Briefcase, label: 'Local Essentials' },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [termsOpen, setTermsOpen] = useState(false);

    return (
        <div>
            <div className="border-b border-slate-200 pb-4 mb-8">
                <h2 className="text-3xl font-marcellus text-primary mb-2">Travel Information</h2>
                <p className="text-slate-600">Essential insights to make the most of your journey.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
                <div className="flex flex-wrap border-b border-slate-100 bg-slate-100/80">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-5 px-3 lg:px-4 text-[12px] lg:text-sm font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 border-b-2
                                ${activeTab === tab.id ? 'border-secondary text-secondary bg-white' : 'border-transparent text-slate-600 hover:text-primary hover:bg-slate-50'}`}
                        >
                            <tab.icon className="w-4 h-4 hidden xl:block" /> {tab.label}
                        </button>
                    ))}
                </div>
                <div className="p-8 min-h-[280px] flex items-center bg-white relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-slate-700 leading-relaxed text-lg max-h-[380px] overflow-y-auto custom-scrollbar w-full"
                        >
                            {data?.insights[activeTab as keyof typeof data.insights]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Collapsible Terms and Conditions */}
            <div className="bg-amber-50/50 rounded-2xl border border-amber-100/50 overflow-hidden">
                <button
                    onClick={() => setTermsOpen(!termsOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-700" />
                        <span className="font-bold text-amber-900 tracking-wide">Important Notes, Policies & Terms</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-amber-700 transition-transform duration-300 ${termsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {termsOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-6 pt-2 border-t border-amber-100/30 text-amber-900/80 text-sm leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                                <p className="mb-4"><strong>Payment Policy:</strong> 30% advance required for booking confirmation. Remaining 70% must be paid 15 days prior to departure.</p>
                                <p className="mb-4"><strong>Cancellation Policy:</strong> Cancellations made 30 days before departure are eligible for a 75% refund. No refunds for cancellations within 15 days of departure.</p>
                                <p><strong>General Terms:</strong> Terms and conditions, operational details vary by destination. Authority regulations strongly apply. Read our full policy document on the main website before booking.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// 7. FAQ SECTION
const FAQSection = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div>
            <div className="border-b border-slate-200 pb-4 mb-8">
                <h2 className="text-3xl font-marcellus text-primary mb-2">Frequently Asked Questions</h2>
                <p className="text-slate-600">Everything you need to know about this package.</p>
            </div>
            <div className="space-y-3">
                {data?.faqs.map((faq: { question: string, answer: string }, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-primary/30 transition-colors">
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                        >
                            <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                            <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 8. JOURNEY IN FRAMES (Visual Gallery)
const JourneyInFrames = ({ data, onGalleryTrigger }: { data?: typeof packageData, onGalleryTrigger: (index: number) => void, [key: string]: unknown }) => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        slides: { perView: "auto", spacing: 20 },
        drag: true,
    });

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-marcellus text-primary uppercase tracking-widest mb-2">Journey in Frames</h2>
                <p className="text-slate-600">Pictures Perfect Moments</p>
            </div>

            <div ref={sliderRef} className="keen-slider py-4 cursor-grab active:cursor-grabbing hide-scrollbar">
                {data?.socialGallery.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => onGalleryTrigger(i)}
                        className={`keen-slider__slide w-[280px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0`}
                        style={{ minWidth: '280px', maxWidth: '350px' }}
                    >
                        {item.type === 'video' ? (
                            <div className="w-full h-full bg-black relative">
                                <video src={item.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" autoPlay muted loop playsInline />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <p className="text-white font-medium text-sm drop-shadow-md">"{item.text}"</p>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                                    <PlayCircle className="w-5 h-5" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full relative">
                                <img src={item.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Travel moment" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <p className="text-white font-medium text-sm drop-shadow-md">"{item.text}"</p>
                                </div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// 9. SIDEBAR LEAD FORM
const SidebarLeadForm = ({ data }: { data?: typeof packageData }) => {
    const [captchaObj, setCaptchaObj] = useState({ num1: 0, num2: 0, sum: 0 });

    useEffect(() => {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaObj({ num1: n1, num2: n2, sum: n1 + n2 });
    }, []);

    const handleCapture = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (parseInt(formData.get('captcha') as string) !== captchaObj.sum) {
            alert('Incorrect Captcha!');
            return;
        }
        alert('Enquiry Captured! (Mock Submission)');
    }

    return (
        <div id="lead-form" className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200 overflow-hidden text-slate-800 flex flex-col mt-6 lg:mt-16">
            <div className="bg-primary px-8 py-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                <h3 className="font-marcellus text-2xl mb-2 relative z-10 text-white">Enquire About This Tour</h3>
                <p className="text-white/80 text-sm relative z-10 font-light">Fill out the form below and our experts will contact you shortly.</p>
            </div>
            <div className="p-6 md:p-8 bg-white">
                <form onSubmit={handleCapture} className="space-y-4">
                    <input type="hidden" name="package_name" value={data?.title} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Name*</label>
                            <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="John Doe" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">City*</label>
                            <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="New York" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Email Address*</label>
                        <input required type="email" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="john@example.com" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Phone*</label>
                            <input required type="tel" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="+1..." />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">WhatsApp*</label>
                            <input required type="tel" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="+1..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Travel Date*</label>
                            <input required type="date" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium text-slate-700" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Travellers*</label>
                            <input required type="number" min="1" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="2" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Destination*</label>
                        <input required type="text" readOnly value={data?.destination} className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold opacity-80 cursor-not-allowed" />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Vacation Type</label>
                        <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium text-slate-700">
                            <option>Couple / Honeymoon</option>
                            <option>Family with Kids</option>
                            <option>Friends Group</option>
                            <option>Solo Travel</option>
                            <option>Corporate Retreat</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Captcha: {captchaObj.num1} + {captchaObj.num2} = ?</label>
                        <input required name="captcha" type="number" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium" placeholder="Enter sum" />
                    </div>

                    <button type="submit" className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 text-base shadow-lg shadow-secondary/30 mt-6 relative overflow-hidden group">
                        <span className="relative z-10 flex items-center gap-2">Submit Enquiry <Send className="w-4 h-4" /></span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>
                    <p className="text-[11px] text-center text-slate-400 font-medium pt-2">Secured & encrypted. No spam guaranteed.</p>
                </form>
            </div>
        </div>
    );
};

// 10. PARTNER SECTION
const PartnerTrust = () => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            renderMode: "performance",
            drag: false,
            slides: {
                perView: 2,
                spacing: 15,
            },
            breakpoints: {
                "(min-width: 768px)": {
                    slides: { perView: 4, spacing: 30 },
                },
                "(min-width: 1024px)": {
                    slides: { perView: 5, spacing: 40 },
                },
            },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>;
                function nextTimeout() {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 2000);
                }
                slider.on("created", nextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    return (
        <section className="bg-slate-50 py-12 border-t border-slate-200 overflow-hidden shadow-sm relative">
            <div className="content-container px-6 mb-8 text-center">
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Our Global Hospitality Partners</p>
            </div>
            <div className="mx-auto px-6 lg:px-8">
                <div ref={sliderRef} className="keen-slider opacity-80 hover:opacity-100 transition-opacity duration-500">
                    {['Emirates', 'Marriott Bonvoy', 'Four Seasons', 'Singapore Airlines', 'Qatar Airways', 'Hilton Honors'].map((partner, i) => (
                        <div key={i} className="keen-slider__slide flex items-center justify-center">
                            <span className="text-lg md:text-xl font-marcellus font-bold text-slate-700 flex items-center gap-2 whitespace-nowrap">
                                {i % 2 === 0 ? <Plane className="w-5 h-5 text-primary" /> : <Hotel className="w-5 h-5 text-primary" />} {partner}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 11. RELATED PACKAGES
const RelatedPackages = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    return (
        <section className="py-24 bg-white overflow-hidden relative border-t border-slate-200">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/3" />

            <div className="content-container px-6 lg:px-8 relative z-10 flex flex-col items-center">
                <div className="text-center mb-12 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-marcellus text-primary mb-4">More Premium Escapes</h2>
                    <p className="text-slate-600">Discover other luxurious destinations curated by our experts.</p>
                </div>

                <div className="w-full">
                    {/* On Desktop use grid, on mobile use keen slider */}
                    <div className="hidden lg:grid grid-cols-3 gap-8">
                        {(data?.related || []).slice(0, 3).map((p) => (
                            <div key={p.id} className="aspect-[4/5] w-full h-full relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-bold text-primary shadow-lg flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" /> {p.duration}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                                    <div className="mx-auto w-10 h-10 rounded-full border border-white/30 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:border-transparent transition-colors">
                                        <Map className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="font-marcellus text-2xl mb-2 min-h-[64px] flex items-center justify-center text-white drop-shadow-md">
                                        {p.title}
                                    </h3>
                                    <p className="text-white/80 font-medium mb-4 text-sm tracking-wide">
                                        Starting Price <span className="text-secondary font-bold">${p.price}</span>
                                    </p>
                                    <a
                                        href={`/packages/${p.id}`}
                                        className="block w-full bg-secondary/90 hover:bg-secondary text-white py-3 rounded-xl font-bold backdrop-blur-sm transition-all shadow-lg shadow-black/20 hover:-translate-y-1"
                                    >
                                        Explore Package
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:hidden w-full flex justify-center pb-8 mt-4">
                        <PackageCardStack>
                            {(data?.related || []).map((p) => (
                                <div key={p.id} className="w-full h-full relative group cursor-pointer overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-bold text-primary shadow-lg flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" /> {p.duration}
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                                        <h3 className="font-marcellus text-2xl mb-2 min-h-[64px] flex items-center justify-center text-white drop-shadow-md">
                                            {p.title}
                                        </h3>
                                        <p className="text-white/80 font-medium mb-4 text-sm tracking-wide">
                                            Starting Price <span className="text-secondary font-bold">${p.price}</span>
                                        </p>
                                        <a
                                            href={`/packages/${p.id}`}
                                            className="block w-full bg-secondary/90 hover:bg-secondary text-white py-3 rounded-xl font-bold backdrop-blur-sm transition-all shadow-lg shadow-black/20 hover:-translate-y-1"
                                        >
                                            Explore Package
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </PackageCardStack>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 12. FINAL CTA SECTION
const FinalCTA = ({ scrollToForm }: { scrollToForm?: () => void, [key: string]: unknown }) => {
    return (
        <section className="relative py-24 text-center overflow-hidden bg-primary items-center flex border-t-4 border-secondary">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-marcellus text-white mb-6 leading-tight">Ready to explore Bali with a perfectly planned experience?</h2>
                <p className="text-lg md:text-xl text-white/80 mb-10 font-light">Don't settle for the ordinary. Let us craft an extraordinary itinerary exclusively for you.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={scrollToForm} className="bg-secondary text-white px-10 py-5 rounded-full font-bold hover:bg-secondary-dark transition-transform hover:-translate-y-1 duration-300 text-lg shadow-xl shadow-black/30">
                        Start Your Journey
                    </button>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-5 rounded-full font-bold hover:bg-[#1da850] transition-transform hover:-translate-y-1 duration-300 text-lg shadow-xl shadow-black/30">
                        <MessageCircle className="w-6 h-6" /> WhatsApp Now
                    </a>
                </div>
            </div>
        </section>
    );
};

// 13. MEDIA LIGHTBOX MODAL
const MediaModal = ({
    isOpen,
    onClose,
    gallery,
    currentIndex,
    onNavigate
}: {
    isOpen: boolean,
    onClose: () => void,
    gallery: typeof packageData.socialGallery,
    currentIndex: number,
    onNavigate: (index: number) => void
}) => {
    const currentItem = gallery[currentIndex];

    return createPortal(
        <AnimatePresence>
            {isOpen && currentItem && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                    onClick={onClose}
                >
                    <motion.button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[10010] bg-black/20 p-2 rounded-full"
                        onClick={onClose}
                    >
                        <XCircle className="w-8 h-8 md:w-10 md:h-10" />
                    </motion.button>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 md:left-10 z-[10010] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-20"
                        onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        className="absolute right-4 md:right-10 z-[10010] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-20"
                        onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
                        disabled={currentIndex === gallery.length - 1}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-5xl w-full aspect-video md:aspect-auto flex flex-col items-center justify-center rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {currentItem.type === 'video' ? (
                            <video src={currentItem.src} controls autoPlay className="max-w-full max-h-[80vh] w-auto h-auto rounded-xl shadow-2xl" />
                        ) : (
                            <img src={currentItem.src} alt="Enlarged view" className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl shadow-2xl" />
                        )}
                        <p className="text-white/80 mt-4 text-center max-w-2xl font-medium tracking-wide">"{currentItem.text}"</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default function PackageDetail() {
    const { id } = useParams();
    console.log('Viewing package ID:', id);

    const [activeSection, setActiveSection] = useState('overview');
    const [lightbox, setLightbox] = useState<{ isOpen: boolean, index: number }>({
        isOpen: false,
        index: 0
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    const scrollToForm = () => {
        const formElement = document.getElementById('lead-form');
        if (formElement) {
            const yOffset = -120;
            const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handleGalleryTrigger = (index: number) => {
        setLightbox({ isOpen: true, index });
    };

    const handleMediaClick = (src: string) => {
        const idx = packageData.socialGallery.findIndex(item => item.src === src);
        handleGalleryTrigger(idx !== -1 ? idx : 1);
    };

    return (
        <div className="bg-[#faf9f6] min-h-screen font-sans text-slate-800">
            {/* HERO SECTION */}
            <HeroSection data={packageData} scrollToForm={scrollToForm} />

            {/* STICKY NAV LAYER */}
            <StickyNav activeSection={activeSection} />

            {/* MAIN TWO-COLUMN GRID */}
            <div className="content-container px-4 md:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-20">

                {/* ---------- LEFT COLUMN: SCROLLABLE CONTENT ---------- */}
                <div className="lg:col-span-8 flex flex-col gap-16">

                    <section id="overview" className="scroll-mt-32">
                        <OverviewExperience data={packageData} onMediaClick={handleMediaClick} />
                    </section>

                    <section id="itinerary" className="scroll-mt-32">
                        <Itinerary data={packageData} />
                    </section>

                    <section id="inclusions" className="scroll-mt-32">
                        <InclusionsExclusions data={packageData} />
                    </section>

                    <section id="insights" className="scroll-mt-32">
                        <DestinationInsights data={packageData} />
                    </section>

                    <section id="faq" className="scroll-mt-32">
                        <FAQSection data={packageData} />
                    </section>

                    <section id="experiences" className="scroll-mt-32 -mx-4 md:-mx-8">
                        <VisualExperience 
                            items={packageData.socialGallery.map((item: any, i: number) => ({
                                id: i,
                                type: item.type,
                                url: item.src,
                                thumbnail: item.src,
                                title: `Guest Experience ${i+1}`,
                                packageId: '1',
                                packageName: packageData.title
                            }))}
                            title="Journey in Frames"
                            subtitle="Real guest experiences and stories captured from this tour."
                        />
                    </section>

                </div>

                {/* ---------- RIGHT COLUMN: STICKY FORM ---------- */}
                <div className="lg:col-span-4 lg:sticky lg:top-[7rem] relative z-30 self-start">
                    <SidebarLeadForm data={packageData} />
                </div>
            </div>

            {/* FULL WIDTH BOTTOM SECTIONS */}
            <RelatedPackages data={packageData} />

            <PartnerTrust />

            <FinalCTA scrollToForm={scrollToForm} />

            {/* Lightbox Modal */}
            <MediaModal
                isOpen={lightbox.isOpen}
                onClose={() => setLightbox({ ...lightbox, isOpen: false })}
                gallery={packageData.socialGallery}
                currentIndex={lightbox.index}
                onNavigate={(idx) => setLightbox({ ...lightbox, index: idx })}
            />
        </div>
    );
}
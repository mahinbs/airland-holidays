import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Map, Calendar, Users, Maximize, Share2, Volume2, VolumeX, Quote, ShieldCheck, Download,
    Coffee, Moon, ShoppingBag, Info, Plane, Hotel, MessageCircle, CheckCircle2, XCircle, ChevronDown,
    Send, ArrowRight, Phone, Star, User, Camera, PlayCircle, Wallet, Briefcase, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import PackageCardStack from '../components/common/PackageCardStack';

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
            image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=800'
        },
        {
            day: 2,
            title: 'Uluwatu Temple & Sunset Culture',
            desc: 'Morning at leisure. In the afternoon, visit the iconic Uluwatu Temple perched on a cliff edge. Watch the traditional Kecak Fire Dance as the sun sets over the Indian Ocean.',
            attractions: ['Uluwatu Temple', 'Kecak Fire Dance', 'Jimbaran Seafood Dinner'],
            image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800'
        },
        {
            day: 3,
            title: 'Cultural Heart of Ubud & Rice Terraces',
            desc: 'Head to the cultural heart of Bali, Ubud. Explore the Sacred Monkey Forest, vibrant art markets, and the breathtaking Tegalalang Rice Terraces.',
            attractions: ['Monkey Forest', 'Ubud Market', 'Tegalalang Terraces'],
            image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800'
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
    testimonials: [
        { name: 'Sarah Jenkins', text: 'An absolutely unforgettable experience. The attention to detail was spectacular.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
        { name: 'Michael Chen', text: 'The perfect mix of relaxation and culture. Highly recommend the private villa!', rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
        { name: 'Emma Thompson', text: 'Our guide was incredibly knowledgeable. I learned so much about Balinese traditions.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
        { name: 'David Miller', text: 'The sunset dinner cruise was the highlight of our trip. Truly magical and well-planned.', rating: 4.8, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' }
    ],
    socialGallery: [
        { type: 'video', src: '/hero/2.mp4', user: 'Sarah Jenkins', text: 'Watching the sunset at Uluwatu was the highlight of our trip. Truly magical!' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000', user: 'Michael Chen', text: 'Our private villa was stunning. Perfect for relaxing after a day of exploring.' },
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
        <section className="relative min-h-[70vh] md:min-h-[85vh] w-full flex items-center bg-primary-dark overflow-hidden">
            <img src={data?.images[0]} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
            <div className="relative z-10 content-container px-6 lg:px-8 w-full mt-16 pb-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
                    <div className="inline-block bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4 shadow-lg shadow-black/20">
                        {data?.duration} • {data?.travelType} • {data?.visaInfo}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-white/95 text-sm font-medium tracking-wide mb-6 shadow-sm inline-block ml-3">
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-secondary drop-shadow-md" /> Trusted by 20,000+ Travellers | 20+ Years Experience
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-marcellus text-white mb-6 leading-tight drop-shadow-md">
                        {data?.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl font-light drop-shadow">
                        {data?.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                        <button onClick={scrollToForm} className="bg-secondary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary-dark transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 duration-300">
                            Get Free Quote <ArrowRight className="w-5 h-5" />
                        </button>
                        <a href="tel:+18001234567" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex justify-center items-center gap-2">
                            <Phone className="w-5 h-5" /> Talk to Expert
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// 2. STICKY NAV SECTION
const StickyNav = ({ activeSection }: { activeSection: string }) => {
    const stripRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef({ active: false, pointerId: -1, startX: 0, scroll0: 0, dragged: false });
    const blockClickRef = useRef(false);
    const [isGrabbing, setIsGrabbing] = useState(false);

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'itinerary', label: 'Itinerary' },
        { id: 'inclusions', label: 'Inclusions/Exclusions' },
        { id: 'insights', label: 'Travel Information' },
        { id: 'reviews', label: 'Reviews' }
    ];

    const scrollToSection = (id: string) => {
        if (blockClickRef.current) return;
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -90;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        const el = stripRef.current;
        if (!el) return;
        dragRef.current = { active: true, pointerId: e.pointerId, startX: e.clientX, scroll0: el.scrollLeft, dragged: false };
        try { el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
        setIsGrabbing(e.pointerType === "mouse");
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current;
        if (!d.active || e.pointerId !== d.pointerId) return;
        const el = stripRef.current;
        if (!el) return;
        const dx = e.clientX - d.startX;
        if (Math.abs(dx) > 6) d.dragged = true;
        el.scrollLeft = d.scroll0 - dx;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current;
        if (!d.active || e.pointerId !== d.pointerId) return;
        const el = stripRef.current;
        if (el) { try { el.releasePointerCapture(e.pointerId); } catch { /* ignore */ } }
        if (d.dragged) {
            blockClickRef.current = true;
            window.setTimeout(() => { blockClickRef.current = false; }, 0);
        }
        d.active = false;
        d.pointerId = -1;
        d.dragged = false;
        setIsGrabbing(false);
    };

    return (
        <div className="sticky top-[6.5rem] md:top-[6.5rem] lg:top-[6.5rem] z-40 bg-white border-b border-slate-200 shadow-sm w-full font-sans hide-scrollbar">
            <div className="content-container px-6 lg:px-8">
                <div
                    ref={stripRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onLostPointerCapture={() => setIsGrabbing(false)}
                    className={`flex overflow-x-auto gap-8 no-scrollbar scroll-smooth touch-none select-none ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
                >
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`py-4 px-2 whitespace-nowrap text-[13px] md:text-sm font-bold uppercase tracking-wider border-b-[3px] transition-colors gap-2 touch-none ${activeSection === item.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. QUICK HIGHLIGHTS COMPONENT
const QuickHighlights = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const highlights = [
        { icon: Clock, label: 'Duration', value: data?.duration },
        { icon: Map, label: 'Destinations', value: data?.destination },
        { icon: Calendar, label: 'Best Time', value: data?.bestTime },
        { icon: Users, label: 'Travel Type', value: data?.travelType },
        { icon: Wallet, label: 'Starting Price', value: `$${data?.price} pp` },
    ];
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {highlights.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-200 font-bold uppercase tracking-widest mb-1.5">{item.label}</p>
                        <p className="font-bold text-slate-800 text-[15px] leading-tight px-1">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 4. OVERVIEW + VISUAL EXPERIENCE BLOCK
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
        <div className="flex flex-col gap-8">
            <div className="space-y-6">
                <h2 className="text-3xl font-marcellus text-primary">The Experience</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{data?.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Video Block */}
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
                {/* Side Images */}
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

// 5. DAY-WISE ITINERARY
const Itinerary = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const [openDay, setOpenDay] = useState<number | null>(1);

    const handleDownload = () => {
        alert("Downloading itinerary PDF... (Simulation)");
    };

    const handleViewExperience = (dayTitle: string) => {
        alert(`Opening virtual experience for: ${dayTitle}`);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-3xl font-marcellus text-primary mb-2">Day-by-Day Itinerary</h2>
                    <p className="text-slate-500">Your curated schedule for the ultimate experience.</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 shrink-0"
                >
                    <Download className="w-4 h-4" /> Download PDF
                </button>
            </div>

            <div className="space-y-4">
                {data?.itinerary.map((day: { day: number, title: string, desc: string, attractions: string[], image: string }) => (
                    <div key={day.day} className={`bg-white rounded-2xl border transition-all duration-300 ${openDay === day.day ? 'border-primary/30 shadow-md ring-1 ring-primary/10' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
                        <button
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                            onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`font-bold text-sm px-4 py-2.5 rounded-xl shrink-0 transition-colors ${openDay === day.day ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                    Day {day.day}
                                </div>
                                <h3 className={`font-bold text-lg md:text-xl transition-colors ${openDay === day.day ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>{day.title}</h3>
                            </div>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 ${openDay === day.day ? 'rotate-180 text-primary' : 'text-slate-200 group-hover:text-primary'}`} />
                        </button>
                        <AnimatePresence>
                            {openDay === day.day && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-6 pt-2 pl-[5.5rem] border-t border-slate-50 flex flex-col xl:flex-row gap-8">
                                        <div className="flex-1">
                                            <p className="text-slate-600 leading-relaxed mb-6">{day.desc}</p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {day.attractions.map((attr: string, idx: number) => (
                                                    <span key={idx} className="bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 transition-colors">
                                                        <Map className="w-3 h-3 text-secondary" /> {attr}
                                                    </span>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => handleViewExperience(day.title)}
                                                className="flex items-center gap-2 text-primary font-bold text-sm border-b-2 border-transparent hover:border-primary transition-colors pb-0.5 group"
                                            >
                                                View Experience <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                        <div className="xl:w-1/3 w-full h-48 rounded-xl overflow-hidden shrink-0 shadow-inner group relative cursor-pointer">
                                            <img src={day.image} alt={day.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <Camera className="w-8 h-8 text-white drop-shadow-md" />
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

// 6. INCLUSIONS & EXCLUSIONS
const InclusionsExclusions = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <CheckCircle2 className="w-32 h-32 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-marcellus text-emerald-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" /> What's Included
                </h3>
                <ul className="space-y-4 relative z-10">
                    {data?.inclusions.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </span>
                            <span className="text-emerald-900/80 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <XCircle className="w-32 h-32 text-rose-600" />
                </div>
                <h3 className="text-2xl font-marcellus text-rose-900 mb-6 flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-rose-500" /> What's Excluded
                </h3>
                <ul className="space-y-4 relative z-10">
                    {data?.exclusions.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                                <XCircle className="w-4 h-4 text-rose-500" />
                            </span>
                            <span className="text-rose-900/80 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// 7. DESTINATION INSIGHTS
const DestinationInsights = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    const tabs = [
        { id: 'food', icon: Coffee, label: 'Local Cuisine' },
        { id: 'nightlife', icon: Moon, label: 'Nightlife' },
        { id: 'shopping', icon: ShoppingBag, label: 'Shopping' },
        { id: 'tips', icon: Info, label: 'Travel Tips' },
        { id: 'essentials', icon: Briefcase, label: 'Local Essentials' },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div>
            <div className="border-b border-slate-200 pb-4 mb-8">
                <h2 className="text-3xl font-marcellus text-primary mb-2">Travel Information</h2>
                <p className="text-slate-500">Essential insights to make the most of your journey.</p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-5 px-3 lg:px-4 text-[12px] lg:text-sm font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 border-b-2
                                ${activeTab === tab.id ? 'border-secondary text-secondary bg-white' : 'border-transparent text-slate-500 hover:text-primary hover:bg-slate-50'}`}
                        >
                            <tab.icon className="w-4 h-4 hidden xl:block" /> {tab.label}
                        </button>
                    ))}
                </div>
                <div className="p-8 min-h-[160px] flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-slate-600 leading-relaxed text-lg"
                        >
                            {data?.insights[activeTab as keyof typeof data.insights]}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="bg-amber-50/50 px-8 py-5 border-t border-amber-100/50">
                    <p className="text-xs text-amber-800/80 flex items-start gap-2 max-w-3xl leading-relaxed font-medium">
                        <Info className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>
                            <strong>Note:</strong> Terms and conditions, cancellation policies, and operational details vary by destination. Authority regulations strongly apply. Read our full policy before booking.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

// 8. SOCIAL PROOF REVIEWS
const SocialProof = ({ data, onGalleryTrigger }: { data?: typeof packageData, onGalleryTrigger: (index: number) => void, [key: string]: unknown }) => {
    return (
        <div>
            <div className="border-b border-slate-200 pb-4 mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-marcellus text-primary mb-2">Guest Experiences</h2>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Star className="w-5 h-5 text-secondary fill-secondary" />
                        <span className="font-bold text-slate-800">{data?.rating}</span>
                        <span>({data?.reviews}+ experiences shared)</span>
                    </div>
                </div>
            </div>

            {/* Visual Media Gallery before testimonials */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {data?.socialGallery.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => onGalleryTrigger(i)}
                        className={`aspect-square rounded-2xl overflow-hidden relative group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                    >
                        {item.type === 'video' ? (
                            <div className="w-full h-full bg-black relative">
                                <video src={item.src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" autoPlay muted loop playsInline />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-secondary transition-colors">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <img src={item.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Travel moment" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Maximize className="w-6 h-6 text-white" />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.testimonials.slice(0, 4).map((test, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            // Find the first gallery item matching this user name for the popup context
                            const galleryIdx = data.socialGallery.findIndex(g => g.user === test.name);
                            onGalleryTrigger(galleryIdx !== -1 ? galleryIdx : 1);
                        }}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer flex flex-col h-full group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-800">{test.name}</h4>
                            </div>
                            <div className="flex text-secondary">
                                {[...Array(Math.floor(test.rating))].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                        </div>
                        <Quote className="w-6 h-6 text-slate-200 mb-2" />
                        <p className="text-slate-600 italic leading-relaxed text-sm">"{test.text}"</p>
                        <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            View Story <ArrowRight className="w-3 h-3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 9. SIDEBAR LEAD FORM
const SidebarLeadForm = ({ data }: { data?: typeof packageData }) => {
    const handleCapture = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Enquiry Captured! (Mock Submission)');
    }

    return (
        <div id="lead-form" className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200 overflow-hidden text-slate-800 flex flex-col sticky top-[8.5rem] mt-6 lg:mt-0">
            <div className="bg-primary px-8 py-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                <h3 className="font-marcellus text-2xl mb-1 relative z-10 text-white">Book This Tour</h3>
                <p className="text-white/80 text-sm mb-4 relative z-10 font-light">Price per person starting at</p>
                <div className="bg-white/10 rounded-xl px-4 py-3 inline-flex items-end gap-2 border border-white/20 backdrop-blur-md relative z-10">
                    <span className="text-3xl font-bold text-secondary">${data?.price}</span>
                    {data?.price && <span className="text-sm font-medium mb-1 line-through text-white/50">${data.price + 200}</span>}
                </div>
            </div>
            <div className="p-6 md:p-8 bg-white">
                <form onSubmit={handleCapture} className="space-y-4">
                    <input type="hidden" name="package_name" value={data?.title} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Name*</label>
                            <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-200 text-sm font-medium" placeholder="John Doe" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">City*</label>
                            <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-200 text-sm font-medium" placeholder="New York" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Email Address*</label>
                        <input required type="email" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-200 text-sm font-medium" placeholder="john@example.com" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Phone*</label>
                            <input required type="tel" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-200 text-sm font-medium" placeholder="+1..." />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">WhatsApp*</label>
                            <input required type="tel" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-200 text-sm font-medium" placeholder="+1..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Travel Date*</label>
                            <input required type="date" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Travellers*</label>
                            <input required type="number" min="1" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-200 text-sm font-medium" placeholder="2" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Destination*</label>
                        <input required type="text" readOnly value={data?.destination} className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold opacity-80 cursor-not-allowed" />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">Vacation Type</label>
                        <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-medium text-slate-600">
                            <option>Couple / Honeymoon</option>
                            <option>Family with Kids</option>
                            <option>Friends Group</option>
                            <option>Solo Travel</option>
                            <option>Corporate Retreat</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 text-base shadow-lg shadow-secondary/30 mt-6 relative overflow-hidden group">
                        <span className="relative z-10 flex items-center gap-2">Get Quote Now <Send className="w-4 h-4" /></span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>
                    <p className="text-[11px] text-center text-slate-200 font-medium pt-2">Secured & encrypted. No spam guaranteed.</p>
                </form>
            </div>
        </div>
    );
};

// 10. WHY CHOOSE US SIDEBAR BLOCK
const WhyChooseUsSidebar = ({ scrollToForm }: { scrollToForm?: () => void }) => {
    return (
        <div className="mt-6 bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5">
                <ShieldCheck className="w-32 h-32 text-primary" />
            </div>
            <h4 className="font-bold text-slate-800 mb-5 font-marcellus flex items-center gap-2 text-xl relative z-10">
                <ShieldCheck className="w-6 h-6 text-secondary" /> Why Choose Us
            </h4>
            <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">20+ Years Experience</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">20,000+ Happy Travellers</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">End-to-End Travel Support</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">Strong Global Partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">Personalised Itinerary Planning</span>
                </li>
            </ul>
            <button
                onClick={scrollToForm}
                className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors text-sm shadow-md"
            >
                Start Planning Your Trip
            </button>
        </div>
    );
};

// 11. PARTNER SECTION
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
        <section className="bg-white py-12 border-t border-slate-200 overflow-hidden mt-20 rounded-3xl shadow-sm border">
            <div className="content-container px-6 mb-8 text-center">
                <p className="text-sm font-bold text-slate-200 uppercase tracking-widest">Our Global Hospitality Partners</p>
            </div>
            <div className="mx-auto px-6 lg:px-8">
                <div ref={sliderRef} className="keen-slider opacity-50 hover:opacity-100 transition-opacity duration-500">
                    {['Emirates', 'Marriott Bonvoy', 'Four Seasons', 'Singapore Airlines', 'Qatar Airways', 'Hilton Honors'].map((partner, i) => (
                        <div key={i} className="keen-slider__slide flex items-center justify-center">
                            <span className="text-lg md:text-xl font-marcellus font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap">
                                {i % 2 === 0 ? <Plane className="w-5 h-5" /> : <Hotel className="w-5 h-5" />} {partner}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 12. RELATED PACKAGES
const RelatedPackages = ({ data }: { data?: typeof packageData, [key: string]: unknown }) => {
    return (
        <section className="py-24 bg-[#faf9f6] overflow-hidden relative mt-12 border-t border-slate-200">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/3" />

            <div className="content-container px-6 lg:px-8 relative z-10 flex flex-col items-center">
                <div className="text-center mb-12 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-marcellus text-primary mb-4">More Premium Escapes</h2>
                    <p className="text-slate-500">Discover other luxurious destinations curated by our experts.</p>
                </div>

                <PackageCardStack>
                    {(data?.related || []).map((p) => (
                        <div key={p.id} className="aspect-[4/5] w-full h-full relative group cursor-pointer selection:bg-transparent">
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
                </PackageCardStack>
            </div>
        </section>
    );
};

// 13. FINAL CTA SECTION
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

// 14. MEDIA LIGHTBOX MODAL
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
                        className="relative max-w-5xl w-full aspect-video md:aspect-auto flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {currentItem.type === 'video' ? (
                            <video src={currentItem.src} controls autoPlay className="max-w-full max-h-[85vh] w-auto h-auto rounded-xl" />
                        ) : (
                            <img src={currentItem.src} alt="Enlarged view" className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl" />
                        )}
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
        // Fallback or specific media behavior if needed, otherwise reuse gallery trigger
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
                        <QuickHighlights data={packageData} />
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

                    <section id="reviews" className="scroll-mt-32">
                        <SocialProof data={packageData} onGalleryTrigger={handleGalleryTrigger} />
                    </section>

                </div>

                {/* ---------- RIGHT COLUMN: STICKY FORM ---------- */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 relative z-30">
                    <SidebarLeadForm data={packageData} />
                    <WhyChooseUsSidebar scrollToForm={scrollToForm} />
                </div>
            </div>

            {/* FULL WIDTH BOTTOM SECTIONS */}
            <div className="content-container px-4 md:px-8 mb-16 relative z-10">
                <PartnerTrust />
            </div>

            <RelatedPackages data={packageData} />
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
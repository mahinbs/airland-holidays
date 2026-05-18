import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import {
    ArrowRight,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Globe,
    MessageCircle,
    Sparkles,
    TrendingUp,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

type EventItem = {
    id: string;
    tag: string;
    name: string;
    location: string;
    month: string;
    monthNum: number;
    hookLine: string;
    image: string;
    video: string;
    price: string;
    duration: string;
    ctaLabel: string;
    ctaHref: string;
    trending: boolean;
};

const internationalEvents: EventItem[] = [
    {
        id: 'tomorrowland',
        tag: 'Music Festival',
        name: "Belgium's Tomorrowland",
        location: 'Boom, Belgium',
        month: 'July',
        monthNum: 7,
        hookLine: "Your Wildest Dream",
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-music-festival-4934-small.mp4',
        price: 'INR 2,29,990/-',
        duration: '7N-8D',
        ctaLabel: 'Explore Tomorrowland Packages',
        ctaHref: '/packages?destination=belgium',
        trending: true,
    },
    {
        id: 'songkran',
        tag: 'Festival Highlight',
        name: 'Songkran Festival',
        location: 'Thailand',
        month: 'April',
        monthNum: 4,
        hookLine: "The world's biggest water celebration",
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-young-people-jumping-and-dancing-at-a-summer-outdoor-party-4936-small.mp4',
        price: 'INR 45,999/-',
        duration: '5N-6D',
        ctaLabel: 'Explore Songkran Packages',
        ctaHref: '/packages?destination=thailand',
        trending: true,
    },
    {
        id: 'dubai-shopping',
        tag: 'Shopping Festival',
        name: 'Dubai Shopping Festival',
        location: 'Dubai, UAE',
        month: 'Jan–Feb',
        monthNum: 1,
        hookLine: 'Luxury, offers & entertainment combined',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-sky-over-a-city-4315-small.mp4',
        price: 'INR 65,990/-',
        duration: '4N-5D',
        ctaLabel: 'Explore Dubai Trips',
        ctaHref: '/packages?destination=dubai',
        trending: true,
    },
    {
        id: 'cherry-blossom',
        tag: 'Nature Festival',
        name: 'Cherry Blossom Season',
        location: 'Japan',
        month: 'March–April',
        monthNum: 3,
        hookLine: 'Japan turns pink in the most magical way',
        image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-cherry-blossoms-in-a-park-11539-small.mp4',
        price: 'INR 1,45,000/-',
        duration: '6N-7D',
        ctaLabel: 'Explore Japan Packages',
        ctaHref: '/packages?destination=japan',
        trending: false,
    },
];

const indiaEvents: EventItem[] = [
    {
        id: 'kumbh-mela',
        tag: 'Spiritual Mega Event',
        name: 'Kumbh Mela',
        location: 'Prayagraj, India',
        month: 'Jan–Feb',
        monthNum: 1,
        hookLine: 'The largest human gathering on earth',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-people-in-a-crowded-market-in-india-14065-small.mp4',
        price: 'INR 15,999/-',
        duration: '3N-4D',
        ctaLabel: 'Explore Spiritual Tours',
        ctaHref: '/packages?style=spiritual',
        trending: true,
    },
    {
        id: 'diwali',
        tag: 'Festival of Lights',
        name: 'Diwali Celebrations',
        location: 'Varanasi',
        month: 'Oct–Nov',
        monthNum: 10,
        hookLine: 'India lit up like never before',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-lighting-a-sparkler-in-the-dark-4402-small.mp4',
        price: 'INR 18,500/-',
        duration: '4N-5D',
        ctaLabel: 'Explore Diwali Packages',
        ctaHref: '/packages?destination=india&tag=diwali',
        trending: true,
    },
    {
        id: 'holi',
        tag: 'Festival of Colors',
        name: 'Holi Celebrations',
        location: 'Mathura & Vrindavan',
        month: 'March',
        monthNum: 3,
        hookLine: 'The most colorful day on the planet',
        image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&q=80&w=1600',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-powder-being-thrown-in-the-air-4439-small.mp4',
        price: 'INR 12,999/-',
        duration: '2N-3D',
        ctaLabel: 'Explore Holi Packages',
        ctaHref: '/packages?destination=mathura&tag=holi',
        trending: true,
    },
];

const months = [
    { num: 0, label: 'All' },
    { num: 1, label: 'Jan' },
    { num: 2, label: 'Feb' },
    { num: 3, label: 'Mar' },
    { num: 4, label: 'Apr' },
    { num: 5, label: 'May' },
    { num: 6, label: 'Jun' },
    { num: 7, label: 'Jul' },
    { num: 8, label: 'Aug' },
    { num: 9, label: 'Sep' },
    { num: 10, label: 'Oct' },
    { num: 11, label: 'Nov' },
    { num: 12, label: 'Dec' },
];

type TabType = 'international' | 'india';

export default function FestivalsEvents() {
    const [activeTab, setActiveTab] = useState<TabType>('international');
    const [activeMonth, setActiveMonth] = useState<number>(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const currentMonth = new Date().getMonth() + 1;

    const currentEvents = activeTab === 'international' ? internationalEvents : indiaEvents;
    const filteredEvents = useMemo(
        () =>
            activeMonth === 0
                ? currentEvents
                : currentEvents.filter((event) => event.monthNum === activeMonth || event.monthNum === 0),
        [activeMonth, currentEvents]
    );

    const isFewItems = filteredEvents.length <= 2;
    const shouldLoop = !isFewItems;
    
    // Duplicate events to ensure smooth infinite looping when there are few items (but > 2)
    const displayEvents = shouldLoop && filteredEvents.length < 6
        ? [...filteredEvents, ...filteredEvents.map(e => ({ ...e, id: e.id + '-copy' }))]
        : filteredEvents;

    return (
        <section className="section-padding overflow-hidden bg-slate-50">
            <div className="content-container">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="mb-10 text-center"
                >
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700">
                        <Sparkles className="h-3.5 w-3.5 text-secondary" />
                        Travel Through Moments
                    </span>
                    <h2 className="mb-4 font-['Marcellus'] text-3xl leading-[1.15] text-slate-900 md:text-5xl">
                        Experience the World at Its
                        <br className="hidden md:block" /> Most Celebrated Moments
                    </h2>
                    <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-slate-600 md:text-lg">
                        Plan your journey around iconic festivals, cultural celebrations, and unforgettable global events
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="mb-8 flex justify-center">
                    <div className="flex sm:flex-row flex-col w-full max-w-xl gap-1 rounded-2xl border border-slate-700 bg-white p-1.5 shadow-sm">
                        <button
                            onClick={() => setActiveTab('international')}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 md:px-6 ${
                                activeTab === 'international'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                            type="button"
                        >
                            <Globe className="h-4 w-4" /> International Events
                        </button>
                        <button
                            onClick={() => setActiveTab('india')}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 md:px-6 ${
                                activeTab === 'india'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                            type="button"
                        >
                            <span>🇮🇳</span> India Events
                        </button>
                    </div>
                </div>

                {/* Month Filters */}
                <div className="mb-10 overflow-x-auto scrollbar-hide">
                    <div className="mx-auto flex min-w-max justify-center gap-2 pb-2">
                        {months.map((month) => (
                            <button
                                key={month.num}
                                onClick={() => {
                                    setActiveMonth(month.num);
                                    if (swiperInstance) swiperInstance.slideTo(0);
                                }}
                                className={`relative whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-200 ${
                                    activeMonth === month.num
                                        ? 'border-primary/40 bg-primary/20 text-primary shadow-sm shadow-primary/20'
                                        : 'border-slate-700 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                                type="button"
                            >
                                {month.label}
                                {month.num === currentMonth && month.num !== 0 && (
                                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-secondary/80" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeTab}-${activeMonth}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                        {filteredEvents.length > 0 ? (
                            <div className="relative group/slider px-0 md:px-12">
                                <button
                                    type="button"
                                    onClick={() => swiperInstance?.slidePrev()}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 shadow-lg flex items-center justify-center opacity-0 group-hover/slider:opacity-100 pointer-events-none group-hover/slider:pointer-events-auto transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-0 hover:scale-110"
                                    aria-label="Previous events"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => swiperInstance?.slideNext()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 shadow-lg flex items-center justify-center opacity-0 group-hover/slider:opacity-100 pointer-events-none group-hover/slider:pointer-events-auto transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-0 hover:scale-110"
                                    aria-label="Next events"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    onSwiper={setSwiperInstance}
                                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                                    loop={shouldLoop}
                                    centeredSlides={true}
                                    speed={800}
                                    grabCursor
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: isFewItems ? 1 : 1.15,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: isFewItems ? 1 : 1.25,
                                            spaceBetween: 40,
                                        }
                                    }}
                                    className="pb-8 pt-4 !overflow-visible"
                                >
                                    {displayEvents.map((event) => (
                                        <SwiperSlide key={event.id} className="h-[450px] md:h-[550px] lg:h-[600px]">
                                            {({ isActive }) => (
                                                <a href={event.ctaHref} className={`block relative w-full h-full group rounded-3xl overflow-hidden shadow-2xl bg-black border border-slate-700/50 transition-all duration-[600ms] ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-60'}`}>
                                                    {/* Video / Image Background */}
                                                    <div className="absolute inset-0 w-full h-full">
                                                        <img
                                                            src={event.image}
                                                            alt={event.name}
                                                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
                                                            loading="lazy"
                                                        />
                                                        {isActive && (
                                                            <video
                                                                src={event.video}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />
                                                    </div>

                                                    {/* Content Overlay */}
                                                    <div className="absolute inset-0 p-6 md:p-12 lg:p-16 flex flex-col justify-between">
                                                        {/* Top Tags */}
                                                        <div className="flex items-start justify-between gap-2">
                                                            <span className="rounded-full border border-white/40 bg-black/40 backdrop-blur-md px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-sm">
                                                                {event.tag}
                                                            </span>
                                                            {event.trending && (
                                                                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-900 shadow-sm">
                                                                    <TrendingUp className="h-4 w-4" /> Trending
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Bottom Content */}
                                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                                            <div className="max-w-2xl">
                                                                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/80 uppercase tracking-widest">
                                                                    <span>{event.location}</span>
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                                    <span>{event.month}</span>
                                                                </div>

                                                                <h3 className="mb-2 font-['Marcellus'] text-3xl md:text-5xl lg:text-6xl leading-tight text-white drop-shadow-lg">
                                                                    {event.name}
                                                                </h3>

                                                                <p className="mb-6 text-lg md:text-2xl font-light text-white/90 italic font-serif">
                                                                    {event.hookLine}
                                                                </p>

                                                                <div className="inline-flex flex-col items-start rounded-xl border border-white/20 bg-black/50 backdrop-blur-md p-4 shadow-xl">
                                                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-secondary-light mb-1">
                                                                        Starting Price
                                                                    </span>
                                                                    <div className="flex items-end gap-3">
                                                                        <span className="text-xl md:text-3xl font-bold text-white leading-none">
                                                                            {event.price}
                                                                        </span>
                                                                        <span className="text-sm font-semibold text-white/70 mb-0.5">
                                                                            / {event.duration}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="shrink-0 max-md:mt-2">
                                                                <span className="inline-flex items-center justify-center gap-2 w-full md:w-auto rounded-full bg-primary px-8 py-4 text-sm md:text-base font-bold text-white transition-all hover:bg-white hover:text-slate-900 group/btn shadow-lg">
                                                                    {event.ctaLabel} 
                                                                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-slate-500 text-lg">No events found for this selection.</p>
                                <button
                                    onClick={() => { setActiveTab('international'); setActiveMonth(0); }}
                                    className="mt-4 text-primary font-semibold hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="mt-8 md:mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-700 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm sm:flex-row"
                >
                    <div className="text-center sm:text-left">
                        <p className="mb-1 font-['Marcellus'] text-xl text-slate-900">Confused about the best time to travel? 🤔</p>
                        <p className="text-sm font-light text-slate-600">
                            Our experts will match you with the perfect festival experience
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto shrink-0 gap-3">
                        <a href="/contact" className="btn-primary flex justify-center items-center gap-2 px-7 py-3.5 text-sm">
                            <Calendar className="h-4 w-4" /> Plan Around an Event
                        </a>
                        <a
                            href={`https://wa.me/919090403075?text=${encodeURIComponent(
                                'Hi! I want to plan a trip around a festival.'
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-600 justify-center"
                        >
                            <MessageCircle className="h-4 w-4" /> WhatsApp
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

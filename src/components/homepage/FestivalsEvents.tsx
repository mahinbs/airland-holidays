import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
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
import { useFestivalsEvents } from '../../hooks/useContent';
import { mapFestivalEvent } from '../../lib/mapContent';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type EventMedia =
    | { type: 'image'; src: string }
    | { type: 'video'; src: string; poster: string };

type EventItem = {
    /** Formatted Event Date from the CMS (optional) */
    eventDate?: string;
    id: string;
    tag: string;
    name: string;
    location: string;
    month: string;
    monthNum: number;
    hookLine: string;
    media: EventMedia;
    price: string;
    duration: string;
    ctaLabel: string;
    ctaHref: string;
    trending: boolean;
};

const staticInternationalEvents: EventItem[] = [
    {
        id: 'tomorrowland',
        tag: 'Music Festival',
        name: "Belgium's Tomorrowland",
        location: 'Boom, Belgium',
        month: 'July',
        monthNum: 7,
        hookLine: 'Your Wildest Dream',
        media: {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-music-festival-4934-small.mp4',
            poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600',
        },
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
        media: {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-young-people-jumping-and-dancing-at-a-summer-outdoor-party-4936-small.mp4',
            poster: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=1600',
        },
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
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600',
        },
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
        media: {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-cherry-blossoms-in-a-park-11539-small.mp4',
            poster: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&q=80&w=1600',
        },
        price: 'INR 1,45,000/-',
        duration: '6N-7D',
        ctaLabel: 'Explore Japan Packages',
        ctaHref: '/packages?destination=japan',
        trending: false,
    },
    {
        id: 'alpine-family-trek',
        tag: 'Mountain Escape',
        name: 'Alpine Family Treks',
        location: 'Swiss Alps',
        month: 'June–Sept',
        monthNum: 6,
        hookLine: 'Adventure together, one step at a time',
        media: {
            type: 'video',
            src: 'https://videos.pexels.com/video-files/8345999/8345999-hd_1920_1080_25fps.mp4',
            poster: 'https://images.pexels.com/videos/8345999/pictures/preview-0.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600',
        },
        price: 'INR 1,89,990/-',
        duration: '8N-9D',
        ctaLabel: 'Explore Alpine Packages',
        ctaHref: '/packages?destination=switzerland',
        trending: false,
    },
];

const staticIndiaEvents: EventItem[] = [
    {
        id: 'kumbh-mela',
        tag: 'Spiritual Mega Event',
        name: 'Kumbh Mela',
        location: 'Prayagraj, India',
        month: 'Jan–Feb',
        monthNum: 1,
        hookLine: 'The largest human gathering on earth',
        media: {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-people-in-a-crowded-market-in-india-14065-small.mp4',
            poster: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1600',
        },
        price: 'INR 15,999/-',
        duration: '3N-4D',
        ctaLabel: 'Explore Spiritual Tours',
        ctaHref: '/packages?style=spiritual',
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
        media: {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-powder-being-thrown-in-the-air-4439-small.mp4',
            poster: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&q=80&w=1600',
        },
        price: 'INR 12,999/-',
        duration: '2N-3D',
        ctaLabel: 'Explore Holi Packages',
        ctaHref: '/packages?destination=mathura&tag=holi',
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
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1600',
        },
        price: 'INR 18,500/-',
        duration: '4N-5D',
        ctaLabel: 'Explore Diwali Packages',
        ctaHref: '/packages?destination=india&tag=diwali',
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

function EventCardMedia({ media, name, isActive }: { media: EventMedia; name: string; isActive: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || media.type !== 'video') return;

        if (isActive) {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => undefined);
            }
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isActive, media]);

    const posterSrc = media.type === 'video' ? media.poster : media.src;

    return (
        <div className="absolute inset-0 w-full h-full">
            <img
                src={posterSrc}
                alt={name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                } ${media.type === 'video' && isActive ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
            />

            {media.type === 'video' && (
                <video
                    ref={videoRef}
                    src={media.src}
                    poster={media.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent hidden md:block" />
        </div>
    );
}

export default function FestivalsEvents() {
    const { data: cmsEvents } = useFestivalsEvents();
    const internationalEvents = useMemo(() => {
        if (cmsEvents?.length) {
            return cmsEvents
                .filter((e) => e.event_type !== 'india')
                .map((e) => mapFestivalEvent(e as unknown as Record<string, unknown>)) as EventItem[];
        }
        return staticInternationalEvents;
    }, [cmsEvents]);

    const indiaEvents = useMemo(() => {
        if (cmsEvents?.length) {
            return cmsEvents
                .filter((e) => e.event_type === 'india')
                .map((e) => mapFestivalEvent(e as unknown as Record<string, unknown>)) as EventItem[];
        }
        return staticIndiaEvents;
    }, [cmsEvents]);

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

    const displayEvents =
        shouldLoop && filteredEvents.length < 6
            ? [...filteredEvents, ...filteredEvents.map((e) => ({ ...e, id: e.id + '-copy' }))]
            : filteredEvents;

    return (
        <section className="section-padding overflow-hidden bg-slate-50">
            <div className="content-container">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="mb-8 text-center md:mb-10"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700">
                        <Sparkles className="h-3.5 w-3.5 text-secondary" />
                        Travel Through Moments
                    </span>
                    <h2 className="mb-3 font-['Marcellus'] text-2xl leading-[1.15] text-slate-900 md:text-4xl lg:text-5xl">
                        Experience the World at Its
                        <br className="hidden md:block" /> Most Celebrated Moments
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-slate-600 md:text-base">
                        Plan your journey around iconic festivals, cultural celebrations, and unforgettable global events
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="mb-6 flex justify-center md:mb-8">
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
                <div className="mb-8 overflow-x-auto scrollbar-hide md:mb-10">
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
                            <div className="relative mx-auto max-w-7xl">
                                <button
                                    type="button"
                                    onClick={() => swiperInstance?.slidePrev()}
                                    className="absolute -left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/95 text-primary shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-primary hover:text-white md:-left-5 md:h-11 md:w-11"
                                    aria-label="Previous events"
                                >
                                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => swiperInstance?.slideNext()}
                                    className="absolute -right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/95 text-primary shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-primary hover:text-white md:-right-5 md:h-11 md:w-11"
                                    aria-label="Next events"
                                >
                                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                                </button>

                                <Swiper
                                    modules={[Navigation, Autoplay, Pagination]}
                                    onSwiper={setSwiperInstance}
                                    autoplay={{ delay: 6000, disableOnInteraction: true }}
                                    loop={shouldLoop}
                                    centeredSlides
                                    speed={700}
                                    grabCursor
                                    slidesPerView={1}
                                    spaceBetween={16}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: isFewItems ? 1 : 1.08,
                                            spaceBetween: 24,
                                        },
                                        1024: {
                                            slidesPerView: isFewItems ? 1 : 1.12,
                                            spaceBetween: 28,
                                        },
                                    }}
                                    className="festivals-events-swiper pb-10 pt-2 !overflow-visible"
                                >
                                    {displayEvents.map((event) => (
                                        <SwiperSlide
                                            key={event.id}
                                            className="h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px]"
                                        >
                                            {({ isActive }) => (
                                                <a
                                                    href={event.ctaHref}
                                                    className={`group relative block h-full w-full overflow-hidden rounded-2xl border border-slate-700/40 bg-black shadow-xl transition-all duration-500 ease-out md:rounded-3xl ${
                                                        isActive ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-0'
                                                    }`}
                                                >
                                                    <EventCardMedia media={event.media} name={event.name} isActive={isActive} />

                                                    {/* Desktop tags — top corner, minimal footprint */}
                                                    <div className="absolute left-0 right-0 top-0 hidden p-4 md:flex md:items-start md:justify-between md:p-5">
                                                        <span className="rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                                                            {event.tag}
                                                        </span>
                                                        {event.trending && (
                                                            <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                                                                <TrendingUp className="h-3 w-3" /> Trending
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Bottom-aligned content overlay */}
                                                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8">
                                                        {/* Mobile tags */}
                                                        <div className="mb-2 flex items-center gap-2 md:hidden">
                                                            <span className="rounded-full border border-white/30 bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                                                                {event.tag}
                                                            </span>
                                                            {event.trending && (
                                                                <span className="flex items-center gap-0.5 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-900">
                                                                    <TrendingUp className="h-2.5 w-2.5" /> Trending
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
                                                            <div className="min-w-0 max-w-lg">
                                                                <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                                                    <span>{event.location}</span>
                                                                    <span className="h-1 w-1 rounded-full bg-secondary" />
                                                                    <span>{event.eventDate || event.month}</span>
                                                                </div>

                                                                <h3 className="mb-0.5 font-['Marcellus'] text-lg leading-tight text-white drop-shadow-md sm:text-xl md:text-2xl lg:text-3xl">
                                                                    {event.name}
                                                                </h3>

                                                                <p className="mb-2 line-clamp-1 text-xs font-light italic text-white/80 sm:text-sm md:mb-3">
                                                                    {event.hookLine}
                                                                </p>

                                                                <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1.5 backdrop-blur-sm sm:px-3 sm:py-2">
                                                                    <div>
                                                                        <span className="block text-[8px] font-bold uppercase tracking-widest text-secondary-light sm:text-[9px]">
                                                                            Starting Price
                                                                        </span>
                                                                        <span className="text-sm font-bold leading-none text-white sm:text-base md:text-lg">
                                                                            {event.price}
                                                                        </span>
                                                                    </div>
                                                                    <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold text-white/80 sm:text-[10px]">
                                                                        {event.duration}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all group-hover:bg-white group-hover:text-slate-900 md:inline-flex lg:px-6 lg:py-3 lg:text-sm">
                                                                {event.ctaLabel}
                                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                                            </span>
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
                                    onClick={() => {
                                        setActiveTab('international');
                                        setActiveMonth(0);
                                    }}
                                    className="mt-4 text-primary font-semibold hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <style>{`
                    .festivals-events-swiper .swiper-pagination {
                        bottom: 0 !important;
                    }
                    .festivals-events-swiper .swiper-pagination-bullet {
                        background: #94a3b8;
                        opacity: 0.5;
                        width: 6px;
                        height: 6px;
                        transition: all 0.3s ease;
                    }
                    .festivals-events-swiper .swiper-pagination-bullet-active {
                        background: var(--color-primary, #1a6574);
                        opacity: 1;
                        width: 22px;
                        border-radius: 4px;
                    }
                `}</style>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="mt-8 md:mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-700 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm sm:flex-row"
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

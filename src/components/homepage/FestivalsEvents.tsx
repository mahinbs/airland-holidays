import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
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
import 'keen-slider/keen-slider.min.css';

type EventItem = {
    id: string;
    tag: string;
    name: string;
    location: string;
    month: string;
    monthNum: number;
    hookLine: string;
    description: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
    travelerTypes: string[];
    trending: boolean;
    emoji: string;
};

const internationalEvents: EventItem[] = [
    {
        id: 'songkran',
        tag: 'Festival Highlight',
        name: 'Songkran Festival',
        location: 'Thailand',
        month: 'April',
        monthNum: 4,
        hookLine: "The world's biggest water celebration",
        description: 'Celebrate the Thai New Year with vibrant street parties, music, and unforgettable moments',
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
        ctaLabel: 'Explore Songkran Packages',
        ctaHref: '/packages?destination=thailand',
        travelerTypes: ['Friends', 'Party', 'Couples'],
        trending: true,
        emoji: '🌊',
    },
    {
        id: 'full-moon',
        tag: 'Beach Party',
        name: 'Full Moon Party',
        location: 'Koh Phangan, Thailand',
        month: 'Monthly',
        monthNum: 0,
        hookLine: 'Dance under the stars by the beach',
        description: "Experience one of the world's most iconic beach parties with music, lights, and energy",
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
        ctaLabel: 'Explore Party Trips',
        ctaHref: '/packages?destination=thailand&style=party',
        travelerTypes: ['Friends', 'Party'],
        trending: false,
        emoji: '🌕',
    },
    {
        id: 'dubai-shopping',
        tag: 'Shopping Festival',
        name: 'Dubai Shopping Festival',
        location: 'Dubai, UAE',
        month: 'Jan–Feb',
        monthNum: 1,
        hookLine: 'Luxury, offers & entertainment combined',
        description: 'Shop global brands, enjoy fireworks, and experience Dubai at its festive best',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
        ctaLabel: 'Explore Dubai Trips',
        ctaHref: '/packages?destination=dubai',
        travelerTypes: ['Family', 'Couples', 'Friends'],
        trending: true,
        emoji: '🛍️',
    },
    {
        id: 'oktoberfest',
        tag: 'Cultural Festival',
        name: 'Oktoberfest',
        location: 'Munich, Germany',
        month: 'September–October',
        monthNum: 9,
        hookLine: "The world's greatest beer and culture festival",
        description: "Immerse yourself in Bavarian culture, music, food and one of Europe's biggest celebrations",
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        ctaLabel: 'Explore Europe Trips',
        ctaHref: '/packages?destination=germany',
        travelerTypes: ['Friends', 'Party'],
        trending: false,
        emoji: '🍺',
    },
    {
        id: 'new-year',
        tag: 'New Year Special',
        name: 'New Year Celebrations',
        location: 'Multiple Destinations',
        month: 'December–January',
        monthNum: 12,
        hookLine: 'Ring in the new year in extraordinary style',
        description: "From Sydney fireworks to Dubai fountains - celebrate the new year at the world's most iconic spots",
        image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80',
        ctaLabel: 'Explore New Year Trips',
        ctaHref: '/packages?tag=new-year',
        travelerTypes: ['Couples', 'Family', 'Friends'],
        trending: true,
        emoji: '🎆',
    },
    {
        id: 'cherry-blossom',
        tag: 'Nature Festival',
        name: 'Cherry Blossom Season',
        location: 'Japan',
        month: 'March–April',
        monthNum: 3,
        hookLine: 'Japan turns pink in the most magical way',
        description: 'Walk through tunnels of sakura blossoms and experience Japan at its most breathtaking',
        image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80',
        ctaLabel: 'Explore Japan Packages',
        ctaHref: '/packages?destination=japan',
        travelerTypes: ['Couples', 'Family'],
        trending: false,
        emoji: '🌸',
    },
];

const indiaEvents: EventItem[] = [
    {
        id: 'kumbh-mela',
        tag: 'Spiritual Mega Event',
        name: 'Kumbh Mela',
        location: 'Prayagraj, India',
        month: 'January–February',
        monthNum: 1,
        hookLine: 'The largest human gathering on earth',
        description: "Witness the divine energy of millions gathering for the world's largest spiritual festival",
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
        ctaLabel: 'Explore Spiritual Tours',
        ctaHref: '/packages?style=spiritual',
        travelerTypes: ['Family', 'Spiritual'],
        trending: true,
        emoji: '🕉️',
    },
    {
        id: 'diwali',
        tag: 'Festival of Lights',
        name: 'Diwali Celebrations',
        location: 'North India',
        month: 'October–November',
        monthNum: 10,
        hookLine: 'India lit up like never before',
        description: 'Experience the festival of lights at its most spectacular - from Varanasi ghats to Jaipur palaces',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80',
        ctaLabel: 'Explore Diwali Packages',
        ctaHref: '/packages?destination=india&tag=diwali',
        travelerTypes: ['Family', 'Couples', 'Friends'],
        trending: true,
        emoji: '✨',
    },
    {
        id: 'rann-utsav',
        tag: 'Cultural Festival',
        name: 'Rann Utsav',
        location: 'Kutch, Gujarat',
        month: 'November–February',
        monthNum: 11,
        hookLine: 'White desert magic under the full moon',
        description: "Dance, music, and craft on the vast white salt desert of Rann - one of India's most unique festivals",
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        ctaLabel: 'Explore Gujarat Packages',
        ctaHref: '/packages?destination=gujarat',
        travelerTypes: ['Couples', 'Family', 'Friends'],
        trending: false,
        emoji: '🏜️',
    },
    {
        id: 'kerala-festivals',
        tag: 'Temple Festival',
        name: 'Kerala Temple Festivals',
        location: 'Kerala, India',
        month: 'January–April',
        monthNum: 2,
        hookLine: 'Elephants, drums & divine spectacle',
        description: 'Experience the thunderous processions, caparisoned elephants, and traditional Kerala festival energy',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
        ctaLabel: 'Explore Kerala Packages',
        ctaHref: '/packages?destination=kerala',
        travelerTypes: ['Family', 'Couples'],
        trending: false,
        emoji: '🐘',
    },
    {
        id: 'holi',
        tag: 'Festival of Colors',
        name: 'Holi Celebrations',
        location: 'Mathura & Vrindavan',
        month: 'March',
        monthNum: 3,
        hookLine: 'The most colorful day on the planet',
        description: 'Join millions in the most joyful, vibrant, and energetic festival celebration in the world',
        image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=800&q=80',
        ctaLabel: 'Explore Holi Packages',
        ctaHref: '/packages?destination=mathura&tag=holi',
        travelerTypes: ['Friends', 'Couples', 'Family'],
        trending: true,
        emoji: '🎨',
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

type EventCardProps = {
    event: EventItem;
    index: number;
};

function EventCard({ event }: EventCardProps) {
    return (
        <div
            className="h-full"
        >
            <a
                href={event.ctaHref}
                className="group relative block h-[380px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:h-[470px]"
            >
                <img
                    src={event.image}
                    alt={event.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-2">
                    <span className="rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-700 backdrop-blur-sm">
                        {event.tag}
                    </span>
                    {event.trending && (
                        <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-900">
                            <TrendingUp className="h-3 w-3" /> Trending
                        </span>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white/65">
                        <span>{event.emoji}</span>
                        <span>{event.location}</span>
                        <span className="text-white/30">•</span>
                        <span>{event.month}</span>
                    </div>

                    <h3 className="mb-2 font-['Marcellus'] text-2xl leading-tight text-white">{event.name}</h3>

                    <p className="mb-4 line-clamp-2 text-sm font-light leading-snug text-white/85">{event.hookLine}</p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                        {event.travelerTypes.map((type) => (
                            <span
                                key={type}
                                className="rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white/95"
                            >
                                {type}
                            </span>
                        ))}
                    </div>

                    <div className="max-md:translate-y-0 max-md:opacity-100 md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                            {event.ctaLabel} <ArrowRight className="h-4 w-4" />
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default function FestivalsEvents() {
    const [activeTab, setActiveTab] = useState<TabType>('international');
    const [activeMonth, setActiveMonth] = useState<number>(0);
    const [, setCurrentSlide] = useState<number>(0);
    const currentMonth = new Date().getMonth() + 1;

    const currentEvents = activeTab === 'international' ? internationalEvents : indiaEvents;
    const filteredEvents = useMemo(
        () =>
            activeMonth === 0
                ? currentEvents
                : currentEvents.filter((event) => event.monthNum === activeMonth || event.monthNum === 0),
        [activeMonth, currentEvents]
    );

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 1.08,
            spacing: 14,
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: {
                    perView: 1.45,
                    spacing: 16,
                },
            },
            '(min-width: 768px)': {
                slides: {
                    perView: 2.15,
                    spacing: 18,
                },
            },
            '(min-width: 1024px)': {
                slides: {
                    perView: 2.8,
                    spacing: 20,
                },
            },
            '(min-width: 1280px)': {
                slides: {
                    perView: 3.2,
                    spacing: 20,
                },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

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

                <div className="mb-8 flex justify-center">
                    <div className="flex sm:flex-row flex-col w-full max-w-xl gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
                        <button
                            onClick={() => setActiveTab('international')}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 md:px-6 ${activeTab === 'international'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            type="button"
                        >
                            <Globe className="h-4 w-4" /> International Events
                        </button>
                        <button
                            onClick={() => setActiveTab('india')}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 md:px-6 ${activeTab === 'india'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            type="button"
                        >
                            <span>🇮🇳</span> India Events
                        </button>
                    </div>
                </div>

                <div className="mb-8 overflow-x-auto scrollbar-hide">
                    <div className="mx-auto flex min-w-max justify-center gap-2 pb-2">
                        {months.map((month) => (
                            <button
                                key={month.num}
                                onClick={() => setActiveMonth(month.num)}
                                className={`relative whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-200 ${activeMonth === month.num
                                        ? 'border-primary/40 bg-primary/20 text-primary shadow-sm shadow-primary/20'
                                        : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800'
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
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <div className="md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
                            <div
                                ref={sliderRef}
                                key={`${activeTab}-${activeMonth}-slider`}
                                className="keen-slider overflow-visible pb-4"
                            >
                                {filteredEvents.map((event, index) => (
                                    <div key={event.id} className="keen-slider__slide min-h-[380px] md:min-h-[470px]">
                                        <EventCard event={event} index={index} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-5 hidden items-center justify-between gap-3 md:flex">
                    <div className="text-xs text-slate-500">Swipe or use arrows to explore</div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => instanceRef.current?.prev()}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary"
                            aria-label="Previous events"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => instanceRef.current?.next()}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary"
                            aria-label="Next events"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-sm sm:flex-row"
                >
                    <div>
                        <p className="mb-1 font-['Marcellus'] text-xl text-slate-900">Confused about the best time to travel? 🤔</p>
                        <p className="text-sm font-light text-slate-600">
                            Our experts will match you with the perfect festival experience
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row shrink-0 gap-3">
                        <a href="/contact" className="btn-primary flex items-center gap-2 px-7 py-3.5 text-sm">
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

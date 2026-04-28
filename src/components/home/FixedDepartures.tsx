import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Calendar, Clock, ArrowRight } from 'lucide-react';

const trips = [
  // INTERNATIONAL
  {
    id: 'bali-group-may',
    category: 'international',
    badge: 'Limited Seats',
    badgeType: 'limited', // 'limited' | 'trending' | 'festival'
    title: 'Bali Island Escape – Group Edition',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    duration: '5N / 6D',
    dateRange: '12 May – 18 May',
    monthNum: 5,
    price: '₹49,999',
    priceNote: 'onwards',
    microInfo: ['Flights Optional', 'Visa Included'],
    seatsLeft: 6,
    href: '/packages/bali-group',
  },
  {
    id: 'thailand-june',
    category: 'international',
    badge: 'Trending',
    badgeType: 'trending',
    title: 'Thailand Adventure – Group Tour',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
    duration: '6N / 7D',
    dateRange: '05 Jun – 12 Jun',
    monthNum: 6,
    price: '₹55,999',
    priceNote: 'onwards',
    microInfo: ['Flights Included', 'Visa Assisted'],
    seatsLeft: 10,
    href: '/packages/thailand-group',
  },
  {
    id: 'dubai-july',
    category: 'international',
    badge: 'Limited Seats',
    badgeType: 'limited',
    title: 'Dubai Discovery – Group Departure',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    duration: '4N / 5D',
    dateRange: '18 Jul – 23 Jul',
    monthNum: 7,
    price: '₹62,999',
    priceNote: 'per person',
    microInfo: ['Flights Optional', 'Visa Included'],
    seatsLeft: 4,
    href: '/packages/dubai-group',
  },
  {
    id: 'singapore-aug',
    category: 'international',
    badge: 'Festival Special',
    badgeType: 'festival',
    title: 'Singapore Fest – Group Edition',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    duration: '5N / 6D',
    dateRange: '08 Aug – 14 Aug',
    monthNum: 8,
    price: '₹58,499',
    priceNote: 'onwards',
    microInfo: ['Flights Optional', 'Visa Assisted'],
    seatsLeft: 12,
    href: '/packages/singapore-group',
  },
  // INDIA
  {
    id: 'kerala-monsoon',
    category: 'india',
    badge: 'Trending',
    badgeType: 'trending',
    title: 'Kerala Monsoon Magic – Group Trip',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    duration: '4N / 5D',
    dateRange: '20 Jun – 25 Jun',
    monthNum: 6,
    price: '₹18,999',
    priceNote: 'per person',
    microInfo: ['Train Included', 'Stays Included'],
    seatsLeft: 8,
    href: '/packages/kerala-group',
  },
  {
    id: 'rajasthan-nov',
    category: 'india',
    badge: 'Limited Seats',
    badgeType: 'limited',
    title: 'Rajasthan Royal – Group Departure',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    duration: '6N / 7D',
    dateRange: '10 Nov – 17 Nov',
    monthNum: 11,
    price: '₹22,499',
    priceNote: 'onwards',
    microInfo: ['Train Optional', 'Hotels Included'],
    seatsLeft: 5,
    href: '/packages/rajasthan-group',
  },
  {
    id: 'andaman-dec',
    category: 'india',
    badge: 'Festival Special',
    badgeType: 'festival',
    title: 'Andaman New Year Group Trip',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    duration: '5N / 6D',
    dateRange: '28 Dec – 02 Jan',
    monthNum: 12,
    price: '₹28,999',
    priceNote: 'per person',
    microInfo: ['Flights Optional', 'Ferry Included'],
    seatsLeft: 9,
    href: '/packages/andaman-group',
  },
];

const months = [
  { num: 0, label: 'All' },
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

const TripCard = ({ trip, index }: { trip: typeof trips[0]; index: number }) => {
  const seatColor =
    trip.seatsLeft <= 4 ? 'text-red-600' :
      trip.seatsLeft <= 8 ? 'text-orange-500' :
        'text-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="shrink-0 snap-start h-full"
    >
      <a
        href={trip.href}
        className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 group w-full"
      >
        {/* IMAGE */}
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge — top left */}
          <span className={`absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${trip.badgeType === 'limited'
              ? 'bg-red-50 text-red-700 border-red-200'
              : trip.badgeType === 'trending'
                ? 'bg-secondary/90 text-slate-900 border-transparent'
                : 'bg-primary/90 text-white border-transparent'
            }`}>
            {trip.seatsLeft <= 4 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {trip.badge}
          </span>

          {/* Seats left — top right */}
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
            <span className={seatColor}>{trip.seatsLeft}</span> seats left
          </span>

          {/* Date chip — bottom left, always visible */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/15 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
            <Calendar className="w-3 h-3" />
            {trip.dateRange}
          </div>
        </div>

        {/* CARD BODY */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Duration pill */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {trip.duration}
            </span>
          </div>

          {/* Trip name */}
          <h3 className="Marcellus text-lg text-slate-900 group-hover:text-primary transition-colors leading-snug mb-3">
            {trip.title}
          </h3>

          {/* Micro info tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {trip.microInfo.map((info) => (
              <span key={info} className="bg-primary/5 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/15">
                {info}
              </span>
            ))}
          </div>

          {/* Price + CTA row */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Starting from</p>
              <p className="Marcellus text-2xl text-slate-900 font-bold leading-none">
                {trip.price}
                <span className="text-slate-400 text-sm font-normal ml-1">{trip.priceNote}</span>
              </p>
            </div>
            <span className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 max-md:opacity-100 max-md:translate-y-0">
              View Trip <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default function FixedDepartures() {
  const [activeTab, setActiveTab] = useState<'international' | 'india'>('international');
  const [activeMonth, setActiveMonth] = useState<number>(0);

  if (trips.length === 0) return null;

  const filteredTrips = trips
    .filter(t => t.category === activeTab)
    .filter(t => activeMonth === 0 || t.monthNum === activeMonth);

  const handleTabChange = (tabId: 'international' | 'india') => {
    setActiveTab(tabId);
    setActiveMonth(0);
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden relative">
      <div className="content-container">
        {/* 1. SECTION HEADER */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-5">
              <CalendarDays className="w-3.5 h-3.5" />
              Fixed Departure Group Tours
            </span>
            <h2 className="Marcellus text-3xl md:text-5xl text-slate-900 mt-2 mb-4">
              Upcoming Premium Group Trips
            </h2>
            <p className="text-slate-600 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Travel with like-minded explorers on fixed dates, curated for unforgettable experiences
            </p>
          </motion.div>
        </div>

        {/* 2. TOGGLE TABS */}
        <div className="flex justify-center mb-7">
          <div className="flex bg-slate-100 rounded-2xl p-1.5 gap-1">
            {[
              { id: 'international', label: '🌍 International' },
              { id: 'india', label: '🇮🇳 India' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as 'international' | 'india')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-250 ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-slate-600 hover:text-primary hover:bg-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. MONTH FILTER STRIP */}
        <div className="overflow-x-auto scrollbar-hide mb-8">
          <div className="flex gap-2 pb-1 justify-start md:justify-center min-w-max md:min-w-0 mx-auto px-4 md:px-0">
            {months.map((m) => (
              <button
                key={m.num}
                onClick={() => setActiveMonth(m.num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${activeMonth === m.num
                    ? 'bg-primary/15 text-primary border-primary/30'
                    : 'bg-slate-50 border-slate-700 text-slate-600 hover:bg-slate-100 hover:text-slate-700'
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* NO RESULTS STATE */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No trips scheduled for this filter.</p>
            <button onClick={() => setActiveMonth(0)} className="text-primary text-sm font-bold mt-3 hover:underline">
              View all months
            </button>
          </div>
        )}

        {/* 4. TRIP CARD DESIGN */}
        {filteredTrips.length > 0 && (
          <motion.div
            key={`${activeTab}-${activeMonth}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredTrips.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

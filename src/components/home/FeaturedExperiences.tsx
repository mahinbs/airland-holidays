import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

type Package = {
  id: number;
  title: string;
  continent: string;
  experiences: string[];
  duration: string;
  price: string;
  images: string[];
  href: string;
};

const packages: Package[] = [
  {
    id: 1,
    title: 'Bali Romantic Getaway',
    continent: 'Asia',
    experiences: ['Honeymoon', 'Luxury'],
    duration: '6N / 7D',
    price: '₹45,999',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/bali-romantic'
  },
  {
    id: 2,
    title: 'Swiss Alps Retreat',
    continent: 'Europe',
    experiences: ['Luxury', 'Adventure'],
    duration: '5N / 6D',
    price: '₹1,25,000',
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/swiss-alps'
  },
  {
    id: 3,
    title: 'Dubai Luxury Escapade',
    continent: 'Middle East',
    experiences: ['Luxury', 'Family'],
    duration: '4N / 5D',
    price: '₹55,000',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/dubai-luxury'
  },
  {
    id: 4,
    title: 'African Safari Adventure',
    continent: 'Africa',
    experiences: ['Adventure', 'Family'],
    duration: '7N / 8D',
    price: '₹1,80,000',
    images: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547471080-7cb2ac64cedc?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/african-safari'
  },
  {
    id: 5,
    title: 'Varanasi Spiritual Journey',
    continent: 'Asia',
    experiences: ['Spiritual', 'Family'],
    duration: '3N / 4D',
    price: '₹15,000',
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1571536802807-3cab2f5f1c97?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/varanasi-spiritual'
  },
  {
    id: 6,
    title: 'Thailand Boys Trip',
    continent: 'Asia',
    experiences: ['Boys Only Trip', 'Adventure'],
    duration: '5N / 6D',
    price: '₹35,000',
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/thailand-boys'
  },
  {
    id: 7,
    title: 'Gold Coast Experience',
    continent: 'Australia',
    experiences: ['Family', 'Adventure'],
    duration: '6N / 7D',
    price: '₹95,000',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/gold-coast'
  },
  {
    id: 8,
    title: 'Maldives Honeymoon',
    continent: 'Asia',
    experiences: ['Honeymoon', 'Luxury'],
    duration: '4N / 5D',
    price: '₹85,000',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/maldives-honeymoon'
  },
  {
    id: 9,
    title: 'New York City Break',
    continent: 'Americas',
    experiences: ['Luxury', 'Family'],
    duration: '5N / 6D',
    price: '₹1,50,000',
    images: [
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/new-york'
  },
  {
    id: 10,
    title: 'Rome Culture Tour',
    continent: 'Europe',
    experiences: ['Family', 'Luxury'],
    duration: '6N / 7D',
    price: '₹1,10,000',
    images: [
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&q=80&w=800'
    ],
    href: '/packages/rome-culture'
  }
];

const continentsList = ['All', 'Asia', 'Europe', 'Africa', 'Middle East', 'Australia', 'Americas'];
const experiencesList = ['All', 'Honeymoon', 'Luxury', 'Family', 'Boys Only Trip', 'Adventure', 'Spiritual'];

export default function FeaturedExperiences() {
  const [activeContinent, setActiveContinent] = useState('All');
  const [activeExperience, setActiveExperience] = useState('All');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchContinent = activeContinent === 'All' || pkg.continent === activeContinent;
      const matchExperience = activeExperience === 'All' || pkg.experiences.includes(activeExperience);
      return matchContinent && matchExperience;
    });
  }, [activeContinent, activeExperience]);

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">
              Curated For You
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Discover Our Most Loved Holiday Experiences
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Explore our most popular Holiday Packages curated for every kind of traveller from Luxury escapes, Honeymoon retreats to Spiritual journeys across the world.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col items-center gap-4">
          {/* Continent Filter */}
          <div className="flex overflow-x-auto scrollbar-hide max-w-full pb-2 px-2 gap-2">
            {continentsList.map((cont) => (
              <button
                key={cont}
                onClick={() => {
                  setActiveContinent(cont);
                  if (swiperInstance) swiperInstance.slideTo(0);
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeContinent === cont
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          {/* Experience Filter */}
          <div className="flex overflow-x-auto scrollbar-hide max-w-full pb-2 px-2 gap-2">
            {experiencesList.map((exp) => (
              <button
                key={exp}
                onClick={() => {
                  setActiveExperience(exp);
                  if (swiperInstance) swiperInstance.slideTo(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeExperience === exp
                    ? 'bg-secondary text-slate-900 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Slider */}
        <div className="relative group/slider px-2 md:px-0">
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg items-center justify-center opacity-0 group-hover/slider:opacity-100 pointer-events-none group-hover/slider:pointer-events-auto transition-all hover:bg-primary hover:text-white hover:border-primary disabled:opacity-0 hidden md:flex"
            aria-label="Previous packages"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg items-center justify-center opacity-0 group-hover/slider:opacity-100 pointer-events-none group-hover/slider:pointer-events-auto transition-all hover:bg-primary hover:text-white hover:border-primary disabled:opacity-0 hidden md:flex"
            aria-label="Next packages"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {filteredPackages.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={setSwiperInstance}
              autoplay={{ delay: 3500, disableOnInteraction: true }}
              speed={800}
              grabCursor
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                480: { slidesPerView: 2.2, spaceBetween: 20 },
                768: { slidesPerView: 3.2, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="pb-10 pt-4 px-2"
            >
              {filteredPackages.map((pkg, index) => (
                <SwiperSlide key={pkg.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.5 }}
                    className="h-full"
                  >
                    <a href={pkg.href} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                        {/* Primary Image */}
                        <img
                          src={pkg.images[0]}
                          alt={pkg.title}
                          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                          loading="lazy"
                        />
                        {/* Hover Image */}
                        <img
                          src={pkg.images[1] || pkg.images[0]}
                          alt={`${pkg.title} alternative view`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Top Tags */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                            {pkg.continent}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {pkg.duration}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                          {pkg.experiences.map((exp) => (
                            <span key={exp} className="bg-primary/5 text-primary border border-primary/10 text-[10px] font-semibold px-2 py-1 rounded-full">
                              {exp}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Starting from</p>
                            <p className="text-lg font-bold text-slate-900">{pkg.price}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-slate-400 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-500 text-lg">No packages found for the selected filters.</p>
              <button 
                onClick={() => { setActiveContinent('All'); setActiveExperience('All'); }}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-12"
        >
          <a
            href="/packages"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 group"
          >
            View All Packages 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

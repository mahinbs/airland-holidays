import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

type DestinationCard = {
  id: number;
  name: string;
  image: string;
  type: 'domestic' | 'international';
  href: string;
};

const destinations: DestinationCard[] = [
  { id: 1, name: 'Ladakh', image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=ladakh' },
  { id: 2, name: 'Sri Lanka', image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=sri-lanka' },
  { id: 3, name: 'Kashmir', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=kashmir' },
  { id: 4, name: 'Bhutan', image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=bhutan' },
  { id: 5, name: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=himachal-pradesh' },
  { id: 6, name: 'Sikkim', image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'domestic', href: '/packages?destination=sikkim' },
  { id: 7, name: 'Maldives', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=maldives' },
  { id: 8, name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=dubai' },
  { id: 9, name: 'Switzerland', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=switzerland' },
  { id: 10, name: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=thailand' },
  { id: 11, name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=goa' },
  { id: 12, name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=kerala' },
  { id: 13, name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=rajasthan' },
  { id: 14, name: 'Andaman', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=andaman' },
  { id: 15, name: 'Uttarakhand', image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'domestic', href: '/packages?destination=uttarakhand' },
  { id: 16, name: 'Meghalaya', image: 'https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'domestic', href: '/packages?destination=meghalaya' },
  { id: 17, name: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=700&q=80', type: 'domestic', href: '/packages?destination=tamil-nadu' },
  { id: 18, name: 'Karnataka', image: 'https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=700', type: 'domestic', href: '/packages?destination=karnataka' },
  { id: 19, name: 'Arunachal Pradesh', image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'domestic', href: '/packages?destination=arunachal-pradesh' },
  { id: 20, name: 'Odisha', image: 'https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'domestic', href: '/packages?destination=odisha' },
  { id: 21, name: 'Vietnam', image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'international', href: '/packages?destination=vietnam' },
  { id: 22, name: 'Japan', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=japan' },
  { id: 23, name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=singapore' },
  { id: 24, name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=bali' },
  { id: 25, name: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=turkey' },
  { id: 26, name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=france' },
  { id: 27, name: 'Italy', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=italy' },
  { id: 28, name: 'Norway', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=norway' },
  { id: 29, name: 'South Korea', image: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'international', href: '/packages?destination=south-korea' },
  { id: 30, name: 'Mauritius', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=700', type: 'international', href: '/packages?destination=mauritius' },
  { id: 31, name: 'Canada', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=canada' },
  { id: 32, name: 'Australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=700&q=80', type: 'international', href: '/packages?destination=australia' },
];

export default function FeaturedPackages() {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const filteredDestinations = useMemo(
    () => destinations.filter((destination) => destination.type === activeTab),
    [activeTab]
  );

  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Trending Destinations</h2>

          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-700">
            <button
              onClick={() => setActiveTab('domestic')}
              className={`px-5 py-2 text-sm rounded-lg font-semibold transition-colors ${
                activeTab === 'domestic' ? 'bg-primary text-white shadow-sm' : 'text-slate-700 hover:text-primary'
              }`}
            >
              Domestic
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-5 py-2 text-sm rounded-lg font-semibold transition-colors ${
                activeTab === 'international' ? 'bg-primary text-white shadow-sm' : 'text-slate-700 hover:text-primary'
              }`}
            >
              International
            </button>
          </div>
        </motion.div>

        <div className="relative group/slider">
          <button
            type="button"
            aria-label="Previous destinations"
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-700 text-primary shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 pointer-events-none group-hover/slider:pointer-events-auto transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Next destinations"
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-700 text-primary shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 pointer-events-none group-hover/slider:pointer-events-auto transition-opacity"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <Swiper
            modules={[Autoplay]}
            onSwiper={setSwiperInstance}
            autoplay={{ delay: 2600, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={filteredDestinations.length > 6}
            speed={700}
            grabCursor
            slidesPerView={2}
            spaceBetween={14}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 6, spaceBetween: 20 },
            }}
            className="pb-4"
          >
            {filteredDestinations.map((destination) => (
              <SwiperSlide key={destination.id}>
                <a href={destination.href} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-4 left-3 right-3 text-center text-white/95 font-bold font-['Marcellus'] text-lg leading-tight tracking-wide drop-shadow-md">
                        {destination.name}
                      </span>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="/packages"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Explore Now <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

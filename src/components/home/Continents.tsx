import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

const continents = [
    { id: 'asia', name: 'Asia', tours: 142, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', tag: 'Trending' },
    { id: 'europe', name: 'Europe', tours: 118, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
    { id: 'africa', name: 'Africa', tours: 48, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', tag: 'Wild' },
    { id: 'middle-east', name: 'Middle East', tours: 64, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
    { id: 'americas', name: 'Americas', tours: 56, image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80' },
    { id: 'pacific', name: 'Australia & Pacific', tours: 32, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
];



type Continent = (typeof continents)[0];

function ContinentCard({ cont }: { cont: Continent }) {
    return (
        <a
            href={`/continents/${cont.id}`}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 block h-full border border-slate-100"
        >
            <div className="aspect-[4/5] relative overflow-hidden">
                <motion.img
                    src={cont.image}
                    alt={cont.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                {cont.tag && (
                    <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10 shadow-sm">
                        {cont.tag}
                    </div>
                )}

                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-marcellus text-3xl font-bold mb-2 drop-shadow-lg">{cont.name}</h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-white/95 text-xs font-bold uppercase tracking-wider">{cont.tours} Packages</p>
                        <span className="w-6 h-px bg-secondary block" />
                    </div>
                </div>
            </div>
        </a>
    );
}

export default function Continents() {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1.2,
            spacing: 16
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: { perView: 2.2, spacing: 20 }
            },
            '(min-width: 768px)': {
                slides: { perView: 3.2, spacing: 24 }
            },
            '(min-width: 1024px)': {
                slides: { perView: 4.2, spacing: 24 }
            },
            '(min-width: 1280px)': {
                slides: { perView: 5.2, spacing: 24 }
            }
        }
    });

    return (
        <section className="section-padding bg-slate-50">
            <div className="content-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Browse by Region</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Travel the World</h2>
                        <p className="text-slate-600 text-lg">Explore our handpicked selection of the world's most breathtaking locations.</p>
                    </div>
                    <a href="/continents" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group">
                        View All Regions
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div ref={sliderRef} className="keen-slider overflow-visible py-4">
                    {continents.map((cont) => (
                        <div key={cont.id} className="keen-slider__slide">
                            <ContinentCard cont={cont} />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={() => instanceRef.current?.prev()}
                        aria-label="Previous continent"
                        className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-primary hover:text-white hover:bg-primary hover:scale-105 transition-all duration-300 shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => instanceRef.current?.next()}
                        aria-label="Next continent"
                        className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-primary hover:text-white hover:bg-primary hover:scale-105 transition-all duration-300 shadow-sm"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}

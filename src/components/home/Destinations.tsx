import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

const destinations = [
    { id: 1, name: 'Maldives', tours: 12, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800', tag: 'Trending' },
    { id: 2, name: 'Bali, Indonesia', tours: 18, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Swiss Alps', tours: 8, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', tag: 'Best Seller' },
    { id: 4, name: 'Dubai', tours: 24, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

type Destination = (typeof destinations)[0];

function DestinationCard({ dest }: { dest: Destination }) {
    return (
        <a
            href={`/destinations/${dest.name.toLowerCase().replace(', ', '-')}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block h-full"
        >
            <div className="aspect-[4/5] relative overflow-hidden">
                <motion.img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                {dest.tag && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10">
                        {dest.tag}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-sans text-2xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{dest.tours} Packages</p>
                </div>
            </div>
        </a>
    );
}

export default function Destinations() {
    const [, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1.1,
            spacing: 16
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: {
                    perView: 1.4,
                    spacing: 20
                }
            },
            '(min-width: 768px)': {
                slides: {
                    perView: 2,
                    spacing: 24
                }
            }
        }
    });

    return (
        <section className="section-padding bg-slate-50">
            <div className="content-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Top Destinations</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Wanderlust Awaits</h2>
                        <p className="text-slate-600 text-lg">Explore our handpicked selection of the world's most breathtaking locations.</p>
                    </div>
                    <a href="/destinations" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group">
                        View All Destinations
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6 lg:hidden">
                    <button
                        onClick={() => instanceRef.current?.prev()}
                        aria-label="Previous destination"
                        className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => instanceRef.current?.next()}
                        aria-label="Next destination"
                        className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="hidden lg:grid lg:grid-cols-4 gap-6"
                >
                    {destinations.map((dest, index) => (
                        <motion.div key={dest.id} variants={item} className={`${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                            <DestinationCard dest={dest} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

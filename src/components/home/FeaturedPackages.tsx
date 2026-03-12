import { MapPin, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredPackages = [
    { id: 1, title: 'Bali Bliss & Temples', destination: 'Bali, Indonesia', duration: '7 Days', price: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800', tag: 'Best Seller' },
    { id: 2, title: 'Maldives Honeymoon', destination: 'Maldives', duration: '5 Days', price: 2800, rating: 5.0, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800', tag: 'Honeymoon' },
    { id: 3, title: 'Swiss Alps Adventure', destination: 'Switzerland', duration: '10 Days', price: 3400, rating: 4.9, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', tag: 'Adventure' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function FeaturedPackages() {
    return (
        <section className="section-padding bg-white">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Curated Experiences</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Featured Tour Packages</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Handpicked journeys that define luxury, adventure, and unforgettable memories.</p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {featuredPackages.map((pkg) => (
                        <motion.div key={pkg.id} variants={item}>
                            <a href={`/packages/${pkg.id}`} className="group block h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-slate-100">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <motion.img
                                            src={pkg.image}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        {pkg.tag && (
                                            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                                {pkg.tag}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-1 text-primary text-sm font-medium mb-2">
                                            <MapPin className="w-4 h-4" /> {pkg.destination}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{pkg.title}</h3>
                                        <div className="flex items-center gap-4 text-slate-500 text-sm mb-4 mt-auto">
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pkg.duration}</span>
                                            <span className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current" /> {pkg.rating}</span>
                                        </div>
                                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                            <span className="text-xl font-bold text-slate-900">From ${pkg.price}</span>
                                            <span className="text-primary font-semibold text-sm group-hover:underline">View Details →</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <a href="/packages" className="btn-outline inline-flex items-center gap-2">
                        View All Packages
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

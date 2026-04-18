import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Plane, Bird } from 'lucide-react';

const collageImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
];

export default function ContactUs() {
    return (
        <section className="section-padding bg-[#f5f0e8] relative overflow-hidden">
            {/* Subtle wave pattern at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-100/30 to-transparent pointer-events-none" />

            <div className="content-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Image Collage */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {collageImages.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative overflow-hidden rounded-lg md:rounded-xl shadow-md even:-translate-y-3 even:md:-translate-y-4"
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full aspect-square object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Central badge card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 bg-white/95 backdrop-blur-sm px-6 py-5 rounded-2xl shadow-xl border-2 border-amber-200/60 z-10"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                                    <Bird className="w-6 h-6 text-primary" />
                                </div>
                                <span className="font-serif italic text-amber-800/80 text-sm tracking-wide">Airland Holidays</span>
                                <span className="font-bold text-slate-800 text-lg uppercase tracking-wider">Best Travel Agency</span>
                            </div>
                        </motion.div>

                        {/* Stamp badge */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -10 }}
                            whileInView={{ opacity: 1, rotate: 12 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="absolute top-2 right-2 md:top-4 md:right-4 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-600/80 bg-amber-500/90 flex items-center justify-center shadow-lg z-10"
                        >
                            <span className="text-[8px] md:text-[9px] font-bold text-white uppercase text-center leading-tight px-1.5">
                                Airland Holidays
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-amber-100/50"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-serif italic text-2xl text-slate-700">Contact Us</span>
                            <div className="h-px flex-1 max-w-[80px] bg-amber-400/60" />
                            <Plane className="w-5 h-5 text-primary" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Reach Us Anytime!</h2>

                        <p className="text-slate-600 leading-relaxed mb-10">
                            We specialize in crafting memorable journeys with the perfect blend of comfort, adventure, and relaxation.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Call Us</h3>
                                    <a href="tel:+911234567890" className="text-slate-700 hover:text-primary transition-colors font-medium">
                                        +91 12345 67890
                                    </a>
                                    <span className="text-slate-400 mx-2">|</span>
                                    <a href="tel:+919876543210" className="text-slate-700 hover:text-primary transition-colors font-medium">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Reach Us</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Airland Holidays<br />
                                        123 Travel Avenue, Wanderlust City<br />
                                        Mumbai - 400001
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Mail Us</h3>
                                    <a href="mailto:info@airlandholidays.com" className="text-slate-600 hover:text-primary transition-colors">
                                        info@airlandholidays.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <a
                            href="/contact"
                            className="mt-10 inline-flex items-center gap-2 btn-primary"
                        >
                            Get in Touch
                            <Plane className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

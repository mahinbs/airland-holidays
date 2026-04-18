import { ShieldCheck, Users, Map, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    { id: 1, label: 'Satisfied Travelers', value: '50k+', icon: Users },
    { id: 2, label: 'Years Experience', value: '25+', icon: Clock },
    { id: 3, label: 'Global Destinations', value: '120+', icon: Map },
    { id: 4, label: 'Verified Partners', value: '500+', icon: ShieldCheck },
];

export default function WhyUs() {
    return (
        <section className="section-padding bg-white overflow-hidden">
            <div className="content-container">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1"
                    >
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose Airland</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            We Craft Travel <br className="hidden md:block" />
                            Experiences That <br className="hidden md:block" />
                            <span className="text-primary italic font-sans text-4xl md:text-6xl">Last A Lifetime.</span>
                        </h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-xl">
                            Since 1999, we've been turning travel dreams into reality. Our team of expert advisors works tirelessly to curate premium packages with 24/7 support, ensuring you explore the world with absolute peace of mind.
                        </p>

                        <motion.ul 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="space-y-4 mb-10"
                        >
                            {[
                                "100% Secure & Trusted Booking Process",
                                "No Hidden Fees or Surcharges",
                                "Personalized Itineraries & Priority Support"
                            ].map((text, i) => (
                                <motion.li 
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium font-lg">{text}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <button className="btn-primary">Learn More About Us</button>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 w-full relative"
                    >
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-slate-50 rounded-full blur-3xl -z-10"></div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5, type: "spring" }}
                                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                        className={`bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center ${index % 2 !== 0 ? 'translate-y-8' : ''}`}
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 flex items-center justify-center shadow-sm border border-primary/10">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                                        <div className="text-slate-600 font-semibold uppercase tracking-wide text-xs">{stat.label}</div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

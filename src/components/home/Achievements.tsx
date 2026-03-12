import { Award, Users, Globe, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const achievements = [
    { icon: Award, value: '25+', label: 'Years', featured: true },
    { icon: Users, value: '50k+', label: 'Travelers' },
    { icon: Globe, value: '120+', label: 'Destinations' },
    { icon: Star, value: '4.9', label: 'Rating' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Achievements() {
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000')" }}
            />
            <div className="absolute inset-0 bg-slate-900/85" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

            <div className="content-container relative">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-2xl md:text-3xl font-bold text-white tracking-tight mb-10 md:mb-12"
                >
                    Our Track Record
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                >
                    {achievements.map((a) => {
                        const Icon = a.icon;
                        const featured = a.featured;
                        return (
                            <motion.div
                                key={a.label}
                                variants={item}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/25 hover:scale-[1.02]"
                            >
                                <div className="absolute inset-0 bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors" />
                                {featured && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-60" />
                                )}
                                <div className="relative p-5 md:p-6 flex flex-col items-center justify-center min-h-[120px] md:min-h-[140px]">
                                    <div className={`rounded-xl flex items-center justify-center mb-3 transition-colors ${
                                        featured ? 'w-14 h-14 bg-primary/25 group-hover:bg-primary/35' : 'w-11 h-11 bg-primary/20 group-hover:bg-primary/30'
                                    }`}>
                                        <Icon className={featured ? 'w-7 h-7 text-primary' : 'w-5 h-5 text-primary'} strokeWidth={2} />
                                    </div>
                                    <p className={`font-bold text-white tabular-nums tracking-tight mb-0.5 ${
                                        featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
                                    }`}>{a.value}</p>
                                    <p className="text-slate-400 text-xs md:text-sm font-medium">{a.label}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

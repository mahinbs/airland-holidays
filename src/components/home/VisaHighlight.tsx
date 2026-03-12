import { FileCheck, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    { icon: FileCheck, title: 'Visa Types', value: '50+ Countries' },
    { icon: Shield, title: 'Success Rate', value: '98%' },
    { icon: Clock, title: 'Processing', value: '2-5 Days' },
];

export default function VisaHighlight() {
    return (
        <section className="section-padding bg-primary relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2000')" }}
            />
            <div className="absolute inset-0 bg-primary/75" />
            <div className="content-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-white"
                    >
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Expert Support</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Hassle-Free Visa Services</h2>
                        <p className="text-white/70 text-lg mb-8 max-w-xl">
                            Our visa experts handle everything from document submission to approval. Tourist, Business, and Transit visas for 50+ countries.
                        </p>
                        <div className="flex flex-wrap gap-6 mb-8">
                            {stats.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.title} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">{s.value}</p>
                                            <p className="text-slate-200 text-sm">{s.title}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <a href="/visa" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors">
                            Apply for Visa
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {['🇦🇪 Dubai', '🇸🇬 Singapore', '🇹🇭 Thailand', '🇬🇧 UK', '🇪🇺 Schengen', '🇦🇺 Australia'].map((c) => (
                            <div key={c} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white font-medium text-center border border-white/20">
                                {c}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

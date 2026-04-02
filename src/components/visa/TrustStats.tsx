import { motion } from 'framer-motion';
import { stats } from '../../data/visaData';

export const TrustStats = () => {
    return (
        <div className="py-20 bg-white border-t border-slate-100">
            <div className="content-container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                                </div>
                                <h4 className="text-4xl font-bold text-slate-900 mb-2">
                                    {stat.value}
                                </h4>
                                <p className="text-slate-500 font-medium">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

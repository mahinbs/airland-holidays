import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { type CountryVisa, statusConfig } from '../../data/visaData';

interface CountryCardProps {
    country: CountryVisa;
    index?: number;
    large?: boolean;
}

export const CountryCard = ({ country, index = 0, large = false }: CountryCardProps) => {
    const status = statusConfig[country.visaStatus];

    return (
        <motion.a
            href={`/visa/${country.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className={`group block relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 ${large ? 'h-[400px] min-w-[280px]' : 'h-[320px]'
                }`}
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                    <span className="text-4xl bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/30 shadow-sm leading-none">
                        {country.flag}
                    </span>
                    <span
                        className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1.5 ${status.bg} ${status.text}`}
                    >
                        {status.label}
                    </span>
                </div>

                <div>
                    {country.highlightText && (
                        <span className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white/95 text-xs font-medium mb-3">
                            {country.highlightText}
                        </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
                        {country.name}
                    </h3>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm text-white/80 mb-1">Starts From</p>
                            <p className="text-xl font-bold text-white">${country.price}</p>
                        </div>

                        {/* Slide-in CTA */}
                        <div className="overflow-hidden">
                            <div className="flex items-center gap-2 text-white font-bold text-sm bg-secondary px-4 py-2 rounded-full lg:translate-y-12 lg:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                Apply Now <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

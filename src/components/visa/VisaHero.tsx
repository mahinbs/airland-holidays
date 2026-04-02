import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, PlayCircle } from 'lucide-react';

export const VisaHero = () => {
    return (
        <div className="relative pt-36 pb-28 px-4 overflow-hidden bg-slate-900 group">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[20s] ease-out opacity-60"
                    poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000"
                >
                    <source src="https://www.pexels.com/download/video/36584879/" type="video/mp4" />
                    {/* Fallback Image */}
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
            </div>

            <div className="content-container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4" /> Global Visa Partner
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
                        Seamless Visa <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Processing</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-lg">
                        Fast, secure, and hassle-free visa applications for 50+ countries. Let our experts handle the bureaucracy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#all-countries"
                            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(222,46,33,0.3)]"
                        >
                            Apply Now <ChevronRight className="w-5 h-5" />
                        </a>
                        <a
                            href="/contact"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                        >
                            <PlayCircle className="w-5 h-5" /> Get Assistance
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

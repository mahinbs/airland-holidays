import { motion } from 'framer-motion';

export const VisaCTA = () => {
    return (
        <div className="py-24 bg-white">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl shadow-primary/30"
                >
                    {/* Decorational elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to travel the world?
                        </h2>
                        <p className="text-white/90 text-lg mb-10">
                            Don't let visa rejections ruin your plans. Let our experts secure your
                            visa so you can pack your bags stress-free.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="#all-countries"
                                className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                Start Application
                            </a>
                            <a
                                href="/contact"
                                className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                Talk to an Expert
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

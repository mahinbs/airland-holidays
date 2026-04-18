import { motion } from 'framer-motion';
import { processSteps } from '../../data/visaData';

export const VisaProcess = () => {
    return (
        <div className="py-24 bg-slate-900 text-white relative overflow-hidden group">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=2000"
                    alt="Process Background"
                    className="w-full h-full object-cover transition-transform duration-[15s] ease-out group-hover:scale-110 opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900 opacity-75" />
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-1" />
            <div className="content-container relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">How It Works</h2>
                    <p className="text-slate-300 text-lg">Four simple steps to your approved visa.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

                    {processSteps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-3xl bg-slate-800 border border-slate-600 flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 group-hover:bg-primary transition-all duration-300 shadow-xl">
                                    <Icon className="w-10 h-10 text-white/90 group-hover:text-white transition-colors" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center border-2 border-slate-900 text-sm">
                                        {idx + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                                <p className="text-white/85 text-sm max-w-[200px] leading-relaxed">{step.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

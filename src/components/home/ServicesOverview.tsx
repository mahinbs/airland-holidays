import { 
    Plane, Shield, FileCheck, CreditCard, 
    Ship, Sparkles, Award, ShieldCheck, Headphones,
    PlaneTakeoff, Briefcase, Globe, Phone, Grid
} from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  // TOP PRIORITY — Row 1 (featured, larger visual weight)
  {
    icon: Plane,
    title: 'Flight Booking',
    desc: 'Expert route planning with best fares and comfort.',
    path: '/services/flight-booking',
    featured: true,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    badge: 'Most Booked',
  },
  {
    icon: FileCheck,
    title: 'Visa Assistance',
    desc: 'High success visa processing with expert guidance.',
    path: '/visa',
    featured: true,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    badge: '99% Success Rate',
  },
  {
    icon: CreditCard,
    title: 'Forex & Currency',
    desc: 'Secure and best-rate currency exchange for all destinations.',
    path: '/services/forex',
    featured: true,
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&q=80',
    badge: 'Best Rates',
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    desc: 'Complete protection for safe and worry-free journeys.',
    path: '/services/travel-insurance',
    featured: true,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    badge: 'Full Coverage',
  },
  // SECONDARY — Row 2
  {
    icon: PlaneTakeoff,
    title: 'Chartered Flights',
    desc: 'Private and premium travel solutions for elite journeys.',
    path: '/services/charter',
    featured: false,
    badge: 'Premium',
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    desc: 'Efficient travel management for businesses of all sizes.',
    path: '/services/corporate-travel',
    featured: false,
    badge: 'B2B',
  },
  {
    icon: Ship,
    title: 'Cruise Bookings',
    desc: 'Luxury cruise experiences across the world\'s finest routes.',
    path: '/services/cruise-booking',
    featured: false,
    badge: 'Luxury',
  },
  {
    icon: Globe,
    title: 'Custom Travel',
    desc: 'Fully personalised premium travel planning, your way.',
    path: '/services/holiday-customisation',
    featured: false,
    badge: 'Personalised',
  },
];

const trustItems = [
  { icon: Award, text: 'IATA Certified Agency' },
  { icon: Headphones, text: 'Strong Repeat Customer Base' },
  { icon: Globe, text: 'Global Airline & Hotel Partnerships' },
  { icon: ShieldCheck, text: 'Personalised Expert Support' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemAnim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const featuredServices = services.filter(s => s.featured);
const secondaryServices = services.filter(s => !s.featured);

export default function ServicesOverview() {
    return (
        <section className="section-padding bg-white overflow-hidden">
            <div className="content-container">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                            <Sparkles className="w-3.5 h-3.5" /> Premium Services
                        </span>
                        <h2 className="font-['Marcellus'] text-3xl md:text-5xl text-slate-900 mt-2 mb-4">
                            Our Premium Travel Services
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                            Trusted by regular travellers and corporate clients for personalised, end-to-end travel solutions
                        </p>
                    </motion.div>
                </div>

                {/* Featured Row (Top 4) */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5"
                >
                    {featuredServices.map((srv) => {
                        const Icon = srv.icon;
                        return (
                            <motion.div key={srv.title} variants={itemAnim}>
                                <div
                                    className="relative h-[240px] md:h-[280px] rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 block"
                                >
                                    {/* Background Image */}
                                    <img 
                                        src={srv.image} 
                                        alt={srv.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    
                                    {/* Gradients */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            {srv.badge}
                                        </span>
                                        
                                        <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        
                                        <h3 className="font-['Marcellus'] text-xl font-bold text-white leading-tight mb-2">
                                            {srv.title}
                                        </h3>
                                        <p className="text-white/80 text-sm font-light leading-snug">
                                            {srv.desc}
                                        </p>

                                        {/* Hover Arrow */}
                                        {/* <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-primary transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight className="w-4 h-4" />
                                        </div> */}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Secondary Row (Bottom 4) */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                >
                    {secondaryServices.map((srv) => {
                        const Icon = srv.icon;
                        return (
                            <motion.div key={srv.title} variants={itemAnim}>
                                <a
                                    href={srv.path}
                                    className="block bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 group hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full"
                                >
                                    <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-slate-200 text-slate-400 group-hover:border-primary/20 group-hover:text-primary/70 transition-colors">
                                        {srv.badge}
                                    </span>
                                    
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    
                                    <h3 className="font-['Marcellus'] text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-1.5">
                                        {srv.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                        {srv.desc}
                                    </p>
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Trust Strip */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="bg-slate-900 rounded-3xl mt-10 px-6 sm:px-8 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
                >
                    {trustItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div 
                                key={item.text} 
                                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                                className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${idx !== 3 ? 'md:border-r md:border-white/10' : ''}`}
                            >
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-white/80" />
                                </div>
                                <span className="text-white font-semibold text-sm leading-tight pr-4">
                                    {item.text}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a href="/services" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base w-full sm:w-auto">
                        <Grid className="w-4 h-4" /> Explore All Services
                    </a>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 hover:border-primary hover:text-primary font-semibold px-8 py-4 rounded-xl transition-all text-base w-full sm:w-auto bg-white">
                        <Phone className="w-4 h-4" /> Talk to an Expert
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
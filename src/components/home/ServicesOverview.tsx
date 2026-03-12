import { Plane, Building2, Shield, Car, FileCheck, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    { icon: Plane, title: 'Flight Booking', desc: 'Global air ticketing with best rates.', path: '/services' },
    { icon: Building2, title: 'Hotel Reservations', desc: 'Premium hotels worldwide.', path: '/services' },
    { icon: Shield, title: 'Travel Insurance', desc: 'Comprehensive coverage for your trip.', path: '/services' },
    { icon: Car, title: 'Airport Transfers', desc: 'Seamless pickups and drop-offs.', path: '/services' },
    { icon: FileCheck, title: 'Visa Assistance', desc: 'Expert visa processing support.', path: '/visa' },
    { icon: CreditCard, title: 'Forex & Travel Money', desc: 'Currency exchange at competitive rates.', path: '/services' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function ServicesOverview() {
    return (
        <section className="section-padding bg-slate-50">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">What We Offer</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Travel Services Overview</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">From flights to visas, we handle every aspect of your journey with care.</p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((srv) => {
                        const Icon = srv.icon;
                        return (
                            <motion.div key={srv.title} variants={item}>
                                <a
                                    href={srv.path}
                                    className="group block bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{srv.title}</h3>
                                    <p className="text-slate-600 text-sm">{srv.desc}</p>
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
                    <a href="/services" className="btn-primary inline-flex items-center gap-2">Explore All Services</a>
                </motion.div>
            </div>
        </section>
    );
}

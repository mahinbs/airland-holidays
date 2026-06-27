import { useParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, Shield, Clock, Award, Star, ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useService } from '../hooks/useContent';
import { mapServiceToDetail, type ServiceDetailView } from '../lib/mapContent';

// Legacy mock data for services not yet in CMS
const serviceData: Record<string, ServiceDetailView> = {
    'flight-booking': {
        title: 'Flight Booking & Reservations',
        badge: 'Top Rated',
        heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000',
        heroDesc: 'Experience seamless global air ticketing with negotiated rates for economy, business, and first-class cabins.',
        overview: 'We partner with over 150+ major airlines worldwide to bring you the best routes, exclusive fares, and unparalleled support. Whether you are flying for business or leisure, our flight specialists ensure a hassle-free booking experience.',
        features: [
            { title: 'Best Price Guarantee', desc: 'Access exclusive negotiated fares not available to the public.' },
            { title: '24/7 Booking Support', desc: 'Dedicated agents available round the clock for modifications and cancellations.' },
            { title: 'Flexible Routing', desc: 'Complex multi-city itineraries and round-the-world tickets made easy.' },
            { title: 'Seat & Meal Selection', desc: 'Personalized preferences handled prior to your departure.' }
        ],
        brandsTitle: 'Our Premium Airline Partners',
        brands: [
            '/logos/emirates.svg',
            '/logos/qatar.png',
            '/logos/singapore.png',
            '/logos/british.png'
        ],
        faqs: [
            { q: 'Can I change my flight dates after booking?', a: 'Yes, date changes are subject to airline policies and fare rules. Our team will assist you with the modifications.' },
            { q: 'Do you offer corporate flight discounts?', a: 'Absolutely. We provide specialized corporate rates for businesses with frequent travel requirements.' },
            { q: 'How early should I book to get the best price?', a: 'We recommend booking 3 to 6 weeks in advance for domestic flights, and 2 to 3 months for international travel.' }
        ]
    },
    'forex': {
        title: 'Forex & Currency Exchange',
        badge: 'Best Rates',
        heroImage: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=2000',
        heroDesc: 'Secure, competitive currency exchange and multi-currency cards for all your global travel needs.',
        overview: "Don't lose money on poor exchange rates. We provide bank-beating forex rates, instant cash availability for major currencies, and secure travel cards that make spending abroad safe and effortless.",
        features: [
            { title: 'Zero Hidden Fees', desc: 'Completely transparent pricing with no surprise commission charges.' },
            { title: 'Multi-Currency Cards', desc: 'Load up to 15 different currencies on a single globally accepted card.' },
            { title: 'Doorstep Delivery', desc: 'Get your foreign currency delivered securely to your home or office.' },
            { title: 'Instant Activation', desc: 'Travel cards are activated instantly upon purchase.' }
        ],
        faqs: [
            { q: 'What documents are required for Forex?', a: 'You will need a copy of your passport, confirmed ticket, and a valid ID proof (like PAN card).' },
            { q: 'Can I reload my Forex card abroad?', a: 'Yes, you can easily reload your card online or by contacting our support team.' }
        ]
    },
    'travel-insurance': {
        title: 'Travel Insurance Services',
        badge: 'Full Coverage',
        heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000',
        heroDesc: 'Comprehensive coverage for medical emergencies, trip cancellations, and lost baggage.',
        overview: 'Travel with complete peace of mind. Our partnered insurance policies provide robust protection against unforeseen circumstances, ensuring you are never stranded without support in a foreign land.',
        features: [
            { title: 'Global Medical Cover', desc: 'Extensive coverage for hospitalization and emergency medical evacuation.' },
            { title: 'Trip Cancellation', desc: 'Reimbursement for non-refundable expenses if your trip gets cancelled.' },
            { title: 'Baggage Loss', desc: 'Compensation for lost, stolen, or delayed check-in baggage.' },
            { title: '24/7 Global Assistance', desc: 'Toll-free emergency helpline available globally.' }
        ],
        faqs: [
            { q: 'Does the insurance cover COVID-19 related cancellations?', a: 'Yes, our premium plans include coverage for COVID-19 related medical emergencies and trip cancellations.' },
            { q: 'Can I purchase insurance after my trip has started?', a: 'No, travel insurance must be purchased before your departure from your home country.' }
        ]
    }
};

function getFallbackService(slug: string): ServiceDetailView {
    return {
        title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        badge: 'Premium Service',
        heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000',
        heroDesc: 'Expert assistance and premium support for your travel requirements.',
        overview: 'We provide comprehensive solutions tailored to your specific needs, ensuring a seamless and stress-free experience from start to finish. Our team of experts handles every detail with precision.',
        features: [
            { title: 'Expert Guidance', desc: 'Professional support from industry specialists.' },
            { title: 'Seamless Process', desc: 'Hassle-free execution with complete transparency.' },
            { title: '24/7 Support', desc: 'We are always here when you need us, anywhere in the world.' },
            { title: 'Value for Money', desc: 'Competitive pricing without compromising on service quality.' }
        ],
        faqs: [
            { q: 'How do I get started?', a: 'Simply fill out the enquiry form on this page, and our team will get back to you immediately.' },
            { q: 'What is the processing time?', a: 'Processing times vary depending on the service, but we always strive for expedited delivery.' }
        ]
    };
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-all hover:border-primary/30">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
                <span className="font-bold text-slate-900 pr-4">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ServiceDetail() {
    const { slug } = useParams();
    const { data: cmsRow, isLoading } = useService(slug ?? '');

    const service = useMemo(() => {
        if (cmsRow) return mapServiceToDetail(cmsRow);
        if (slug && serviceData[slug]) return serviceData[slug];
        return getFallbackService(slug || 'service');
    }, [cmsRow, slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            
            {/* Hero Section */}
            <div className="bg-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${service.heroImage}')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/30" />
                
                <div className="content-container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 w-full">
                    <div className="max-w-2xl">
                        <Link to="/services" className="text-secondary-light hover:text-white transition-colors text-sm font-medium mb-8 inline-flex items-center gap-2">
                            ← Back to all services
                        </Link>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                                <Shield className="w-3.5 h-3.5" /> Trusted Service
                            </span>
                            {service.badge && (
                                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                                    <Award className="w-3.5 h-3.5" /> {service.badge}
                                </span>
                            )}
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Marcellus'] leading-tight drop-shadow-md">
                            {service.title}
                        </h1>
                        <p className="text-slate-200 text-lg md:text-xl font-light mb-8 leading-relaxed max-w-xl">
                            {service.heroDesc}
                        </p>
                        
                        <div className="flex gap-4">
                            <a href="#enquire" className="btn-primary flex items-center gap-2 px-8 py-4 shadow-lg shadow-primary/30">
                                Request a Quote <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="content-container relative z-10 w-full mt-16 md:mt-24">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-white/20">
                        <div className="flex items-center gap-2 text-white">
                            <Shield className="w-5 h-5 text-secondary drop-shadow" />
                            <span className="text-sm font-semibold tracking-wide drop-shadow">100% Secure & Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Clock className="w-5 h-5 text-secondary drop-shadow" />
                            <span className="text-sm font-semibold tracking-wide drop-shadow">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Award className="w-5 h-5 text-secondary drop-shadow" />
                            <span className="text-sm font-semibold tracking-wide drop-shadow">IATA Certified</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="content-container mt-12 md:mt-16">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    
                    <div className="flex-1 min-w-0 w-full">
                        
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Marcellus']">Overview</h2>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed">{service.overview}</p>
                        </div>

                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Marcellus'] mb-8">Why Choose Airland</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {service.features.map((f, i) => (
                                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                        <div className="w-14 h-14 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors border border-slate-100">
                                            <CheckCircle2 className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {service.brands && service.brands.length > 0 && (
                            <div className="mb-16 bg-white p-10 rounded-3xl border border-slate-200 text-center shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-900 font-['Marcellus'] mb-10">{service.brandsTitle}</h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 opacity-70">
                                    {service.brands.map((brand, i) => (
                                        <img 
                                            key={i} 
                                            src={brand} 
                                            alt="Partner Brand" 
                                            className="h-10 md:h-12 object-contain mix-blend-multiply"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Marcellus'] mb-8">What Our Clients Say</h2>
                            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-4">
                                        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                                    </div>
                                    <p className="text-xl md:text-2xl font-light text-slate-700 italic mb-6 leading-relaxed">
                                        "Exceptional service from start to finish. The team handled every detail with professionalism and care."
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Verified Client</p>
                                            <p className="text-sm text-slate-500">Airland Holidays Customer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Marcellus'] mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {service.faqs.map((faq, i) => (
                                    <FAQItem key={i} question={faq.q} answer={faq.a} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[380px] shrink-0 sticky top-28" id="enquire">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                            <div className="bg-primary px-6 py-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                                <h3 className="font-['Marcellus'] text-2xl text-white relative z-10">Request a Quote</h3>
                                <p className="text-white/70 text-sm mt-2 relative z-10 font-light">
                                    Get expert assistance for {service.title}
                                </p>
                            </div>
                            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our team will contact you shortly.'); }}>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="Your name" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Email *</label>
                                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Phone *</label>
                                    <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="+91..." />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Message</label>
                                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none" placeholder="Tell us about your requirements..." />
                                </div>
                                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base shadow-lg shadow-primary/20">
                                    <Send className="w-4 h-4" /> Send Enquiry
                                </button>
                                <p className="text-[10px] text-center text-slate-400">Our team typically responds within 24 hours.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

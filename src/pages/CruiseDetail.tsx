import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, CheckCircle, XCircle, Send, ChevronDown, ChevronUp, Star, Coffee, Music, Utensils, ShieldCheck, Briefcase, CheckCircle2, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cruisePackages } from '../data/cruiseData';

export default function CruiseDetail() {
    const { id } = useParams();
    const cruise = cruisePackages.find(c => c.id === id);
    const [openDay, setOpenDay] = useState<number | null>(0);
    const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'faq'>('overview');
    const [lightbox, setLightbox] = useState<{ isOpen: boolean, index: number }>({ isOpen: false, index: 0 });

    if (!cruise) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4 font-['Marcellus']">Cruise Not Found</h1>
                    <Link to="/cruises" className="btn-primary">Back to Cruises</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Hero Banner */}
            <div className="bg-slate-900 lg:min-h-[85vh] pt-32 pb-16 px-4 relative overflow-hidden flex flex-col justify-between">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${cruise.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="content-container relative z-10 text-white flex flex-col md:flex-row items-end justify-between gap-8 mt-12 w-full">
                    <div className="max-w-3xl">
                        <Link to="/cruises" className="text-secondary-light hover:text-white transition-colors text-sm font-medium mb-6 inline-flex items-center gap-2">
                            ← Back to all cruises
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-['Marcellus'] leading-tight text-white">{cruise.name}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-slate-200">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-secondary-light" />
                                <span className="text-lg text-white">{cruise.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-secondary-light" />
                                <span className="text-lg text-white">{cruise.destination}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shrink-0 w-full md:w-auto">
                        <div className="text-slate-300 text-sm mb-1">Starting from</div>
                        <div className="text-3xl font-bold text-white mb-6">₹{cruise.startingPrice.toLocaleString('en-IN')}</div>
                        <div className="flex flex-col gap-3">
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all uppercase tracking-wider text-center shadow-lg shadow-primary/30">
                                Book Now
                            </button>
                            <a href="#enquire" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all uppercase tracking-wider text-center border border-white/20">
                                Send Enquiry
                            </a>
                        </div>
                    </div>
                </div>

                <div className="content-container relative z-10 w-full mt-16 md:mt-24">
                    {/* Trust Badges at bottom */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-white/20">
                        <div className="flex items-center gap-2 text-white">
                            <ShieldCheck className="w-5 h-5 text-secondary drop-shadow" />
                            <span className="text-sm font-semibold tracking-wide drop-shadow">Trusted by 20,000+ Travellers</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Briefcase className="w-5 h-5 text-secondary drop-shadow" />
                            <span className="text-sm font-semibold tracking-wide drop-shadow">20+ Years Experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <CheckCircle2 className="w-5 h-5 text-secondary drop-shadow" />
                            <span className="text-sm font-semibold tracking-wide drop-shadow">Expert Assistance Tours</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="content-container mt-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Sticky Tabs */}
                        <div className="sticky top-20 lg:top-[6.5rem] z-30 bg-white/80 backdrop-blur-md border border-slate-200 p-2 rounded-2xl flex items-center gap-2 mb-8 overflow-x-auto shadow-sm">
                            {['overview', 'itinerary', 'inclusions', 'faq'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all capitalize whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-12">
                            {/* Overview & Highlights */}
                            <section id="overview" className={activeTab === 'overview' ? 'block' : 'hidden md:block'}>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 font-['Marcellus']">Overview</h2>
                                    <div className="flex gap-3">
                                        <button onClick={() => alert('Downloading itinerary PDF... (Simulation)')} className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 shrink-0">
                                            <Download className="w-4 h-4" /> PDF
                                        </button>
                                        <button onClick={async () => {
                                            try {
                                                if (navigator.share) await navigator.share({ title: cruise.name, url: window.location.href });
                                                else { await navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
                                            } catch (err) { console.log("Error sharing", err); }
                                        }} className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 shrink-0">
                                            <Share2 className="w-4 h-4" /> Share
                                        </button>
                                    </div>
                                </div>
                                
                                {cruise.videoUrl && (
                                    <div className="relative rounded-3xl overflow-hidden shadow-lg group bg-slate-900 aspect-video mb-8">
                                        <video src={cruise.videoUrl} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" autoPlay loop muted playsInline />
                                    </div>
                                )}
                                <p className="text-slate-700 leading-relaxed text-lg mb-8">{cruise.overview}</p>
                                    
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 font-['Marcellus']">Package Highlights</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {cruise.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                                                <Star className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-slate-700 font-medium">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Cruise Experience */}
                                <div className="mt-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-['Marcellus']">Cruise Experience</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {cruise.experience.map((exp, i) => (
                                            <div key={i} className="text-center p-6 border border-slate-100 rounded-2xl bg-slate-50 hover:shadow-md transition-shadow">
                                                <div className="w-14 h-14 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                                    {i === 0 ? <Utensils className="w-6 h-6" /> : i === 1 ? <Coffee className="w-6 h-6" /> : <Music className="w-6 h-6" />}
                                                </div>
                                                <h4 className="font-bold text-slate-900 mb-2">{exp.title}</h4>
                                                <p className="text-slate-600 text-sm">{exp.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Accommodation Details */}
                                {cruise.accommodation && (
                                    <div className="mt-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-['Marcellus']">{cruise.accommodation.title}</h2>
                                        <p className="text-slate-600 mb-6">{cruise.accommodation.desc}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {cruise.accommodation.cabins.map((cabin, i) => (
                                                <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-50">
                                                    <div className="aspect-[4/3] overflow-hidden relative bg-slate-200">
                                                        <img src={cabin.image} alt={cabin.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="font-bold text-slate-900 mb-2 text-lg font-['Marcellus']">{cabin.name}</h4>
                                                        <p className="text-slate-600 text-sm leading-relaxed">{cabin.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Itinerary */}
                            <section id="itinerary" className={activeTab === 'itinerary' ? 'block' : 'hidden md:block'}>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-['Marcellus']">Day-wise Itinerary</h2>
                                    <div className="space-y-4">
                                        {cruise.itinerary.map((day, index) => (
                                            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden">
                                                <button
                                                    onClick={() => setOpenDay(openDay === index ? null : index)}
                                                    className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="bg-primary text-white font-bold px-3 py-1 rounded-lg text-sm">{day.day}</span>
                                                        <span className="font-bold text-slate-900">{day.title}</span>
                                                    </div>
                                                    {openDay === index ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                                </button>
                                                {openDay === index && (
                                                    <div className="p-6 bg-white border-t border-slate-100 flex flex-col gap-6">
                                                        {/* Media at top */}
                                                        {day.images && day.images.length > 0 && (
                                                            <div className="w-full flex gap-3 overflow-x-auto snap-x hide-scrollbar pb-2">
                                                                {day.images.map((img, idx) => (
                                                                    <div key={idx} className="w-full sm:w-[280px] md:w-[320px] h-48 md:h-56 rounded-xl overflow-hidden shrink-0 shadow-sm snap-center">
                                                                        <img src={img} alt={`${day.title} - ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <div className="flex-1 md:pl-2">
                                                            <p className="text-slate-700 leading-relaxed mb-6">{day.desc}</p>
                                                            {day.attractions && day.attractions.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 mb-2">
                                                                    {day.attractions.map((attr, idx) => (
                                                                        <span key={idx} className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 transition-colors">
                                                                            <MapPin className="w-3 h-3 text-secondary" /> {attr}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Inclusions & Exclusions */}
                            <section id="inclusions" className={activeTab === 'inclusions' ? 'block' : 'hidden md:block'}>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <CheckCircle className="w-6 h-6 text-green-500" /> Inclusions
                                        </h3>
                                        <ul className="space-y-3">
                                            {cruise.inclusions.map((inc, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                                    <span className="text-green-500 mt-1 shrink-0">✓</span>
                                                    {inc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-px bg-slate-200 hidden md:block"></div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <XCircle className="w-6 h-6 text-red-500" /> Exclusions
                                        </h3>
                                        <ul className="space-y-3">
                                            {cruise.exclusions.map((exc, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                                    <span className="text-red-500 mt-1 shrink-0">✕</span>
                                                    {exc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Gallery */}
                            <section className="hidden md:block">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-['Marcellus']">Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {cruise.gallery.map((img, i) => (
                                        <div key={i} className="rounded-2xl overflow-hidden cursor-pointer group" onClick={() => setLightbox({ isOpen: true, index: i })}>
                                            <img src={img} alt="Gallery" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* FAQ */}
                            <section id="faq" className={activeTab === 'faq' ? 'block' : 'hidden md:block'}>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-['Marcellus']">Frequently Asked Questions</h2>
                                    <div className="space-y-6">
                                        {cruise.faqs.map((faq, i) => (
                                            <div key={i}>
                                                <h4 className="font-bold text-slate-900 mb-2">{faq.question}</h4>
                                                <p className="text-slate-600">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar / Enquiry Form */}
                    <div className="lg:w-1/3">
                        <div id="enquire" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-28">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-['Marcellus']">Enquire Now</h3>
                            <p className="text-slate-600 mb-6 text-sm">Get the best quote for your {cruise.name} vacation.</p>
                            
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                                    <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Travel Date</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Guests</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                                        <option>2 Adults</option>
                                        <option>2 Adults, 1 Child</option>
                                        <option>2 Adults, 2 Children</option>
                                        <option>Group (4+)</option>
                                    </select>
                                </div>
                                <button type="button" className="w-full btn-primary flex items-center justify-center gap-2 py-4 mt-2 text-base shadow-lg shadow-primary/30">
                                    <Send className="w-5 h-5" /> Submit Enquiry
                                </button>
                                <p className="text-xs text-center text-slate-500 mt-4">No credit card required. We'll contact you within 24 hours.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lightbox Modal */}
            {createPortal(
                <AnimatePresence>
                    {lightbox.isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                            onClick={() => setLightbox({ ...lightbox, isOpen: false })}
                        >
                            <motion.button
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[10010] bg-black/20 p-2 rounded-full"
                                onClick={() => setLightbox({ ...lightbox, isOpen: false })}
                            >
                                <XCircle className="w-8 h-8 md:w-10 md:h-10" />
                            </motion.button>
                            <button
                                className="absolute left-4 md:left-10 z-[10010] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-20"
                                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: lightbox.index - 1 }); }}
                                disabled={lightbox.index === 0}
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                className="absolute right-4 md:right-10 z-[10010] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-20"
                                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: lightbox.index + 1 }); }}
                                disabled={lightbox.index === cruise.gallery.length - 1}
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-5xl w-full aspect-video md:aspect-auto flex flex-col items-center justify-center rounded-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={cruise.gallery[lightbox.index]} alt="Enlarged view" className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl shadow-2xl" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}

import { Link } from 'react-router-dom';
import { Ship, Clock, MapPin, Send } from 'lucide-react';
import { cruisePackages } from '../data/cruiseData';

export default function Cruises() {
    const trendingCruises = cruisePackages.filter(c => c.featured);
    const intlCruises = cruisePackages.filter(c => c.category === 'International');
    const indiaCruises = cruisePackages.filter(c => c.category === 'India');

    const renderCruiseCard = (cruise: typeof cruisePackages[0]) => (
        <Link 
            to={`/cruises/${cruise.id}`} 
            key={cruise.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
        >
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={cruise.image} 
                    alt={cruise.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {cruise.category}
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-['Marcellus']">{cruise.name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{cruise.overview}</p>
                
                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{cruise.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Departure: <strong>{cruise.departureLocation}</strong></span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-500 block">Starting from</span>
                        <span className="text-lg font-bold text-slate-900">₹{cruise.startingPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors uppercase tracking-wider shadow-md hover:shadow-lg">
                        View Details
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Hero Section */}
            <div className="bg-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-slate-900/70" />
                <div className="content-container relative z-10 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6">
                        <Ship className="w-4 h-4" /> Cruise Holidays
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Marcellus'] leading-tight">
                        Sail Into the <span className="text-primary">Extraordinary</span>
                    </h1>
                    <p className="text-slate-200 text-lg md:text-xl">
                        Discover luxury cruises across international waters and the beautiful Indian coastline. Unforgettable journeys await.
                    </p>
                </div>
            </div>

            <div className="content-container mt-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                    
                    {/* Main Content (Left) */}
                    <div className="lg:w-2/3">
                        {/* Trending Packages */}
                        {trendingCruises.length > 0 && (
                            <div className="mb-16">
                                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-['Marcellus'] mb-2">Trending Cruise Packages</h2>
                                        <p className="text-slate-600">Handpicked cruise experiences that our travelers love the most.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {trendingCruises.map(renderCruiseCard)}
                                </div>
                            </div>
                        )}

                        {/* International Cruises */}
                        {intlCruises.length > 0 && (
                            <div className="mb-16">
                                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-['Marcellus']">International Cruises</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {intlCruises.map(renderCruiseCard)}
                                </div>
                            </div>
                        )}

                        {/* India Cruises */}
                        {indiaCruises.length > 0 && (
                            <div className="mb-16">
                                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-['Marcellus']">India Cruises</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {indiaCruises.map(renderCruiseCard)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28 space-y-8">
                            {/* Promotional Banner Background Image Card */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop')" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900/95" />
                                <div className="relative z-10 p-8 text-center text-white min-h-[500px] flex flex-col justify-end">
                                    <div className="w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg">
                                        <Ship className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 font-['Marcellus'] leading-tight text-white">Need a Custom Cruise?</h3>
                                    <p className="text-slate-200 mb-8 text-sm leading-relaxed">
                                        Can't find exactly what you're looking for? Let our travel experts design a tailored ocean voyage perfectly suited to your preferences, schedule, and budget.
                                    </p>
                                    <a href="/contact" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all uppercase tracking-wider text-sm shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Talk to an Expert
                                    </a>
                                </div>
                            </div>
                            
                            {/* Support Card */}
                            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">24/7 Booking Support</h4>
                                <p className="text-slate-600 text-sm mb-4">Our cruise specialists are ready to help you plan your next voyage.</p>
                                <div className="text-xl font-bold text-primary mb-1">+91 9090403075</div>
                                <div className="text-sm text-slate-500">info@airlandholidays.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

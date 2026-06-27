import { Link } from 'react-router-dom';
import { Ship, Clock, MapPin, Send } from 'lucide-react';
import { cruisePackages as staticCruises } from '../data/cruiseData';
import { useCruises } from '../hooks/useContent';
import { mapCruiseToDetail } from '../lib/mapContent';

export default function Cruises() {
    const { data: cmsCruises } = useCruises();
    const cruisePackages = cmsCruises?.length
        ? cmsCruises.map((c) => mapCruiseToDetail(c as unknown as Record<string, unknown>))
        : staticCruises;

    const trendingCruises = cruisePackages.filter((c) => c.featured);
    const intlCruises = cruisePackages.filter((c) => c.category === 'International');
    const indiaCruises = cruisePackages.filter((c) => c.category === 'India');

    const renderCruiseCard = (cruise: (typeof cruisePackages)[0]) => (
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

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" /> {cruise.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" /> {cruise.departureLocation}
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Starting from</p>
                        <p className="text-xl font-bold text-primary">₹{cruise.startingPrice.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Details <Send className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/75" />
                <div className="content-container text-center relative z-10">
                    <Ship className="w-12 h-12 text-secondary mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans">Luxury Cruise Packages</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">Sail the seas in style with our curated cruise experiences across India and the world.</p>
                </div>
            </div>

            <div className="content-container mt-16 space-y-16">
                {trendingCruises.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Trending Cruises</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{trendingCruises.map(renderCruiseCard)}</div>
                    </section>
                )}
                {intlCruises.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">International Cruises</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{intlCruises.map(renderCruiseCard)}</div>
                    </section>
                )}
                {indiaCruises.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">India Cruises</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{indiaCruises.map(renderCruiseCard)}</div>
                    </section>
                )}
                {cruisePackages.length === 0 && (
                    <p className="text-center text-slate-500 py-12">No cruise packages published yet. Check back soon.</p>
                )}
            </div>
        </div>
    );
}

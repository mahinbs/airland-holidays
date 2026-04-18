import { Search, MapPin } from 'lucide-react';

const regions = [
    { name: 'Asia', count: 42 },
    { name: 'Europe', count: 38 },
    { name: 'Middle East', count: 15 },
    { name: 'Americas', count: 24 },
    { name: 'Africa', count: 18 }
];

const topDestinations = [
    { id: 'indonesia', name: 'Indonesia', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800', description: 'Tropical paradise of 17,000 islands.' },
    { id: 'switzerland', name: 'Switzerland', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', description: 'Alpine landscapes and pristine lakes.' },
    { id: 'maldives', name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800', description: 'Overwater bungalows and crystal oceans.' },
    { id: 'uae', name: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', description: 'A blend of modern luxury and heritage.' },
    { id: 'greece', name: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', description: 'Ancient history and stunning islands.' },
];

export default function Destinations() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Explore Destinations</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        From the sun-kissed beaches of the Maldives to the snow-capped peaks of the Swiss Alps, find your next adventure.
                    </p>
                    <div className="max-w-xl mx-auto relative flex items-center">
                        <Search className="absolute left-4 text-slate-200 w-5 h-5" />
                        <input type="text" placeholder="Search a country or city..." className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary shadow-lg" />
                    </div>
                </div>
            </div>

            <div className="content-container mt-12">
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {regions.map(r => (
                        <button key={r.name} className="px-6 py-2 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors">
                            {r.name} ({r.count})
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topDestinations.map(dest => (
                        <a key={dest.id} href={`/destinations/${dest.id}`} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-[400px] block">
                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <div className="flex items-center gap-2 text-secondary mb-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-semibold uppercase tracking-wider text-sm">Explore</span>
                                </div>
                                <h3 className="text-3xl font-sans font-bold text-white mb-3">{dest.name}</h3>
                                <p className="text-slate-300 mb-6">{dest.description}</p>
                                <span className="inline-flex items-center text-white font-medium group-hover:text-secondary transition-colors border-b border-transparent group-hover:border-secondary pb-1">
                                    View Guide & Packages &rarr;
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

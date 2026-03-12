import { useParams } from 'react-router-dom';
import { MapPin, Sun, Info, PlayCircle } from 'lucide-react';

const mockCountryData = {
    name: 'Switzerland',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=2000',
    description: 'A mountainous Central European country, home to numerous lakes, villages and the high peaks of the Alps. Its cities contain medieval quarters, with landmarks like capital Bern’s Zytglogge clock tower and Lucerne’s wooden chapel bridge.',
    bestTime: 'June to August (Summer) or Dec to March (Winter Sports)',
    currency: 'Swiss Franc (CHF)',
    language: 'German, French, Italian',
    highlights: ['Matterhorn', 'Lake Geneva', 'Jungfraujoch', 'Chillon Castle'],
    packages: [
        { id: 2, title: 'Swiss Alps Adventure', duration: '10 Days', price: 3400, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600' },
        { id: 7, title: 'Lucerne & Zurich Explorer', duration: '6 Days', price: 2100, image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=600' }
    ]
};

export default function DestinationDetail() {
    const { country } = useParams();
    // In a real app, fetch data based on `country` slug
    const data = mockCountryData; // using mock data

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Hero */}
            <div
                className="relative h-[60vh] min-h-[500px] flex items-end pb-16"
                style={{ backgroundImage: `url(${data.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="content-container relative z-10 w-full">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Travel Guide</span>
                    <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-6 drop-shadow-md capitalize">
                        {country?.replace('-', ' ') || data.name}
                    </h1>
                    <p className="text-xl text-slate-200 max-w-2xl drop-shadow-sm font-medium">
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="content-container mt-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    <main className="lg:w-2/3">
                        <h2 className="text-3xl font-sans font-bold text-slate-900 mb-8">Essential Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <Sun className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold text-slate-900 mb-1">Best Time to Visit</h3>
                                <p className="text-sm text-slate-600">{data.bestTime}</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <Info className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold text-slate-900 mb-1">Currency</h3>
                                <p className="text-sm text-slate-600">{data.currency}</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <MapPin className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold text-slate-900 mb-1">Languages</h3>
                                <p className="text-sm text-slate-600">{data.language}</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-sans font-bold text-slate-900 mb-6">Top Attractions</h2>
                        <div className="flex flex-wrap gap-3 mb-12">
                            {data.highlights.map(h => (
                                <span key={h} className="bg-white border border-slate-200 text-slate-700 font-medium px-5 py-2 rounded-full shadow-sm">{h}</span>
                            ))}
                        </div>

                        {/* Visa Information */}
                        <h2 className="text-3xl font-sans font-bold text-slate-900 mb-6">Visa Information</h2>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-12">
                            <p className="text-slate-700 mb-4">Most nationalities require a visa to enter {data.name}. E-Visa is available for many countries with processing time of 3-7 days. Check requirements for your nationality before booking.</p>
                            <a href="/visa" className="text-primary font-semibold hover:underline">Apply for Visa →</a>
                        </div>

                        {/* Travel Tips */}
                        <h2 className="text-3xl font-sans font-bold text-slate-900 mb-6">Travel Tips</h2>
                        <ul className="space-y-3 mb-12">
                            {['Book accommodations in advance during peak season', 'Carry local currency for small purchases', 'Respect local customs and dress codes', 'Purchase travel insurance before departure'].map((tip, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                                    <span className="text-slate-700">{tip}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Video/Reel Section Concept */}
                        <h2 className="text-3xl font-sans font-bold text-slate-900 mb-6">Visual Journey</h2>
                        <div className="relative aspect-video bg-slate-100 rounded-3xl overflow-hidden mb-12 group cursor-pointer border border-slate-200">
                            <img src={data.heroImage} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                                <PlayCircle className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform drop-shadow-lg" />
                            </div>
                        </div>
                    </main>

                    <aside className="lg:w-1/3">
                        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 sticky top-28">
                            <h3 className="text-2xl font-sans font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Packages for {data.name}</h3>

                            <div className="space-y-6">
                                {data.packages.map(pkg => (
                                    <a key={pkg.id} href={`/packages/${pkg.id}`} className="group flex gap-4 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 block">
                                        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">{pkg.title}</h4>
                                            <span className="text-xs text-slate-500 mb-2">{pkg.duration}</span>
                                            <span className="text-primary font-bold text-sm">From ${pkg.price}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8">
                                <a href="/packages" className="w-full btn-outline flex justify-center">View All Packages</a>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}

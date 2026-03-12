import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Star, Heart, Share2, CheckCircle2, XCircle, FileText, ChevronDown, Send } from 'lucide-react';

const packageData = {
    id: 1,
    title: 'Bali Bliss & Temples Explore',
    destination: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    price: 1200,
    rating: 4.8,
    reviews: 124,
    images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800'
    ],
    overview: "Venture to the enchanting island of Bali, a tropical paradise known for its lush forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. This 7-day curated itinerary balances cultural immersion with absolute relaxation. Discover hidden temples, indulge in world-class spa treatments, and enjoy the magical sunsets of Seminyak.",
    highlights: [
        'Private Guided Tour of Uluwatu Temple',
        'Ubud Rice Terraces Trekking',
        'Traditional Balinese Cooking Class',
        'Sunset Dinner Cruise'
    ],
    itinerary: [
        { day: 1, title: 'Arrival in Denpasar & Transfer to Seminyak', desc: 'Welcome to Bali! Our representative will meet you at the airport and transfer you to your luxury resort in Seminyak. Rest and recover from your flight.' },
        { day: 2, title: 'Uluwatu Temple & Sunset Views', desc: 'Morning at leisure. In the afternoon, visit the iconic Uluwatu Temple perched on a cliff edge. Watch the traditional Kecak Fire Dance as the sun sets.' },
        { day: 3, title: 'Transfer to Ubud & Monkey Forest', desc: 'Head to the cultural heart of Bali, Ubud. En route, visit the Sacred Monkey Forest Sanctuary and explore the local artisan markets.' },
        { day: 4, title: 'Tegalalang Rice Terraces & Swing', desc: 'Experience the stunning Tegalalang Rice Terraces. Enjoy a ride on the famous Bali Swing for iconic photos.' },
    ],
    inclusions: ['4-Star Accommodation', 'Daily Breakfast', 'Private Airport Transfers', 'English-Speaking Guide', 'All Entrance Fees'],
    exclusions: ['International Flights', 'Travel Insurance', 'Personal Expenses', 'Visa Fees']
};

export default function PackageDetail() {
    const { id } = useParams();
    // Using id to fetch data later
    console.log('Fetching data for package:', id);
    const [activeTab, setActiveTab] = useState('overview');
    const [openDay, setOpenDay] = useState<number | null>(1);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Image Gallery Hero */}
            <div className="pt-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-medium text-sm mb-2">
                                <MapPin className="w-4 h-4" /> {packageData.destination}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold font-sans text-slate-900">{packageData.title}</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 border border-slate-200 bg-white shadow-sm px-4 py-2 rounded-full text-slate-700 hover:bg-slate-50 transition-colors">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button className="flex items-center gap-2 border border-slate-200 bg-white shadow-sm px-4 py-2 rounded-full text-slate-700 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                                <Heart className="w-4 h-4" /> Save
                            </button>
                        </div>
                    </div>

                    {/* Grid Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
                        <div className="md:col-span-2 row-span-2 relative group hover:opacity-95 transition-opacity cursor-pointer">
                            <img src={packageData.images[0]} alt="Main" className="w-full h-full object-cover" />
                        </div>
                        <div className="md:col-span-2 row-span-1 border-b-4 border-l-4 border-white relative group hover:opacity-95 transition-opacity cursor-pointer hidden md:block">
                            <img src={packageData.images[1]} alt="Gallery 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="md:col-span-2 row-span-1 border-t-4 border-l-4 border-white relative group hover:opacity-95 transition-opacity cursor-pointer hidden md:block">
                            <img src={packageData.images[2]} alt="Gallery 2" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                                <span className="text-white font-bold text-lg border-2 border-white rounded-full px-6 py-2 backdrop-blur-sm">View All Photos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-container mt-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content Area */}
                    <div className="lg:w-2/3">
                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-8 py-6 border-b border-slate-200 mb-8">
                            <div className="flex items-center gap-3">
                                <Clock className="w-8 h-8 text-primary opacity-80" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Duration</p>
                                    <p className="font-bold text-slate-900">{packageData.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star className="w-8 h-8 text-secondary" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Rating</p>
                                    <p className="font-bold text-slate-900">{packageData.rating} ({packageData.reviews} Reviews)</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap pb-1">
                            {(['Overview', 'Itinerary', 'Inclusions & Exclusions', 'Map'] as const).map((label) => {
                                const key = label === 'Inclusions & Exclusions' ? 'inclusions' : label.toLowerCase();
                                return (
                                    <button
                                        key={key}
                                        className={`pb-4 text-base font-semibold border-b-2 transition-colors ${activeTab === key ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                        onClick={() => setActiveTab(key)}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Content: Overview */}
                        {activeTab === 'overview' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-bold font-sans text-slate-900 mb-4">About this Journey</h2>
                                <p className="text-slate-600 leading-relaxed mb-8">{packageData.overview}</p>

                                <h3 className="text-xl font-bold font-sans text-slate-900 mb-4">Trip Highlights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {packageData.highlights.map((high, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                            <Star className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                            <span className="text-slate-700 font-medium">{high}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Itinerary */}
                        {activeTab === 'itinerary' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-bold font-sans text-slate-900 mb-6">Day by Day Plan</h2>
                                <div className="space-y-4">
                                    {packageData.itinerary.map((day) => (
                                        <div key={day.day} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                            <button
                                                className="w-full flex items-center justify-between p-6 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                                                onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
                                                        D{day.day}
                                                    </div>
                                                    <h3 className="font-bold text-slate-900 text-lg">{day.title}</h3>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openDay === day.day ? 'rotate-180' : ''}`} />
                                            </button>

                                            <div className={`px-6 py-6 border-t border-slate-100 transition-all ${openDay === day.day ? 'block' : 'hidden'}`}>
                                                <p className="text-slate-600 leading-relaxed">{day.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Inclusions */}
                        {activeTab === 'inclusions' && (
                            <div className="animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h2 className="text-2xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-2">
                                            What's Included
                                        </h2>
                                        <ul className="space-y-4">
                                            {packageData.inclusions.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold font-sans text-slate-900 mb-6 flex items-center gap-2">
                                            What's Not Included
                                        </h2>
                                        <ul className="space-y-4">
                                            {packageData.exclusions.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Map */}
                        {activeTab === 'map' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-bold font-sans text-slate-900 mb-4">Map & Location</h2>
                                <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center border border-slate-200">
                                    <div className="text-center text-slate-500">
                                        <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                        <p className="font-semibold">Map Integration Placeholder</p>
                                        <p className="text-sm mt-2">Google Maps will be integrated here to show itinerary locations.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar - Package Enquiry Form */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-28">
                            <div className="mb-6">
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Price Per Person</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-slate-900">${packageData.price}</span>
                                    <span className="text-slate-500">/ adult</span>
                                </div>
                            </div>

                            <form className="space-y-4 mb-6">
                                <h3 className="font-bold text-slate-900">Package Enquiry</h3>
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary" />
                                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary" />
                                <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary" />
                                <textarea rows={3} placeholder="Travel dates or questions" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary resize-none" />
                                <button type="button" className="w-full btn-primary flex items-center justify-center gap-2">
                                    <Send className="w-5 h-5" /> Send Enquiry
                                </button>
                            </form>

                            <button className="w-full btn-outline flex items-center justify-center gap-2 mb-4">
                                <FileText className="w-4 h-4" /> Download Brochure
                            </button>

                            <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                                <p className="text-slate-800 font-semibold mb-1">Need help deciding?</p>
                                <p className="text-slate-500 text-sm mb-3">Talk to our travel experts today.</p>
                                <a href="tel:+18001234567" className="text-primary font-bold hover:underline">+1 (800) 123-4567</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Packages */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: 2, title: 'Swiss Alps Adventure', duration: '10 Days', price: 3400, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' },
                            { id: 3, title: 'Maldives Honeymoon', duration: '5 Days', price: 2800, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
                            { id: 6, title: 'Santorini Sunset', duration: '6 Days', price: 2100, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800' },
                        ].map((p) => (
                            <a key={p.id} href={`/packages/${p.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                                    <p className="text-slate-500 text-sm mb-2">{p.duration}</p>
                                    <p className="text-primary font-bold">From ${p.price}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

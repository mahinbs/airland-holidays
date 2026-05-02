import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import PackageCardStack from '../components/common/PackageCardStack';
import {
    CloudSun, Clock, Wallet, FileCheck, CheckCircle2, ChevronRight, ChevronLeft,
    Search, Calendar, Star, Phone, MessageCircle, Plane, ArrowRight, Filter, Users, User, Briefcase
} from 'lucide-react';
import VisualExperience from '../components/common/VisualExperience';

const mockEuropeData = {
    name: 'Europe',
    slug: 'europe',
    heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=2000&q=80',
    carouselImages: [
        'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80',
        'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=80',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    ],
    overview: {
        climate: 'Varied (Temperate / Mediterranean)',
        timeToVisit: 'May to September',
        avgDuration: '10 - 15 Days',
        currency: 'Euro (€)',
        language: 'English, French, German, etc.',
        visa: 'Schengen Visa required for Indians'
    },
    seoText: [
        {
            heading: 'Europe Tour Packages',
            content: 'Europe is a melting pot of cultures, history, and unparalleled natural beauty. From the romantic streets of Paris to the snow-capped peaks of the Swiss Alps, a Europe tour package offers an experience like no other. Whether you are looking for a romantic honeymoon, a family vacation, or a solo backpacking adventure, Europe has something for everyone. Our carefully curated Europe tour packages assure that you witness the finest landscapes, taste exquisite cuisines, and explore historical monuments spanning thousands of years.'
        },
        {
            heading: 'Europe Travel Overview',
            content: 'When planning a trip to Europe, it is crucial to understand its vastness. The continent boasts diverse geographies ranging from pristine Mediterranean beaches to rugged fjords in Scandinavia. For Indian travelers, obtaining a Schengen visa unlocks 27 countries, making cross-border travel seamless via the extensive Eurail network and low-cost airlines. Exploring Europe is not just about ticking off famous landmarks; it is about embracing the café culture, strolling through medieval town squares, and taking scenic train journeys.'
        },
        {
            heading: 'Best Time to Visit Europe',
            content: 'The ideal time to visit Europe largely depends on the specific countries you wish to explore. Generally, the summer months from May to September offer the best weather, with long sunny days perfect for sightseeing. However, this is also the peak tourist season, meaning higher prices and larger crowds. If you prefer a quieter experience, the shoulder seasons of April and October are excellent choices, offering mild weather and fewer tourists. For winter sports enthusiasts, the snowy months from December to March turn destinations like Switzerland and Austria into a magical winter wonderland.'
        }
    ],
    highlights: [
        'Explore the timeless romance of Paris and its iconic Eiffel Tower.',
        'Witness the majestic beauty of the Swiss Alps with a scenic train ride.',
        'Glid through the enchanting canals of Venice on a traditional gondola.',
        'Discover ancient history at the Colosseum intertwined with vibrant street life in Rome.',
        'Experience the dazzling northern lights in the pristine Arctic regions of Scandinavia.',
        'Indulge in authentic local cuisines ranging from Italian pastas to Belgian chocolates.',
        'Travel seamlessly across borders with a single Schengen Visa.'
    ],
    topDestinations: [
        { name: 'Switzerland', nights: '6 Nights / 7 Days', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80', packageCount: 14 },
        { name: 'France', nights: '5 Nights / 6 Days', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', packageCount: 12 },
        { name: 'Italy', nights: '7 Nights / 8 Days', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80', packageCount: 18 },
        { name: 'Spain', nights: '6 Nights / 7 Days', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80', packageCount: 9 },
        { name: 'Greece', nights: '5 Nights / 6 Days', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', packageCount: 11 },
        { name: 'Netherlands', nights: '4 Nights / 5 Days', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80', packageCount: 8 },
    ],
    mapImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Europe_orthographic_Caucasus_Urals_boundary_%28with_borders%29.svg/800px-Europe_orthographic_Caucasus_Urals_boundary_%28with_borders%29.svg.png',
    statistics: {
        annualVisitors: '740M',
        genderSplit: { male: 48, female: 52 },
        travelPurpose: [
            { type: 'Couples & Honeymoon', percent: 35, icon: Star },
            { type: 'Family', percent: 30, icon: Star },
            { type: 'Solo Travellers', percent: 20, icon: Star },
            { type: 'Business', percent: 15, icon: Star },
        ],
        topIndianCities: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad'],
    },
    airports: [
        { name: 'London Heathrow (LHR)', city: 'London, UK', connectivity: 'Direct flights from Delhi, Mumbai' },
        { name: 'Paris Charles de Gaulle (CDG)', city: 'Paris, France', connectivity: 'Direct flights from Delhi, Mumbai' },
        { name: 'Frankfurt Airport (FRA)', city: 'Frankfurt, Germany', connectivity: 'Direct flights from Delhi, Mumbai, Bengaluru' },
        { name: 'Amsterdam Schiphol (AMS)', city: 'Amsterdam, Netherlands', connectivity: 'Direct flights from Delhi, Mumbai' },
    ],
    trendingPackages: [
        { id: 101, title: 'Swiss Paris Dream', duration: '7 Nights / 8 Days', price: '1,45,000', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
        { id: 102, title: 'Italian Splendor', duration: '6 Nights / 7 Days', price: '1,25,000', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80' },
        { id: 103, title: 'Spanish Fiesta', duration: '5 Nights / 6 Days', price: '1,10,000', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80' },
        { id: 104, title: 'Grecian Getaway', duration: '5 Nights / 6 Days', price: '1,15,000', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80' },
    ],
    visualExperiences: [
        { id: 1, type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-glacier-river-in-iceland-from-the-top-43405-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80', title: 'Icy Blue Glaciers', packageId: 'iceland-wonder', packageName: 'Iceland Winter Wonderland' },
        { id: 2, type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-resort-in-the-maldives-40018-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', title: 'Romantic Paris', packageId: 'paris-love', packageName: 'Romantic Paris Getaway' },
        { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80', thumbnail: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80', title: 'Venice Canals', packageId: 'venice-canals', packageName: 'Venice Canal Tour' },
    ],
    allPackages: [
        { id: 201, title: 'European Grandeur', duration: '12 Nights / 13 Days', price: '2,50,000', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', category: 'Family' },
        { id: 202, title: 'Scandic Wonders', duration: '8 Nights / 9 Days', price: '1,80,000', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80', category: 'Adventure' },
        { id: 203, title: 'Central Europe Highlights', duration: '7 Nights / 8 Days', price: '1,40,000', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&q=80', category: 'Culture' },
        { id: 204, title: 'Alpine Magic', duration: '6 Nights / 7 Days', price: '1,30,000', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80', category: 'Honeymoon' },
        { id: 205, title: 'Mediterranean Breezes', duration: '9 Nights / 10 Days', price: '1,95,000', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', category: 'Family' },
        { id: 206, title: 'Balkan Discovery', duration: '10 Nights / 11 Days', price: '1,65,000', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80', category: 'Solo' },
    ]
};

export default function ContinentDetail() {
    useParams();
    const data = mockEuropeData;

    const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
    const [packageFilter, setPackageFilter] = useState('All');
    const [visiblePackages, setVisiblePackages] = useState(4);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slides: { perView: 1, spacing: 10 },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 3000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">

            {/* 1. HERO SECTION & BREADCRUMB */}
            <div className="relative h-[350px] w-full bg-slate-900 border-b-8 border-primary">
                <img
                    src={data.heroImage}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider shadow-sm drop-shadow-lg">
                        {data.name} Tour Packages
                    </h1>
                    <div className="flex items-center text-white/95 text-sm font-medium gap-2">
                        <Link to="/" className="hover:text-secondary-light transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>International Packages</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-secondary-light">{data.name}</span>
                    </div>
                </div>
            </div>

            {/* 2. FLOATING STRIP - MOVED DOWN OR REMOVED? Keeping it but adjusting position */}
            <div className="bg-white border-b border-slate-700 py-4 shadow-sm w-full sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-slate-700">Find the Best Packages for {data.name}</span>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-4">
                        <Link to="/packages" className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 uppercase text-sm tracking-wide shadow-sm">
                            View All Packages
                        </Link>
                        <button
                            onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 uppercase text-sm tracking-wide shadow-sm"
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. NEW: STATISTICS SECTION (SAME AS COUNTRY PAGE) */}
            <div className="bg-slate-50 py-12 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Key Metrics */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 border border-slate-700 shadow-sm flex flex-col justify-center">
                            <div className="mb-6 border-b border-slate-100 pb-4">
                                <h4 className="font-marcellus text-5xl text-primary mb-2">{data.statistics.annualVisitors}</h4>
                                <span className="text-slate-600 text-sm font-medium uppercase tracking-widest">Annual Visitors</span>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-3 text-slate-700">
                                    <span>👨 {data.statistics.genderSplit.male}% Male</span>
                                    <span>👩 {data.statistics.genderSplit.female}% Female</span>
                                </div>
                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex w-full">
                                    <div style={{ width: `${data.statistics.genderSplit.male}%` }} className="bg-primary h-full transition-all duration-1000" />
                                    <div style={{ width: `${data.statistics.genderSplit.female}%` }} className="bg-secondary h-full transition-all duration-1000" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Travel Purpose */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-8 border border-slate-700 shadow-sm">
                            <h3 className="font-marcellus text-xl text-slate-900 mb-6">Travel Purpose</h3>
                            <div className="flex flex-col gap-5">
                                {data.statistics.travelPurpose.map((p, i) => (
                                    <div key={i}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                                <Star className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 flex justify-between items-center">
                                                <span className="font-semibold text-slate-700 text-sm">{p.type}</span>
                                                <span className="font-black text-primary text-sm">{p.percent}%</span>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                                            <div style={{ width: `${p.percent}%` }} className="h-full bg-primary transition-all duration-1000" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Top Cities */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-8 border border-slate-700 shadow-sm">
                            <h3 className="font-marcellus text-2xl text-slate-900 mb-6">Top Cities from India</h3>
                            <div className="flex flex-wrap gap-3">
                                {data.statistics.topIndianCities.map((city, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white border border-slate-700 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                                        <span>🇮🇳</span> {city}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 4. NEW: TRENDING PACKAGES SECTION */}
            <div className="bg-white py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Trending Packages</h2>
                            <p className="text-slate-600">The most loved itineraries across {data.name}.</p>
                        </div>
                        <Link to="/packages" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                            View All <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.trendingPackages.map((pkg) => (
                            <motion.div
                                key={pkg.id}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-bold text-xl mb-1">{pkg.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/80 text-sm flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {pkg.duration}
                                            </span>
                                            <span className="text-white font-bold text-lg">₹{pkg.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <Link to={`/packages/${pkg.id}`} className="block w-full text-center bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-primary transition-colors text-sm uppercase tracking-wider">
                                        Book Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-16">

                    {/* OVERVIEW SECTION WITH READ MORE */}
                    <section>
                        <div className="flex flex-col gap-8">
                            <div className="prose prose-slate max-w-none">
                                <h2 className="text-3xl font-bold text-slate-900 border-l-8 border-primary pl-4 mb-8">Overview of {data.name}</h2>
                                <div className={`relative ${!isOverviewExpanded ? 'max-h-[400px] overflow-hidden' : ''}`}>
                                    {data.seoText.map((block, i) => (
                                        <div key={i} className="mb-8">
                                            <h3 className="text-2xl font-bold text-slate-800 mb-4">{block.heading}</h3>
                                            <p className="text-slate-600 leading-relaxed text-lg text-justify">{block.content}</p>
                                        </div>
                                    ))}
                                    {!isOverviewExpanded && (
                                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                                    className="mt-4 flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-lg"
                                >
                                    {isOverviewExpanded ? 'Read Less' : 'Read More'} <ArrowRight className={`w-5 h-5 transition-transform ${isOverviewExpanded ? '-rotate-90' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* TOP DESTINATIONS */}
                    <section>
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">Explore Top Destinations</h2>
                            <Link to="/destinations" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                View All <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.topDestinations.map((dest, i) => (
                                <Link key={i} to={`/destinations/${dest.name.toLowerCase()}`} className="group relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                                    <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-white/20">
                                        {dest.packageCount} Packages
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h4 className="text-white font-bold text-3xl mb-1">{dest.name}</h4>
                                        <p className="text-white/80 flex items-center gap-2 font-medium">
                                            <Clock className="w-4 h-4" /> {dest.nights}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* PACKAGES SECTION WITH FILTERS & LOAD MORE */}
                    <section id="packages">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                            <h2 className="text-3xl font-bold text-slate-900">Holiday Packages</h2>
                            <div className="flex flex-wrap gap-2">
                                {['All', 'Family', 'Honeymoon', 'Adventure', 'Culture', 'Solo'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setPackageFilter(cat); setVisiblePackages(4); }}
                                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${packageFilter === cat ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary/40'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {data.allPackages
                                .filter(p => packageFilter === 'All' || p.category === packageFilter)
                                .slice(0, visiblePackages)
                                .map((pkg) => (
                                    <motion.div
                                        key={pkg.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                                    >
                                        <div className="aspect-[4/3] relative overflow-hidden">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute top-4 left-4 bg-secondary text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                                                {pkg.category}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">{pkg.title}</h3>
                                            <div className="flex items-center gap-4 text-slate-600 font-bold text-sm mb-6 pb-6 border-b border-slate-100">
                                                <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {pkg.duration}</span>
                                                <span className="flex items-center gap-2"><Star className="w-5 h-5 text-secondary fill-secondary" /> 4.9</span>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1 block">Starting From</span>
                                                    <span className="text-3xl font-black text-slate-900">₹{pkg.price}</span>
                                                </div>
                                                <Link to={`/packages/${pkg.id}`} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/30">
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>

                        {visiblePackages < data.allPackages.filter(p => packageFilter === 'All' || p.category === packageFilter).length && (
                            <div className="mt-12 text-center">
                                <button
                                    onClick={() => setVisiblePackages(prev => prev + 2)}
                                    className="bg-slate-50 hover:bg-slate-100 border border-slate-700 text-slate-900 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all"
                                >
                                    Load More Packages
                                </button>
                            </div>
                        )}
                    </section>

                    {/* AIRPORT INFORMATION */}
                    <section className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -mr-32 -mt-32" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
                                    <Plane className="w-8 h-8 text-secondary" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-bold">Airport & Connectivity</h2>
                                    <p className="text-white/60">Helpful travel info for Indian travelers</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.airports.map((airport, i) => (
                                    <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                                        <h4 className="text-xl font-bold text-secondary mb-2 group-hover:translate-x-1 transition-transform">{airport.name}</h4>
                                        <p className="text-white/80 font-bold text-sm mb-4">{airport.city}</p>
                                        <div className="flex items-start gap-3 bg-black/20 rounded-2xl p-4">
                                            <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p className="text-white/70 text-sm leading-relaxed">{airport.connectivity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-primary/20 border border-primary/30 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                                <p className="text-lg font-medium text-center md:text-left">Need help with visa & flight bookings for {data.name}?</p>
                                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-secondary transition-all whitespace-nowrap">
                                    Chat with Experts
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* VISUAL EXPERIENCE */}
                    <VisualExperience
                        items={data.visualExperiences}
                        title={`Visual Experience in ${data.name}`}
                        subtitle={`Step into the magic of ${data.name} through these immersive moments.`}
                    />

                    {/* KEY HIGHLIGHTS */}
                    <section className="bg-primary/5 border border-primary/20 rounded-[40px] p-10 md:p-16">
                        <h3 className="text-4xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                            <Star className="w-10 h-10 text-primary fill-primary" /> Key Highlights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {data.highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-slate-700 text-lg leading-relaxed">{highlight}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* SIDEBAR STAYS SAME BUT MOVED TO COLUMN 4 */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-8">
                        <div id="enquiry-form" className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden scroll-mt-24">
                            <div className="bg-primary text-white p-8 text-center">
                                <h3 className="text-2xl font-bold uppercase tracking-widest text-white">Get A Free Quote</h3>
                                <p className="text-white/80 mt-2">Expert advice for your dream trip</p>
                            </div>
                            <form className="p-8 space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contact</label>
                                    <input type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Travel Date</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-slate-600" />
                                </div>
                                <button type="button" className="w-full bg-slate-900 hover:bg-primary text-white font-bold py-5 rounded-2xl transition-all uppercase tracking-widest mt-4 shadow-xl shadow-slate-900/20 active:scale-95">
                                    Send Enquiry
                                </button>
                            </form>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                            <h4 className="font-bold text-xl mb-6 text-center">Instant Support</h4>
                            <div className="space-y-4">
                                <a href="tel:+911234567890" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">
                                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Call Now</p>
                                        <p className="font-bold text-lg text-white">+91 123 456 7890</p>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">
                                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">WhatsApp</p>
                                        <p className="font-bold text-lg text-white">Chat with us</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

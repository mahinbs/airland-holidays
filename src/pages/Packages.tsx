import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Star, Clock, MapPin, Search } from 'lucide-react';
import Dropdown from '../components/common/Dropdown';
import { motion } from 'framer-motion';

const packageCategories = [
    'All', 'Domestic', 'International', 'Honeymoon', 'Group Tours', 'Family', 'Pilgrimage', 'Fixed Departure', 'Luxury'
];

// Dummy data for packages
const packagesData = [
    { id: 1, title: 'Bali Bliss & Temples', destination: 'Bali, Indonesia', country: 'Indonesia', duration: '7 Days', price: 1200, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800', tags: ['Best Seller'], category: 'International' },
    { id: 2, title: 'Swiss Alps Adventure', destination: 'Switzerland', country: 'Switzerland', duration: '10 Days', price: 3400, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', tags: ['Adventure'], category: 'International' },
    { id: 3, title: 'Maldives Honeymoon', destination: 'Maldives', country: 'Maldives', duration: '5 Days', price: 2800, rating: 5.0, reviews: 210, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800', tags: ['Honeymoon'], category: 'Honeymoon' },
    { id: 4, title: 'Dubai City Tour', destination: 'UAE', country: 'UAE', duration: '4 Days', price: 900, rating: 4.6, reviews: 340, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', tags: [], category: 'International' },
    { id: 5, title: 'Golden Triangle Explorer', destination: 'India', country: 'India', duration: '8 Days', price: 1100, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', tags: ['Culture'], category: 'Domestic' },
    { id: 6, title: 'Santorini Sunset', destination: 'Greece', country: 'Greece', duration: '6 Days', price: 2100, rating: 4.9, reviews: 92, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', tags: ['Romantic'], category: 'Honeymoon' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const sortOptions = [
    { value: 'recommended', label: 'Sort by: Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'duration-short', label: 'Duration: Shortest' },
    { value: 'duration-long', label: 'Duration: Longest' },
];

export default function Packages() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('recommended');

    const setSearchTerm = (value: string) => {
        if (value) {
            setSearchParams({ q: value }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    };

    const filteredPackages = searchTerm.trim()
        ? packagesData.filter(
            (p) =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : packagesData;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Explore All Packages</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        Discover our comprehensive selection of curated travel experiences. Use the filters below to find exactly what you're looking for.
                    </p>

                    {/* Simple Inline Search */}
                    <div className="max-w-2xl mx-auto relative flex items-center">
                        <Search className="absolute left-4 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by destination or package name..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="content-container mt-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Mobile Filter Toggle */}
                    <button
                        className="lg:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-lg text-slate-700 font-medium w-full"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-5 h-5" />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                                <Filter className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-slate-800 mb-3">Budget per person</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> Under $1000</label>
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> $1000 - $2500</label>
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> $2500 - $5000</label>
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> Over $5000</label>
                                </div>
                            </div>

                            {/* Duration Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-slate-800 mb-3">Duration</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> 1-3 Days</label>
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> 4-7 Days</label>
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> 1-2 Weeks</label>
                                    <label className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> 15+ Days</label>
                                </div>
                            </div>

                            {/* Country Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-slate-800 mb-3">Country</h3>
                                <div className="space-y-2">
                                    {['India', 'Indonesia', 'Maldives', 'Switzerland', 'UAE', 'Greece'].map(c => (
                                        <label key={c} className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> {c}</label>
                                    ))}
                                </div>
                            </div>

                            {/* Destination Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-slate-800 mb-3">Destination</h3>
                                <div className="space-y-2">
                                    {['Bali', 'Dubai', 'Maldives', 'Swiss Alps', 'India', 'Santorini'].map(d => (
                                        <label key={d} className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> {d}</label>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Category */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-slate-800 mb-3">Travel Category</h3>
                                <div className="space-y-2">
                                    {packageCategories.slice(1).map(cat => (
                                        <label key={cat} className="flex items-center gap-3 text-slate-600"><input type="checkbox" className="accent-primary rounded text-primary focus:ring-primary w-4 h-4" /> {cat}</label>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full btn-outline text-sm py-2">Reset Filters</button>
                        </div>
                    </aside>

                    {/* Package Grid */}
                    <main className="lg:w-3/4">
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {packageCategories.map(cat => (
                                <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === 'All' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="mb-6 flex justify-between items-center text-slate-600 text-sm">
                            <p>Showing {filteredPackages.length} packages</p>
                            <Dropdown
                                options={sortOptions}
                                value={sortBy}
                                onChange={setSortBy}
                                size="sm"
                                className="w-[200px]"
                            />
                        </div>

                        <motion.div 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {filteredPackages.map((pkg) => (
                                <motion.div key={pkg.id} variants={item}>
                                    <a href={`/packages/${pkg.id}`} className="block h-full">
                                        <motion.div 
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col"
                                            whileHover="hover"
                                            variants={{
                                                hover: { y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <motion.img 
                                                    src={pkg.image} 
                                                    alt={pkg.title} 
                                                    className="w-full h-full object-cover"
                                                    variants={{
                                                        hover: { scale: 1.05 }
                                                    }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                                {pkg.tags.length > 0 && (
                                                    <motion.div 
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        viewport={{ once: true }}
                                                        className="absolute top-3 left-3 bg-secondary text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10"
                                                    >
                                                        {pkg.tags[0]}
                                                    </motion.div>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-center gap-1 text-primary text-sm font-medium mb-2">
                                                    <MapPin className="w-4 h-4" /> {pkg.destination}
                                                </div>
                                                <h3 className="text-xl font-bold font-sans text-slate-900 mb-3 group-hover:text-primary transition-colors">{pkg.title}</h3>

                                                <div className="flex items-center gap-4 text-slate-500 text-sm mb-6 mt-auto">
                                                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pkg.duration}</div>
                                                    <div className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current" /> <span className="text-slate-600">{pkg.rating} ({pkg.reviews})</span></div>
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <div>
                                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Starting from</span>
                                                        <span className="text-xl font-bold text-slate-900">${pkg.price}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-primary font-semibold text-sm">
                                                        View Details 
                                                        <motion.span
                                                            variants={{
                                                                hover: { x: 4 }
                                                            }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                        >
                                                            &rarr;
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination / Load More */}
                        <div className="mt-12 text-center">
                            <button className="btn-outline transition-all hover:bg-slate-100">Load More Packages</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

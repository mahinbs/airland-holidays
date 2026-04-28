import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import PackageCardStack from '../components/common/PackageCardStack';
import {
    CloudSun, Clock, Wallet, FileCheck, CheckCircle2, ChevronRight, ChevronLeft,
    Search, Calendar, Star, Phone, MessageCircle
} from 'lucide-react';

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
    mapImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Europe_orthographic_Caucasus_Urals_boundary_%28with_borders%29.svg/800px-Europe_orthographic_Caucasus_Urals_boundary_%28with_borders%29.svg.png'
};

export default function ContinentDetail() {
    useParams();
    // Defaulting to mockEuropeData for the purpose of the redesign. 
    // In production, fetch data based on the 'continent' param.
    const data = mockEuropeData;

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

            {/* 2. FLOATING STRIP */}
            <div className="bg-white border-b border-slate-700 py-4 shadow-sm w-full">
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

            {/* 3. MAIN LAYOUT (TWO-COLUMN GRID) */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* --- LEFT COLUMN: CONTENT HUB --- */}
                <div className="lg:col-span-8 space-y-12">

                    {/* CAROUSEL */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                        <div ref={sliderRef} className="keen-slider h-[300px] md:h-[400px]">
                            {data.carouselImages.map((src, idx) => (
                                <div key={idx} className="keen-slider__slide relative">
                                    <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => instanceRef.current?.prev()}
                            aria-label="Previous slide"
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 shadow-md"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => instanceRef.current?.next()}
                            aria-label="Next slide"
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 shadow-md"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* A. QUICK STATS ROW */}
                    <div className="bg-white border border-slate-700 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                        <div className="w-40 shrink-0 hidden md:block">
                            <img src={data.mapImage} alt={`${data.name} Map`} className="w-full opacity-80" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            <div>
                                <p className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1 mb-1"><CloudSun className="w-3 h-3" /> Climate</p>
                                <p className="font-semibold text-sm">{data.overview.climate}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1 mb-1"><Calendar className="w-3 h-3" /> Best Time</p>
                                <p className="font-semibold text-sm">{data.overview.timeToVisit}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1 mb-1"><Clock className="w-3 h-3" /> Duration</p>
                                <p className="font-semibold text-sm">{data.overview.avgDuration}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1 mb-1"><Wallet className="w-3 h-3" /> Currency</p>
                                <p className="font-semibold text-sm">{data.overview.currency}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1 mb-1"><FileCheck className="w-3 h-3" /> Visa</p>
                                <p className="font-semibold text-sm">{data.overview.visa}</p>
                            </div>
                        </div>
                    </div>

                    {/* B. SEO TEXT BLOCKS */}
                    <article className="prose prose-slate max-w-none">
                        {data.seoText.map((block, i) => (
                            <div key={i} className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-primary pl-3 mb-4">{block.heading}</h2>
                                <p className="text-slate-600 leading-relaxed text-justify">{block.content}</p>
                            </div>
                        ))}
                    </article>

                    {/* C. HIGHLIGHTS LIST */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Star className="w-6 h-6 text-primary fill-primary" /> Key Highlights of {data.name}
                        </h3>
                        <ul className="space-y-3">
                            {data.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* D. TOP COUNTRIES GRID/STACK */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b-2 border-slate-700 pb-4">Top {data.name} Destinations</h2>

                        {/* Mobile View: Stack of Cards */}
                        <div className="flex justify-center sm:hidden mb-8">
                            <PackageCardStack>
                                {data.topDestinations.map((dest, i) => (
                                    <div key={i} className="group h-full bg-white flex flex-col cursor-grab active:cursor-grabbing">
                                        <div className="aspect-[4/3] relative overflow-hidden h-full">
                                            <motion.img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="w-full h-full object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            />

                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div className='flex flex-col gap-2'>
                                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-primary shadow-sm tracking-wide w-fit">
                                                    {dest.packageCount} Packages
                                                </div>
                                                <h4 className="font-bold text-2xl text-slate-900 mb-2">{dest.name}</h4>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-6">
                                                    <Clock className="w-4 h-4 text-primary" /> {dest.nights}
                                                </p>
                                            </div>
                                            <Link to={`/destinations/${dest.name.toLowerCase()}`} className="block w-full text-center bg-slate-900 hover:bg-primary text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-widest shadow-md">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </PackageCardStack>
                        </div>

                        {/* Desktop View: Auto Grid */}
                        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {data.topDestinations.map((dest, i) => (
                                <div key={i} className="group rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <motion.img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-primary shadow-sm">
                                            {dest.packageCount} Packages
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900 mb-1">{dest.name}</h4>
                                            <p className="text-sm text-slate-600 flex items-center gap-1 mb-4">
                                                <Clock className="w-3.5 h-3.5" /> {dest.nights}
                                            </p>
                                        </div>
                                        <Link to={`/destinations/${dest.name.toLowerCase()}`} className="block w-full text-center bg-slate-100 hover:bg-primary hover:text-white text-slate-800 font-semibold py-2 rounded-md transition-colors text-sm uppercase tracking-wide">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: STICKY FORM --- */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-6">

                        {/* FORM BOX */}
                        <div id="enquiry-form" className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden scroll-mt-24">
                            <div className="bg-primary text-white p-4 text-center">
                                <h3 className="text-xl font-bold uppercase tracking-wider text-white">Get A Free Quote</h3>
                                <p className="text-sm text-white/80 mt-1">Our experts will get back to you shortly</p>
                            </div>
                            <form className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                                    <input type="text" placeholder="Your Name" className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number</label>
                                    <input type="tel" placeholder="Your Contact Number" className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email ID</label>
                                    <input type="email" placeholder="Your Email Address" className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Travel</label>
                                    <input type="date" className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Message (Optional)</label>
                                    <textarea rows={3} placeholder="Any specific requirements?" className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
                                </div>
                                <button type="button" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-md transition-colors uppercase tracking-widest mt-2 shadow-md">
                                    Send Enquiry
                                </button>
                            </form>
                        </div>

                        {/* CONTACT INFO BOX */}
                        <div className="bg-white border border-slate-700 rounded-xl p-6">
                            <h4 className="font-bold text-slate-800 mb-4 text-center">Need Immediate Assistance?</h4>
                            <div className="space-y-4">
                                <a href="tel:+1234567890" className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-700 hover:border-primary hover:shadow-md transition-all group">
                                    <div className="bg-primary/10 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 font-semibold uppercase">Call Us Now</p>
                                        <p className="font-bold text-slate-800">+1 234 567 890</p>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-700 hover:border-green-500 hover:shadow-md transition-all group">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-600 font-semibold uppercase">WhatsApp</p>
                                        <p className="font-bold text-slate-800">Chat with Experts</p>
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

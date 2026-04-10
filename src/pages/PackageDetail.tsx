import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Star, CheckCircle2, XCircle, 
    FileText, ChevronDown, Send, ChefHat, Trees, Waves, Sunset, 
    Landmark, ShieldCheck, ArrowRight, Quote, Info, Coffee, ShoppingBag, Moon
} from 'lucide-react';

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
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=2000'
    ],
    overview: "Venture to the enchanting island of Bali, a tropical paradise known for its lush forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. This 7-day curated itinerary balances cultural immersion with absolute relaxation. Discover hidden temples, indulge in world-class spa treatments, and enjoy the magical sunsets of Seminyak. Every detail of this luxury journey is designed to provide an unforgettable editorial-worthy experience.",
    highlights: [
        { icon: Landmark, text: 'Private Guided Tour of Uluwatu Temple' },
        { icon: Trees, text: 'Ubud Rice Terraces Trekking' },
        { icon: ChefHat, text: 'Traditional Balinese Cooking Class' },
        { icon: Sunset, text: 'Sunset Dinner Cruise' },
        { icon: Waves, text: 'Snorkeling in Crystal Clear Waters' }
    ],
    itinerary: [
        { day: 1, title: 'Arrival in Denpasar & Transfer to Seminyak', desc: 'Welcome to Bali! Our representative will meet you at the airport and transfer you to your luxury resort in Seminyak. Rest and recover from your flight in your private villa.' },
        { day: 2, title: 'Uluwatu Temple & Sunset Views', desc: 'Morning at leisure. In the afternoon, visit the iconic Uluwatu Temple perched on a cliff edge. Watch the traditional Kecak Fire Dance as the sun sets over the Indian Ocean.' },
        { day: 3, title: 'Transfer to Ubud & Monkey Forest', desc: 'Head to the cultural heart of Bali, Ubud. En route, visit the Sacred Monkey Forest Sanctuary and explore the local artisan markets.' },
        { day: 4, title: 'Tegalalang Rice Terraces & Swing', desc: 'Experience the stunning Tegalalang Rice Terraces. Enjoy a ride on the famous Bali Swing for iconic photos, followed by a gourmet jungle lunch.' },
    ],
    inclusions: ['4-Star Luxury Accommodation', 'Daily Gourmet Breakfast', 'Private Airport Transfers', 'English-Speaking Expert Guide', 'All Entrance Fees & Permits'],
    exclusions: ['International Flights', 'Travel Insurance', 'Personal Expenses', 'Visa Fees'],
    insights: {
        food: 'Balinese cuisine is a rich tapestry of flavors. Must-try dishes include Nasi Goreng, Babi Guling, and Sate Lilit.',
        nightlife: 'Seminyak offers vibrant beach clubs and chic rooftop bars, while Ubud provides a more relaxed, cultural evening experience.',
        shopping: 'Explore Ubud Art Market for traditional crafts, and Seminyak for high-end boutique fashion and home decor.',
        tips: 'Respect local customs by dressing modestly when visiting temples. Always carry some cash for small purchases.'
    },
    testimonials: [
        { name: 'Sarah Jenkins', role: 'Adventure Traveler', text: 'An absolutely unforgettable experience. The attention to detail in the itinerary was spectacular.', rating: 5 },
        { name: 'Michael Chen', role: 'Honeymooner', text: 'The perfect mix of relaxation and culture. The luxury accommodations exceeded our expectations.', rating: 5 },
        { name: 'Emma Thompson', role: 'Culture Enthusiast', text: 'Our guide was incredibly knowledgeable. I learned so much about Balinese traditions.', rating: 4.5 }
    ],
    faqs: [
        { q: 'Is Bali visa-free for Indian passport holders?', a: 'Indian citizens can obtain a Visa on Arrival (VoA) or apply for an e-VOA before travel for short tourism stays. Requirements and fees can change—we provide up-to-date guidance when you book.' },
        { q: 'Are international flights included in the package price?', a: 'No. The package covers land arrangements, accommodation, transfers, and inclusions listed. We can suggest airlines and assist with flight bookings separately.' },
        { q: 'Can the itinerary be customised for honeymoons or families?', a: 'Yes. This journey is a template; our team can adjust pacing, hotels, and add-ons (spa, private dinners, kid-friendly activities) to match your occasion.' },
        { q: 'What is your cancellation and refund policy?', a: 'Policies depend on hotel and supplier contracts. You will receive clear terms in your proposal before payment. We recommend travel insurance for unforeseen changes.' },
        { q: 'How do I get a detailed quote and confirm dates?', a: 'Use the form on this page or call our team. We typically respond with a personalised quote within one business day, subject to availability.' },
    ],
};

const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'travel-info', label: 'Travel Info' },
    { id: 'faqs', label: 'FAQs' }
];

const insightTabs = [
    { id: 'food', label: 'Food & Dining', icon: Coffee },
    { id: 'nightlife', label: 'Nightlife', icon: Moon },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'tips', label: 'Travel Tips', icon: Info }
];

export default function PackageDetail() {
    const { id } = useParams();
    console.log('Fetching data for package:', id);
    
    const [activeTab, setActiveTab] = useState('overview');
    const [openDay, setOpenDay] = useState<number | null>(1);
    const [currentImage, setCurrentImage] = useState(0);
    const [activeInsight, setActiveInsight] = useState('food');
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    // Image Slider Crossfade
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % packageData.images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-[#faf9f6] min-h-screen font-sans text-slate-800 selection:bg-slate-900 selection:text-white">
            {/* 1. Hero Section */}
            <section className="relative min-h-[100svh] w-full flex items-end pb-24 pt-32 overflow-hidden bg-slate-900">
                {/* Crossfade Images */}
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImage}
                        src={packageData.images[currentImage]}
                        alt="Destination"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Top Right Save/Share */}
                {/* <div className="absolute top-24 right-6 md:right-12 flex gap-3 z-20">
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-red-500 transition-all">
                        <Heart className="w-5 h-5" />
                    </button>
                </div> */}

                {/* Bottom Left Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 text-white/80 text-sm font-medium tracking-widest uppercase mb-4">
                            <MapPin className="w-4 h-4" /> {packageData.destination}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-marcellus text-white mb-6 leading-tight">
                            {packageData.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed">
                            {packageData.duration} of unparalleled luxury and cultural discovery.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <button onClick={scrollToForm} className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
                                Request Itinerary <ArrowRight className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2 text-white/80 px-4 py-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="font-medium">{packageData.rating}</span>
                                <span>({packageData.reviews} reviews)</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {packageData.images.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                        />
                    ))}
                </div>
            </section>

            {/* 2. Sticky Navigation */}
            <div className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 hidden md:block">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
                    <div className="flex items-center gap-3 font-marcellus text-lg font-bold text-slate-900">
                        <span>🇮🇩</span> {packageData.title}
                    </div>
                    <div className="flex items-center gap-8">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className={`text-sm font-medium transition-colors relative py-5 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-slate-500 uppercase tracking-wider">From</div>
                            <div className="font-bold text-slate-900">${packageData.price}</div>
                        </div>
                        <button onClick={scrollToForm} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 flex items-center justify-between">
                <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">From</div>
                    <div className="font-bold text-slate-900 text-lg">${packageData.price}</div>
                </div>
                <button onClick={scrollToForm} className="bg-slate-900 text-white px-6 py-3 rounded-full font-medium">
                    Book Now
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-16">
                
                {/* Main Content Area */}
                <div className="lg:w-2/3 space-y-24">
                    
                    {/* 3. Overview & Highlights */}
                    <motion.section 
                        id="overview"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="scroll-mt-32"
                    >
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-3/5">
                                <h2 className="text-3xl font-marcellus text-slate-900 mb-6">The Experience</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">{packageData.overview}</p>
                            </div>
                            <div className="md:w-2/5 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-marcellus text-slate-900 mb-6">Highlights</h3>
                                <div className="space-y-5">
                                    {packageData.highlights.map((high, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-slate-900">
                                                <high.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-slate-700 font-medium pt-2">{high.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 4. Itinerary */}
                    <motion.section 
                        id="itinerary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="scroll-mt-32"
                    >
                        <h2 className="text-3xl font-marcellus text-slate-900 mb-8">Curated Itinerary</h2>
                        <div className="space-y-4">
                            {packageData.itinerary.map((day) => (
                                <div key={day.day} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    <button
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                        onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="font-marcellus text-2xl text-slate-400 w-12 shrink-0">
                                                {String(day.day).padStart(2, '0')}
                                            </div>
                                            <h3 className="font-bold text-slate-900 text-lg">{day.title}</h3>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openDay === day.day ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openDay === day.day && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 pt-2 pl-[5.5rem] border-t border-slate-50">
                                                    <p className="text-slate-600 leading-relaxed">{day.desc}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                        <button className="mt-8 flex items-center gap-2 text-slate-900 font-medium hover:text-slate-700 transition-colors">
                            <FileText className="w-5 h-5" /> Download Full Itinerary PDF
                        </button>
                    </motion.section>

                    {/* 5. Inclusions & Exclusions */}
                    <motion.section 
                        id="inclusions"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="scroll-mt-32"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h2 className="text-2xl font-marcellus text-slate-900 mb-6 flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Included
                               </h2>
                                <ul className="space-y-4">
                                    {packageData.inclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h2 className="text-2xl font-marcellus text-slate-900 mb-6 flex items-center gap-3">
                                    <XCircle className="w-6 h-6 text-rose-400" /> Excluded
                               </h2>
                                <ul className="space-y-4">
                                    {packageData.exclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-300 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* 6. Destination Insights */}
                    <motion.section 
                        id="travel-info"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="scroll-mt-32"
                    >
                        <h2 className="text-3xl font-marcellus text-slate-900 mb-8">Destination Insights</h2>
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-100 overflow-x-auto">
                                {insightTabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveInsight(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeInsight === tab.id ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                                    >
                                        <tab.icon className="w-4 h-4" /> {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="p-8 min-h-[160px] flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={activeInsight}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-slate-600 leading-relaxed text-lg"
                                    >
                                        {packageData.insights[activeInsight as keyof typeof packageData.insights]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.section>

                    {/* FAQs */}
                    <motion.section
                        id="faqs"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="scroll-mt-32"
                    >
                        <h2 className="text-3xl font-marcellus text-slate-900 mb-3">Frequently asked questions</h2>
                        <p className="text-slate-500 mb-8 max-w-2xl">
                            Quick answers about visas, inclusions, and how booking works for this package.
                        </p>
                        <div className="space-y-3">
                            {packageData.faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className={`bg-white rounded-2xl border overflow-hidden transition-shadow ${openFaq === idx ? 'border-slate-900/20 shadow-md' : 'border-slate-200 shadow-sm'}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-slate-50/80 transition-colors min-h-[48px]"
                                    >
                                        <span className="flex items-start gap-3">
                                            <span className="font-marcellus text-sm text-slate-400 tabular-nums shrink-0 pt-0.5">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-semibold text-slate-900 text-base md:text-lg leading-snug">{faq.q}</span>
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 border-t border-slate-100">
                                                    <p className="text-slate-600 leading-relaxed pl-0 md:pl-9">{faq.a}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                </div>

                {/* 12. Sidebar (Desktop) */}
                <div className="lg:w-1/3 hidden lg:block">
                    <div className="sticky top-32 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100">
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                                <div>
                                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Price Per Person</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-marcellus text-slate-900">${packageData.price}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-bold text-slate-900">{packageData.rating}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 underline cursor-pointer">{packageData.reviews} reviews</p>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <h3 className="font-bold text-slate-900 mb-2">Request to Book</h3>
                                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all" />
                                <button type="button" className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                    Check Availability
                                </button>
                            </form>
                            <p className="text-center text-xs text-slate-500 mt-4">You won't be charged yet</p>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-marcellus text-xl mb-2 text-white">Need Expert Advice?</h3>
                                <p className="text-white/70 text-sm mb-6">Our travel curators are ready to tailor this experience for you.</p>
                                <a href="tel:+18001234567" className="inline-block bg-white text-slate-900 px-6 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors">
                                    Call +1 (800) 123-4567
                                </a>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Lead Form Section */}
            <section id="lead-form" className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-marcellus mb-6 text-white">Craft Your Perfect Journey</h2>
                            <p className="text-white/80 text-lg mb-10 leading-relaxed">
                                Let our luxury travel advisors customize this itinerary to your exact preferences. Share your details and we'll craft a proposal within 24 hours.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-white">Secure & Confidential</h4>
                                        <p className="text-white/60 text-sm">Your information is strictly protected.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Star className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-white">5-Star Service Guarantee</h4>
                                        <p className="text-white/60 text-sm">Award-winning support before, during, and after.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white rounded-3xl p-8 md:p-10 text-slate-900 shadow-2xl">
                                <h3 className="text-2xl font-marcellus mb-6">Start Planning</h3>
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                                        <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                                    </div>
                                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                                    <textarea rows={4} placeholder="Tell us about your dream trip (dates, preferences, special occasions)..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all resize-none" />
                                    <button type="button" className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-lg">
                                        Request Custom Proposal <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Social Proof (Testimonials) */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
                    <h2 className="text-4xl font-marcellus text-slate-900 mb-4">Traveler Stories</h2>
                    <p className="text-slate-600">Hear from those who have experienced the magic.</p>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div 
                        drag="x"
                        dragConstraints={{ left: -500, right: 0 }}
                        className="flex gap-6 cursor-grab active:cursor-grabbing pb-8"
                    >
                        {packageData.testimonials.map((test, i) => (
                            <div key={i} className="min-w-[350px] md:min-w-[450px] bg-[#faf9f6] p-8 rounded-3xl border border-slate-100 shrink-0">
                                <Quote className="w-10 h-10 text-slate-300 mb-6" />
                                <p className="text-lg text-slate-700 mb-8 italic">"{test.text}"</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{test.name}</h4>
                                        <p className="text-sm text-slate-500">{test.role}</p>
                                    </div>
                                    <div className="flex text-yellow-500">
                                        {[...Array(Math.floor(test.rating))].map((_, idx) => (
                                            <Star key={idx} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Photo Grid */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800" alt="Traveler Photo 1" className="w-full h-48 md:h-64 object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1527736941177-224071f1e236?auto=format&fit=crop&q=80&w=800" alt="Traveler Photo 2" className="w-full h-48 md:h-64 object-cover rounded-2xl md:translate-y-8" />
                        <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800" alt="Traveler Photo 3" className="w-full h-48 md:h-64 object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" alt="Traveler Photo 4" className="w-full h-48 md:h-64 object-cover rounded-2xl md:translate-y-8" />
                    </div>
                </div>
            </section>

            {/* 9. Partners Marquee */}
            <div className="bg-slate-50 py-12 border-y border-slate-200 overflow-hidden flex items-center">
                <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-16 px-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Partner Logos */}
                    {['Luxury Escapes', 'Condé Nast', 'Travel + Leisure', 'National Geographic', 'Virtuoso', 'Forbes Travel Guide', 'Luxury Escapes', 'Condé Nast'].map((partner, i) => (
                        <span key={i} className="text-2xl font-marcellus font-bold text-slate-800 mx-8">{partner}</span>
                    ))}
                </div>
            </div>

            {/* 10. Related Packages */}
            <section className="py-24 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl font-marcellus text-slate-900 mb-12">More to Explore</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { id: 2, title: 'Swiss Alps Luxury', duration: '10 Days', price: 3400, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' },
                            { id: 3, title: 'Maldives Private Island', duration: '5 Days', price: 4800, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
                            { id: 6, title: 'Santorini Villas', duration: '6 Days', price: 2900, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800' },
                        ].map((p) => (
                            <a key={p.id} href={`/packages/${p.id}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                                        {p.duration}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-marcellus text-xl text-slate-900 mb-2">{p.title}</h3>
                                    <p className="text-slate-500 font-medium">From ${p.price}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. Final CTA Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 py-24">
                <div className="absolute inset-0 z-0">
                    <img src={packageData.images[1]} alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-marcellus text-white mb-6">Ready for the Extraordinary?</h2>
                    <p className="text-xl text-white/80 mb-10 font-light">Join the select few who have experienced the world's most breathtaking destinations with unparalleled luxury.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={scrollToForm} className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-colors">
                            Plan This Trip
                        </button>
                        <button className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                            Explore All Destinations
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
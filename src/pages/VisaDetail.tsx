import React, { useCallback, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    CreditCard,
    Globe,
    Calendar,
    MapPin,
    ShieldCheck,
    Truck,
    Users,
    ChevronDown,
    ChevronUp,
    Phone,
    MessageCircle,
    Info,
    ArrowRight,
    FileText,
    Star,
    ExternalLink,
    Quote,
    Lock,
    ChevronLeft,
    ChevronRight,
    CheckCircle2
} from 'lucide-react';

interface VisaType {
    name: string;
    processingTime: string;
    stayPeriod: string;
    validity: string;
    visaFee: string;
    serviceCharge: string;
}

interface WhyChooseUs {
    icon: React.ElementType;
    title: string;
    desc: string;
}

interface ProcessStep {
    step: number;
    title: string;
    desc: string;
}

interface Faq {
    q: string;
    a: string;
}

interface Attraction {
    name: string;
    price: string;
    image: string;
    desc: string;
}

interface ReviewItem {
    name: string;
    location: string;
    quote: string;
    rating: number;
}

interface VisaData {
    name: string;
    title: string;
    bgImage: string;
    processingTime: string;
    fees: string;
    intro: string;
    introExtra?: string[];
    visaTypes: VisaType[];
    whyChooseUs: WhyChooseUs[];
    process: ProcessStep[];
    documents: string[];
    supportingDocuments?: string[];
    photoSpecifications?: string[];
    eligibilityNotes?: string[];
    additionalChargesNote?: string;
    sampleVisa?: { title: string; description: string };
    faqs: Faq[];
    attractions: Attraction[];
    reviews?: ReviewItem[];
    visitUs?: { heading: string; lines: string[] };
    embassy?: { heading: string; lines: string[]; linkLabel?: string; linkHref?: string };
}

const visaData: Record<string, VisaData> = {
    singapore: {
        name: 'Singapore',
        title: 'Singapore Visa',
        bgImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2000',
        processingTime: '3 to 5 Working Days',
        fees: 'INR 2,100/-',
        intro: "Singapore is a top favorite among travelers! Every year, nearly 1.4 million Indians visit the vibrant Lion City and they all share one requirement: a valid Singapore Visa before entering the country.\n\nThat's where we come in.\n\nWith us, getting your Singapore Visa for Indians is simple and quick; usually processed in just 3 to 5 days. All you need to do is apply online, make the payment, and upload your documents. Our visa experts will take care of the rest. Prefer personal assistance? You can also choose our doorstep document pickup.\n\nApply online today and get your Singapore visa online - fast, easy, and hassle-free!",
        introExtra: [
            'Singapore offers Indian travellers a safe, efficient entry experience when documentation is prepared correctly. Immigration officers may ask for proof of onward travel, sufficient funds, and your accommodation details—having digital and printed copies helps avoid delays at Changi Airport.',
            'Our team reviews every application against the latest ICA guidelines. We flag common issues early—blurred scans, mismatched names across documents, expired passports, or incomplete covering letters—so you are not caught off guard after submission.',
            'Whether you are visiting family, attending a conference, or planning a multi-city holiday across Southeast Asia, we tailor document checklists to your profile (salaried, self-employed, student, or retired) and keep you updated at each milestone.',
        ],
        visaTypes: [
            {
                name: 'Singapore Tourist Visa',
                processingTime: '3-5 working days',
                stayPeriod: 'Up to 30 days (Determined by the Immigration)',
                validity: 'Discretion of the Embassy',
                visaFee: 'INR 2,100/-',
                serviceCharge: 'INR 1,000/-'
            },
            {
                name: 'Singapore Business Visa',
                processingTime: '3-5 working days',
                stayPeriod: 'Up to 30 days (Determined by the Immigration)',
                validity: 'Discretion of the Embassy',
                visaFee: 'INR 2,100/-',
                serviceCharge: 'INR 1,000/-'
            }
        ],
        whyChooseUs: [
            { icon: Globe, title: 'Visa Services for 180 Countries', desc: 'A legacy of delivering fast, reliable visa services with deep knowledge of global requirements and procedures.' },
            { icon: Calendar, title: '45 years of Seamless Visa Solutions', desc: 'A legacy of delivering fast, reliable visa services with deep knowledge of global requirements and procedures.' },
            { icon: MapPin, title: '150+ Branches Worldwide', desc: "If you wish to come down to our branch to apply for your Singapore visa, you can do so at any one of our 150+ branches! We'd love to meet you and help you out!" },
            { icon: ShieldCheck, title: 'End-to-End Visa Assistance', desc: 'You do not have to worry about anything - we will handle all your Singapore visa requirements! Just apply, sit back and relax!' },
            { icon: Truck, title: 'Pick Up & Drop of Documents from your Doorstep', desc: "Busy and can't make time to pick up the visa yourself? Relax, we offer doorstep services to ensure that you get your Singapore visa with complete ease!" },
            { icon: Users, title: 'Safety and Confidentiality', desc: 'You are a valued customer and the privacy of your information is our top priority.' }
        ],
        process: [
            {
                step: 1,
                title: 'Visit Website',
                desc: 'Start on our secure portal: choose Singapore, select your travel dates, and receive a personalised checklist. You can save progress and resume anytime.',
            },
            {
                step: 2,
                title: 'Submit your Documents',
                desc: 'Upload scans or schedule doorstep pickup. We normalise file sizes, rename documents for clarity, and confirm receipt so nothing is missed.',
            },
            {
                step: 3,
                title: 'Visa Expert Verification Check',
                desc: 'Specialists cross-check ICA requirements, photograph specs, and financial proofs. If something needs correction, we explain exactly what to fix.',
            },
            {
                step: 4,
                title: 'Receive your Singapore Visa via Email',
                desc: 'Once approved, you receive the e-visa PDF by email. We also share a short arrival checklist: printouts, SG Arrival Card reminders, and useful contacts.',
            },
        ],
        documents: [
            'Original Passport with at least 6 months validity and minimum 3 blank pages + passport number of all old passports if previously traveled to Singapore.',
            'Singapore Visa Application form (duly completed and signed as per passport).',
            '2 Recent Colour Photographs (see Photo specifications below).',
            'Personal Covering letter (For Employed — plain paper / For Self-Employed — company letterhead) stating purpose of visit, itinerary, and sponsorship if applicable.',
        ],
        supportingDocuments: [
            'Confirmed return flight tickets (or onward ticket if transiting as per your itinerary).',
            'Hotel reservations or invitation letter from a host in Singapore with supporting ID copy (where applicable).',
            'Last 3–6 months bank statements with healthy closing balance; salaried applicants may add salary slips and Form 16.',
            'Employment letter on company letterhead with designation, tenure, and approved leave dates.',
            'For business visits: invitation from the Singapore company, conference registration, or event details.',
            'For students: bonafide certificate / ID card and no-objection letter from institution if travelling during term.',
            'For minors: birth certificate and consent letter from non-travelling parent(s), notarised where advised.',
        ],
        photoSpecifications: [
            'Matte finish, 35 mm × 45 mm, white background, no shadows or patterns.',
            'Face should occupy 70–80% of the frame; neutral expression, eyes open and visible.',
            'No headwear unless for religious reasons; glasses only if worn daily — no thick frames or glare.',
            'Photo must be recent (within 3 months) and not the same as an older visa or passport image.',
        ],
        eligibilityNotes: [
            'You must have a valid passport and genuine travel intent; misrepresentation can lead to refusal or future bans.',
            'Previous refusals or overstays in Singapore or other countries must be disclosed; we help you present context clearly.',
            'Visa validity and duration of stay are decided by ICA; holding a visa does not guarantee entry — the officer at the border makes the final decision.',
            'Apply at least 2 weeks before travel where possible; peak seasons and public holidays may add a day or two.',
        ],
        additionalChargesNote:
            'Additional charges may apply for doorstep document pickup, express photo services, notarisation, or courier as per your location. Government visa fee and our service charge are quoted separately on your invoice.',
        sampleVisa: {
            title: 'View a sample Singapore e-visa',
            description:
                'See how an approved Singapore visit visa typically looks: reference numbers, validity window, and traveller details. Your final document may vary slightly based on ICA format updates.',
        },
        faqs: [
            {
                q: 'I have an Indian passport, do I need a visa to visit Singapore?',
                a: 'Yes, Indian travellers need a Singapore Visit Visa prior to arrival. We guide you through a simple four-step flow and check documents before submission so your application is as strong as possible.',
            },
            {
                q: 'Do I need travel insurance to get a Singapore Visa for Indians?',
                a: 'Travel insurance is not mandatory for the visa application. We still recommend comprehensive medical and trip cover for cancellations, baggage loss, and hospitalisation abroad.',
            },
            {
                q: 'Do I need an entry visa to go to Singapore?',
                a: 'Unless you are visa-exempt, you need a visit visa. Singapore’s online process is straightforward; with complete documents, many Indian travellers receive approval within a few working days.',
            },
            {
                q: 'How long can I stay in Singapore on a tourist visa?',
                a: 'ICA usually grants stays of up to 30 days per visit for tourists, but the exact duration is stamped at entry. Do not overstay; extensions are not guaranteed.',
            },
            {
                q: 'Can I apply for a Singapore visa if my passport is about to expire?',
                a: 'Your passport should be valid for at least six months from the date of entry. If it is close to expiring, renew your passport first—we will use the new passport details on the application.',
            },
            {
                q: 'Do I need the SG Arrival Card?',
                a: 'Travellers should complete Singapore’s arrival declaration as per current ICA rules before landing. Requirements can change; we share the latest links with your visa pack.',
            },
            {
                q: 'Can I work in Singapore on a visit visa?',
                a: 'No. A visit visa is for tourism, family, or short business meetings as permitted. Employment requires an appropriate work pass arranged by an employer.',
            },
            {
                q: 'What if my visa is rejected?',
                a: 'Refusals are disappointing but not always final. We review the file, explain possible reasons, and advise on re-application timing and stronger documentation where appropriate.',
            },
        ],
        attractions: [
            {
                name: 'Gardens by the Bay',
                price: 'Starting from ₹1499/- Per Person',
                image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
                desc: "Spanning over 250 acres of reclaimed land is Singapore's awe-inspiring and award-winning Gardens by the Bay, with over 200 different species of plants & flowers. Visit Singapore's popular Supertree Grove, Flower Dome & Cloud Forest, plus a range of other free attractions, with your day ticket.",
            },
            {
                name: 'Sentosa Island',
                price: 'Starting from ₹2499/- Per Person',
                image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800',
                desc: "A tiny man-made island just off the shore, Sentosa is a place bustling with entertainment & amusement. There's something fun for everyone on this island playground. Unleash your passion for thrills, explore sensational activities & enjoy incredible adventures on the Island of Sentosa.",
            },
            {
                name: 'Universal Studios Singapore',
                price: 'Starting from ₹5200/- Per Person',
                image: 'https://images.unsplash.com/photo-1506461883276-594543d0e218?auto=format&fit=crop&q=80&w=800',
                desc: "Southeast Asia's first and only Universal Studios theme park, featuring 28 thrilling rides, fun-filled shows & 20+ breathtaking attractions in seven themed zones. Treat yourself to an adventure of a lifetime at Universal Studios Singapore, immerse in the wonderful world of blockbusters & experience cutting-edge rides.",
            },
            {
                name: 'Marina Bay & Merlion Park',
                price: 'Starting from ₹899/- Per Person',
                image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=800',
                desc: 'The postcard heart of Singapore: skyline views, the Merlion, and evening light shows. Pair a walk along the waterfront with a visit to nearby malls and rooftop viewpoints for a classic first evening in the city.',
            },
            {
                name: 'Singapore Zoo & River Wonders',
                price: 'Starting from ₹3199/- Per Person',
                image: 'https://images.unsplash.com/photo-1534564531478-1ce4672620d4?auto=format&fit=crop&q=80&w=800',
                desc: 'World-class wildlife parks with open-concept habitats, keeper talks, and the famous breakfast with orangutans (where available). River Wonders adds giant pandas and a serene river-themed trail—ideal for families.',
            },
            {
                name: 'Night Safari',
                price: 'Starting from ₹3499/- Per Person',
                image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800',
                desc: "The world's first nocturnal zoo: tram rides through forested exhibits, walking trails, and the Creatures of the Night show. A memorable contrast to daytime sightseeing.",
            },
            {
                name: 'Singapore Flyer',
                price: 'Starting from ₹1899/- Per Person',
                image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
                desc: 'One of Asia’s largest observation wheels—slow, smooth capsules with 360° views over Marina Bay, the CBD, and on clear days, distant islands. Best at sunset or after dark.',
            },
            {
                name: 'Chinatown, Little India & Kampong Glam',
                price: 'Starting from ₹599/- Per Person (walking tours)',
                image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
                desc: 'Heritage districts packed with temples, street food, boutiques, and murals. Spend a day hopping MRT lines between colourful shophouses, hawker centres, and cultural landmarks.',
            },
            {
                name: 'Jewel Changi Airport',
                price: 'Starting from ₹0/- (free HSBC Rain Vortex viewing)',
                image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f31?auto=format&fit=crop&q=80&w=800',
                desc: 'Even if you only have a layover, Jewel’s indoor waterfall, canopy park, and dining make it a destination itself. Many travellers plan an extra hour before departure.',
            },
        ],
        reviews: [
            {
                name: 'Ananya K.',
                location: 'Bengaluru',
                quote: 'Clear checklist, quick replies on WhatsApp, and the visa arrived before our flights. Changi entry was smooth with the printout they told us to carry.',
                rating: 5,
            },
            {
                name: 'Rahul & Meera',
                location: 'Mumbai',
                quote: 'We were confused about bank statements and the covering letter. Their team rewrote the letter structure and we got approval in four working days.',
                rating: 5,
            },
            {
                name: 'Vikram S.',
                location: 'Hyderabad',
                quote: 'Doorstep pickup saved me time. I liked that they explained what ICA looks for—felt less like a black box.',
                rating: 5,
            },
            {
                name: 'Priya D.',
                location: 'Delhi NCR',
                quote: 'Second Singapore trip through them. Fees were transparent and the attractions add-on suggestions were genuinely useful for our kids.',
                rating: 5,
            },
        ],
        embassy: {
            heading: 'Embassy & official references',
            lines: [
                'Immigration & Checkpoints Authority (ICA) publishes the latest entry and visa rules for Singapore.',
                'For complex cases (long stay, repeated refusals), official guidance from ICA or the Singapore High Commission should be considered alongside our assistance.',
            ],
            linkLabel: 'ICA — Visit pass information',
            linkHref: 'https://www.ica.gov.sg/',
        },
    },
};

// Fallback data for other countries
const fallbackData: VisaData = {
    name: 'Country',
    title: 'Visa Services',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2000',
    processingTime: 'Varies',
    fees: 'Contact Us',
    intro: 'Get comprehensive visa assistance for your travel needs. We ensure a smooth and hassle-free visa application process.',
    visaTypes: [
        {
            name: 'Tourist Visa',
            processingTime: 'Varies',
            stayPeriod: 'Varies',
            validity: 'Varies',
            visaFee: 'Contact Us',
            serviceCharge: 'Contact Us',
        },
    ],
    whyChooseUs: [
        { icon: Globe, title: '180+ Countries', desc: 'Visas processed for over 180 countries' },
        { icon: ShieldCheck, title: 'End-to-End', desc: 'Complete visa assistance provided' },
        { icon: Users, title: 'Safety & Security', desc: 'Highest standards of data protection' },
    ],
    process: [
        { step: 1, title: 'Apply Online', desc: 'Fill out our simple online visa application form.' },
        { step: 2, title: 'Submit Documents', desc: 'Upload or hand over the required documents.' },
        { step: 3, title: 'Get Your Visa', desc: 'Receive your approved visa.' },
    ],
    documents: ['Valid Passport', 'Passport-size photographs', 'Completed application form', 'Proof of travel'],
    faqs: [{ q: 'How do I apply?', a: 'You can apply online through our portal or contact our visa experts.' }],
    attractions: [],
    introExtra: [],
    supportingDocuments: [],
    photoSpecifications: [],
    eligibilityNotes: [],
    reviews: [],
};

const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'types', label: 'Visa Types' },
    { id: 'documents', label: 'Documents' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'process', label: 'Process' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'embassy', label: 'Embassy' },
];

export default function VisaDetail() {
    const { country } = useParams();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [showSupportingDocs, setShowSupportingDocs] = useState(false);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const countryKey = country?.toLowerCase() || '';
    const data: VisaData = visaData[countryKey]
        ? visaData[countryKey]
        : {
            ...fallbackData,
            name: country ?? 'Country',
            title: `${country ?? 'Country'} Visa Services`,
        };

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveTab(navLinks[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const nextReview = () => {
        if (data.reviews) {
            setCurrentReviewIndex((prev) => (prev + 1) % data.reviews!.length);
        }
    };

    const prevReview = () => {
        if (data.reviews) {
            setCurrentReviewIndex((prev) => (prev - 1 + data.reviews!.length) % data.reviews!.length);
        }
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-24 font-sans selection:bg-primary/20 selection:text-primary">
            {/* Hero Section */}
            <div className="relative min-h-[100svh] flex items-end pb-24 px-4 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50" style={{ backgroundImage: `url('${data.bgImage}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent mix-blend-overlay" />

                <div className="content-container relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link to="/visa" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm mb-8 transition-colors group tracking-widest uppercase">
                            <motion.div
                                animate={{ x: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                            </motion.div>
                            Back to Visas
                        </Link>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight capitalize leading-[1.1] font-medium" >
                            {data.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
                                <Clock className="w-5 h-5 text-amber-400" />
                                <span className="text-white font-medium tracking-wide">{data.processingTime}</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-amber-400" />
                                <span className="text-white font-medium tracking-wide">{data.fees}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => scrollToSection('types')} className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-white/10 flex items-center gap-2">
                                View Visa Types <ChevronDown className="w-5 h-5" />
                            </button>
                            <button onClick={() => scrollToSection('process')} className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2">
                                How it Works
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Sticky Navigation */}
            <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm transition-all">
                <div className="content-container">
                    <ul className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
                        {navLinks.map((link) => (
                            <li key={link.id} className="shrink-0">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection(link.id)}
                                    className={`font-semibold whitespace-nowrap transition-colors tracking-wide text-sm uppercase py-2 border-b-2 ${activeTab === link.id
                                            ? 'text-primary border-primary'
                                            : 'text-slate-200 hover:text-slate-800 border-transparent'
                                        }`}
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="content-container mt-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Main Content */}
                    <main className="lg:w-2/3 space-y-24">

                        {/* Overview */}
                        <motion.section
                            id="overview"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <Quote className="absolute -top-6 -left-8 w-24 h-24 text-slate-100 -z-10 rotate-180" />
                            <h2 className="text-4xl text-slate-900 mb-8 tracking-tight" >
                                The Premium {data.name} Experience
                            </h2>
                            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
                                <p className="text-xl font-medium text-slate-800 mb-6">{data.intro}</p>
                                {data.introExtra?.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            <div className="mt-10 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                                <div className="relative z-10 flex items-start gap-4">
                                    <Info className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-xl font-bold mb-2 text-white">Concierge Tip</h4>
                                        <p className="text-white/80 leading-relaxed">Our premium service ensures your application is meticulously reviewed against the latest embassy guidelines before submission, maximizing your approval chances.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Types of Visas */}
                        <motion.section
                            id="types"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-slate-900 mb-10 tracking-tight" >Visa Categories</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.visaTypes.map((visa: VisaType, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all"
                                    >
                                        <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-6 border-b border-slate-100">{visa.name}</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Processing</span>
                                                <span className="font-bold text-slate-900">{visa.processingTime}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Stay Period</span>
                                                <span className="font-bold text-slate-900 text-right max-w-[50%]">{visa.stayPeriod}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Validity</span>
                                                <span className="font-bold text-slate-900">{visa.validity}</span>
                                            </div>
                                            <div className="pt-4 mt-4 border-t border-slate-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-slate-500">Visa Fee</span>
                                                    <span className="font-bold text-slate-900">{visa.visaFee}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Service Charge</span>
                                                    <span className="font-bold text-slate-900">{visa.serviceCharge}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {data.additionalChargesNote && (
                                <div className="mt-8 bg-amber-50 border border-amber-200/60 rounded-2xl p-6 flex gap-4 items-start">
                                    <Info className="w-6 h-6 text-amber-600 shrink-0" />
                                    <p className="text-amber-900/80 text-sm leading-relaxed">{data.additionalChargesNote}</p>
                                </div>
                            )}
                        </motion.section>

                        {/* Sample Visa */}
                        {data.sampleVisa && (
                            <motion.section
                                id="sample-visa"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white p-10 md:p-14 shadow-2xl">
                                    {/* Diagonal Grid Lines */}
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-900/40" />

                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                        <div className="max-w-xl">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-sm font-medium tracking-wide uppercase">
                                                <FileText className="w-4 h-4" /> Specimen
                                            </div>
                                            <h2 className="text-3xl md:text-4xl mb-4" >{data.sampleVisa.title}</h2>
                                            <p className="text-white/70 leading-relaxed text-lg">{data.sampleVisa.description}</p>
                                        </div>
                                        <button className="shrink-0 bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 group">
                                            View Document <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {/* Documents Required */}
                        <motion.section
                            id="documents"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-slate-900 mb-10 tracking-tight" >Required Documents</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {data.documents.map((doc: string, idx: number) => (
                                    <div key={idx} className="relative bg-white border border-slate-200 p-6 rounded-2xl flex items-start gap-4 overflow-hidden group hover:border-primary/50 transition-colors">
                                        <div className="absolute -right-4 -top-8 text-9xl font-black text-slate-50 opacity-50 select-none group-hover:text-primary/5 transition-colors">
                                            {idx + 1}
                                        </div>
                                        <div className="relative z-10 bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                                            <CheckCircle2 className="w-6 h-6 text-primary" />
                                        </div>
                                        <p className="relative z-10 text-slate-700 text-lg leading-relaxed">{doc}</p>
                                    </div>
                                ))}
                            </div>

                            {data.supportingDocuments && data.supportingDocuments.length > 0 && (
                                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
                                    <button
                                        onClick={() => setShowSupportingDocs(!showSupportingDocs)}
                                        className="w-full px-8 py-6 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-bold text-lg text-slate-900">Supporting Documents (Profile Based)</span>
                                        {showSupportingDocs ? <ChevronUp className="w-6 h-6 text-slate-500" /> : <ChevronDown className="w-6 h-6 text-slate-500" />}
                                    </button>
                                    <AnimatePresence>
                                        {showSupportingDocs && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-8 border-t border-slate-200">
                                                    <ul className="space-y-4">
                                                        {data.supportingDocuments.map((doc, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-slate-600">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0 mt-2.5" />
                                                                <span>{doc}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.section>

                        {/* Why Choose Us */}
                        <motion.section
                            id="why-us"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <h2 className="text-4xl text-slate-900 tracking-tight" >Why Choose Us</h2>
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-3xl font-bold text-primary mb-1">20+</p>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Years Exp</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-primary mb-1">10k+</p>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Visas Done</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-primary mb-1">99%</p>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">Success</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {data.whyChooseUs.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                                        >
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                                                <Icon className="w-6 h-6 text-slate-900" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                            <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>

                        {/* Process */}
                        <motion.section
                            id="process"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-slate-900 mb-12 tracking-tight text-center" >The Concierge Process</h2>

                            <div className="relative">
                                {/* Mobile Vertical Line */}
                                <div className="md:hidden absolute left-6 top-0 w-0.5 h-full bg-slate-200" />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
                                    {data.process.map((step, idx) => (
                                        <div key={idx} className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-8 group">
                                            <div className="w-12 h-12 rounded-full bg-white border-4 flex items-center justify-center font-bold shrink-0 border-primary text-primary transition-colors z-10">
                                                {step.step}
                                            </div>
                                            <div className="md:text-center pt-2 md:pt-0">
                                                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                                                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* FAQs */}
                        <motion.section
                            id="faqs"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-slate-900 mb-10 tracking-tight" >Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {data.faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                        <button
                                            className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                        >
                                            <span className="font-bold text-slate-900 pr-6">{faq.q}</span>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === idx ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                {activeFaq === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </div>
                                        </button>
                                        <AnimatePresence>
                                            {activeFaq === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Attractions */}
                        {data.attractions && data.attractions.length > 0 && (
                            <motion.section
                                id="attractions"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl text-slate-900 mb-4 tracking-tight" >Curated Experiences</h2>
                                <p className="text-slate-500 text-lg mb-10">Enhance your trip with our handpicked selection of premium attractions.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.attractions.map((attr, idx) => (
                                        <div key={idx} className={`group relative overflow-hidden rounded-3xl ${idx === 0 ? 'md:col-span-2 md:h-[500px]' : 'h-[400px]'}`}>
                                            <img src={attr.image} alt={attr.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                                                <p className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-2">Starting from {attr.price}</p>
                                                <h3 className="text-3xl font-bold text-white mb-4">{attr.name}</h3>
                                                <p className="text-white/80 line-clamp-2 md:line-clamp-3 max-w-2xl">{attr.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Reviews Carousel */}
                        {data.reviews && data.reviews.length > 0 && (
                            <motion.section
                                id="reviews"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
                            >
                                <Quote className="absolute top-10 right-10 w-32 h-32 text-white/5 rotate-180" />
                                <h2 className="text-4xl mb-12 tracking-tight" >Client Stories</h2>

                                <div className="relative min-h-[200px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentReviewIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="max-w-3xl"
                                        >
                                            <div className="flex gap-1 mb-6">
                                                {Array.from({ length: data.reviews[currentReviewIndex].rating }).map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                            <p className="text-2xl md:text-3xl leading-relaxed mb-8 font-light">&ldquo;{data.reviews[currentReviewIndex].quote}&rdquo;</p>
                                            <div>
                                                <p className="font-bold text-lg">{data.reviews[currentReviewIndex].name}</p>
                                                <p className="text-white/60">{data.reviews[currentReviewIndex].location}</p>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="flex gap-4 mt-10">
                                    <button onClick={prevReview} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={nextReview} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.section>
                        )}

                        {/* Embassy */}
                        <motion.section
                            id="embassy"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="rounded-3xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-start gap-6 max-w-2xl">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                                        <Globe className="w-8 h-8 text-slate-900" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-3">{data.embassy?.heading ?? 'Official References'}</h2>
                                        <div className="space-y-2 text-slate-600">
                                            {(data.embassy?.lines ?? ['Verify latest guidance on the official immigration website.']).map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {data.embassy?.linkHref && (
                                    <a
                                        href={data.embassy.linkHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 inline-flex items-center gap-2 font-bold text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-6 py-3 rounded-full shadow-sm transition-all"
                                    >
                                        {data.embassy.linkLabel ?? 'Official Website'}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.section>

                    </main>

                    {/* Sticky Sidebar */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-32 space-y-8">
                            {/* Enquiry Form */}
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-3xl text-slate-900 mb-2" >Request Concierge</h3>
                                <p className="text-slate-500 mb-8">Our visa experts will contact you shortly.</p>

                                <form className="space-y-4">
                                    <div>
                                        <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <input type="tel" placeholder="Phone Number" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <textarea rows={3} placeholder="Travel dates or specific requirements" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all resize-none" />
                                    </div>
                                    <button type="button" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
                                        Submit Request <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
                                    <Lock className="w-4 h-4" />
                                    <span>Your data is 100% secure</span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                                <h4 className="text-2xl mb-6 relative z-10" >Direct Support</h4>
                                <div className="space-y-4 relative z-10">
                                    <a href="tel:02240666444" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all">
                                        <div className="bg-white/10 p-3 rounded-lg">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Call Us</p>
                                            <p className="font-bold tracking-wide">02240666444</p>
                                        </div>
                                    </a>
                                    <a href="https://wa.me/918879008992" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all">
                                        <div className="bg-[#25D366]/20 text-[#25D366] p-3 rounded-lg">
                                            <MessageCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 uppercase tracking-widest mb-1">WhatsApp</p>
                                            <p className="font-bold tracking-wide">+91 8879008992</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

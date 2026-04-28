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
    CheckCircle2,
    Share2
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
    mandatoryDocuments?: { label: string; desc: string }[];
    supportiveDocumentsList?: { label: string; desc: string }[];
    supportingDocuments?: string[];
    photoSpecifications?: string[];
    eligibilityNotes?: string[];
    additionalChargesNote?: string;
    sampleVisa?: { title: string; description: string };
    faqs: Faq[];
    attractions: Attraction[];
    reviews?: ReviewItem[];
    visitUs?: { heading: string; lines: string[] };
    embassy?: { heading: string; address?: string; contact?: string; lines: string[]; linkLabel?: string; linkHref?: string };
    terms?: { q: string; a: string }[];
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
            { icon: Globe, title: 'Visa Services for 50+ Countries', desc: 'A legacy of delivering fast, reliable visa services with deep knowledge of global requirements and procedures.' },
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
        terms: [
            { q: 'Approval Policy', a: 'Visa approval is at the sole discretion of the Singapore Immigration & Checkpoints Authority (ICA).' },
            { q: 'Service Scope', a: 'Our services include document review, application filing, and status tracking.' },
            { q: 'Document Accuracy', a: 'Applicants are responsible for the accuracy and authenticity of all submitted documents.' },
            { q: 'Refund Policy', a: 'Embassy fees and service charges are non-refundable once the application is processed.' },
            { q: 'Travel Bookings', a: 'We recommend not making non-refundable travel bookings until the visa is approved.' }
        ]
    },
    usa: {
        name: 'USA',
        title: 'USA Visa',
        bgImage: 'https://images.unsplash.com/photo-1508433957232-3107f5ed2035?auto=format&fit=crop&q=80&w=2000',
        processingTime: 'Varies by Embassy',
        fees: 'Varies',
        intro: "Applying for a USA visa can be a complex journey, but it doesn't have to be. We provide end-to-end guidance to ensure your documentation is perfect and your interview preparation is thorough.",
        visaTypes: [
            {
                name: 'B1/B2 Tourist & Business Visa',
                processingTime: 'Embassy Dependent',
                stayPeriod: 'Up to 6 Months',
                validity: 'Up to 10 Years',
                visaFee: 'USD 185',
                serviceCharge: 'Contact Us'
            },
            {
                name: 'F1 Student Visa',
                processingTime: 'Embassy Dependent',
                stayPeriod: 'Course Duration',
                validity: 'Course Duration',
                visaFee: 'USD 185',
                serviceCharge: 'Contact Us'
            }
        ],
        whyChooseUs: [
            { icon: Globe, title: 'Visa Services for 50+ Countries', desc: 'Expert guidance for global travel needs.' },
            { icon: ShieldCheck, title: '99% Success Rate', desc: 'High approval rates through meticulous documentation.' },
            { icon: Users, title: 'Expert Consultants', desc: 'Personalized assistance for every applicant.' }
        ],
        process: [
            { step: 1, title: 'Secure Your Service', desc: 'Confirm your visa assistance with our expert team' },
            { step: 2, title: 'Submit Your Documents', desc: 'Share your required documents securely for verification' },
            { step: 3, title: 'Expert Review & Processing', desc: 'Our specialists review and process your application as per embassy guidelines' },
            { step: 4, title: 'Receive Your Visa', desc: 'Get your visa with complete support and guidance' }
        ],
        mandatoryDocuments: [
            { label: 'Original Passport', desc: 'Valid for at least 6 months beyond intended stay' },
            { label: 'DS-160 Confirmation', desc: 'Confirmation page of the online non-immigrant visa application' },
            { label: 'Appointment Confirmation', desc: 'Proof of scheduled visa interview' },
            { label: 'Payment Receipt', desc: 'Visa fee payment confirmation' }
        ],
        supportiveDocumentsList: [
            { label: 'Financial Proofs', desc: 'Bank statements, tax returns, and property documents' },
            { label: 'Employment Proofs', desc: 'Salary slips, NOC from employer, or business registration' },
            { label: 'Travel Itinerary', desc: 'Day-to-day plan and hotel bookings' }
        ],
        documents: [],
        faqs: [
            { q: 'How long does USA visa processing take?', a: 'Processing times vary significantly based on the embassy and visa type. It can range from a few weeks to several months.' },
            { q: 'What are the chances of approval?', a: 'Approval depends entirely on your profile and document accuracy. We maximize your chances through expert review.' },
            { q: 'Can I reapply after rejection?', a: 'Yes, you can reapply, but it is important to address the reasons for the previous rejection.' },
            { q: 'Do you provide interview support?', a: 'Yes, we provide comprehensive interview preparation and mock sessions.' },
            { q: 'Is document verification included?', a: 'Absolutely, we meticulously verify every document against embassy standards.' }
        ],
        attractions: [],
        embassy: {
            heading: 'USA Embassy & Consulate Information',
            address: 'Shantipath, Chanakyapuri, New Delhi, Delhi 110021',
            contact: '011 2419 8000',
            lines: ['Visit the official US Embassy website for latest alerts and appointment availability.']
        },
        terms: [
            { q: 'Approval Policy', a: 'Visa approval depends on embassy decision' },
            { q: 'Service Scope', a: 'Service includes guidance and processing support' },
            { q: 'Applicant Responsibility', a: 'Applicant responsible for correct documents' },
            { q: 'Timelines', a: 'Processing timelines are indicative' },
            { q: 'Refund Policy', a: 'Service fees are non-refundable' },
            { q: 'Embassy Fees', a: 'Embassy fees are separate' },
            { q: 'Reapplication', a: 'Reapplication treated as new process' },
            { q: 'Travel Advice', a: 'Avoid non-refundable bookings before approval' },
            { q: 'Data Privacy', a: 'Data handled securely' },
            { q: 'Policy Updates', a: 'Policies may change without notice' }
        ]
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
    terms: [
        { q: 'Approval Policy', a: 'Visa approval is at the sole discretion of the respective embassy/consulate.' },
        { q: 'Service Scope', a: 'Our services include professional guidance and application processing support.' },
        { q: 'Refund Policy', a: 'Service and embassy fees are generally non-refundable.' }
    ]
};

const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'types', label: 'Visa Types' },
    { id: 'documents', label: 'Documents' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'process', label: 'Process' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'embassy', label: 'Embassy' },
    { id: 'terms', label: 'Terms' },
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
        <div className="bg-white min-h-screen pb-24 font-sans selection:bg-primary/20 selection:text-primary">
            {/* Hero Section */}
            <div className="relative min-h-[90svh] flex items-center pt-24 pb-12 px-4 overflow-hidden bg-primary-dark">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105" style={{ backgroundImage: `url('${data.bgImage}')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent" />

                <div className="content-container relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link to="/visa" className="inline-flex items-center gap-2 text-secondary-light hover:text-secondary font-bold text-sm mb-6 transition-colors group tracking-[0.2em] uppercase">
                            <motion.div
                                animate={{ x: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                            </motion.div>
                            Explore All Visas
                        </Link>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight capitalize leading-[1.05] font-medium" >
                            {data.name} Visa Assistance <br className="hidden md:block" />
                            <span className="text-secondary">Made Simple & Reliable</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                            Expert guidance, accurate documentation, and faster processing support for your {data.name} journey.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mb-12">
                            <button onClick={() => scrollToSection('enquiry')} className="bg-secondary hover:bg-secondary-dark text-white font-bold px-10 py-5 rounded-full transition-all duration-300 shadow-2xl shadow-secondary/20 flex items-center gap-3 text-lg group">
                                Start Your Visa Process <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-lg">Trusted by travellers</span>
                                <span className="text-secondary-light/80 text-sm tracking-widest uppercase font-medium">Across 50+ Countries</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 py-8 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs uppercase tracking-widest">Processing</p>
                                    <p className="text-white font-bold">{data.processingTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs uppercase tracking-widest">Embassy Fees</p>
                                    <p className="text-white font-bold">{data.fees}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Sticky Navigation */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="content-container">
                    <ul className="flex items-center gap-2 md:gap-8 overflow-x-auto py-0 scrollbar-hide">
                        {navLinks.map((link) => (
                            <li key={link.id} className="shrink-0">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection(link.id)}
                                    className={`font-bold whitespace-nowrap transition-all tracking-wider text-[11px] md:text-xs uppercase py-5 px-1 border-b-2 relative ${activeTab === link.id
                                        ? 'text-primary border-primary'
                                        : 'text-slate-500 hover:text-primary border-transparent'
                                        }`}
                                >
                                    {link.label}
                                    {activeTab === link.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        />
                                    )}
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
                            <h2 className="text-4xl text-slate-900 mb-4 tracking-tight font-medium" >Visa Categories</h2>
                            <p className="text-slate-600 mb-10 text-lg">Choose the right visa type for your travel needs. Our experts ensure accurate filing for each category.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.visaTypes.map((visa: VisaType, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -8 }}
                                        className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 flex flex-col group"
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{visa.name}</h3>
                                            <p className="text-slate-500 mb-8 font-medium">Ideal for {visa.name.includes('Tourist') ? 'tourism and leisure travel' : 'business meetings and conferences'}.</p>

                                            <div className="space-y-5">
                                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                                                    <span className="text-slate-500 flex items-center gap-2 font-medium uppercase tracking-widest text-[10px]"><Clock className="w-4 h-4 text-secondary" /> Processing</span>
                                                    <span className="font-bold text-primary">{visa.processingTime}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                                                    <span className="text-slate-500 flex items-center gap-2 font-medium uppercase tracking-widest text-[10px]"><Calendar className="w-4 h-4 text-secondary" /> Stay / Validity</span>
                                                    <span className="font-bold text-primary">{visa.stayPeriod} / {visa.validity}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                                                    <span className="text-slate-500 flex items-center gap-2 font-medium uppercase tracking-widest text-[10px]"><CreditCard className="w-4 h-4 text-secondary" /> Fees</span>
                                                    <span className="font-bold text-primary">{visa.visaFee}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => scrollToSection('enquiry')} className="mt-8 w-full bg-white border-2 border-primary text-primary font-bold py-4 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            Check Requirements
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
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
                            <h2 className="text-4xl text-slate-900 mb-4 tracking-tight font-medium" >Documentation Guide</h2>
                            <p className="text-slate-600 mb-10 text-lg">Proper documentation is the key to a successful visa application. We provide a tailored checklist for your profile.</p>

                            <div className="space-y-12">
                                {/* Mandatory */}
                                <div>
                                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">01</div>
                                        Mandatory Documents
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {(data.mandatoryDocuments || data.documents.map(d => ({ label: d, desc: 'Required as per standard embassy guidelines.' }))).map((doc, idx) => (
                                            <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center justify-between gap-6 hover:bg-white hover:border-secondary/30 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{typeof doc === 'string' ? doc : doc.label}</p>
                                                        <p className="text-slate-500 text-sm">{typeof doc === 'string' ? 'Original document required.' : doc.desc}</p>
                                                    </div>
                                                </div>
                                                <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Supportive */}
                                <div>
                                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">02</div>
                                        Supportive Documents
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {(data.supportiveDocumentsList || data.supportingDocuments?.map(d => ({ label: d, desc: 'Optional but recommended for a stronger application.' })) || []).map((doc, idx) => (
                                            <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center justify-between gap-6 hover:bg-white hover:border-secondary/30 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                                                        <ShieldCheck className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{typeof doc === 'string' ? doc : doc.label}</p>
                                                        <p className="text-slate-500 text-sm">{typeof doc === 'string' ? 'Recommended based on your profile.' : doc.desc}</p>
                                                    </div>
                                                </div>
                                                <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 bg-primary-dark text-white p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                                <div className="relative z-10 flex items-start gap-4">
                                    <Info className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                    <p className="text-white/80 font-medium">Important Note: Requirements may vary based on applicant profile, travel history, and current embassy rules. Our experts will provide a customized checklist upon review.</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Why Choose Us */}
                        <motion.section
                            id="why-us"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <div>
                                    <h2 className="text-4xl text-slate-900 tracking-tight font-medium mb-4" >The Airland Advantage</h2>
                                    <p className="text-slate-600 text-lg max-w-xl">We combine decades of experience with a modern, digital-first approach to visa processing.</p>
                                </div>
                                <div className="flex gap-8">
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-primary mb-1">20+</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Years Exp</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-primary mb-1">50+</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Countries</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-primary mb-1">99%</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Success</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {data.whyChooseUs.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -8 }}
                                            className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-secondary transition-colors duration-500">
                                                <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                            <p className="text-slate-500 leading-relaxed text-sm font-medium">{item.desc}</p>
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
                            <div className="text-center mb-16">
                                <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">Simple, Guided & Expert-Handled Process</p>
                                <h2 className="text-4xl md:text-5xl text-slate-900 tracking-tight font-medium" >4 Simple Steps to Get Your Visa</h2>
                            </div>

                            <div className="max-w-3xl mx-auto relative">
                                {/* Vertical Connector Line */}
                                <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />
                                <div className="absolute left-[31px] top-0 bottom-0 w-0.5 bg-slate-200 md:hidden" />

                                <div className="space-y-12">
                                    {data.process.map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                        >
                                            {/* Content Card */}
                                            <div className={`flex-1 bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>

                                                {/* Number Bubble */}
                                                {/* <div className={`mb-3 w-12 h-12 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center font-bold text-primary shadow-xl z-10 group-hover:border-secondary transition-colors duration-500  ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                                    0{step.step}
                                                </div> */}
                                                <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors duration-500 ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                                    {idx === 0 && <CreditCard className="w-6 h-6" />}
                                                    {idx === 1 && <FileText className="w-6 h-6" />}
                                                    {idx === 2 && <ShieldCheck className="w-6 h-6" />}
                                                    {idx === 3 && <Globe className="w-6 h-6" />}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                                <p className="text-slate-500 leading-relaxed text-sm font-medium">{step.desc}</p>
                                            </div>

                                            <div className="flex-1 hidden md:block" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-20 text-center space-y-8">
                                <p className="text-slate-500 font-medium italic">“Handled by visa experts as per latest embassy requirements”</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button onClick={() => scrollToSection('enquiry')} className="bg-primary hover:bg-primary-dark text-white font-bold px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-primary/20">
                                        Start Your Visa Process
                                    </button>
                                    <button onClick={() => window.open('https://wa.me/918879008992')} className="bg-white border-2 border-slate-200 hover:border-primary text-slate-900 font-bold px-10 py-5 rounded-full transition-all duration-300">
                                        Talk to an Expert
                                    </button>
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
                            <h2 className="text-4xl text-slate-900 mb-10 tracking-tight font-medium" >Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {data.faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <button
                                            className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                        >
                                            <span className="font-bold text-slate-900 pr-6 text-lg group-hover:text-primary transition-colors">{faq.q}</span>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${activeFaq === idx ? 'bg-primary text-white rotate-180' : 'bg-white text-slate-400 shadow-sm'}`}>
                                                <ChevronDown className="w-5 h-5" />
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
                                                    <div className="px-8 pb-8 text-slate-500 leading-relaxed border-t border-slate-100 pt-6 text-lg font-medium">
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
                                <p className="text-slate-600 text-lg mb-10">Enhance your trip with our handpicked selection of premium attractions.</p>

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

                        {/* Embassy Section (Handled Above) */}

                        {/* Terms & Conditions */}
                        <motion.section
                            id="terms"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-slate-900 mb-10 tracking-tight font-medium" >Terms & Policies</h2>
                            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] divide-y divide-slate-200 overflow-hidden">
                                {data.terms?.map((term, idx) => (
                                    <div key={idx} className="hover:bg-white transition-colors group">
                                        <button
                                            className="w-full px-8 py-5 text-left flex items-center justify-between"
                                            onClick={() => setActiveFaq(activeFaq === idx + 100 ? null : idx + 100)}
                                        >
                                            <span className="font-bold text-slate-700">{term.q}</span>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx + 100 ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeFaq === idx + 100 && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-8 pb-5 text-slate-500 text-sm font-medium">
                                                        {term.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                    </main>

                    {/* Sticky Sidebar */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-32 space-y-8">
                            <div id="enquiry" className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl">
                                <h3 className="text-3xl font-medium text-slate-900 mb-2" >Get Expert Assistance</h3>
                                <p className="text-slate-500 mb-8 font-medium">Guided & Accurate Processing for your {data.name} Visa.</p>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium text-sm" />
                                        <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="tel" placeholder="Mobile Number" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium text-sm" />
                                        <input type="text" defaultValue={data.name} readOnly disabled className="w-full px-5 py-4 bg-slate-100 rounded-2xl border border-slate-100 text-slate-500 font-bold text-sm cursor-not-allowed focus:ring-0 focus:border-0 outline-none capitalize" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <select className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium text-sm appearance-none">
                                            <option value="">Select Visa Type</option>
                                            {data.visaTypes.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                                        </select>
                                        <input type="text" placeholder="Travel Dates" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium text-sm" />
                                    </div>
                                    <div>
                                        <textarea rows={3} placeholder="Additional Request / Notes" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all resize-none font-medium text-sm" />
                                    </div>
                                    <button type="button" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary/20 text-lg group">
                                        Get Expert Assistance <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center justify-center gap-2 text-slate-600 text-sm">
                                    <Lock className="w-4 h-4" />
                                    <span>Your data is 100% secure</span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                                <h4 className="text-2xl mb-6 relative z-10 text-white" >Direct Support</h4>
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
            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60] flex gap-3">
                <button onClick={() => scrollToSection('enquiry')} className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2">
                    Start Process
                </button>
                <button onClick={() => window.open('https://wa.me/918879008992')} className="w-14 h-14 bg-emerald-500 text-white rounded-2xl shadow-2xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                </button>
                <button onClick={() => navigator.share({ title: data.title, url: window.location.href })} className="w-14 h-14 bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-2xl flex items-center justify-center">
                    <Share2 className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

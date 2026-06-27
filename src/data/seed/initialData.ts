import { featuredDestinations } from '../featuredDestinations';
import { visaCountries, testimonials as visaTestimonials } from '../visaData';
import { cruisePackages } from '../cruiseData';
import { paymentConfig, headerConfig } from '../paymentConfig';
import { journeyBeyondBanner } from '../journeyBeyondBanner';
import { navStructure } from '../navConfig';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const seedPackages = [
  {
    slug: 'bali-bliss-temples',
    title: 'Bali Bliss & Temples',
    destination: 'Bali, Indonesia',
    country: 'Indonesia',
    duration: '7 Days',
    price: 1200,
    rating: 4.8,
    reviews_count: 124,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'],
    tags: ['Best Seller'],
    badge: 'Best Seller',
    category: 'International',
    continent: 'asia',
    style_tags: ['budget', 'nature', 'honeymoon'],
    status: 'published' as const,
    sort_order: 1,
  },
  {
    slug: 'swiss-alps-adventure',
    title: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    country: 'Switzerland',
    duration: '10 Days',
    price: 3400,
    rating: 4.9,
    reviews_count: 89,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800'],
    tags: ['Adventure'],
    badge: 'Luxury Pick',
    category: 'International',
    continent: 'europe',
    style_tags: ['adventure', 'luxury', 'nature'],
    status: 'published' as const,
    sort_order: 2,
  },
  {
    slug: 'maldives-honeymoon',
    title: 'Maldives Honeymoon Escape',
    destination: 'Maldives',
    country: 'Maldives',
    duration: '5 Days',
    price: 2800,
    rating: 5.0,
    reviews_count: 210,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    tags: ['Honeymoon'],
    badge: 'Honeymoon',
    category: 'Honeymoon',
    continent: 'asia',
    style_tags: ['honeymoon', 'luxury', 'nature'],
    status: 'published' as const,
    sort_order: 3,
  },
  {
    slug: 'dubai-city-tour',
    title: 'Dubai City Tour',
    destination: 'UAE',
    country: 'UAE',
    duration: '4 Days',
    price: 900,
    rating: 4.6,
    reviews_count: 340,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    badge: 'Trending',
    category: 'International',
    continent: 'middle-east',
    style_tags: ['budget', 'luxury', 'group'],
    status: 'published' as const,
    sort_order: 4,
  },
  {
    slug: 'golden-triangle',
    title: 'Golden Triangle Explorer',
    destination: 'India',
    country: 'India',
    duration: '8 Days',
    price: 1100,
    rating: 4.7,
    reviews_count: 156,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    tags: ['Culture'],
    badge: 'Family Pick',
    category: 'Domestic',
    continent: 'india',
    style_tags: ['culture', 'family'],
    status: 'published' as const,
    sort_order: 5,
  },
  {
    slug: 'santorini-escape',
    title: 'Santorini Sunset Escape',
    destination: 'Greece',
    country: 'Greece',
    duration: '6 Days',
    price: 2200,
    rating: 4.9,
    reviews_count: 98,
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
    badge: 'Romantic',
    category: 'International',
    continent: 'europe',
    style_tags: ['honeymoon', 'luxury'],
    status: 'published' as const,
    sort_order: 6,
  },
];

export const seedPackageDetail = {
  slug: 'bali-premium-escape',
  title: 'Bali 5 Nights / 6 Days – Premium Island Escape',
  subtitle: 'Luxury stays, curated experiences and seamless travel planning',
  destination: 'Bali, Indonesia',
  country: 'Indonesia',
  duration: '5N / 6D',
  travel_type: 'Couple / Friends / Family',
  best_time: 'April to October',
  visa_info: 'Visa Assistance Included',
  price: 1200,
  rating: 4.8,
  reviews_count: 124,
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
  images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000'],
  video_url: '/hero/2.mp4',
  overview: 'Experience the perfect blend of relaxation, adventure and culture in Bali.',
  highlights: ['Uluwatu Temple Sunset', 'Ubud Rice Terraces', 'Luxury Balinese Spa', 'Snorkeling in Nusa Penida', 'Private Beach Dinner'],
  itinerary: [
    { day: 1, title: 'Arrival in Denpasar & VIP Transfer', desc: 'Welcome to Bali!', attractions: ['VIP Fast Track', 'Welcome Drink'], images: [{ src: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=800', title: 'Private pool villa' }] },
    { day: 2, title: 'Uluwatu Temple & Sunset Culture', desc: 'Visit the iconic Uluwatu Temple.', attractions: ['Uluwatu Temple', 'Kecak Fire Dance'], images: [] },
    { day: 3, title: 'Cultural Heart of Ubud', desc: 'Explore Ubud and rice terraces.', attractions: ['Monkey Forest', 'Ubud Market'], images: [] },
  ],
  inclusions: ['5-Star Luxury Accommodation (5 Nights)', 'Daily Gourmet Breakfast', 'Private Airport Transfers', 'Visa Assistance'],
  exclusions: ['International Flights', 'Travel Insurance', 'Personal Expenses'],
  insights: {
    food: { text: 'Balinese cuisine is incredibly diverse.', gallery: [{ src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=900', title: 'Nasi Goreng' }] },
    nightlife: { text: 'Seminyak and Canggu offer world-class beach clubs.', gallery: [] },
    shopping: { text: 'From high-end boutiques to traditional crafts.', gallery: [] },
    tips: { text: 'Dress modestly when visiting temples.', gallery: [] },
    essentials: { text: 'Currency: Indonesian Rupiah (IDR).' },
  },
  category: 'International',
  continent: 'asia',
  style_tags: ['honeymoon', 'luxury'],
  status: 'published' as const,
  sort_order: 0,
};

export const seedFeaturedDestinations = featuredDestinations.map((d, i) => ({
  name: d.name,
  starts_from: d.startsFrom,
  media: d.media,
  dest_type: d.type,
  href: d.href,
  sort_order: i,
  status: 'published' as const,
}));

export const seedVisaCountries = visaCountries.map((v, i) => ({
  slug: v.slug,
  name: v.name,
  image: v.image,
  flag: v.flag,
  price: v.price,
  highlight_text: v.highlightText,
  visa_status: v.visaStatus,
  featured: v.featured,
  detail: {},
  sort_order: i,
  status: 'published' as const,
}));

export const seedCruises = cruisePackages.map((c, i) => ({
  slug: c.id,
  name: c.name,
  image: c.image,
  video_url: c.videoUrl,
  duration: c.duration,
  departure_location: c.departureLocation,
  starting_price: c.startingPrice,
  category: c.category,
  featured: c.featured,
  destination: c.destination,
  overview: c.overview,
  highlights: c.highlights,
  itinerary: c.itinerary,
  inclusions: c.inclusions,
  exclusions: c.exclusions,
  experience: c.experience,
  accommodation: c.accommodation ?? {},
  gallery: c.gallery,
  faqs: c.faqs,
  sort_order: i,
  status: 'published' as const,
}));

export const seedServices = [
  { slug: 'flight-booking', icon: 'Plane', title: 'Flight Booking', summary: 'Expert route planning with best fares across all major airlines worldwide.', value_statement: 'Best fares. Every route. Every airline.', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', badge: 'Most Booked', priority: true, detail: {}, sort_order: 0, status: 'published' as const },
  { slug: 'forex', icon: 'Banknote', title: 'Forex & Currency', summary: 'Secure, competitive currency exchange for all your travel destinations.', value_statement: 'Competitive rates. Instant exchange.', image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80', badge: 'Best Rates', priority: true, detail: {}, sort_order: 1, status: 'published' as const },
  { slug: 'travel-insurance', icon: 'Shield', title: 'Travel Insurance', summary: 'Comprehensive coverage for medical emergencies, trip cancellations, and lost baggage.', value_statement: 'Travel worry-free.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', badge: null, priority: true, detail: {}, sort_order: 2, status: 'published' as const },
  { slug: 'visa-assistance', icon: 'FileCheck', title: 'Visa Assistance', summary: 'End-to-end visa processing for 50+ countries.', value_statement: '99% success rate.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', badge: null, priority: false, detail: {}, sort_order: 3, status: 'published' as const },
  { slug: 'hotel-reservation', icon: 'Building2', title: 'Hotel Reservation', summary: 'Handpicked hotels and resorts worldwide.', value_statement: 'Best rates guaranteed.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', badge: null, priority: false, detail: {}, sort_order: 4, status: 'published' as const },
  { slug: 'cruise-booking', icon: 'Ship', title: 'Cruise Booking', summary: 'Luxury cruise packages across the globe.', value_statement: 'Sail in style.', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80', badge: null, priority: false, detail: {}, sort_order: 5, status: 'published' as const },
];

export const seedGuideArticles = [
  { slug: 'island-hopping-greece', title: 'The Ultimate Guide to Island Hopping in Greece', category: 'Destination Guides', excerpt: 'Discover the best Greek islands.', body: '<p>Explore Santorini, Mykonos, and Crete with our expert guide.</p>', cover_image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', author: 'Elena R.', published_at: '2023-10-15', sort_order: 0, status: 'published' as const },
  { slug: 'pack-european-tour', title: 'How to Pack for a Two-Week European Tour', category: 'Travel Tips', excerpt: 'Pack smart for Europe.', body: '<p>Essential packing tips for a two-week European adventure.</p>', cover_image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800', author: 'Mark T.', published_at: '2023-10-10', sort_order: 1, status: 'published' as const },
  { slug: 'schengen-visa-2024', title: 'Schengen Visa Updates: What You Need to Know in 2024', category: 'Visa Updates', excerpt: 'Latest Schengen visa rules.', body: '<p>Everything you need to know about Schengen visa updates.</p>', cover_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', author: 'Sarah J.', published_at: '2023-10-05', sort_order: 2, status: 'published' as const },
];

export const seedHeroSlides = [
  { title: 'INSPIRE', subtitle: 'Top Destinations for Hassle-Free Visa Processing', top_text: 'Welcome To', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&h=1080&q=80', video: null, sort_order: 0, status: 'published' as const },
  { title: 'WILDLIFE', subtitle: 'EXPLORE THE UNTAMED BEAUTY OF NATURE', top_text: 'Welcome To', image: null, video: '/hero/1.mp4', sort_order: 1, status: 'published' as const },
  { title: 'ROMANCE', subtitle: 'CURATED EXPERIENCES FOR COUPLES AND HONEYMOONERS', top_text: 'Welcome To', image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg', video: null, sort_order: 2, status: 'published' as const },
  { title: 'HERITAGE', subtitle: 'DISCOVER ANCIENT WONDERS AND RICH CULTURES', top_text: 'Welcome To', image: null, video: '/hero/2.mp4', sort_order: 3, status: 'published' as const },
  { title: 'BEACHES', subtitle: 'RELAX ON PRISTINE WHITE SANDS AND CRYSTAL WATERS', top_text: 'Welcome To', image: null, video: '/hero/3.mp4', sort_order: 4, status: 'published' as const },
  { title: 'ADVENTURE', subtitle: 'WATCH EPIC JOURNEYS COME ALIVE', top_text: 'Welcome To', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1920&h=1080&q=80', video: null, sort_order: 5, status: 'published' as const },
];

export const seedTestimonials = visaTestimonials.map((t, i) => ({
  name: t.name,
  role: t.role,
  text: t.text,
  rating: t.rating,
  avatar: t.avatar,
  testimonial_type: 'written' as const,
  sort_order: i,
  status: 'published' as const,
}));

export const seedFaq = [
  { name: 'Booking & Payment', questions: [
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and direct bank transfers.' },
    { q: 'Is my payment secure?', a: 'Yes, all our payments are processed securely through bank-grade encrypted payment gateways.' },
    { q: 'Can I pay in installments?', a: 'Yes, for packages booked at least 6 months in advance, we offer a 3-part flexible payment plan.' },
  ]},
  { name: 'Visas & Documentation', questions: [
    { q: 'Do you guarantee visa approval?', a: 'While we ensure your application is perfect, the final decision rests with the respective consulate.' },
    { q: 'How long does an E-Visa take?', a: 'E-Visa processing times vary by country but generally take between 2 to 5 working days.' },
  ]},
  { name: 'Travel & Accommodations', questions: [
    { q: 'Are flights included in the packages?', a: 'Our standard packages exclude international flights to give you flexibility.' },
    { q: 'Can I customize an existing package?', a: 'Absolutely. All our itineraries are fully customizable.' },
  ]},
];

export const seedGallery = [
  { title: 'International Group Departure', image: '/whychooseus/1.jpeg', category: 'trips', location: 'Dubai', year: '2025', sort_order: 0, status: 'published' as const },
  { title: 'Guest Celebration Moment', image: '/whychooseus/2.jpeg', category: 'customer-moments', location: 'Singapore', year: '2025', sort_order: 1, status: 'published' as const },
  { title: 'Industry Recognition Event', image: '/whychooseus/3.jpeg', category: 'recognitions', location: 'Chennai', year: '2024', sort_order: 2, status: 'published' as const },
  { title: 'Annual Team Celebration', image: '/whychooseus/4.jpeg', category: 'celebrations', location: 'Chennai', year: '2025', sort_order: 3, status: 'published' as const },
  { title: 'Founder Felicitation', image: '/founder.png', category: 'recognitions', location: 'India', year: '2026', sort_order: 4, status: 'published' as const },
  { title: 'Company Activity Day', image: '/whychooseus/5.jpeg', category: 'activities', location: 'Office', year: '2025', sort_order: 5, status: 'published' as const },
];

export const seedMediaVideos = [
  { title: 'Airland Holidays Overview', youtube_id: 'dQw4w9WgXcQ', embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', sort_order: 0, status: 'published' as const },
  { title: 'Customer Testimonials', youtube_id: 'dQw4w9WgXcQ', embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', sort_order: 1, status: 'published' as const },
];

export const seedMediaEvents = [
  { title: 'TAFI Recognition Award', image: '/whychooseus/3.jpeg', category: 'Awards', date: '2024', description: 'Industry recognition for excellence in travel services.', sort_order: 0, status: 'published' as const },
  { title: 'Founder Felicitation', image: '/founder.png', category: 'Recognition', date: '2026', description: 'Mr. C.K. Raja honored for leadership in travel industry.', sort_order: 1, status: 'published' as const },
];

export const seedDestinations = [
  { slug: 'indonesia', name: 'Indonesia', region: 'Southeast Asia', continent: 'asia', hero_image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000', overview: 'Discover the magic of Indonesia — from Bali beaches to ancient temples.', highlights: ['Bali', 'Jakarta', 'Komodo Island'], detail: {}, linked_package_slugs: ['bali-bliss-temples', 'bali-premium-escape'], sort_order: 0, status: 'published' as const },
];

export const seedContinents = [
  { slug: 'europe', name: 'Europe', description: 'Explore the rich history, culture, and landscapes of Europe.', featured_image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2000', countries: ['Switzerland', 'France', 'Italy', 'Greece', 'UK'], detail: {}, sort_order: 0, status: 'published' as const },
];

export const seedSiteSettings = {
  payment_config: paymentConfig,
  header_config: headerConfig,
  contact_info: {
    address: '123 Premium Travel Boulevard, Mumbai, Maharashtra 400001',
    phones: ['+91-9090403075'],
    emails: ['hello@airlandholidays.com', 'support@airlandholidays.com'],
    whatsapp: '919090403075',
    office_hours: 'Mon - Fri: 9:00 AM - 8:00 PM',
  },
};

export const seedJourneyBanner = journeyBeyondBanner;
export const seedNavStructure = navStructure;

export { slugify };

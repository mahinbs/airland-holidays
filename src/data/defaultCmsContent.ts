import type { AboutPageContent, FooterConfig, HomepageConfig, InstagramReelsConfig, PaymentPageConfig, ServicesPageConfig } from '../types/cms';
import { paymentConfig, headerConfig } from './paymentConfig';

export const defaultFooterConfig: FooterConfig = {
  tagline: 'Crafting premium, unforgettable travel experiences across the globe. Your journey begins with exceptional planning.',
  corporateAddress: '123 Premium Travel Boulevard, Mumbai, Maharashtra 400001',
  registeredAddress: 'Airland Holidays Private Limited, Registered Office, Mumbai, Maharashtra 400001',
  email: 'hello@airlandholidays.com',
  phone: '+91-9090403075',
  mobile: '+91-9090403075',
  whatsapp: headerConfig.whatsapp,
  businessHours: {
    weekdays: 'Mon – Fri: 9:30 AM – 7:00 PM',
    weekend: 'Sat: 10:00 AM – 5:00 PM',
    holidays: 'Sun & Public Holidays: Closed',
  },
  socials: [
    { platform: 'Instagram', href: 'https://instagram.com/airlandholidays', enabled: true },
    { platform: 'Facebook', href: 'https://facebook.com/airlandholidays', enabled: true },
    { platform: 'Youtube', href: 'https://youtube.com/@airlandholidays', enabled: true },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/airlandholidays', enabled: true },
    { platform: 'X', href: 'https://x.com/airlandholidays', enabled: false },
    { platform: 'Pinterest', href: 'https://pinterest.com/airlandholidays', enabled: false },
  ],
  quickLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy', enabled: true },
    { label: 'Terms of Service', href: '/terms-of-service', enabled: true },
    { label: 'Sitemap', href: '/sitemap', enabled: true },
  ],
  seoContent: '<p>Airland Holidays is an IATA-certified travel agency offering customised tour packages, visa services, flights, hotels, cruises and corporate travel solutions worldwide.</p>',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.716780654789!2d72.8776559!3d19.076090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da8edae78ad58a!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000',
};

export const defaultPaymentPageConfig: PaymentPageConfig = {
  pageTitle: 'Pay us at',
  pageDescription: 'Secure payment options for Airland Holidays services',
  bankTransfer: paymentConfig.bankTransfer,
  upi: paymentConfig.upi,
  razorpay: paymentConfig.razorpay,
  importantNotes: paymentConfig.importantNotes,
  shortHaulPolicy: paymentConfig.shortHaulPolicy,
  longHaulPolicy: paymentConfig.longHaulPolicy,
  services: paymentConfig.services,
  formFields: {
    allowedFileTypes: 'jpg, jpeg, png, pdf',
    maxUploadSizeMb: 5,
    requireScreenshot: false,
    paymentTypes: ['Bank Transfer', 'UPI', 'Razorpay', 'Other'],
    submitLabel: 'Submit Payment Details',
    successTitle: 'Payment Details Received!',
    successMessage: 'Our team will verify your payment within 2 business hours and send confirmation to your contact details.',
  },
};

export const defaultServicesPageConfig: ServicesPageConfig = {
  hero: {
    heading: 'Complete Travel Solutions Worldwide',
    subtext: 'From flights to luxury experiences, we deliver personalised travel services backed by global partnerships and expert guidance.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2000&q=80',
    videoUrl: null,
    primaryCta: { label: 'Explore Services', href: '#services' },
    secondaryCta: { label: 'Plan Your Trip', href: '/contact' },
  },
  trustStats: [
    { icon: 'Award', value: 'IATA', label: 'Certified Agency', numeric: false },
    { icon: 'Clock', value: '20+', label: 'Years of Experience', numeric: true, target: 20 },
    { icon: 'Users', value: '20,000+', label: 'Happy Customers', numeric: true, target: 20000 },
    { icon: 'Globe', value: '100+', label: 'Countries Covered', numeric: true, target: 100 },
    { icon: 'Handshake', value: 'Global', label: 'Airline & Hotel Partnerships', numeric: false },
  ],
  promoBanners: [],
  partnerLogos: [],
};

export const defaultHomepageConfig: HomepageConfig = {
  whyUs: {
    badge: 'Why Choose Airland',
    headline: "We Don't Just Plan Travel. We Take Responsibility For Your Journey.",
    brandStory: 'Since 2005, Airland Tours & Holidays has been delivering thoughtfully curated travel experiences with a strong focus on trust, quality, and personal care.',
    brandStorySub: 'Every itinerary is a commitment to comfort, safety, and memorable experiences.',
    emotionalLine: "We don't just plan trips. We take complete responsibility to make every journey smooth, comfortable, and memorable.",
    ctas: [
      { label: 'Start Planning Your Journey', href: '/contact', primary: true },
      { label: 'Explore Our Story', href: '/about', primary: false },
    ],
    trustPoints: [
      { icon: 'Clock', text: '21+ Years of proven expertise' },
      { icon: 'Users', text: '20,000+ happy travellers worldwide' },
      { icon: 'Award', text: 'IATA accredited travel company' },
      { icon: 'Globe', text: 'Strong global network and tourism board connections' },
      { icon: 'Handshake', text: 'Direct partnerships with airlines, hotels, and local experts' },
      { icon: 'Heart', text: 'Personalised travel with dedicated support' },
    ],
  },
  founder: {
    name: 'Mr. C.K. Raja',
    designation: 'Founder & CEO – Airland Group of Companies',
    image: '/founder.png',
    description: 'A visionary leader with over three decades of experience in the travel industry.',
    quote: 'To build Airland into a globally trusted travel company that serves millions of travellers with exceptional quality, care, and unforgettable experiences.',
    achievements: ['Chairman – TAFI Tamil Nadu Chapter', '20,000+ travellers served'],
    roles: [
      'Chairman – Travel Agents Federation of India (TAFI), Tamil Nadu Chapter',
      'Active member of national and international travel bodies',
    ],
    impactStatement: 'Strong relationships with tourism boards, global partners, and industry bodies contribute to higher credibility and global access.',
  },
  founderMilestones: [
    { id: '1', image: '/founder.png', title: 'Leadership Office Session', eventName: 'Leadership Office Session', location: 'Chennai', year: '2026', description: '', sortOrder: 0, active: true },
    { id: '2', image: '/whychooseus/5.jpeg', title: 'Industry Leadership Moment', eventName: 'Industry Leadership Moment', location: 'Tamil Nadu', year: '2025', description: '', sortOrder: 1, active: true },
  ],
  industryAuthority: [
    { id: '1', image: '/whychooseus/1.jpeg', title: 'The Hindu Coverage', eventName: 'The Hindu Coverage', location: 'India', year: '2024', description: '3.75 Lakh Indians Visited Sri Lanka', sortOrder: 0, active: true },
    { id: '2', image: '/whychooseus/2.jpeg', title: 'Tourism Board Event', eventName: 'Tourism Board Event', location: 'Chennai', year: '2024', description: '', sortOrder: 1, active: true },
  ],
  visaHighlight: {
    title: 'Get Your Visa Approved with Confidence',
    subtitle: 'Expert handling of complex visa applications for USA, UK, Canada, Schengen and Australia with 99%+ success rate. Fast, reliable and stress-free process.',
    primaryCta: 'Start Your Visa Process Now',
    secondaryCta: 'Talk to Expert on WhatsApp',
    whatsappHref: 'https://wa.me/919090403075',
    microCopy: 'Join thousands of successful travellers who trusted us for their visa approval.',
    trustPoints: [
      { icon: 'Award', title: '99%+ Success Rate', subtitle: 'Proven visa approval outcomes' },
      { icon: 'Clock', title: 'Fast Processing', subtitle: '72-hour express support available' },
      { icon: 'Users', title: 'Expert Visa Consultants', subtitle: 'Handled by senior specialists' },
      { icon: 'ShieldCheck', title: 'Secure & Verified Process', subtitle: 'Safe documentation and tracking' },
    ],
  },
  contactBlock: {
    sectionTitle: 'Contact Us',
    heading: 'Reach Us Anytime!',
    description: 'We specialize in crafting memorable journeys with the perfect blend of comfort, adventure, and relaxation.',
    badgeLabel: 'Best Travel Agency',
    ctaLabel: 'Get in Touch',
    ctaHref: '/contact',
  },
};

export const defaultAboutContent: AboutPageContent = {
  hero: {
    heading: 'Building a Global Travel Brand With Trust, Experience and Vision',
    subtext: 'Since 2005, Airland Holidays has been committed to delivering world-class travel experiences with precision, care and consistency.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000&q=80',
  },
  story: {
    sectionLabel: 'Our Story',
    title: 'A Journey Built on Trust',
    paragraphs: [
      'Airland Holidays was founded with a clear purpose — to create meaningful travel experiences backed by trust and expertise.',
      'Over the years, we have grown into a trusted travel partner for thousands of travellers.',
    ],
    milestones: [
      { year: '2005', title: 'Airland Founded', desc: 'Started with a vision to create meaningful, personalised travel experiences.' },
      { year: '2010', title: 'IATA Accreditation', desc: 'Earned IATA accreditation, establishing global credibility.' },
      { year: '2024', title: '20,000+ Travellers Served', desc: 'Trusted by over twenty thousand travellers.' },
    ],
  },
  founder: {
    sectionLabel: 'Leadership That Builds Trust',
    name: 'Mr. C.K. Raja',
    title: 'Founder & CEO, Airland Group of Companies',
    about: 'A visionary leader with over three decades of experience in the travel industry.',
    leadershipTitle: 'Leadership & Industry Influence',
    leadershipPoints: ['Chairman – TAFI Tamil Nadu Chapter', 'Active member of national and international travel industry bodies'],
    networkTitle: 'Strategic Strength & Global Network',
    networkDesc: 'Through strong engagement with Tourism Boards and Global Travel Networks.',
    vision: '"To build Airland into a globally trusted travel company."',
    portraitSrc: '/whychooseus/5.jpeg',
    supportingImages: [
      { src: '/whychooseus/2.jpeg', alt: 'Industry event', aspect: 'landscape' },
      { src: '/whychooseus/3.jpeg', alt: 'National Day event', aspect: 'landscape' },
    ],
  },
  credentials: {
    sectionLabel: 'Authority',
    title: 'Recognised. Connected. Trusted.',
    items: [
      { icon: 'Award', text: 'IATA Accredited Travel Company' },
      { icon: 'Crown', text: 'Chairman – TAFI Tamil Nadu' },
      { icon: 'Globe', text: 'Strong partnerships with International Tourism Boards' },
    ],
  },
  globalNetwork: {
    sectionLabel: 'Our Network',
    title: 'Strong Global Partnerships for Seamless Travel',
    intro: 'We collaborate with world-class partners to ensure every journey is smooth, safe, and well-coordinated.',
    partners: [
      { icon: 'Plane', label: 'Leading Airlines' },
      { icon: 'Building2', label: 'Premium Hotels & Resorts' },
    ],
    valueStatement: 'This ensures every journey is smooth, safe, and well-coordinated.',
  },
  promise: {
    sectionLabel: 'Our Promise',
    title: 'We Take Complete Responsibility',
    text: 'We take complete responsibility for your travel experience — from planning to execution.',
    points: ['End-to-end travel management', 'Personalised itinerary for every traveller', 'Dedicated support from booking to return'],
  },
  team: {
    sectionLabel: 'Our Team',
    title: 'Decades of Experience. Real Destination Knowledge.',
    desc: 'Our team brings decades of experience and genuine destination knowledge.',
    members: [
      { role: 'Travel Advisors', desc: 'Expert consultants with first-hand destination knowledge.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80' },
    ],
  },
  recognition: [],
  brandStatement: { line1: 'We are not just a travel company.', line2: 'We are your trusted partner in creating unforgettable life experiences.' },
  cta: {
    primary: { label: 'Plan Your Journey With Experts', href: '/contact' },
    secondary: { label: 'Connect With Our Team', href: '/contact' },
  },
};

export const defaultInstagramReelsConfig: InstagramReelsConfig = {
  title: 'Instagram Reels & Travel Highlights',
  subtitle: 'Explore our latest travel moments and customer travel clips.',
  ctaLabel: 'Follow us on Instagram',
  ctaHref: 'https://instagram.com/airlandholidays',
  reels: [],
};

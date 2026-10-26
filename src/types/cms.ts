/** CMS site-setting shapes — stored in site_settings / singleton tables */

export type FooterConfig = {
  tagline: string;
  corporateAddress: string;
  registeredAddress: string;
  email: string;
  phone: string;
  mobile: string;
  whatsapp: string;
  businessHours: {
    weekdays: string;
    weekend: string;
    holidays: string;
  };
  socials: { platform: string; href: string; enabled: boolean }[];
  quickLinks: { label: string; href: string; enabled: boolean }[];
  seoContent: string;
  mapEmbedUrl: string;
};

export type ServicesPageConfig = {
  hero: {
    heading: string;
    subtext: string;
    image: string;
    videoUrl: string | null;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  trustStats: {
    icon: string;
    value: string;
    label: string;
    numeric: boolean;
    target?: number;
    enabled?: boolean;
  }[];
  promoBanners: {
    title: string;
    description: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
    enabled: boolean;
    /** Promotion type shown as the badge — Airline / Resort / Hotel / Insurance */
    category?: 'airline' | 'resort' | 'hotel' | 'insurance';
  }[];
  partnerLogos: {
    name: string;
    image: string;
    category: 'airline' | 'hotel' | 'resort' | 'insurance';
    enabled: boolean;
  }[];
};

export type FounderProfile = {
  name: string;
  designation: string;
  image: string;
  description: string;
  quote: string;
  achievements: string[];
  roles: string[];
  impactStatement: string;
};

export type MilestoneItem = {
  id: string;
  image: string;
  title: string;
  eventName: string;
  location: string;
  year: string;
  description: string;
  sortOrder: number;
  active: boolean;
};

export type HomepageConfig = {
  whyUs: {
    badge: string;
    headline: string;
    brandStory: string;
    brandStorySub: string;
    emotionalLine: string;
    ctas: { label: string; href: string; primary: boolean }[];
    trustPoints: { icon: string; text: string }[];
  };
  founder: FounderProfile;
  founderMilestones: MilestoneItem[];
  industryAuthority: MilestoneItem[];
  visaHighlight: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappHref: string;
    microCopy: string;
    trustPoints: { icon: string; title: string; subtitle: string }[];
  };
  contactBlock: {
    sectionTitle: string;
    heading: string;
    description: string;
    badgeLabel: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export type AboutPageContent = {
  hero: { heading: string; subtext: string; image: string };
  story: {
    sectionLabel: string;
    title: string;
    paragraphs: string[];
    milestones: { year: string; title: string; desc: string }[];
  };
  founder: {
    sectionLabel: string;
    name: string;
    title: string;
    about: string;
    leadershipTitle: string;
    leadershipPoints: string[];
    networkTitle: string;
    networkDesc: string;
    vision: string;
    portraitSrc: string;
    supportingImages: { src: string; alt: string; aspect: string }[];
    /** Display Status — false hides the Founder & CEO section on the About page */
    active?: boolean;
  };
  credentials: {
    sectionLabel: string;
    title: string;
    items: { icon: string; text: string }[];
  };
  globalNetwork: {
    sectionLabel: string;
    title: string;
    intro: string;
    partners: { icon: string; label: string }[];
    valueStatement: string;
  };
  promise: {
    sectionLabel: string;
    title: string;
    text: string;
    points: string[];
  };
  team: {
    sectionLabel: string;
    title: string;
    desc: string;
    members: { role: string; desc: string; image: string; active?: boolean }[];
  };
  recognition: MilestoneItem[];
  brandStatement: { line1: string; line2: string };
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export type PaymentPageConfig = {
  pageTitle: string;
  pageDescription: string;
  bankTransfer: {
    accountNumber: string;
    accountName: string;
    ifscCode: string;
    bankName?: string;
    branch?: string;
  };
  upi: {
    id: string;
    name: string;
    qrImage: string;
    note: string;
  };
  razorpay: {
    link: string;
    note: string;
  };
  importantNotes: string[];
  shortHaulPolicy: {
    label: string;
    description: string;
    rows: { days: string; amount: string }[];
    notes: string[];
  };
  longHaulPolicy: {
    label: string;
    description: string;
    rows: { days: string; amount: string }[];
    notes: string[];
  };
  services: string[];
  formFields: {
    allowedFileTypes: string;
    maxUploadSizeMb: number;
    /** Form configuration */
    requireScreenshot?: boolean;
    paymentTypes?: string[];
    submitLabel?: string;
    successTitle?: string;
    successMessage?: string;
  };
};

export type InstagramReelItem = {
  id: string;
  /** Thumbnail / poster image */
  image: string;
  /** Optional uploaded or hosted video (mp4) that plays inline */
  video?: string;
  /** Instagram reel / post link */
  href: string;
  caption: string;
  enabled: boolean;
};

export type InstagramReelsConfig = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  reels: InstagramReelItem[];
};

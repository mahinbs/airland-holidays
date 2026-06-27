import type { PackageRow as DbPackage, ServiceRow, DestinationRow, ContinentRow, VisaCountryRow } from '../types/database';

export type ServiceCardItem = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  valueStatement: string;
  href: string;
  image: string;
  badge: string;
  priority: boolean;
};

export type ServiceDetailView = {
  title: string;
  badge?: string;
  heroImage: string;
  heroDesc: string;
  overview: string;
  features: { title: string; desc: string }[];
  brandsTitle?: string;
  brands?: string[];
  faqs: { q: string; a: string }[];
};

const defaultFeatures = [
  { title: 'Expert Guidance', desc: 'Professional support from industry specialists.' },
  { title: 'Seamless Process', desc: 'Hassle-free execution with complete transparency.' },
  { title: '24/7 Support', desc: 'We are always here when you need us, anywhere in the world.' },
  { title: 'Value for Money', desc: 'Competitive pricing without compromising on service quality.' },
];

const defaultFaqs = [
  { q: 'How do I get started?', a: 'Fill out the enquiry form on this page and our team will contact you shortly.' },
  { q: 'What is the processing time?', a: 'Processing times vary depending on the service, but we always strive for expedited delivery.' },
];

function normalizeFaqs(raw: unknown): { q: string; a: string }[] | undefined {
  if (!Array.isArray(raw) || raw.length === 0) return undefined;
  return raw.map((f: { q?: string; a?: string; question?: string; answer?: string }) => ({
    q: f.q ?? f.question ?? '',
    a: f.a ?? f.answer ?? '',
  }));
}

export function mapServiceToCard(row: ServiceRow): ServiceCardItem {
  return {
    id: row.slug,
    icon: row.icon ?? 'Briefcase',
    title: row.title,
    desc: row.summary ?? '',
    valueStatement: row.value_statement ?? '',
    href: `/services/${row.slug}`,
    image: row.image ?? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    badge: row.badge ?? 'Service',
    priority: Boolean(row.priority),
  };
}

export function mapServiceToDetail(row: ServiceRow): ServiceDetailView {
  const detail =
    row.detail && typeof row.detail === 'object' && !Array.isArray(row.detail)
      ? (row.detail as Record<string, unknown>)
      : {};

  return {
    title: row.title,
    badge: row.badge ?? undefined,
    heroImage:
      row.image ??
      (detail.heroImage as string) ??
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000',
    heroDesc: row.summary ?? (detail.heroDesc as string) ?? '',
    overview: (detail.overview as string) ?? row.summary ?? '',
    features: (detail.features as ServiceDetailView['features']) ?? defaultFeatures,
    brandsTitle: detail.brandsTitle as string | undefined,
    brands: detail.brands as string[] | undefined,
    faqs: normalizeFaqs(detail.faqs) ?? defaultFaqs,
  };
}

/** Map Supabase package row to Packages page list shape */
export function mapPackageToListRow(p: DbPackage, index: number) {
  return {
    id: index + 1,
    slug: p.slug,
    title: p.title,
    destination: p.destination,
    country: p.country ?? p.destination,
    duration: p.duration ?? '',
    price: Number(p.price),
    rating: Number(p.rating ?? 0),
    reviews: Number(p.reviews_count ?? 0),
    image: p.image ?? '',
    images: (p.images as string[]) ?? [],
    tags: (p.tags as string[]) ?? [],
    badge: p.badge ?? undefined,
    category: p.category ?? 'International',
    continent: p.continent ?? '',
    styleTags: (p.style_tags as string[]) ?? [],
  };
}

/** Map Supabase package row to PackageDetail page shape */
export function mapPackageToDetail(p: DbPackage) {
  return {
    title: p.title,
    subtitle: p.subtitle ?? '',
    destination: p.destination,
    duration: p.duration ?? '',
    travelType: p.travel_type ?? '',
    bestTime: p.best_time ?? '',
    visaInfo: p.visa_info ?? '',
    price: Number(p.price),
    rating: Number(p.rating ?? 0),
    reviews: Number(p.reviews_count ?? 0),
    images: (p.images as string[])?.length ? (p.images as string[]) : p.image ? [p.image] : [],
    videoUrl: p.video_url ?? '',
    overview: p.overview ?? '',
    highlights: (p.highlights as string[]) ?? [],
    itinerary: (p.itinerary as unknown[]) ?? [],
    inclusions: (p.inclusions as string[]) ?? [],
    exclusions: (p.exclusions as string[]) ?? [],
    insights: p.insights ?? {},
  };
}

const defaultPackageFaqs = [
  { question: 'How do I book this package?', answer: 'Submit an enquiry and our travel experts will assist you with availability and customization.' },
  { question: 'Can the itinerary be customized?', answer: 'Yes. We tailor every package to your preferences, budget, and travel dates.' },
];

function normalizePackageFaqs(raw: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultPackageFaqs;
  return raw.map((f: { q?: string; a?: string; question?: string; answer?: string }) => ({
    question: f.question ?? f.q ?? '',
    answer: f.answer ?? f.a ?? '',
  }));
}

function resolveRelatedPackages(slugs: string[], allPackages: DbPackage[]) {
  return slugs
    .map((slug, i) => {
      const p = allPackages.find((pkg) => pkg.slug === slug);
      if (!p) return null;
      return {
        id: i + 1,
        title: p.title,
        duration: p.duration ?? '',
        price: Number(p.price),
        images: (p.images as string[])?.length ? (p.images as string[]) : p.image ? [p.image] : [],
        slug: p.slug,
      };
    })
    .filter(Boolean);
}

/** Full package detail view — CMS fields plus optional page extras stored in insights JSON */
export function buildPackageDetailView(p: DbPackage, allPackages: DbPackage[] = []) {
  const mapped = mapPackageToDetail(p);
  const raw =
    p.insights && typeof p.insights === 'object' && !Array.isArray(p.insights)
      ? (p.insights as Record<string, unknown>)
      : {};

  const { faqs, accommodation, socialGallery, socialGalleryUrls, related, relatedSlugs, ...destinationInsights } = raw;

  let resolvedSocial = (socialGallery as { type: string; src: string; user: string; text: string }[]) ?? [];
  const galleryUrls = (socialGalleryUrls as string[]) ?? [];
  if (!resolvedSocial.length && galleryUrls.length) {
    resolvedSocial = galleryUrls.filter(Boolean).map((src) => ({ type: 'image', src, user: 'Guest', text: '' }));
  }

  const slugs = (relatedSlugs as string[]) ?? [];
  let resolvedRelated = (related as { id: number; title: string; duration: string; price: number; images: string[] }[]) ?? [];
  if (!resolvedRelated.length && slugs.length && allPackages.length) {
    resolvedRelated = resolveRelatedPackages(slugs, allPackages) as typeof resolvedRelated;
  }

  const acc = accommodation as { title?: string; desc?: string; options?: unknown[] } | undefined;

  return {
    ...mapped,
    insights: destinationInsights,
    faqs: normalizePackageFaqs(faqs),
    accommodation: {
      title: acc?.title ?? 'Accommodation',
      desc: acc?.desc ?? '',
      options: (acc?.options as { name: string; desc: string; image: string }[]) ?? [],
    },
    socialGallery: resolvedSocial,
    related: resolvedRelated,
  };
}

export type DestinationCardItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  region?: string;
  continent?: string;
};

export function mapDestinationToCard(row: DestinationRow): DestinationCardItem {
  return {
    id: row.slug,
    name: row.name,
    image:
      row.hero_image ??
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    description: row.overview ?? '',
    region: row.region ?? undefined,
    continent: row.continent ?? undefined,
  };
}

export type ContinentCardItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  tours: number;
  tag?: string;
};

export function mapContinentToCard(row: ContinentRow, packageCount = 0): ContinentCardItem {
  const detail =
    row.detail && typeof row.detail === 'object' && !Array.isArray(row.detail)
      ? (row.detail as Record<string, unknown>)
      : {};
  return {
    id: row.slug,
    name: row.name,
    image:
      row.featured_image ??
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=600',
    description: row.description ?? '',
    tours: packageCount || (detail.tours as number) || 0,
    tag: detail.tag as string | undefined,
  };
}

/** Merge CMS destination row with static page template and linked packages */
export function mergeDestinationPageData<T extends Record<string, unknown>>(
  cmsRow: DestinationRow | null | undefined,
  slug: string,
  staticTemplate: T,
  allPackages: DbPackage[]
): T {
  if (!cmsRow) {
    if (staticTemplate.slug === slug) return staticTemplate;
    return {
      ...staticTemplate,
      slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const detail =
    cmsRow.detail && typeof cmsRow.detail === 'object' && !Array.isArray(cmsRow.detail)
      ? (cmsRow.detail as Record<string, unknown>)
      : {};

  const linkedSlugs = Array.isArray(cmsRow.linked_package_slugs)
    ? (cmsRow.linked_package_slugs as string[])
    : [];
  let linkedPackages = linkedSlugs.length
    ? allPackages.filter((p) => linkedSlugs.includes(p.slug))
    : allPackages.filter(
        (p) =>
          (p.country ?? '').toLowerCase().includes(cmsRow.name.toLowerCase()) ||
          p.destination.toLowerCase().includes(cmsRow.name.toLowerCase())
      );

  if (!linkedPackages.length && staticTemplate.slug === slug) {
    linkedPackages = [];
  }

  const cmsPackages =
    linkedPackages.length > 0
      ? linkedPackages.map((p, i) => ({
          id: i + 1,
          title: p.title,
          destination: p.destination,
          duration: p.duration ?? '',
          price: Number(p.price),
          rating: Number(p.rating ?? 0),
          reviews: Number(p.reviews_count ?? 0),
          image: p.image ?? '',
          images: (p.images as string[]) ?? (p.image ? [p.image] : []),
          tags: (p.tags as string[]) ?? [],
          category: p.category ?? 'International',
          slug: p.slug,
        }))
      : undefined;

  const base =
    staticTemplate.slug === slug
      ? staticTemplate
      : {
          ...staticTemplate,
          slug: cmsRow.slug,
          name: cmsRow.name,
          packages: [],
          attractions: [],
          instagramSpots: [],
          visualExperiences: [],
          audienceSuggestions: [],
          whyIndians: [],
          bestTime: [],
          airports: [],
        };

  return {
    ...base,
    ...detail,
    name: cmsRow.name,
    slug: cmsRow.slug,
    heroImage: cmsRow.hero_image ?? base.heroImage,
    description: cmsRow.overview ?? base.description,
    about: detail.about ?? cmsRow.overview ?? base.about ?? base.description,
    overview: {
      ...(base.overview as Record<string, unknown>),
      ...(detail.overview as Record<string, unknown> | undefined),
      continent: cmsRow.continent ?? cmsRow.region ?? (base.overview as Record<string, unknown>)?.continent,
    },
    gallery: detail.gallery ?? base.gallery,
    statistics: detail.statistics ?? base.statistics,
    attractions: detail.attractions ?? base.attractions,
    airports: detail.airports ?? base.airports,
    ...(cmsPackages ? { packages: cmsPackages } : {}),
  } as T;
}

/** Merge CMS continent row with static page template */
export function mergeContinentPageData<T extends Record<string, unknown>>(
  cmsRow: ContinentRow | null | undefined,
  slug: string,
  staticTemplate: T,
  allPackages: DbPackage[] = []
): T {
  if (!cmsRow) {
    if (staticTemplate.slug === slug) return staticTemplate;
    return {
      ...staticTemplate,
      slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }

  const detail =
    cmsRow.detail && typeof cmsRow.detail === 'object' && !Array.isArray(cmsRow.detail)
      ? (cmsRow.detail as Record<string, unknown>)
      : {};

  const countries = Array.isArray(cmsRow.countries) ? (cmsRow.countries as string[]) : undefined;
  const base = staticTemplate.slug === slug ? staticTemplate : { ...staticTemplate, slug, name: cmsRow.name };

  const trendingSlugs = detail.trendingSlugs as string[] | undefined;
  let trendingPackages = detail.trendingPackages ?? base.trendingPackages;
  if (trendingSlugs?.length && allPackages.length) {
    trendingPackages = resolveRelatedPackages(trendingSlugs, allPackages);
  }

  const seo = (detail.seo ?? {}) as { title?: string; description?: string };
  const seoTitle = seo.title ?? (detail.seoTitle as string | undefined);
  const seoDescription = seo.description ?? (detail.seoDescription as string | undefined);
  let seoText = detail.seoText ?? base.seoText;
  if ((seoTitle || seoDescription) && !detail.seoText) {
    seoText = [seoTitle, seoDescription].filter(Boolean);
  }

  return {
    ...base,
    ...detail,
    name: cmsRow.name,
    slug: cmsRow.slug,
    heroImage: cmsRow.featured_image ?? base.heroImage,
    overview: detail.overview ?? base.overview,
    ...(countries?.length ? { highlights: countries } : {}),
    seoText,
    topDestinations: detail.topDestinations ?? base.topDestinations,
    trendingPackages,
    allPackages: detail.allPackages ?? base.allPackages,
    visualExperiences: detail.visualExperiences ?? base.visualExperiences,
    statistics: detail.statistics ?? base.statistics,
    insights: detail.insights ?? base.insights,
    highlights: detail.highlights ?? base.highlights,
  } as T;
}

export function mapCruiseToDetail(c: Record<string, unknown>) {
  const detail =
    c.detail && typeof c.detail === 'object' && !Array.isArray(c.detail)
      ? (c.detail as Record<string, unknown>)
      : {};

  const rawFaqs = (c.faqs ?? detail.faqs) as unknown;
  const faqs = normalizeFaqs(rawFaqs)?.map((f) => ({ question: f.q, answer: f.a })) ?? [];

  const galleryRaw = c.gallery ?? detail.gallery;
  let gallery: string[] = [];
  if (Array.isArray(galleryRaw)) {
    gallery = galleryRaw.map((g) => (typeof g === 'string' ? g : (g as { src?: string })?.src ?? '')).filter(Boolean);
  }

  return {
    id: c.slug as string,
    name: c.name as string,
    image: c.image as string,
    videoUrl: c.video_url as string | undefined,
    duration: c.duration as string,
    departureLocation: c.departure_location as string,
    startingPrice: Number(c.starting_price),
    category: c.category as string,
    featured: c.featured as boolean,
    destination: c.destination as string,
    overview: c.overview as string,
    highlights: (c.highlights as string[]) ?? [],
    itinerary: (c.itinerary as unknown[]) ?? [],
    inclusions: (c.inclusions as string[]) ?? [],
    exclusions: (c.exclusions as string[]) ?? [],
    experience: (c.experience as unknown[]) ?? detail.experience ?? [],
    accommodation: c.accommodation ?? detail.accommodation,
    gallery,
    faqs,
    relatedSlugs: (detail.relatedSlugs as string[]) ?? [],
  };
}

export function mapGuideToArticle(a: Record<string, unknown>) {
  const rawBody = String(a.body ?? '');
  const body = rawBody.replace(/<!--CMS-META:[\s\S]*?-->/, '').trim();
  return {
    id: a.slug as string,
    title: a.title as string,
    category: a.category as string,
    img: a.cover_image as string,
    date: a.published_at ? new Date(a.published_at as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
    author: a.author as string,
    excerpt: a.excerpt as string,
    body,
  };
}

export function mapHeroSlide(
  s: { id?: string; title: string; subtitle?: string | null; top_text?: string | null; image?: string | null; video?: string | null; sort_order?: number | null },
  index = 0
) {
  return {
    id: index,
    title: s.title,
    subtitle: s.subtitle ?? '',
    topText: s.top_text ?? 'Welcome To',
    image: s.image ?? undefined,
    video: s.video ?? undefined,
  };
}

export type TestimonialCardItem = {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  type: 'written' | 'video';
  videoUrl?: string;
};

export function mapTestimonialToCard(t: {
  id: string;
  name: string;
  role?: string | null;
  text?: string | null;
  rating?: number | null;
  avatar?: string | null;
  video_url?: string | null;
  testimonial_type?: 'written' | 'video' | null;
}): TestimonialCardItem {
  const type = t.testimonial_type === 'video' ? 'video' : 'written';
  return {
    id: t.id,
    name: t.name,
    location: t.role ?? '',
    text: t.text ?? '',
    rating: Number(t.rating ?? 5),
    avatar:
      t.avatar ??
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    type,
    videoUrl: t.video_url ?? undefined,
  };
}

export function mapGalleryItem(g: {
  id: string;
  title: string;
  image: string;
  category: string;
  location?: string | null;
  year?: string | null;
}) {
  return {
    id: g.id,
    title: g.title,
    image: g.image,
    category: g.category,
    location: g.location ?? '',
    year: g.year ?? '',
  };
}

function extractYoutubeId(youtubeId?: string | null, embedUrl?: string | null): string {
  if (youtubeId?.trim()) return youtubeId.trim();
  if (!embedUrl) return '';
  const match = embedUrl.match(/(?:embed\/|v=|youtu\.be\/)([\w-]+)/);
  return match?.[1] ?? '';
}

export function mapMediaVideo(v: {
  id: string;
  title: string;
  youtube_id?: string | null;
  embed_url?: string | null;
}) {
  return {
    id: v.id,
    title: v.title,
    youtubeId: extractYoutubeId(v.youtube_id, v.embed_url),
    embedUrl: v.embed_url ?? undefined,
  };
}

export type MediaEventCardItem = {
  id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  location: string;
  year: string;
  description?: string;
};

export function mapMediaEvent(e: {
  id: string;
  title: string;
  image?: string | null;
  category?: string | null;
  date?: string | null;
  description?: string | null;
}): MediaEventCardItem {
  const category = (e.category ?? 'events').toLowerCase();
  return {
    id: e.id,
    title: e.title,
    category: category.includes('award')
      ? 'awards'
      : category.includes('recogn')
        ? 'recognition'
        : category.includes('founder')
          ? 'founder'
          : category.includes('media')
            ? 'media'
            : category.includes('event')
              ? 'events'
              : category,
    type: 'image',
    src: e.image ?? '/whychooseus/1.jpeg',
    location: e.description?.split('·')[0]?.trim() ?? 'India',
    year: e.date ?? '',
    description: e.description ?? undefined,
  };
}

export function mapFeaturedDestination(d: Record<string, unknown>) {
  const fallbackImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
  const mediaRaw = d.media;
  let media: { type: 'image'; src: string; hoverSrc?: string } | { type: 'video'; src: string; poster: string };

  if (mediaRaw && typeof mediaRaw === 'object' && !Array.isArray(mediaRaw)) {
    const m = mediaRaw as Record<string, unknown>;
    if (m.type === 'video' && typeof m.src === 'string') {
      media = { type: 'video', src: m.src, poster: (m.poster as string) || m.src };
    } else if (typeof m.src === 'string') {
      media = {
        type: 'image',
        src: m.src,
        hoverSrc: typeof m.hoverSrc === 'string' ? m.hoverSrc : undefined,
      };
    } else {
      media = { type: 'image', src: fallbackImage };
    }
  } else {
    media = { type: 'image', src: fallbackImage };
  }

  return {
    id: (d.sort_order as number) ?? d.id,
    name: d.name as string,
    startsFrom: (d.starts_from as string) ?? 'On request',
    media,
    type: (d.dest_type as 'india' | 'international') ?? 'international',
    href: (d.href as string) ?? '/packages',
  };
}

/** Merge CMS visa row with static page template */
export function mergeVisaDetailPage<T extends Record<string, unknown>>(
  cmsRow: VisaCountryRow | null | undefined,
  slug: string,
  staticTemplate: T | undefined,
  fallback: T
): T {
  const base = staticTemplate ?? ({
    ...fallback,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    title: `${slug.replace(/-/g, ' ')} Visa Services`,
  } as T);

  if (!cmsRow) return base;

  const detail =
    cmsRow.detail && typeof cmsRow.detail === 'object' && !Array.isArray(cmsRow.detail)
      ? (cmsRow.detail as Record<string, unknown>)
      : {};

  return {
    ...base,
    ...detail,
    name: cmsRow.name,
    title: (detail.title as string) ?? `${cmsRow.name} Visa`,
    bgImage: (detail.bgImage as string) ?? cmsRow.image ?? base.bgImage,
    processingTime: (detail.processingTime as string) ?? base.processingTime,
    fees:
      (detail.fees as string) ??
      (cmsRow.price ? `INR ${Number(cmsRow.price).toLocaleString('en-IN')}/-` : base.fees),
    intro: (detail.intro as string) ?? cmsRow.highlight_text ?? base.intro,
  } as T;
}

export function mapFixedDeparture(d: Record<string, unknown>) {
  const fallbackImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
  const imagesRaw = d.images;
  let images: string[] = [];
  if (Array.isArray(imagesRaw)) {
    images = imagesRaw.filter((x): x is string => typeof x === 'string');
  } else if (typeof imagesRaw === 'string' && imagesRaw) {
    images = [imagesRaw];
  }
  if (images.length === 0) images = [fallbackImage];
  if (images.length === 1) images = [images[0], images[0]];

  const microRaw = d.micro_info;
  const microInfo = Array.isArray(microRaw)
    ? microRaw.filter((x): x is string => typeof x === 'string')
    : [];

  const category = (d.category as string) === 'india' ? 'india' : 'international';
  const badgeType = ['limited', 'trending', 'festival'].includes(d.badge_type as string)
    ? (d.badge_type as 'limited' | 'trending' | 'festival')
    : 'limited';

  return {
    id: String(d.external_id ?? d.id),
    category,
    badge: (d.badge as string) ?? 'Group Tour',
    badgeType,
    title: d.title as string,
    images,
    duration: (d.duration as string) ?? '',
    dateRange: (d.date_range as string) ?? '',
    monthNum: typeof d.month_num === 'number' ? d.month_num : 0,
    price: (d.price as string) ?? '',
    priceNote: (d.price_note as string) ?? 'onwards',
    microInfo,
    seatsLeft: typeof d.seats_left === 'number' ? d.seats_left : 8,
    href: (d.href as string) ?? '/packages',
  };
}

const MONTH_NAME_TO_NUM: Record<string, number> = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

function parseMonthNum(month?: string | null, monthNum?: number | null): number {
  if (typeof monthNum === 'number' && monthNum >= 0 && monthNum <= 12) return monthNum;
  if (!month) return 0;
  const token = month.toLowerCase().split(/[–\-,\s/]+/).find(Boolean);
  return token ? (MONTH_NAME_TO_NUM[token] ?? 0) : 0;
}

function normalizeEventMedia(mediaRaw: unknown): { type: 'image'; src: string } | { type: 'video'; src: string; poster: string } {
  const fallbackImage = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600';
  if (mediaRaw && typeof mediaRaw === 'object' && !Array.isArray(mediaRaw)) {
    const m = mediaRaw as Record<string, unknown>;
    if (m.type === 'video' && typeof m.src === 'string') {
      return { type: 'video', src: m.src, poster: (m.poster as string) || fallbackImage };
    }
    if (typeof m.src === 'string') {
      return { type: 'image', src: m.src };
    }
  }
  return { type: 'image', src: fallbackImage };
}

export function mapFestivalEvent(e: Record<string, unknown>) {
  const monthNum = parseMonthNum(e.month as string, e.month_num as number | null);
  return {
    id: String(e.external_id ?? e.id),
    tag: (e.tag as string) ?? 'Festival',
    name: e.name as string,
    location: (e.location as string) ?? '',
    month: (e.month as string) ?? '',
    monthNum,
    hookLine: (e.hook_line as string) ?? '',
    media: normalizeEventMedia(e.media),
    price: (e.price as string) ?? '',
    duration: (e.duration as string) ?? '',
    ctaLabel: (e.cta_label as string) ?? 'Explore Packages',
    ctaHref: (e.cta_href as string) ?? '/packages',
    trending: Boolean(e.trending),
  };
}

export function mapFeaturedExperience(e: Record<string, unknown>, index = 0) {
  const fallbackImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
  const image = typeof e.image === 'string' && e.image ? e.image : fallbackImage;
  return {
    id: typeof e.sort_order === 'number' ? e.sort_order : index + 1,
    title: e.title as string,
    continent: (e.destination as string) ?? 'Asia',
    experiences: [] as string[],
    duration: (e.duration as string) ?? '',
    price: (e.price as string) ?? '',
    images: [image, image],
    href: (e.href as string) ?? '/packages',
  };
}

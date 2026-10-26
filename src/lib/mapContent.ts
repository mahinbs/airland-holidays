import type { PackageRow as DbPackage, ServiceRow, DestinationRow, ContinentRow, VisaCountryRow } from '../types/database';

/** Plain-text version of CMS rich text (for cards, hero blurbs and meta descriptions) */
export function stripHtml(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6])\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

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
  seo?: { title?: string; description?: string };
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
  return raw
    .filter((f: { enabled?: boolean }) => f.enabled !== false)
    .map((f: { q?: string; a?: string; question?: string; answer?: string }) => ({
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
    features: ((detail.features as (ServiceDetailView['features'][number] & { enabled?: boolean })[] | undefined)?.filter((f) => f.enabled !== false)) ?? defaultFeatures,
    brandsTitle: detail.brandsTitle as string | undefined,
    brands: detail.brands as string[] | undefined,
    faqs: normalizeFaqs(detail.faqs) ?? defaultFaqs,
    seo: (detail.seo ?? {}) as { title?: string; description?: string },
  };
}

/** Map Supabase package row to Packages page list shape */
export function mapPackageToListRow(p: DbPackage, index: number) {
  const insights =
    p.insights && typeof p.insights === 'object' && !Array.isArray(p.insights)
      ? (p.insights as Record<string, unknown>)
      : {};
  const categories = Array.isArray(insights.categories)
    ? (insights.categories as unknown[]).filter((c): c is string => typeof c === 'string' && Boolean(c))
    : [];
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
    categories,
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
  return raw
    .filter((f: { enabled?: boolean }) => f.enabled !== false)
    .map((f: { q?: string; a?: string; question?: string; answer?: string }) => ({
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

  const { faqs, accommodation, socialGallery, socialGalleryUrls, related, relatedSlugs, categories, seo, gallery, ...destinationInsights } = raw;

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

  // Optional CMS extras (typed optional so existing PackageDetail casts keep compiling)
  const extras: {
    /** Distinct "Package Gallery" images (separate from the hero slider images) */
    gallery?: string[];
    categories?: string[];
    seo?: { title?: string; description?: string };
  } = {
    gallery: Array.isArray(gallery) ? (gallery as unknown[]).filter((g): g is string => typeof g === 'string' && Boolean(g)) : [],
    categories: Array.isArray(categories) ? (categories as string[]) : [],
    seo: (seo ?? {}) as { title?: string; description?: string },
  };

  return {
    ...mapped,
    insights: destinationInsights,
    faqs: normalizePackageFaqs(faqs),
    accommodation: {
      title: acc?.title ?? 'Accommodation',
      desc: acc?.desc ?? '',
      options: ((acc?.options as { name: string; desc: string; image: string; enabled?: boolean }[]) ?? []).filter((o) => o.enabled !== false),
    },
    socialGallery: resolvedSocial,
    related: resolvedRelated,
    ...extras,
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
    description: stripHtml(row.overview),
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
    description: stripHtml(row.description),
    tours: packageCount || (detail.tours as number) || 0,
    tag: detail.tag as string | undefined,
  };
}


const isEnabled = (item: unknown) => !(item && typeof item === 'object' && (item as { enabled?: boolean }).enabled === false);
const enabledList = <T>(raw: unknown): T[] => (Array.isArray(raw) ? (raw as T[]).filter(isEnabled) : []);
const formatInr = (n: number) => Number(n).toLocaleString('en-IN');

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
    heroVideo: cmsRow.hero_video ?? undefined,
    description: stripHtml(cmsRow.overview) || base.description,
    about: detail.about ?? cmsRow.overview ?? base.about ?? base.description,
    overview: {
      ...(base.overview as Record<string, unknown>),
      ...(detail.overview as Record<string, unknown> | undefined),
      continent: cmsRow.continent ?? cmsRow.region ?? (base.overview as Record<string, unknown>)?.continent,
    },
    gallery: detail.gallery ?? base.gallery,
    statistics: detail.statistics ?? base.statistics,
    attractions: Array.isArray(detail.attractions) ? enabledList(detail.attractions) : base.attractions,
    airports: Array.isArray(detail.airports) && enabledList(detail.airports).length
      ? enabledList<{ name?: string; code?: string; city?: string; distance?: string }>(detail.airports).map((a) => ({
          name: `${a.name ?? ''}${a.code ? ` (${a.code})` : ''}`.trim(),
          city: a.city ?? '',
          connectivity: a.distance ?? '',
        }))
      : base.airports,
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

  const toPageFormat = (p: DbPackage) => ({
    id: p.slug,
    title: p.title,
    duration: p.duration ?? '',
    price: formatInr(Number(p.price)),
    image: p.image ?? (Array.isArray(p.images) ? (p.images as string[])[0] : '') ?? '',
    category: p.category ?? 'International',
  });

  const trendingSlugs = detail.trendingSlugs as string[] | undefined;
  let trendingPackages = detail.trendingPackages ?? base.trendingPackages;
  if (trendingSlugs?.length && allPackages.length) {
    trendingPackages = trendingSlugs
      .map((slug) => allPackages.find((p) => p.slug === slug))
      .filter((p): p is DbPackage => Boolean(p))
      .map(toPageFormat);
  }

  // Holiday Packages list: CMS packages tagged with this continent, else the template's list
  const continentPackages = allPackages.filter((p) => (p.continent ?? '').toLowerCase() === cmsRow.name.toLowerCase());
  const mappedAllPackages = continentPackages.length ? continentPackages.map(toPageFormat) : undefined;

  const seo = (detail.seo ?? {}) as { title?: string; description?: string };
  const seoTitle = seo.title ?? (detail.seoTitle as string | undefined);
  const seoDescription = seo.description ?? (detail.seoDescription as string | undefined);
  // SEO title/description are applied to <title>/<meta> by the page, not rendered as overview blocks
  const seoText = detail.seoText ?? base.seoText;

  const airportsCms = enabledList<{ name?: string; code?: string; city?: string; notes?: string }>(detail.majorAirports);
  const visualCms = enabledList<{ title?: string; desc?: string; image?: string; video?: string }>(detail.visualExperiences);
  const statCards = enabledList<{ value?: string; label?: string }>(detail.statistics).filter((x) => x.value || x.label);
  const insightCards = enabledList<{ title?: string; desc?: string }>(detail.insights).filter((x) => x.title);

  return {
    ...base,
    ...detail,
    name: cmsRow.name,
    slug: cmsRow.slug,
    heroImage: cmsRow.featured_image ?? base.heroImage,
    heroVideo: (detail.heroVideo as string | undefined) || undefined,
    /** Rich-text "Overview Content" from the CMS (shown above the SEO blocks) */
    overviewHtml: cmsRow.description ?? '',
    overview: base.overview,
    ...(countries?.length ? { highlights: countries } : {}),
    seoText,
    seo: { title: seoTitle, description: seoDescription },
    topDestinations: detail.topDestinations ?? base.topDestinations,
    trendingPackages,
    allPackages: (detail.allPackages as unknown) ?? mappedAllPackages ?? base.allPackages,
    airports: airportsCms.length
      ? airportsCms.map((a) => ({
          name: `${a.name ?? ''}${a.code ? ` (${a.code})` : ''}`.trim(),
          city: a.city ?? '',
          connectivity: a.notes ?? '',
        }))
      : base.airports,
    visualExperiences: visualCms.length
      ? visualCms.map((v, i) => ({
          id: i + 1,
          type: v.video ? 'video' : 'image',
          url: v.video || v.image || '',
          thumbnail: v.image || '',
          title: v.title ?? '',
          packageId: '',
          packageName: v.desc ?? '',
        }))
      : base.visualExperiences,
    // CMS statistics / insights are card lists; the template keeps its structured visitor-statistics object
    statistics: base.statistics,
    statCards,
    insightCards,
    highlights: (Array.isArray(detail.highlights) && detail.highlights.length ? detail.highlights : countries?.length ? countries : base.highlights) as string[],
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
    seo: (detail.seo ?? {}) as { title?: string; description?: string },
  };
}

export type GuideArticleView = {
  id: string;
  title: string;
  category: string;
  img: string;
  date: string;
  author: string;
  excerpt: string;
  body: string;
  tags: string[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
};

export function mapGuideToArticle(a: Record<string, unknown>): GuideArticleView {
  const rawBody = String(a.body ?? '');
  const body = rawBody.replace(/<!--CMS-META:[\s\S]*?-->/, '').trim();

  let meta: { seoTitle?: string; seoDescription?: string; tags?: unknown; faqs?: unknown } = {};
  const metaMatch = rawBody.match(/<!--CMS-META:([\s\S]*?)-->/);
  if (metaMatch) {
    try {
      meta = JSON.parse(metaMatch[1]);
    } catch {
      meta = {};
    }
  }
  const tags = Array.isArray(meta.tags) ? (meta.tags as unknown[]).map((t) => String(t).trim()).filter(Boolean) : [];
  const faqs = Array.isArray(meta.faqs)
    ? (meta.faqs as { question?: string; answer?: string; q?: string; a?: string; enabled?: boolean }[])
        .filter((f) => f.enabled !== false)
        .map((f) => ({ question: f.question ?? f.q ?? '', answer: f.answer ?? f.a ?? '' }))
        .filter((f) => f.question)
    : [];

  return {
    id: a.slug as string,
    title: a.title as string,
    category: (a.category as string) ?? '',
    img: (a.cover_image as string) ?? '',
    date: a.published_at ? new Date(a.published_at as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
    author: (a.author as string) ?? '',
    excerpt: (a.excerpt as string) ?? '',
    body,
    tags,
    faqs,
    seoTitle: meta.seoTitle ?? '',
    seoDescription: meta.seoDescription ?? '',
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
    images = imagesRaw.filter((x): x is string => typeof x === 'string' && Boolean(x));
  } else if (typeof imagesRaw === 'string' && imagesRaw) {
    images = [imagesRaw];
  }
  // Dedicated Featured / Banner image columns win over the legacy images[] list
  const featured = typeof d.featured_image === 'string' && d.featured_image ? d.featured_image : '';
  const banner = typeof d.banner_image === 'string' && d.banner_image ? d.banner_image : '';
  if (featured || banner) images = [featured || banner, banner || featured, ...images.filter((i) => i !== featured && i !== banner)];
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
  const availabilityStatus = ['available', 'limited', 'sold-out'].includes(d.availability_status as string)
    ? (d.availability_status as 'available' | 'limited' | 'sold-out')
    : undefined;

  return {
    id: String(d.external_id ?? d.id),
    destination: (d.destination as string) ?? '',
    availabilityStatus,
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

const MONTH_LABELS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function mapFestivalEvent(e: Record<string, unknown>) {
  const detail =
    e.detail && typeof e.detail === 'object' && !Array.isArray(e.detail) ? (e.detail as Record<string, unknown>) : {};
  const eventDate = typeof detail.eventDate === 'string' ? detail.eventDate : '';
  const parsed = eventDate ? new Date(`${eventDate}T00:00:00`) : null;
  const dateValid = parsed && !Number.isNaN(parsed.getTime());
  // An explicit month wins; otherwise derive month / month number from the Event Date
  const monthLabel = (e.month as string) || (dateValid ? MONTH_LABELS[parsed.getMonth() + 1] : '');
  const monthNum = parseMonthNum(monthLabel, (e.month_num as number | null) ?? (dateValid ? parsed.getMonth() + 1 : null));
  const gallery = Array.isArray(detail.gallery) ? (detail.gallery as unknown[]).filter((g): g is string => typeof g === 'string' && Boolean(g)) : [];
  const videoSource = Array.isArray(detail.eventVideos) ? detail.eventVideos : Array.isArray(detail.videos) ? detail.videos : [];
  const videos = (videoSource as unknown[])
    .filter((v) => (v as { enabled?: boolean })?.enabled !== false)
    .map((v) => (typeof v === 'string' ? v : (v as { url?: string })?.url ?? ''))
    .filter(Boolean);
  return {
    eventDate: dateValid
      ? parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : '',
    gallery,
    videos,
    id: String(e.external_id ?? e.id),
    tag: (e.tag as string) ?? 'Festival',
    name: e.name as string,
    location: (e.location as string) ?? '',
    month: monthLabel,
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

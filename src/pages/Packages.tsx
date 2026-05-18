import { useMemo, useCallback, useState, useRef, useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  Star,
  Clock,
  MapPin,
  Search,
  Globe,
  Calendar,
  Wallet,
  Heart,
  FileCheck,
  Banknote,
  Shield,
  MessageCircle,
  ArrowRight,
  SlidersHorizontal,
  X,
  ChevronRight,
  Users,
  Plane,
  Award,
  ChevronDown,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Dropdown from "../components/common/Dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperCustomStyles = `
  .package-card-swiper .swiper-button-next,
  .package-card-swiper .swiper-button-prev {
    color: white;
    background: rgba(0,0,0,0.35);
    width: 30px; height: 30px;
    padding:5px;
    border-radius: 50%;
    backdrop-filter: blur(6px);
    transition: all 0.25s;
  }
  .package-card-swiper .swiper-button-next:after,
  .package-card-swiper .swiper-button-prev:after { font-size: 12px; font-weight: 900; }
  .package-card-swiper:hover .swiper-button-next,
  .package-card-swiper:hover .swiper-button-prev { background: rgba(0,0,0,0.6); }
  .package-card-swiper .swiper-pagination-bullet { background: white; opacity: 0.55; width: 6px; height: 6px; }
  .package-card-swiper .swiper-pagination-bullet-active { opacity: 1; background: white; width: 18px; border-radius: 3px; }
`;

type PackageRow = {
  id: number; title: string; destination: string; country: string;
  duration: string; price: number; rating: number; reviews: number;
  image: string; images?: string[]; tags: string[]; badge?: string;
  category: string; continent: string; styleTags: string[];
};

const packagesData: PackageRow[] = [
  { id: 1, title: "Bali Bliss & Temples", destination: "Bali, Indonesia", country: "Indonesia", duration: "7 Days", price: 1200, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800", images: ["https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"], tags: ["Best Seller"], badge: "Best Seller", category: "International", continent: "asia", styleTags: ["budget", "nature", "honeymoon"] },
  { id: 2, title: "Swiss Alps Adventure", destination: "Switzerland", country: "Switzerland", duration: "10 Days", price: 3400, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800", images: ["https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=800"], tags: ["Adventure"], badge: "Luxury Pick", category: "International", continent: "europe", styleTags: ["adventure", "luxury", "nature"] },
  { id: 3, title: "Maldives Honeymoon Escape", destination: "Maldives", country: "Maldives", duration: "5 Days", price: 2800, rating: 5.0, reviews: 210, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800"], tags: ["Honeymoon"], badge: "Honeymoon", category: "Honeymoon", continent: "asia", styleTags: ["honeymoon", "luxury", "nature"] },
  { id: 4, title: "Dubai City Tour", destination: "UAE", country: "UAE", duration: "4 Days", price: 900, rating: 4.6, reviews: 340, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", images: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"], tags: [], badge: "Trending", category: "International", continent: "middle-east", styleTags: ["budget", "luxury", "group"] },
  { id: 5, title: "Golden Triangle Explorer", destination: "India", country: "India", duration: "8 Days", price: 1100, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800", tags: ["Culture"], badge: "Family Pick", category: "Domestic", continent: "india", styleTags: ["family", "budget", "nature"] },
  { id: 6, title: "Santorini Sunset Romance", destination: "Greece", country: "Greece", duration: "6 Days", price: 2100, rating: 4.9, reviews: 92, image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800", images: ["https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"], tags: ["Romantic"], badge: "Honeymoon", category: "Honeymoon", continent: "europe", styleTags: ["honeymoon", "luxury", "nature"] },
];

const CONTINENT_HERO: Record<string, string> = {
  all: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&q=80",
  asia: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=2000&q=80",
  europe: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=2000&q=80",
  "middle-east": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2000&q=80",
  africa: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=2000&q=80",
  america: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=2000&q=80",
  pacific: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80",
  india: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=2000&q=80",
};

/** Map URL ?continent= value to CONTINENT_HERO keys (lowercase, common aliases). */
function normalizeContinentParam(raw: string | null): string {
  if (!raw?.trim()) return "all";
  let k = raw.trim().toLowerCase().replace(/\s+/g, "-");
  if (k === "americas") k = "america";
  if (k === "middleeast") k = "middle-east";
  if (k in CONTINENT_HERO) return k;
  return "all";
}

const CONTINENT_INSIGHTS: Record<string, Array<{ icon: React.ElementType; label: string; value: string }>> = {
  all:         [{ icon: Calendar, label: "Best Season", value: "Oct – Mar" },         { icon: Wallet, label: "Budget Range", value: "$500 – $5000" },    { icon: Heart, label: "Ideal For", value: "All Travellers" },   { icon: FileCheck, label: "Visa", value: "We Assist" },           { icon: Star, label: "Top Experience", value: "Cultural Tours" }],
  asia:        [{ icon: Calendar, label: "Best Season", value: "Nov – Mar" },         { icon: Wallet, label: "Budget Range", value: "$800 – $3500" },    { icon: Heart, label: "Ideal For", value: "Beach & Culture" },  { icon: FileCheck, label: "Visa", value: "We Assist" },           { icon: Star, label: "Top Experience", value: "Temples & Beaches" }],
  europe:      [{ icon: Calendar, label: "Best Season", value: "Apr – Sep" },         { icon: Wallet, label: "Budget Range", value: "$1500 – $6000" },   { icon: Heart, label: "Ideal For", value: "Couples & Families" },{ icon: FileCheck, label: "Visa", value: "Schengen Assisted" },   { icon: Star, label: "Top Experience", value: "Alps & History" }],
  "middle-east":[{ icon: Calendar, label: "Best Season", value: "Oct – Apr" },        { icon: Wallet, label: "Budget Range", value: "$700 – $4000" },    { icon: Heart, label: "Ideal For", value: "Luxury & Groups" },  { icon: FileCheck, label: "Visa", value: "On Arrival / Assisted" },{ icon: Star, label: "Top Experience", value: "Desert & Skylines" }],
  africa:      [{ icon: Calendar, label: "Best Season", value: "Jun – Oct" },         { icon: Wallet, label: "Budget Range", value: "$1200 – $5500" },   { icon: Heart, label: "Ideal For", value: "Adventure & Wildlife" },{ icon: FileCheck, label: "Visa", value: "We Assist" },          { icon: Star, label: "Top Experience", value: "Safari & Islands" }],
  america:     [{ icon: Calendar, label: "Best Season", value: "May – Sep" },         { icon: Wallet, label: "Budget Range", value: "$2000 – $7000" },   { icon: Heart, label: "Ideal For", value: "All Types" },        { icon: FileCheck, label: "Visa", value: "We Assist" },           { icon: Star, label: "Top Experience", value: "Cities & Wilderness" }],
  pacific:     [{ icon: Calendar, label: "Best Season", value: "Sep – Nov" },         { icon: Wallet, label: "Budget Range", value: "$2500 – $8000" },   { icon: Heart, label: "Ideal For", value: "Nature Lovers" },    { icon: FileCheck, label: "Visa", value: "We Assist" },           { icon: Star, label: "Top Experience", value: "Wildlife & Reefs" }],
  india:       [{ icon: Calendar, label: "Best Season", value: "Oct – Mar" },         { icon: Wallet, label: "Budget Range", value: "$400 – $2000" },    { icon: Heart, label: "Ideal For", value: "Families & Groups" },{ icon: FileCheck, label: "Visa", value: "No Visa Required" },    { icon: Star, label: "Top Experience", value: "Heritage & Nature" }],
};

const continents = [
  { id: "all",          label: "All Regions",        emoji: "🌎", packageCount: 6,  image: "",                                                                              hook: "",                              countries: [] },
  { id: "asia",         label: "Asia",                emoji: "🌏", packageCount: 24, image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",    hook: "Beaches, temples & vibrant cities",    countries: ["Thailand", "Bali", "Singapore", "Vietnam", "Maldives", "Japan"] },
  { id: "europe",       label: "Europe",              emoji: "🌍", packageCount: 18, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",    hook: "History, culture & alpine magic",      countries: ["Switzerland", "France", "Greece", "Italy", "UK", "Spain"] },
  { id: "middle-east",  label: "Middle East",         emoji: "🌙", packageCount: 10, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",    hook: "Luxury, desert & modern skylines",     countries: ["UAE", "Jordan", "Oman", "Qatar", "Egypt"] },
  { id: "africa",       label: "Africa",              emoji: "🦁", packageCount: 8,  image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",    hook: "Safari, wildlife & island escapes",    countries: ["Tanzania", "Mauritius", "Kenya", "Morocco", "Seychelles"] },
  { id: "america",      label: "Americas",            emoji: "🗽", packageCount: 6,  image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",    hook: "Iconic cities & natural wonders",      countries: ["USA", "Canada", "Alaska", "South America"] },
  { id: "pacific",      label: "Australia & Pacific", emoji: "🦘", packageCount: 5,  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",    hook: "Wildlife, beaches & raw nature",       countries: ["Australia", "New Zealand", "Fiji"] },
  { id: "india",        label: "India Holidays",      emoji: "🇮🇳", packageCount: 20, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",   hook: "Heritage, mountains & coastal gems",   countries: ["Kerala", "Rajasthan", "Goa", "Himachal", "Andaman"] },
];

const travelStyles = [
  { id: "all",       label: "All Styles",  icon: "✈️" },
  { id: "luxury",    label: "Luxury",      icon: "👑" },
  { id: "budget",    label: "Budget",      icon: "💰" },
  { id: "adventure", label: "Adventure",   icon: "🏔" },
  { id: "nature",    label: "Nature",      icon: "🌿" },
  { id: "honeymoon", label: "Honeymoon",   icon: "💍" },
  { id: "family",    label: "Family",      icon: "👨‍👩‍👧" },
  { id: "group",     label: "Group Tours", icon: "👥" },
];

const featuredDestinations = [
  { name: "Thailand",    country: "Thailand",     packages: 12, image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",  hook: "Beaches, temples & world-famous nightlife",  slug: "thailand",    continent: "asia" },
  { name: "Bali",        country: "Indonesia",    packages: 9,  image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",  hook: "Spiritual, scenic & absolutely stunning",    slug: "bali",        continent: "asia" },
  { name: "Switzerland", country: "Switzerland",  packages: 8,  image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80",  hook: "Alpine luxury beyond imagination",           slug: "switzerland", continent: "europe" },
  { name: "Dubai",       country: "UAE",          packages: 11, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",  hook: "Desert luxury meets modern skylines",        slug: "dubai",       continent: "middle-east" },
  { name: "Maldives",    country: "Maldives",     packages: 7,  image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",  hook: "Overwater bliss, crystal waters",            slug: "maldives",    continent: "asia" },
  { name: "Greece",      country: "Greece",       packages: 6,  image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80",  hook: "Ancient myths, golden sunsets",              slug: "greece",      continent: "europe" },
  { name: "Japan",       country: "Japan",        packages: 8,  image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",  hook: "Tradition, technology & beauty",             slug: "japan",       continent: "asia" },
  { name: "Italy",       country: "Italy",        packages: 10, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",  hook: "Art, cuisine & Renaissance charm",           slug: "italy",       continent: "europe" },
];

const heroPills = [
  { label: "Thailand",    query: "Thailand",    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&q=80" },
  { label: "Bali",        query: "Bali",        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80" },
  { label: "Dubai",       query: "Dubai",       image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80" },
  { label: "Maldives",    query: "Maldives",    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300&q=80" },
  { label: "Switzerland", query: "Switzerland", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=300&q=80" },
  { label: "Greece",      query: "Greece",      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&q=80" },
  { label: "Japan",       query: "Japan",       image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80" },
  { label: "Honeymoon",   query: "Honeymoon",   image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=300&q=80" },
];

const sortOptions = [
  { value: "recommended", label: "Sort by: Recommended" },
  { value: "price-low",   label: "Price: Low to High" },
  { value: "price-high",  label: "Price: High to Low" },
  { value: "duration-short", label: "Duration: Shortest" },
  { value: "duration-long",  label: "Duration: Longest" },
];

const PRICE_OPTIONS = [
  { id: "under1000", label: "Under $1,000" },
  { id: "1000-2500", label: "$1,000 – $2,500" },
  { id: "2500-5000", label: "$2,500 – $5,000" },
  { id: "over5000",  label: "Over $5,000" },
] as const;

const DURATION_OPTIONS = [
  { id: "1-3",  label: "1–3 Days" },
  { id: "4-7",  label: "4–7 Days" },
  { id: "8-14", label: "1–2 Weeks" },
  { id: "15+",  label: "15+ Days" },
] as const;

const BADGE_CONFIG: Record<string, { color: string; icon: string }> = {
  "Best Seller": { color: "bg-secondary text-slate-900",  icon: "🔥" },
  "Honeymoon":   { color: "bg-rose-500 text-white",        icon: "💍" },
  "Luxury Pick": { color: "bg-amber-500 text-white",       icon: "👑" },
  "Trending":    { color: "bg-sky-500 text-white",         icon: "📈" },
  "Family Pick": { color: "bg-emerald-500 text-white",     icon: "👨‍👩‍👧" },
};

const DEST_SLUG_HINTS: Record<string, string[]> = {
  thailand: ["thailand"], bali: ["bali"], switzerland: ["switzerland"],
  dubai: ["dubai", "uae"], maldives: ["maldives"], greece: ["greece"],
  japan: ["japan"], italy: ["italy"],
};

function parseListParam(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}
function packageDayCount(duration: string): number {
  const m = duration.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}
function matchesPriceBucket(price: number, bucket: string): boolean {
  switch (bucket) {
    case "under1000": return price < 1000;
    case "1000-2500": return price >= 1000 && price <= 2500;
    case "2500-5000": return price > 2500 && price <= 5000;
    case "over5000":  return price > 5000;
    default: return false;
  }
}
function matchesDurationBucket(days: number, bucket: string): boolean {
  switch (bucket) {
    case "1-3":  return days >= 1 && days <= 3;
    case "4-7":  return days >= 4 && days <= 7;
    case "8-14": return days >= 8 && days <= 14;
    case "15+":  return days >= 15;
    default: return false;
  }
}
function matchesDestinationSlug(pkg: PackageRow, slug: string): boolean {
  const s = slug.trim().toLowerCase();
  if (!s) return true;
  const hints = DEST_SLUG_HINTS[s] ?? [s];
  const hay = `${pkg.destination} ${pkg.country} ${pkg.title}`.toLowerCase();
  return hints.some((h) => hay.includes(h));
}
function matchesTravelStyle(pkg: PackageRow, styleId: string): boolean {
  if (styleId === "all") return true;
  return pkg.styleTags.includes(styleId);
}

const uniqueCountries    = [...new Set(packagesData.map((p) => p.country))].sort();
const uniqueCategories   = [...new Set(packagesData.map((p) => p.category))].sort();
const uniqueDestinations = [...new Set(packagesData.map((p) => p.destination.split(",")[0].trim()))].sort();

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg }: { pkg: PackageRow }) {
  const images = pkg.images ?? [pkg.image];
  const badge = pkg.badge ? (BADGE_CONFIG[pkg.badge] ?? { color: "bg-primary text-white", icon: "✨" }) : null;

  return (
    <motion.div
      variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col h-full"
    >
      {/* Image carousel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 shrink-0">
        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true, dynamicBullets: true }} className="w-full h-full package-card-swiper">
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <a href={`/packages/${pkg.id}`} className="block w-full h-full">
                <img src={img} alt={`${pkg.title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

        {badge && (
          <div className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg backdrop-blur-sm ${badge.color}`}>
            <span>{badge.icon}</span> {pkg.badge}
          </div>
        )}

        <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 border border-white/20">
          <Clock className="w-3 h-3" /> {pkg.duration}
        </div>

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3 fill-slate-900" /> {pkg.rating} ({pkg.reviews})
          </div>
        </div>
      </div>

      {/* Card body */}
      <a href={`/packages/${pkg.id}`} className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <MapPin className="w-3 h-3 shrink-0" /> {pkg.destination}
        </div>

        <h3 className="font-['Marcellus'] text-lg text-slate-900 group-hover:text-primary transition-colors mb-3 leading-snug line-clamp-2">
          {pkg.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.styleTags.slice(0, 3).map((tag) => {
            const style = travelStyles.find((s) => s.id === tag);
            return style ? (
              <span key={tag} className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg capitalize flex items-center gap-1">
                <span className="text-[11px]">{style.icon}</span> {style.label}
              </span>
            ) : null;
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Starting From</div>
            <div className="font-['Marcellus'] text-2xl text-slate-900 leading-none flex items-baseline gap-1">
              ${pkg.price.toLocaleString()}
              <span className="text-xs font-sans text-slate-500 font-medium">/pp</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl group-hover:bg-secondary group-hover:text-slate-900 transition-colors duration-300 shadow-sm">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// ─── Smart Filter Dropdown ─────────────────────────────────────────────────────
function SmartFilterDropdown({ icon: Icon, label, value, options, onChange, hint }: {
  icon: React.ElementType; label: string; value: string;
  options: { id: string; label: string }[]; onChange: (id: string) => void; hint?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selected = options.find((o) => o.id === value) || options[0];

  return (
    <div ref={ref} className="relative flex-1 min-w-[130px]">
      <button type="button" onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-white/70 hover:bg-white backdrop-blur-md border border-white/50 shadow-sm transition-all text-left group"
      >
        <div className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="text-slate-400 text-[9px] uppercase tracking-widest font-bold mb-0.5">{label}</div>
          <div className="text-slate-900 font-bold text-sm truncate flex items-center justify-between gap-1">
            <span className="truncate text-xs">{value === "all" && hint ? hint : selected.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-[60] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-52 overflow-y-auto custom-scrollbar py-1.5">
              {options.map((opt) => (
                <button key={opt.id} onClick={() => { onChange(opt.id); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt.id ? "bg-primary/10 text-primary font-bold" : "text-slate-700 hover:bg-slate-50 font-medium"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────
function DestCard({ dest, big }: { dest: typeof featuredDestinations[0]; big?: boolean }) {
  return (
    <motion.a
      href={`/packages?destination=${encodeURIComponent(dest.slug)}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer block shadow-sm hover:shadow-2xl transition-all duration-300 ${big ? "h-full min-h-[340px]" : "min-h-[180px]"}`}
    >
      <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary text-[9px] font-black px-2 py-1 rounded-full shadow">
        {dest.packages} Pkgs
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className={`font-['Marcellus'] text-white font-bold leading-tight ${big ? "text-2xl mb-1" : "text-lg"}`}>{dest.name}</h3>
        {big && <p className="text-white/70 text-xs font-light mt-1 line-clamp-1">{dest.hook}</p>}
        <div className="flex items-center gap-1 text-secondary text-[11px] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Filter Chip ───────────────────────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  if (!label) return null;
  return (
    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
      {label}
      <button type="button" onClick={onRemove} className="hover:bg-primary/20 rounded-full p-0.5 transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [heroImgLoaded, setHeroImgLoaded] = useState(false);
  const filterBarRef  = useRef<HTMLDivElement>(null);
  const [filterBarStuck, setFilterBarStuck] = useState(false);

  const continentStripRef = useRef<HTMLDivElement>(null);
  const continentDragRef  = useRef({ active: false, pointerId: -1, startX: 0, scroll0: 0, dragged: false });
  const blockContinentPillClick = useRef(false);
  const [continentGrabbing, setContinentGrabbing] = useState(false);

  const updateParams = useCallback((patch: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, val] of Object.entries(patch)) {
        if (val === null || val === "") next.delete(key); else next.set(key, val);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const toggleListParam = useCallback((key: "price" | "dur" | "countries" | "cat" | "dest", id: string) => {
    setSearchParams((prev) => {
      const n = new URLSearchParams(prev);
      const list = parseListParam(n.get(key));
      const nextList = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      if (nextList.length === 0) n.delete(key); else n.set(key, nextList.join(","));
      return n;
    }, { replace: true });
  }, [setSearchParams]);

  const searchTerm        = searchParams.get("q") ?? "";
  const destinationSlug   = searchParams.get("destination") ?? "";
  const activeContinent   = normalizeContinentParam(searchParams.get("continent"));
  const activeStyle       = searchParams.get("style") ?? "all";
  const rawSort           = searchParams.get("sort") ?? "recommended";
  const sortBy            = sortOptions.some((o) => o.value === rawSort) ? rawSort : "recommended";
  const selectedPrices       = parseListParam(searchParams.get("price"));
  const selectedDurations    = parseListParam(searchParams.get("dur"));
  const selectedCountries    = parseListParam(searchParams.get("countries"));
  const selectedCategories   = parseListParam(searchParams.get("cat"));
  const selectedDestinations = parseListParam(searchParams.get("dest"));

  const setSearchTerm   = (v: string) => updateParams({ q: v.trim() || null });
  const clearAllFilters = () => setSearchParams(new URLSearchParams(), { replace: true });
  const setSortBy       = (v: string) => updateParams({ sort: v === "recommended" ? null : v });

  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFilterBarStuck(e.intersectionRatio < 1), { threshold: [1], rootMargin: "-1px 0px 0px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const heroImage = CONTINENT_HERO[activeContinent] ?? CONTINENT_HERO.all;

  useLayoutEffect(() => {
    setHeroImgLoaded(false);
  }, [heroImage]);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setHeroImgLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setHeroImgLoaded(true);
    };
    img.src = heroImage;
    return () => {
      cancelled = true;
    };
  }, [heroImage]);
  const currentInsights = CONTINENT_INSIGHTS[activeContinent] ?? CONTINENT_INSIGHTS.all;

  const filteredPackages = useMemo(() => {
    let list = [...packagesData];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (destinationSlug) list = list.filter((p) => matchesDestinationSlug(p, destinationSlug));
    if (activeContinent !== "all") list = list.filter((p) => p.continent.toLowerCase() === activeContinent.toLowerCase());
    if (activeStyle !== "all") list = list.filter((p) => matchesTravelStyle(p, activeStyle));
    if (selectedPrices.length    > 0) list = list.filter((p) => selectedPrices.some((b)    => matchesPriceBucket(p.price, b)));
    if (selectedDurations.length > 0) list = list.filter((p) => selectedDurations.some((b) => matchesDurationBucket(packageDayCount(p.duration), b)));
    if (selectedCountries.length > 0) list = list.filter((p) => selectedCountries.some((c) => p.country.toLowerCase() === c.toLowerCase()));
    if (selectedCategories.length > 0) list = list.filter((p) => selectedCategories.some((c) => p.category.toLowerCase() === c.toLowerCase()));
    if (selectedDestinations.length > 0) list = list.filter((p) => selectedDestinations.some((d) => p.destination.toLowerCase().includes(d.toLowerCase())));
    switch (sortBy) {
      case "price-low":      list.sort((a, b) => a.price - b.price); break;
      case "price-high":     list.sort((a, b) => b.price - a.price); break;
      case "duration-short": list.sort((a, b) => packageDayCount(a.duration) - packageDayCount(b.duration)); break;
      case "duration-long":  list.sort((a, b) => packageDayCount(b.duration) - packageDayCount(a.duration)); break;
    }
    return list;
  }, [searchTerm, destinationSlug, activeContinent, activeStyle, sortBy, selectedPrices, selectedDurations, selectedCountries, selectedCategories, selectedDestinations]);

  const visibleDestinations = useMemo(() => {
    const mapped = featuredDestinations.map((dest) => ({
      ...dest,
      packages: filteredPackages.filter((p) => matchesDestinationSlug(p, dest.slug)).length,
    })).filter((d) => d.packages > 0 || activeContinent === "all");

    // Filter by continent if active
    const byContinent = activeContinent === "all" ? mapped : mapped.filter((d) => d.continent === activeContinent);
    return byContinent.length > 0 ? byContinent : featuredDestinations;
  }, [filteredPackages, activeContinent]);

  const destinationTitle = useMemo(() => {
    const cont  = continents.find((c) => c.id === activeContinent);
    const style = travelStyles.find((s) => s.id === activeStyle);
    if (activeContinent !== "all" && activeStyle !== "all") return `${style?.label} Escapes in ${cont?.label}`;
    if (activeContinent !== "all") return `Explore Trending Destinations in ${cont?.label}`;
    if (activeStyle !== "all") return `Top ${style?.label} Experiences`;
    return "Handpicked Travel Experiences";
  }, [activeContinent, activeStyle]);

  const hasActiveFilters = !!searchTerm.trim() || !!destinationSlug || activeContinent !== "all" || activeStyle !== "all" || sortBy !== "recommended" || selectedPrices.length > 0 || selectedDurations.length > 0 || selectedCountries.length > 0 || selectedCategories.length > 0 || selectedDestinations.length > 0;

  const onContinentStripPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = continentStripRef.current; if (!el) return;
    continentDragRef.current = { active: true, pointerId: e.pointerId, startX: e.clientX, scroll0: el.scrollLeft, dragged: false };
  };
  const onContinentStripPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = continentDragRef.current; if (!d.active || e.pointerId !== d.pointerId) return;
    const el = continentStripRef.current; if (!el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 10 && !d.dragged) { d.dragged = true; try { el.setPointerCapture(e.pointerId); } catch { /**/ } setContinentGrabbing(e.pointerType === "mouse"); }
    if (d.dragged) el.scrollLeft = d.scroll0 - dx;
  };
  const endContinentStripDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = continentDragRef.current; if (!d.active || e.pointerId !== d.pointerId) return;
    const el = continentStripRef.current;
    if (el) { try { el.releasePointerCapture(e.pointerId); } catch { /**/ } }
    if (d.dragged) { blockContinentPillClick.current = true; window.setTimeout(() => { blockContinentPillClick.current = false; }, 0); }
    d.active = false; d.pointerId = -1; d.dragged = false; setContinentGrabbing(false);
  };
  const onContinentStripLostPointerCapture = () => {
    continentDragRef.current = { active: false, pointerId: -1, startX: 0, scroll0: 0, dragged: false };
    setContinentGrabbing(false);
  };
  const onContinentPillClick = (contId: string) => (e: React.MouseEvent) => {
    if (blockContinentPillClick.current) { e.preventDefault(); e.stopPropagation(); return; }
    updateParams({ continent: contId === "all" ? null : contId, q: null, countries: null, dest: null, destination: null });
  };

  const activeCont = continents.find((c) => c.id === activeContinent);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 md:pb-0 font-sans">
      <style>{swiperCustomStyles}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[92svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic BG — key + load state so src swaps reliably when region changes */}
        <motion.img
          key={heroImage}
          src={heroImage}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 z-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: heroImgLoaded ? 1 : 0, scale: heroImgLoaded ? 1 : 1.06 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          onLoad={() => setHeroImgLoaded(true)}
        />

        {/* Layered overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

        {/* Active region label — top left */}
        <AnimatePresence>
          {activeContinent !== "all" && activeCont && (
            <motion.div key={activeContinent} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="absolute top-28 left-6 md:left-12 z-10 flex items-center gap-3"
            >
              <span className="text-3xl">{activeCont.emoji}</span>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Now Browsing</p>
                <p className="text-white font-bold text-lg leading-none">{activeCont.label}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-5 pt-28 pb-16">
          {/* Eyebrow badge */}
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md border border-white/25 text-white/90 text-[10px] font-bold px-5 py-2 rounded-full inline-flex items-center gap-2 mb-7 uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3 text-secondary" /> Curated by experts · 50+ Destinations Worldwide
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1 key={activeContinent} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-['Marcellus'] text-white text-center text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[1.07] mb-5"
            >
              {activeContinent === "all"
                ? <>Discover Your<br className="hidden md:block" /> <span className="text-secondary-light">Perfect Holiday</span></>
                : <>{activeCont?.label}<br className="hidden md:block" /> <span className="text-secondary-light">Awaits You</span></>
              }
            </motion.h1>
          </AnimatePresence>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-white/75 font-light text-base md:text-xl max-w-2xl text-center mb-10 min-h-[2rem]"
          >
            {activeCont?.hook || "From tropical beaches to alpine peaks — handpicked escapes for every kind of traveller"}
          </motion.p>

          {/* Search bar */}
          <motion.form initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45 }}
            className="w-full max-w-2xl mx-auto mb-10" onSubmit={(e) => e.preventDefault()}
          >
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-2 p-2 pl-5">
              <Search className="text-slate-400 w-5 h-5 shrink-0" />
              <input type="search" placeholder="Search destination, country or experience…"
                className="flex-1 outline-none text-slate-800 placeholder:text-slate-400 text-base bg-transparent border-none focus:ring-0 py-2.5"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoComplete="off"
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm("")} className="text-slate-400 hover:text-slate-600 transition-colors p-1.5">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button type="submit"
                className="bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap shadow-lg shadow-primary/30"
              >
                <Search className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:block">Search Packages</span>
                <span className="sm:hidden">Go</span>
              </button>
            </div>
          </motion.form>

          {/* Destination image chips */}
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55 }}
            className="w-full max-w-4xl mx-auto"
          >
            <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold mb-4 text-center">Popular Destinations</p>
            <Swiper modules={[Autoplay]} spaceBetween={10} slidesPerView="auto" grabCursor
              autoplay={{ delay: 3000, disableOnInteraction: true }} loop className="w-full"
            >
              {heroPills.map((pill) => {
                const isActive = searchTerm.toLowerCase() === pill.query.toLowerCase();
                return (
                  <SwiperSlide key={pill.label} className="!w-auto">
                    <button type="button" onClick={() => setSearchTerm(isActive ? "" : pill.query)}
                      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 flex items-center gap-3 pr-4 pl-1.5 py-1.5 ${
                        isActive ? "bg-white border-white text-primary scale-105 shadow-2xl" : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/50 shadow-lg"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-inner border border-white/20">
                        <img src={pill.image} alt={pill.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      </div>
                      <span className="font-bold whitespace-nowrap text-sm">{pill.label}</span>
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>

          {/* Quick stat badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 pt-8 border-t border-white/15"
          >
            {[
              { icon: Users, label: "20,000+ Happy Travellers" },
              { icon: Globe, label: "50+ Destinations" },
              { icon: Award, label: "20+ Years Experience" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/75">
                <Icon className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── SMART FILTERS FLOATING CARD ──────────────────────────────────────── */}
      <div className="relative z-20 -mt-10 px-4">
        <div className="content-container">
          <div className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-slate-900/10 rounded-3xl p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              {/* Insight strip — shows context for selected region */}
              <div className="flex-1 flex flex-wrap md:flex-nowrap gap-3">
                <SmartFilterDropdown icon={Calendar} label="Best Season"
                  value={selectedDurations[0] || "all"} hint={currentInsights.find((i) => i.label === "Best Season")?.value}
                  options={[{ id: "all", label: "Any Time" }, ...DURATION_OPTIONS]}
                  onChange={(id) => updateParams({ dur: id === "all" ? null : id })}
                />
                <div className="hidden md:block w-px self-stretch bg-slate-200/60" />
                <SmartFilterDropdown icon={Wallet} label="Budget Range"
                  value={selectedPrices[0] || "all"} hint={currentInsights.find((i) => i.label === "Budget Range")?.value}
                  options={[{ id: "all", label: "Any Budget" }, ...PRICE_OPTIONS]}
                  onChange={(id) => updateParams({ price: id === "all" ? null : id })}
                />
                <div className="hidden md:block w-px self-stretch bg-slate-200/60" />
                <SmartFilterDropdown icon={Star} label="Travel Style"
                  value={activeStyle} hint={currentInsights.find((i) => i.label === "Top Experience")?.value}
                  options={travelStyles}
                  onChange={(id) => updateParams({ style: id === "all" ? null : id })}
                />
              </div>

              <div className="hidden md:block w-px self-stretch bg-slate-200/60" />

              <button onClick={() => document.getElementById("packages-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="md:w-auto bg-primary text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
              >
                <Search className="w-4 h-4" /> Find Packages
              </button>
            </div>

            {/* Contextual insight pills */}
            <AnimatePresence>
              {activeContinent !== "all" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-100">
                    {currentInsights.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{label}</span>
                        <span className="text-xs font-bold text-slate-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── STICKY FILTER BAR (Region + Style) ───────────────────────────────── */}
      <div ref={filterBarRef}
        className={`sticky top-[4rem] lg:top-[6.5rem] z-30 transition-all duration-300 ${
          filterBarStuck ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/80 py-2" : "bg-white border-b border-slate-200 py-4 mt-8"
        }`}
      >
        <div className="content-container flex flex-col xl:flex-row gap-3 xl:items-center justify-between">
          {/* Region Segmented Tabs */}
          <div className="flex-1 overflow-hidden">
            <div ref={continentStripRef}
              onPointerDown={onContinentStripPointerDown} onPointerMove={onContinentStripPointerMove}
              onPointerUp={endContinentStripDrag} onPointerCancel={endContinentStripDrag}
              onLostPointerCapture={onContinentStripLostPointerCapture}
              className={`flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain touch-none select-none bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 ${continentGrabbing ? "cursor-grabbing" : "cursor-grab md:cursor-default"}`}
            >
              {continents.map((cont) => {
                const isActive = activeContinent === cont.id;
                const count = packagesData.filter((p) =>
                  (cont.id === "all" || p.continent.toLowerCase() === cont.id) &&
                  (activeStyle === "all" || matchesTravelStyle(p, activeStyle)) &&
                  (selectedPrices.length === 0 || selectedPrices.some((b) => matchesPriceBucket(p.price, b))) &&
                  (selectedDurations.length === 0 || selectedDurations.some((b) => matchesDurationBucket(packageDayCount(p.duration), b)))
                ).length;

                return (
                  <button key={cont.id} type="button" onClick={onContinentPillClick(cont.id)}
                    className={`shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 relative ${
                      isActive ? "text-primary" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="activeRegionTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                      />
                    )}
                    <span className="relative z-10 text-base">{cont.emoji}</span>
                    <span className="relative z-10">{cont.label}</span>
                    {cont.id !== "all" && (
                      <span className={`relative z-10 text-[9px] px-1.5 py-0.5 rounded-md font-bold ${isActive ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Segmented Tabs */}
          <div className={`overflow-hidden xl:max-w-lg transition-all duration-300 ${filterBarStuck ? "hidden md:block" : "block"}`}>
            <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
              {travelStyles.map((style) => {
                const isActive = activeStyle === style.id;
                return (
                  <button key={style.id} type="button"
                    onClick={() => updateParams({ style: style.id === "all" ? null : style.id })}
                    className={`shrink-0 flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 relative ${
                      isActive ? "text-primary" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="activeStyleTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                      />
                    )}
                    <span className="relative z-10">{style.icon}</span>
                    <span className="relative z-10">{style.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOP DESTINATIONS (dynamic bento grid) ────────────────────────────── */}
      <div className="content-container pt-14 pb-6">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Handpicked Escapes
            </p>
            <AnimatePresence mode="wait">
              <motion.h2 key={destinationTitle} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }} className="font-['Marcellus'] text-2xl md:text-3xl text-slate-900"
              >
                {destinationTitle}
              </motion.h2>
            </AnimatePresence>
          </div>
          <button type="button" onClick={() => document.getElementById("packages-grid")?.scrollIntoView({ behavior: "smooth" })}
            className="text-primary font-bold text-sm hover:underline flex items-center gap-1 transition-colors"
          >
            View All Packages <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={destinationTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {visibleDestinations.length >= 4 ? (
              // Bento layout: 1 big left + 3 right (top 2 side by side, bottom 1 full)
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {/* Big feature card */}
                <div className="col-span-2 row-span-2 md:row-span-2">
                  <DestCard dest={visibleDestinations[0]} big />
                </div>
                {visibleDestinations.slice(1, 3).map((dest) => (
                  <div key={dest.slug}><DestCard dest={dest} /></div>
                ))}
                <div className="col-span-2 md:col-span-2">
                  <DestCard dest={visibleDestinations[3]} />
                </div>
                {visibleDestinations.slice(4).map((dest) => (
                  <div key={dest.slug}><DestCard dest={dest} /></div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-4 ${
                visibleDestinations.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
                visibleDestinations.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
              }`}>
                {visibleDestinations.map((dest, i) => (
                  <DestCard key={dest.slug} dest={dest} big={i === 0} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── HONEYMOON FEATURED STRIP (shown when no honeymoon filter is active) ── */}
      {activeStyle !== "honeymoon" && (
        <div className="content-container my-6">
          <div className="relative rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=2000&q=80" alt="Honeymoon"
              className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-950/90 via-rose-900/70 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">
              <div className="max-w-xl">
                <p className="text-rose-300 text-[11px] font-bold uppercase tracking-widest mb-3">💍 Romantic Escapes</p>
                <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-white mb-3 leading-tight">
                  Plan Your Dream Honeymoon
                </h2>
                <p className="text-white/70 font-light text-base md:text-lg">
                  Maldives, Bali, Santorini, Swiss Alps — crafted exclusively for couples seeking the perfect start.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button onClick={() => updateParams({ style: "honeymoon" })}
                  className="bg-white text-rose-700 font-bold px-8 py-4 rounded-2xl hover:bg-rose-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl"
                >
                  <Heart className="w-4 h-4" /> Explore Honeymoon Packages
                </button>
                <a href="/packages?style=honeymoon"
                  className="bg-primary border border-primary/30 text-white font-bold px-6 py-4 rounded-2xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PACKAGES SECTION ─────────────────────────────────────────────────── */}
      <div id="packages-grid" className="content-container mt-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile filter toggle */}
          <button type="button"
            className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl py-3.5 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-colors"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {hasActiveFilters && (
              <span className="bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {[selectedPrices, selectedDurations, selectedCountries, selectedCategories, selectedDestinations].flat().length + (activeContinent !== "all" ? 1 : 0) + (activeStyle !== "all" ? 1 : 0)}
              </span>
            )}
          </button>

          {/* ── Sidebar filters ── */}
          <aside className={`lg:w-[260px] shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-[10rem]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <h2 className="font-['Marcellus'] text-lg text-slate-900">Filter Results</h2>
                </div>
                {hasActiveFilters && (
                  <button type="button" onClick={clearAllFilters} className="text-primary text-xs font-bold hover:underline">Reset All</button>
                )}
              </div>

              {[
                { title: "Budget per person", icon: Wallet, items: PRICE_OPTIONS, key: "price" as const, selected: selectedPrices },
                { title: "Duration", icon: Clock, items: DURATION_OPTIONS, key: "dur" as const, selected: selectedDurations },
              ].map(({ title, icon: Icon, items, key, selected }) => (
                <div key={title} className="mb-5">
                  <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" /> {title}
                  </h3>
                  <div className="space-y-0.5">
                    {items.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-3 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5">
                        <input type="checkbox" className="accent-primary w-4 h-4 rounded shrink-0" checked={selected.includes(opt.id)} onChange={() => toggleListParam(key, opt.id)} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 mt-4" />
                </div>
              ))}

              {/* Country */}
              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Country</h3>
                <div className="space-y-0.5">
                  {uniqueCountries.map((c) => (
                    <label key={c} className="flex items-center gap-3 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5">
                      <input type="checkbox" className="accent-primary w-4 h-4 rounded shrink-0" checked={selectedCountries.includes(c)} onChange={() => toggleListParam("countries", c)} />
                      {c}
                    </label>
                  ))}
                </div>
                <div className="border-t border-slate-100 mt-4" />
              </div>

              {/* Destination */}
              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Destination</h3>
                <div className="space-y-0.5">
                  {uniqueDestinations.map((d) => (
                    <label key={d} className="flex items-center gap-3 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5">
                      <input type="checkbox" className="accent-primary w-4 h-4 rounded shrink-0" checked={selectedDestinations.includes(d)} onChange={() => toggleListParam("dest", d)} />
                      {d}
                    </label>
                  ))}
                </div>
                <div className="border-t border-slate-100 mt-4" />
              </div>

              {/* Category */}
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Travel Category</h3>
                <div className="space-y-0.5">
                  {uniqueCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5">
                      <input type="checkbox" className="accent-primary w-4 h-4 rounded shrink-0" checked={selectedCategories.includes(cat)} onChange={() => toggleListParam("cat", cat)} />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Package Grid ── */}
          <main className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-slate-700 text-sm font-semibold">
                    <span className="font-['Marcellus'] text-2xl text-primary mr-1">{filteredPackages.length}</span>
                    Package{filteredPackages.length !== 1 ? "s" : ""} Found
                  </span>
                </div>
                {hasActiveFilters && (
                  <div className="flex gap-2 flex-wrap">
                    {searchTerm.trim()         && <FilterChip label={`"${searchTerm}"`}   onRemove={() => updateParams({ q: null })} />}
                    {destinationSlug           && <FilterChip label={destinationSlug}     onRemove={() => updateParams({ destination: null })} />}
                    {activeContinent !== "all" && <FilterChip label={continents.find((c) => c.id === activeContinent)?.label ?? ""} onRemove={() => updateParams({ continent: null })} />}
                    {activeStyle !== "all"     && <FilterChip label={travelStyles.find((s) => s.id === activeStyle)?.label ?? ""}  onRemove={() => updateParams({ style: null })} />}
                    {selectedPrices.map((id)   => <FilterChip key={id} label={PRICE_OPTIONS.find((p)    => p.id === id)?.label ?? ""}   onRemove={() => toggleListParam("price",     id)} />)}
                    {selectedDurations.map((id)=> <FilterChip key={id} label={DURATION_OPTIONS.find((d) => d.id === id)?.label ?? ""}   onRemove={() => toggleListParam("dur",        id)} />)}
                    {selectedCountries.map((c) => <FilterChip key={c}  label={c}                                                         onRemove={() => toggleListParam("countries", c)}  />)}
                    {selectedDestinations.map((d)=><FilterChip key={d} label={d}                                                         onRemove={() => toggleListParam("dest",      d)}  />)}
                    {selectedCategories.map((cat)=><FilterChip key={cat} label={cat}                                                     onRemove={() => toggleListParam("cat",       cat)}/>)}
                    <button type="button" onClick={clearAllFilters}
                      className="text-slate-400 hover:text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-dashed border-slate-300 hover:border-primary transition-colors"
                    >Clear All</button>
                  </div>
                )}
              </div>
              <Dropdown options={sortOptions} value={sortBy} onChange={setSortBy} size="sm" className="w-[210px] shrink-0" />
            </div>

            {/* Cards */}
            {filteredPackages.length > 0 ? (
              <motion.div initial="hidden" animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="py-24 flex flex-col items-center text-center bg-white rounded-3xl border border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="font-['Marcellus'] text-2xl text-slate-900 mb-2">No packages found</h3>
                <p className="text-slate-500 max-w-sm mb-8 font-light">
                  We couldn't find any holiday packages matching your selection. Try adjusting or resetting your filters.
                </p>
                <button onClick={clearAllFilters}
                  className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* ── TRUST STATS BANNER ───────────────────────────────────────────────── */}
      <div className="content-container mt-20">
        <div className="relative bg-primary rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08]" loading="lazy" />
          <div className="relative z-10 px-8 md:px-14 py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
              {[
                { icon: Users,  value: "20,000+", label: "Happy Travellers" },
                { icon: Globe,  value: "50+",     label: "Destinations" },
                { icon: Award,  value: "20+",     label: "Years Experience" },
                { icon: Plane,  value: "500+",    label: "Packages Curated" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-1">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="font-['Marcellus'] text-4xl text-white">{value}</div>
                  <div className="text-white/55 text-[10px] font-bold uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-10 border-t border-white/10">
              <div>
                <h2 className="font-['Marcellus'] text-2xl md:text-3xl text-white leading-tight mb-2">
                  Confused? Let Us Plan Your Perfect Trip
                </h2>
                <p className="text-white/60 font-light max-w-xl">
                  Our experts craft personalised itineraries tailored to your travel style, budget and dream destination.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a href="/contact" className="bg-white text-primary font-bold px-7 py-3.5 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg">
                  Start Planning <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://wa.me/919090403075" target="_blank" rel="noreferrer"
                  className="border-2 border-white/30 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRAVELLER INSIGHTS ───────────────────────────────────────────────── */}
      <div className="bg-slate-900 py-20 mt-20">
        <div className="content-container">
          <div className="text-center mb-14">
            <p className="text-secondary text-[11px] font-bold uppercase tracking-widest mb-3">Before You Go</p>
            <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-white mb-3">Traveller Insights</h2>
            <p className="text-white/45 font-light max-w-lg mx-auto">Everything you need to know to travel smarter and enjoy more</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Wallet,  title: "Currency & Budget",   desc: "Smart budgeting tips, currency exchange guidance, and cost-of-living comparisons for every destination." },
              { icon: Shield,  title: "Safety & Travel Tips",desc: "Updated safety insights, local laws, and practical travel advice so you travel confidently." },
              { icon: Banknote,title: "Visa & Documents",    desc: "Expert visa guidance, documentation support, and embassy-ready checklists for 50+ destinations." },
              { icon: Globe,   title: "Destination Insights",desc: "From food culture to local customs — deep-dive destination guides to help you experience more." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-7 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 text-secondary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/35 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-['Marcellus'] text-xl text-white mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useCallback, useState, useRef } from "react";
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
  Utensils,
  ShoppingBag,
  Banknote,
  Shield,
  MessageCircle,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Dropdown from "../components/common/Dropdown";
import { motion } from "framer-motion";

type PackageRow = {
  id: number;
  title: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  category: string;
  continent: string;
  /** Matches `travelStyles` ids (except `all`) for the style filter */
  styleTags: string[];
};

const packagesData: PackageRow[] = [
  {
    id: 1,
    title: "Bali Bliss & Temples",
    destination: "Bali, Indonesia",
    country: "Indonesia",
    duration: "7 Days",
    price: 1200,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    tags: ["Best Seller"],
    category: "International",
    continent: "asia",
    styleTags: ["budget", "nature", "honeymoon"],
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    destination: "Switzerland",
    country: "Switzerland",
    duration: "10 Days",
    price: 3400,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    tags: ["Adventure"],
    category: "International",
    continent: "europe",
    styleTags: ["adventure", "luxury", "nature"],
  },
  {
    id: 3,
    title: "Maldives Honeymoon",
    destination: "Maldives",
    country: "Maldives",
    duration: "5 Days",
    price: 2800,
    rating: 5.0,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800",
    tags: ["Honeymoon"],
    category: "Honeymoon",
    continent: "asia",
    styleTags: ["honeymoon", "luxury", "nature"],
  },
  {
    id: 4,
    title: "Dubai City Tour",
    destination: "UAE",
    country: "UAE",
    duration: "4 Days",
    price: 900,
    rating: 4.6,
    reviews: 340,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    tags: [],
    category: "International",
    continent: "middle-east",
    styleTags: ["budget", "luxury", "group"],
  },
  {
    id: 5,
    title: "Golden Triangle Explorer",
    destination: "India",
    country: "India",
    duration: "8 Days",
    price: 1100,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    tags: ["Culture"],
    category: "Domestic",
    continent: "india",
    styleTags: ["family", "budget", "nature"],
  },
  {
    id: 6,
    title: "Santorini Sunset",
    destination: "Greece",
    country: "Greece",
    duration: "6 Days",
    price: 2100,
    rating: 4.9,
    reviews: 92,
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800",
    tags: ["Romantic"],
    category: "Honeymoon",
    continent: "europe",
    styleTags: ["honeymoon", "luxury", "nature"],
  },
];

const continents = [
  {
    id: "all",
    label: "All Regions",
    emoji: "🌎",
    packageCount: 6,
    image: "",
    hook: "",
    countries: [],
  },
  {
    id: "asia",
    label: "Asia",
    emoji: "🌏",
    packageCount: 24,
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    hook: "Beaches, temples & vibrant cities",
    countries: [
      "Thailand",
      "Bali",
      "Singapore",
      "Vietnam",
      "Maldives",
      "Japan",
    ],
  },
  {
    id: "europe",
    label: "Europe",
    emoji: "🌍",
    packageCount: 18,
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    hook: "History, culture & alpine magic",
    countries: ["Switzerland", "France", "Greece", "Italy", "UK", "Spain"],
  },
  {
    id: "middle-east",
    label: "Middle East",
    emoji: "🌙",
    packageCount: 10,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    hook: "Luxury, desert & modern skylines",
    countries: ["UAE", "Jordan", "Oman", "Qatar", "Egypt"],
  },
  {
    id: "africa",
    label: "Africa",
    emoji: "🦁",
    packageCount: 8,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
    hook: "Safari, wildlife & island escapes",
    countries: ["Tanzania", "Mauritius", "Kenya", "Morocco", "Seychelles"],
  },
  {
    id: "america",
    label: "Americas",
    emoji: "🗽",
    packageCount: 6,
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
    hook: "Iconic cities & natural wonders",
    countries: ["USA", "Canada", "Alaska", "South America"],
  },
  {
    id: "pacific",
    label: "Australia & Pacific",
    emoji: "🦘",
    packageCount: 5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    hook: "Wildlife, beaches & raw nature",
    countries: ["Australia", "New Zealand", "Fiji"],
  },
  {
    id: "india",
    label: "India Holidays",
    emoji: "🇮🇳",
    packageCount: 20,
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    hook: "Heritage, mountains & coastal gems",
    countries: ["Kerala", "Rajasthan", "Goa", "Himachal", "Andaman"],
  },
];

const travelStyles = [
  { id: "all", label: "All", icon: "✈️" },
  { id: "luxury", label: "Luxury", icon: "👑" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "adventure", label: "Adventure", icon: "🏔" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "honeymoon", label: "Honeymoon", icon: "💍" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "group", label: "Group", icon: "👥" },
];

const quickInsights = [
  { icon: Calendar, label: "Best Season", value: "Oct – Mar" },
  { icon: Wallet, label: "Budget Range", value: "$500 – $5000" },
  { icon: Heart, label: "Ideal For", value: "All Types" },
  { icon: FileCheck, label: "Visa", value: "We Assist" },
  { icon: Star, label: "Top Experience", value: "Cultural Tours" },
];

const travelerInsights = [
  {
    icon: Utensils,
    title: "Food Culture",
    desc: "From street food adventures to fine dining — we help you discover the best local flavours at every destination.",
  },
  {
    icon: ShoppingBag,
    title: "Shopping",
    desc: "Know what to buy and where — from local markets to luxury malls, we share insider shopping guides.",
  },
  {
    icon: Banknote,
    title: "Currency & Budget",
    desc: "Smart budgeting tips, currency exchange guidance, and cost-of-living comparisons for every destination.",
  },
  {
    icon: Shield,
    title: "Safety Tips",
    desc: "Updated safety insights, local laws, and practical travel tips so you travel confidently.",
  },
];

const featuredDestinations = [
  {
    name: "Thailand",
    country: "Thailand",
    packages: 12,
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
    hook: "Beaches, temples & world-famous nightlife",
    slug: "thailand",
    continent: "asia",
  },
  {
    name: "Bali",
    country: "Indonesia",
    packages: 9,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    hook: "Spiritual, scenic & absolutely stunning",
    slug: "bali",
    continent: "asia",
  },
  {
    name: "Switzerland",
    country: "Switzerland",
    packages: 8,
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80",
    hook: "Alpine luxury beyond imagination",
    slug: "switzerland",
    continent: "europe",
  },
  {
    name: "Dubai",
    country: "UAE",
    packages: 11,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    hook: "Desert luxury meets modern skylines",
    slug: "dubai",
    continent: "middle-east",
  },
  {
    name: "Maldives",
    country: "Maldives",
    packages: 7,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    hook: "Overwater bliss, crystal waters",
    slug: "maldives",
    continent: "asia",
  },
  {
    name: "Greece",
    country: "Greece",
    packages: 6,
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80",
    hook: "Ancient myths, golden sunsets",
    slug: "greece",
    continent: "europe",
  },
];

const sortOptions = [
  { value: "recommended", label: "Sort by: Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "duration-short", label: "Duration: Shortest" },
  { value: "duration-long", label: "Duration: Longest" },
];

const PRICE_OPTIONS = [
  { id: "under1000", label: "Under $1000" },
  { id: "1000-2500", label: "$1000 – $2500" },
  { id: "2500-5000", label: "$2500 – $5000" },
  { id: "over5000", label: "Over $5000" },
] as const;

const DURATION_OPTIONS = [
  { id: "1-3", label: "1–3 Days" },
  { id: "4-7", label: "4–7 Days" },
  { id: "8-14", label: "1–2 Weeks" },
  { id: "15+", label: "15+ Days" },
] as const;

const DEST_SLUG_HINTS: Record<string, string[]> = {
  thailand: ["thailand"],
  bali: ["bali"],
  switzerland: ["switzerland"],
  dubai: ["dubai", "uae"],
  maldives: ["maldives"],
  greece: ["greece"],
};

function parseListParam(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function packageDayCount(duration: string): number {
  const m = duration.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function matchesPriceBucket(price: number, bucket: string): boolean {
  switch (bucket) {
    case "under1000":
      return price < 1000;
    case "1000-2500":
      return price >= 1000 && price <= 2500;
    case "2500-5000":
      return price > 2500 && price <= 5000;
    case "over5000":
      return price > 5000;
    default:
      return false;
  }
}

function matchesDurationBucket(days: number, bucket: string): boolean {
  switch (bucket) {
    case "1-3":
      return days >= 1 && days <= 3;
    case "4-7":
      return days >= 4 && days <= 7;
    case "8-14":
      return days >= 8 && days <= 14;
    case "15+":
      return days >= 15;
    default:
      return false;
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

const uniqueCountries = [...new Set(packagesData.map((p) => p.country))].sort();
const uniqueCategories = [
  ...new Set(packagesData.map((p) => p.category)),
].sort();
const uniqueDestinations = [
  ...new Set(packagesData.map((p) => p.destination.split(",")[0].trim())),
].sort();

const heroPills: { label: string; query: string }[] = [
  { label: "🇹🇭 Thailand", query: "Thailand" },
  { label: "🇮🇩 Bali", query: "Bali" },
  { label: "🇦🇪 Dubai", query: "Dubai" },
  { label: "🇸🇬 Singapore", query: "Singapore" },
  { label: "🇫🇷 France", query: "France" },
  { label: "🇯🇵 Japan", query: "Japan" },
];

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const continentStripRef = useRef<HTMLDivElement>(null);
  const continentDragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    scroll0: 0,
    dragged: false,
  });
  const blockContinentPillClick = useRef(false);
  const [continentGrabbing, setContinentGrabbing] = useState(false);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, val] of Object.entries(patch)) {
            if (val === null || val === "") next.delete(key);
            else next.set(key, val);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const toggleListParam = useCallback(
    (key: "price" | "dur" | "countries" | "cat" | "dest", id: string) => {
      setSearchParams(
        (prev) => {
          const n = new URLSearchParams(prev);
          const raw = n.get(key);
          const list = parseListParam(raw);
          const nextList = list.includes(id)
            ? list.filter((x) => x !== id)
            : [...list, id];
          if (nextList.length === 0) n.delete(key);
          else n.set(key, nextList.join(","));
          return n;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const searchTerm = searchParams.get("q") ?? "";
  const destinationSlug = searchParams.get("destination") ?? "";
  const activeContinent = searchParams.get("continent") ?? "all";
  const activeStyle = searchParams.get("style") ?? "all";
  const rawSort = searchParams.get("sort") ?? "recommended";
  const sortBy = sortOptions.some((o) => o.value === rawSort)
    ? rawSort
    : "recommended";
  const selectedPrices = parseListParam(searchParams.get("price"));
  const selectedDurations = parseListParam(searchParams.get("dur"));
  const selectedCountries = parseListParam(searchParams.get("countries"));
  const selectedCategories = parseListParam(searchParams.get("cat"));
  const selectedDestinations = parseListParam(searchParams.get("dest"));

  const setSearchTerm = (value: string) => {
    const v = value.trim();
    updateParams({ q: v ? v : null });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const filteredPackages = useMemo(() => {
    let list = [...packagesData];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (destinationSlug) {
      list = list.filter((p) => matchesDestinationSlug(p, destinationSlug));
    }

    if (activeContinent !== "all") {
      const c = activeContinent.toLowerCase();
      list = list.filter((p) => p.continent.toLowerCase() === c);
    }

    if (activeStyle !== "all") {
      list = list.filter((p) => matchesTravelStyle(p, activeStyle));
    }

    if (selectedPrices.length > 0) {
      list = list.filter((p) =>
        selectedPrices.some((b) => matchesPriceBucket(p.price, b)),
      );
    }

    if (selectedDurations.length > 0) {
      list = list.filter((p) => {
        const days = packageDayCount(p.duration);
        return selectedDurations.some((b) => matchesDurationBucket(days, b));
      });
    }

    if (selectedCountries.length > 0) {
      list = list.filter((p) =>
        selectedCountries.some(
          (c) => p.country.toLowerCase() === c.toLowerCase(),
        ),
      );
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) =>
        selectedCategories.some(
          (c) => p.category.toLowerCase() === c.toLowerCase(),
        ),
      );
    }

    if (selectedDestinations.length > 0) {
      list = list.filter((p) =>
        selectedDestinations.some((d) =>
          p.destination.toLowerCase().includes(d.toLowerCase()),
        ),
      );
    }

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "duration-short":
        list.sort(
          (a, b) => packageDayCount(a.duration) - packageDayCount(b.duration),
        );
        break;
      case "duration-long":
        list.sort(
          (a, b) => packageDayCount(b.duration) - packageDayCount(a.duration),
        );
        break;
      default:
        break;
    }

    return list;
  }, [
    searchTerm,
    destinationSlug,
    activeContinent,
    activeStyle,
    sortBy,
    selectedPrices,
    selectedDurations,
    selectedCountries,
    selectedCategories,
    selectedDestinations,
  ]);

  const hasActiveFilters =
    !!searchTerm.trim() ||
    !!destinationSlug ||
    activeContinent !== "all" ||
    activeStyle !== "all" ||
    sortBy !== "recommended" ||
    selectedPrices.length > 0 ||
    selectedDurations.length > 0 ||
    selectedCountries.length > 0 ||
    selectedCategories.length > 0 ||
    selectedDestinations.length > 0;

  const setSortBy = (v: string) => {
    updateParams({ sort: v === "recommended" ? null : v });
  };

  const onContinentStripPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = continentStripRef.current;
    if (!el) return;
    continentDragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      scroll0: el.scrollLeft,
      dragged: false,
    };
    // No setPointerCapture here to allow clicks on simple taps
  };

  const onContinentStripPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    const d = continentDragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const el = continentStripRef.current;
    if (!el) return;

    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 10 && !d.dragged) {
      d.dragged = true;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      setContinentGrabbing(e.pointerType === "mouse");
    }

    if (d.dragged) {
      el.scrollLeft = d.scroll0 - dx;
    }
  };

  const endContinentStripDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = continentDragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const el = continentStripRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* released */
      }
    }
    if (d.dragged) {
      blockContinentPillClick.current = true;
      window.setTimeout(() => {
        blockContinentPillClick.current = false;
      }, 0);
    }
    d.active = false;
    d.pointerId = -1;
    d.dragged = false;
    setContinentGrabbing(false);
  };

  const onContinentStripLostPointerCapture = () => {
    const d = continentDragRef.current;
    d.active = false;
    d.pointerId = -1;
    d.dragged = false;
    setContinentGrabbing(false);
  };

  const onContinentPillClick = (contId: string) => (e: React.MouseEvent) => {
    if (blockContinentPillClick.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    updateParams({
      continent: contId === "all" ? null : contId,
      q: null,
      countries: null,
      dest: null,
      destination: null,
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 md:pb-0 font-sans">
      <div className="relative min-h-[80svh] py-10 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&q=80"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl pt-20"
        >
          <motion.div
            variants={{
              hidden: { y: 30, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 uppercase tracking-widest"
          >
            <Globe className="w-4 h-4" /> Explore 50+ Destinations
          </motion.div>

          <motion.h1
            variants={{
              hidden: { y: 30, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="font-['Marcellus'] text-white text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] mb-4"
          >
            Discover Your Perfect Holiday
          </motion.h1>

          <motion.p
            variants={{
              hidden: { y: 30, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="text-white/75 font-light text-lg md:text-xl max-w-2xl mb-10"
          >
            From tropical beaches to alpine peaks — find, compare and plan your
            dream trip with expert guidance
          </motion.p>

          <motion.form
            variants={{
              hidden: { y: 30, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="w-full max-w-2xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl flex sm:flex-row flex-col items-center gap-3 px-5 py-4 overflow-hidden">
              <div className="flex-1 flex gap-3 items-center">
                <Search className="text-slate-200 w-5 h-5 shrink-0 sm:block hidden" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search destination, or country..."
                  className="flex-1 min-h-12 outline-none text-slate-800 placeholder:text-slate-200 text-base bg-transparent border-none focus:ring-0 p-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="min-h-12 w-full sm:w-fit text-center justify-center bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors hover:bg-primary/90"
              >
                Search
              </button>
            </div>
          </motion.form>

          <motion.div
            variants={{
              hidden: { y: 30, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {heroPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => setSearchTerm(pill.query)}
                className="min-h-12 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/25 cursor-pointer transition-all"
              >
                {pill.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-white border-b border-slate-100 py-5">
        <div className="content-container grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickInsights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.label}
                className={`flex items-center gap-3 ${i !== quickInsights.length - 1 ? "md:border-r md:border-slate-100" : ""}`}
              >
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-200 text-[11px] uppercase tracking-wide font-bold">
                    {insight.label}
                  </div>
                  <div className="text-slate-900 font-bold text-sm">
                    {insight.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="content-container pt-12">
        <div className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-4">
          Browse by Region
        </div>
        {/* motion must NOT wrap the overflow scroller — transform breaks touch/native horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <div
            ref={continentStripRef}
            onPointerDown={onContinentStripPointerDown}
            onPointerMove={onContinentStripPointerMove}
            onPointerUp={endContinentStripDrag}
            onPointerCancel={endContinentStripDrag}
            onLostPointerCapture={onContinentStripLostPointerCapture}
            className={`flex gap-3 pb-2 overflow-x-auto overscroll-x-contain touch-none select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${continentGrabbing ? "cursor-grabbing" : "cursor-grab"
              }`}
          >
            {continents.map((cont) => (
              <button
                key={cont.id}
                type="button"
                onClick={onContinentPillClick(cont.id)}
                className={`min-h-12 shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${activeContinent === cont.id
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white border-slate-200 text-slate-700 hover:border-primary/40 hover:text-primary"
                  }`}
              >
                <span>{cont.emoji}</span>
                <span>{cont.label}</span>
                {cont.id !== "all" && (
                  <span className="text-xs font-bold opacity-60 ml-1">
                    {cont.packageCount} trips
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="content-container mt-8">
        <div className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-4">
          Filter by Travel Style
        </div>
        <div className="flex flex-wrap gap-2">
          {travelStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() =>
                updateParams({ style: style.id === "all" ? null : style.id })
              }
              className={`min-h-12 flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold cursor-pointer transition-all ${activeStyle === style.id
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary/40"
                }`}
            >
              <span>{style.icon}</span>
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="content-container mt-12">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="font-['Marcellus'] text-2xl md:text-3xl text-slate-900">
            Top Destinations Right Now
          </h2>
          <a
            href="/packages"
            className="text-primary font-semibold text-sm hover:underline flex items-center gap-1 min-h-12"
          >
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {featuredDestinations.map((dest) => (
            <motion.a
              key={dest.slug}
              href={`/packages?destination=${encodeURIComponent(dest.slug)}`}
              variants={{
                hidden: { scale: 0.93, opacity: 0 },
                show: { scale: 1, opacity: 1 },
              }}
              className="relative h-[160px] md:h-[240px] rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <div className="bg-primary/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full inline-block mb-2">
                  {dest.packages} Packages
                </div>
                <h3 className="font-['Marcellus'] text-white text-lg font-bold leading-tight">
                  {dest.name}
                </h3>
                <p className="text-white/70 text-[11px] font-light leading-snug mt-0.5 hidden md:block">
                  {dest.hook}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="content-container mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <button
            type="button"
            className="lg:hidden min-h-12 w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl py-3.5 text-slate-700 font-semibold shadow-sm mb-4"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Filter Packages"}
          </button>

          <aside
            className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <h2 className="font-['Marcellus'] text-lg text-slate-900">
                    Filter Results
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-primary text-xs font-bold hover:underline cursor-pointer min-h-10 px-1"
                >
                  Reset
                </button>
              </div>

              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary" /> Budget per person
                </h3>
                <div className="space-y-1">
                  {PRICE_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 min-h-12 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary w-4 h-4 rounded shrink-0"
                        checked={selectedPrices.includes(opt.id)}
                        onChange={() => toggleListParam("price", opt.id)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 my-5" />

              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Duration
                </h3>
                <div className="space-y-1">
                  {DURATION_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 min-h-12 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary w-4 h-4 rounded shrink-0"
                        checked={selectedDurations.includes(opt.id)}
                        onChange={() => toggleListParam("dur", opt.id)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 my-5" />

              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> Country
                </h3>
                <div className="space-y-1">
                  {uniqueCountries.map((c) => (
                    <label
                      key={c}
                      className="flex items-center gap-3 min-h-12 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary w-4 h-4 rounded shrink-0"
                        checked={selectedCountries.includes(c)}
                        onChange={() => toggleListParam("countries", c)}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 my-5" />

              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Destination
                </h3>
                <div className="space-y-1">
                  {uniqueDestinations.map((d) => (
                    <label
                      key={d}
                      className="flex items-center gap-3 min-h-12 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary w-4 h-4 rounded shrink-0"
                        checked={selectedDestinations.includes(d)}
                        onChange={() => toggleListParam("dest", d)}
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 my-5" />

              <div className="mb-5">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" /> Travel category
                </h3>
                <div className="space-y-1">
                  {uniqueCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 min-h-12 py-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors rounded-lg px-2 hover:bg-primary/5"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary w-4 h-4 rounded shrink-0"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleListParam("cat", cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4 sticky top-16 lg:top-24 bg-slate-50/90 backdrop-blur-md z-20 py-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-slate-600 text-sm">
                  Showing {filteredPackages.length} packages
                </span>
                {hasActiveFilters && (
                  <div className="flex gap-2 flex-wrap items-center">
                    {searchTerm.trim() && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        &quot;{searchTerm}&quot;
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          aria-label="Remove search"
                          onClick={() => updateParams({ q: null })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {destinationSlug && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {destinationSlug}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          aria-label="Remove destination filter"
                          onClick={() => updateParams({ destination: null })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {activeContinent !== "all" && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {
                          continents.find((c) => c.id === activeContinent)
                            ?.label
                        }
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          aria-label="Remove region"
                          onClick={() => updateParams({ continent: null })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {activeStyle !== "all" && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {travelStyles.find((s) => s.id === activeStyle)?.label}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          aria-label="Remove style"
                          onClick={() => updateParams({ style: null })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {sortBy !== "recommended" && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        Sort:{" "}
                        {sortOptions
                          .find((o) => o.value === sortBy)
                          ?.label.replace(/^Sort by: /, "")}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          aria-label="Reset sort"
                          onClick={() => updateParams({ sort: null })}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {selectedPrices.map((id) => (
                      <span
                        key={id}
                        className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        {PRICE_OPTIONS.find((p) => p.id === id)?.label}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          onClick={() => toggleListParam("price", id)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {selectedDurations.map((id) => (
                      <span
                        key={id}
                        className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        {DURATION_OPTIONS.find((d) => d.id === id)?.label}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          onClick={() => toggleListParam("dur", id)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {selectedCountries.map((c) => (
                      <span
                        key={c}
                        className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        {c}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          onClick={() => toggleListParam("countries", c)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {selectedDestinations.map((d) => (
                      <span
                        key={d}
                        className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        {d}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          onClick={() => toggleListParam("dest", d)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        {cat}
                        <button
                          type="button"
                          className="min-h-8 min-w-8 flex items-center justify-center rounded-full hover:bg-primary/20"
                          onClick={() => toggleListParam("cat", cat)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Dropdown
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                size="sm"
                className="w-[200px]"
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.07 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                  >
                    <a
                      href={`/packages/${pkg.id}`}
                      className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                        {pkg.tags.length > 0 && (
                          <div className="absolute top-3 left-3 bg-secondary text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide z-10">
                            {pkg.tags[0]}
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                          <Clock className="w-3 h-3" /> {pkg.duration}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary font-bold text-xs px-5 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap z-10">
                          View Package &rarr;
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1 text-primary text-xs font-semibold mb-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {pkg.destination}
                        </div>
                        <h3 className="font-['Marcellus'] text-lg text-slate-900 group-hover:text-primary transition-colors mb-3 leading-snug">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center gap-4 text-slate-200 text-xs mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-slate-900 font-semibold">
                              {pkg.rating}
                            </span>
                            <span className="text-slate-200">
                              {" "}
                              ({pkg.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <div className="text-[10px] text-slate-200 uppercase tracking-wider">
                              Starting From
                            </div>
                            <div className="font-['Marcellus'] text-2xl text-slate-900">
                              ${pkg.price}
                            </div>
                          </div>
                          <a
                            href="/contact"
                            onClick={(e) => e.stopPropagation()}
                            className="btn-primary text-xs px-4 py-2.5 min-h-12"
                          >
                            Enquire Now
                          </a>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full py-20 flex flex-col items-center text-center bg-white rounded-3xl border border-dashed border-slate-200"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="font-['Marcellus'] text-2xl text-slate-900 mb-2">
                    No packages found
                  </h3>
                  <p className="text-slate-500 max-w-sm mb-8 font-light">
                    We couldn't find any holiday packages matching your current
                    filter selection. Try adjusting your search or resetting all
                    filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="btn-primary flex items-center gap-2 px-8"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </main>
        </div>
      </div>

      <div className="bg-slate-900 py-20 mt-20">
        <div className="content-container">
          <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-white text-center mb-3">
            Traveller Insights
          </h2>
          <p className="text-white/55 font-light text-center mb-12">
            Everything you need to know before you go
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {travelerInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.title}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  className="bg-white/[0.05] border border-white/10 rounded-3xl p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 text-secondary rounded-2xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Marcellus'] text-xl text-white font-bold mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    {insight.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="content-container mt-16 mb-16"
      >
        <div className="relative bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-10 md:p-14 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
            loading="lazy"
          />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="md:w-1/2">
              <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-white leading-tight mb-3">
                Confused? Let Us Plan Your Perfect Trip
              </h2>
              <p className="text-white/75 font-light text-lg">
                Our experts craft personalised itineraries tailored to your
                travel style, budget and dream.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:justify-end">
              <a
                href="/contact"
                className="min-h-12 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Start Planning
              </a>
              <a
                href="https://wa.me/919090403075"
                target="_blank"
                rel="noreferrer"
                className="min-h-12 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

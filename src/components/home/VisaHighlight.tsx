import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  ShieldCheck,
  Users,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { useHomepageConfig, useVisaCountries } from "../../hooks/useContent";
import { defaultHomepageConfig } from "../../data/defaultCmsContent";
import type { HomepageConfig } from "../../types/cms";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Clock,
  Users,
  ShieldCheck,
};

const staticFeaturedCountries = [
  {
    name: "USA",
    slug: "usa",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=1200",
    visaType: "B1/B2 Visitor Visa",
    cta: "Apply Now",
  },
  {
    name: "UK",
    slug: "uk",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200",
    visaType: "Standard Visitor Visa",
    cta: "Check Eligibility",
  },
  {
    name: "Canada",
    slug: "canada",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=1200",
    visaType: "Temporary Resident Visa",
    cta: "Apply Now",
  },
  {
    name: "Schengen",
    slug: "schengen",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200",
    visaType: "Tourist / Business Visa",
    cta: "Check Eligibility",
  },
  {
    name: "Australia",
    slug: "australia",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1200",
    visaType: "Subclass 600 Visitor",
    cta: "Apply Now",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VisaHighlight() {
  const { data: cmsHomepage } = useHomepageConfig<HomepageConfig>();
  const { data: visaCountries } = useVisaCountries();
  const copy = cmsHomepage?.visaHighlight
    ? { ...defaultHomepageConfig.visaHighlight, ...cmsHomepage.visaHighlight }
    : defaultHomepageConfig.visaHighlight;

  const featuredCountries = useMemo(() => {
    const featured = visaCountries?.filter((v) => v.featured);
    if (featured?.length) {
      return featured.slice(0, 8).map((v) => {
        const detail =
          v.detail && typeof v.detail === "object" && !Array.isArray(v.detail)
            ? (v.detail as { visaTypes?: { name?: string }[] })
            : {};
        const firstType = detail.visaTypes?.[0]?.name;
        return {
          name: v.name,
          slug: v.slug,
          image: v.image ?? staticFeaturedCountries[0].image,
          visaType: v.highlight_text ?? firstType ?? "Visa Services",
          cta: "Apply Now",
        };
      });
    }
    return staticFeaturedCountries;
  }, [visaCountries]);

  const trustPoints = copy.trustPoints.map((point, idx) => ({
    ...point,
    icon: iconMap[point.icon] ?? [Award, Clock, Users, ShieldCheck][idx % 4],
    tone: [
      "bg-secondary/25 text-primary",
      "bg-primary/10 text-primary",
      "bg-secondary/15 text-primary",
      "bg-primary/15 text-primary",
    ][idx % 4],
  }));

  const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    slides: {
      perView: 1.15,
      spacing: 14,
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      sliderInstanceRef.current?.next();
    }, 2600);

    return () => clearInterval(timer);
  }, [sliderInstanceRef]);

  return (
    <section className="py-14 md:py-20 bg-[#f8f6f1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-tight">
              {copy.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              {copy.subtitle}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="sm:hidden">
            <div ref={sliderRef} className="keen-slider overflow-visible">
              {featuredCountries.map((country) => (
                <a
                  key={country.slug}
                  href={`/visa/${country.slug}`}
                  className="keen-slider__slide group bg-white rounded-2xl border border-primary/10 overflow-hidden"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-primary">{country.name}</h3>
                    <p className="text-sm text-slate-600 mt-1 min-h-[2.5rem]">
                      {country.visaType}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary-dark">
                      {country.cta}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden sm:grid grid-cols-2 xl:grid-cols-5 gap-5 md:gap-6"
          >
            {featuredCountries.map((country) => (
              <motion.a
                key={country.slug}
                href={`/visa/${country.slug}`}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary">
                    {country.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 min-h-[2.5rem]">
                    {country.visaType}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary-dark group-hover:text-primary transition-colors">
                    {country.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {trustPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-2xl p-5 ${point.tone} shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="mt-3 text-lg font-bold">{point.title}</h4>
                  <p className="text-sm mt-1 text-primary/80">
                    {point.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 text-center"
          >
            <div className="flex sm:flex-row flex-col items-center gap-4 justify-center">
              <motion.a
                href="/visa"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(184,150,90,0.15)",
                    "0 0 0 12px rgba(184,150,90,0)",
                    "0 0 0 rgba(184,150,90,0.15)",
                  ],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-dark transition-colors"
              >
                {copy.primaryCta}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <a
                href={copy.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-primary border border-primary/30 bg-white/80 px-7 py-4 rounded-xl font-semibold hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {copy.secondaryCta}
              </a>
            </div>
            <p className="mt-5 text-sm sm:text-base text-slate-600">
              {copy.microCopy}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

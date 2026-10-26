import { visaCountries as staticVisaCountries } from '../data/visaData';
import { VisaHero } from '../components/visa/VisaHero';
import { FeaturedVisas } from '../components/visa/FeaturedVisas';
import { VisaProcess } from '../components/visa/VisaProcess';
import { VisaDirectory } from '../components/visa/VisaDirectory';
import { TrustStats } from '../components/visa/TrustStats';
import { VisaTestimonials } from '../components/visa/VisaTestimonials';
import { VisaCTA } from '../components/visa/VisaCTA';
import { useVisaCountries } from '../hooks/useContent';
import type { CountryVisa } from '../data/visaData';
import { useSeo } from '../hooks/useSeo';
import type { VisaCountryWithTime } from '../components/visa/VisaDirectory';

/** Headline processing time for the directory filter (CMS detail.processingTime, else first visa type duration). */
function processingTimeOf(detail: unknown): string | undefined {
    if (!detail || typeof detail !== 'object') return undefined;
    const d = detail as { processingTime?: unknown; visaTypes?: { processingTime?: unknown }[] };
    const direct = typeof d.processingTime === 'string' ? d.processingTime : undefined;
    const fromType = typeof d.visaTypes?.[0]?.processingTime === 'string' ? (d.visaTypes[0].processingTime as string) : undefined;
    return direct || fromType || undefined;
}

export default function Visa() {
    const { data: cmsVisas } = useVisaCountries();
    useSeo({ title: 'Visa Services | Airland Holidays' });
    const visaCountries: VisaCountryWithTime[] = cmsVisas?.length
        ? cmsVisas.map((v) => ({
            processingTime: processingTimeOf(v.detail),
            slug: v.slug,
            name: v.name,
            image: v.image ?? '',
            flag: v.flag ?? '',
            price: Number(v.price ?? 0),
            highlightText: v.highlight_text ?? undefined,
            visaStatus: v.visa_status,
            featured: Boolean(v.featured),
        }))
        : (staticVisaCountries as CountryVisa[]);

    const featuredCountries = visaCountries.filter((c) => c.featured);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <VisaHero />
            <FeaturedVisas countries={featuredCountries} />
            <VisaProcess />
            <VisaDirectory countries={visaCountries} />
            <TrustStats />
            <VisaTestimonials />
            <VisaCTA />
        </div>
    );
}

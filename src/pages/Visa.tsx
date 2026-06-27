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

export default function Visa() {
    const { data: cmsVisas } = useVisaCountries();
    const visaCountries: CountryVisa[] = cmsVisas?.length
        ? cmsVisas.map((v) => ({
            slug: v.slug,
            name: v.name,
            image: v.image ?? '',
            flag: v.flag ?? '',
            price: Number(v.price ?? 0),
            highlightText: v.highlight_text ?? undefined,
            visaStatus: v.visa_status,
            featured: Boolean(v.featured),
        }))
        : staticVisaCountries;

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

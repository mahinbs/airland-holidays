import { visaCountries } from '../data/visaData';
import { VisaHero } from '../components/visa/VisaHero';
import { FeaturedVisas } from '../components/visa/FeaturedVisas';
import { VisaProcess } from '../components/visa/VisaProcess';
import { VisaDirectory } from '../components/visa/VisaDirectory';
import { TrustStats } from '../components/visa/TrustStats';
import { VisaTestimonials } from '../components/visa/VisaTestimonials';
import { VisaCTA } from '../components/visa/VisaCTA';

export default function Visa() {
    const featuredCountries = visaCountries.filter((c) => c.featured);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* 1. HERO SECTION */}
            <VisaHero />

            {/* 2. FEATURED COUNTRIES */}
            <FeaturedVisas countries={featuredCountries} />

            {/* 3. HOW IT WORKS */}
            <VisaProcess />

            {/* 4. MAIN COUNTRY DIRECTORY */}
            <VisaDirectory countries={visaCountries} />

            {/* 5. TRUST & STATS */}
            <TrustStats />

            {/* 6. SOCIAL PROOF */}
            <VisaTestimonials />

            {/* 7. CTA SECTION */}
            <VisaCTA />
        </div>
    );
}

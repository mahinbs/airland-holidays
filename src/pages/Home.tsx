import Hero from '../components/home/Hero';
import FeaturedPackages from '../components/home/FeaturedPackages';
import FixedDepartures from '../components/home/FixedDepartures';
import Continents from '../components/home/Continents';
import FeaturedExperiences from '../components/home/FeaturedExperiences';
import FestivalsEvents from '../components/homepage/FestivalsEvents';
import ServicesOverview from '../components/home/ServicesOverview';
import VisaHighlight from '../components/home/VisaHighlight';
import WhyUs from '../components/home/WhyUs';
import Achievements from '../components/home/Achievements';
import GoogleReviews from '../components/home/GoogleReviews';
import Testimonials from '../components/home/Testimonials';
import VideoTestimonials from '../components/home/VideoTestimonials';
import InstagramReels from '../components/home/InstagramReels';
import TravelBlog from '../components/home/TravelBlog';
import ContactUs from '../components/home/ContactUs';
import WindowScroll from '../components/home/WindowScroll';
import { useJourneyBanner } from '../hooks/useContent';
import { journeyBeyondBanner } from '../data/journeyBeyondBanner';
import type { JourneyBeyondBannerConfig } from '../data/journeyBeyondBanner';

export default function Home() {
    const { data: bannerRow } = useJourneyBanner();
    const banner = (bannerRow?.config as JourneyBeyondBannerConfig | undefined) ?? journeyBeyondBanner;

    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <FeaturedPackages />
            <FestivalsEvents />
            <FeaturedExperiences />
            <Continents />
            <FixedDepartures />
            <WindowScroll banner={banner} />
            <ServicesOverview />
            <VisaHighlight />
            <WhyUs />
            <Achievements />
            <GoogleReviews />
            <Testimonials />
            <VideoTestimonials />
            <InstagramReels />
            <TravelBlog />
            <ContactUs />
        </div>
    );
}

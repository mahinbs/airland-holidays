import Hero from '../components/home/Hero';
import FeaturedPackages from '../components/home/FeaturedPackages';
import Destinations from '../components/home/Destinations';
import ServicesOverview from '../components/home/ServicesOverview';
import VisaHighlight from '../components/home/VisaHighlight';
import WhyUs from '../components/home/WhyUs';
// import Achievements from '../components/home/Achievements';
import GoogleReviews from '../components/home/GoogleReviews';
import Testimonials from '../components/home/Testimonials';
import VideoTestimonials from '../components/home/VideoTestimonials';
import InstagramReels from '../components/home/InstagramReels';
import TravelBlog from '../components/home/TravelBlog';
import ContactUs from '../components/home/ContactUs';
import WindowScroll from '../components/home/WindowScroll';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <FeaturedPackages />
            <Destinations />
            <WindowScroll />
            <ServicesOverview />
            <VisaHighlight />
            <WhyUs />
            {/* <Achievements /> */}
            <GoogleReviews />
            <Testimonials />
            <VideoTestimonials />
            <InstagramReels />
            <TravelBlog />
            <ContactUs />
        </div>
    );
}

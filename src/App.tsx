import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Visa from './pages/Visa';
import VisaDetail from './pages/VisaDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Guide from './pages/Guide';
import GuideArticle from './pages/GuideArticle';
import About from './pages/About';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/:id" element={<PackageDetail />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="destinations/:country" element={<DestinationDetail />} />
          <Route path="visa" element={<Visa />} />
          <Route path="visa/:country" element={<VisaDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="guide" element={<Guide />} />
          <Route path="guide/:id" element={<GuideArticle />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="payment" element={<Payment />} />
          {/* Default 404 can go here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

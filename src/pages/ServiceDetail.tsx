import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react';

const services: Record<string, { title: string; desc: string; features: string[] }> = {
    'flight-booking': { title: 'Flight Booking', desc: 'Global air ticketing with negotiated rates for economy, business, and first class. We partner with major airlines worldwide.', features: ['Best price guarantee', '24/7 booking support', 'Flexible date search'] },
    'hotel-reservation': { title: 'Hotel Reservations', desc: 'Exclusive perks at over 1,000 premium luxury hotels worldwide. From boutique stays to 5-star resorts.', features: ['Free breakfast', 'Room upgrades', 'Late checkout'] },
    'cruise-booking': { title: 'Cruise Booking', desc: 'Luxury cruises and ocean voyages to exotic destinations. Mediterranean, Caribbean, Alaska, and more.', features: ['All-inclusive packages', 'Cabin selection', 'Shore excursions'] },
    'airport-transfers': { title: 'Transport & Transfers', desc: 'Chauffeured airport pickups, car rentals, and inter-city transport. Seamless start and end to your trip.', features: ['Meet & greet', 'Flight monitoring', 'Luxury vehicles'] },
    'passport-assistance': { title: 'Passport Assistance', desc: 'Guidance and support for passport applications, renewals, and expedited processing.', features: ['Document checklist', 'Application review', 'Expedited service'] },
    'visa-assistance': { title: 'Visa Assistance', desc: 'Expert visa processing support for 50+ countries. We handle documentation and submission.', features: ['Document review', 'Application submission', 'Status tracking'] },
    'forex': { title: 'Currency Exchange', desc: 'Competitive forex rates and travel money cards. Order online or visit our office.', features: ['Best rates', 'Multi-currency cards', 'Home delivery'] },
    'travel-insurance': { title: 'Travel Insurance', desc: 'Comprehensive coverage for medical emergencies, trip cancellations, lost baggage, and more.', features: ['Medical coverage', 'Trip cancellation', '24/7 assistance'] },
    'guided-tours': { title: 'Private Guided Tours', desc: 'Expert local guides offering insider knowledge at every destination.', features: ['Local experts', 'Custom itineraries', 'Skip-the-line access'] },
    'group-travel': { title: 'Group Travel Planning', desc: 'Custom itineraries for corporate groups, weddings, school trips, and large parties.', features: ['Dedicated coordinator', 'Bulk discounts', 'Flexible scheduling'] },
    'holiday-customisation': { title: 'Holiday Package Customisation', desc: 'Tailor-made itineraries designed around your preferences, budget, and travel style.', features: ['Personal consultation', 'Flexible dates', 'Unique experiences'] },
    'photography': { title: 'Travel Photography', desc: 'Professional photographers arranged to capture your honeymoon or family trip.', features: ['Pre-trip planning', 'On-location shoots', 'Edited deliverables'] },
};

export default function ServiceDetail() {
    const { slug } = useParams();
    const service = slug ? services[slug] : null;

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Service not found</h1>
                    <a href="/services" className="btn-primary">Back to Services</a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container relative z-10">
                    <a href="/services" className="text-primary font-medium text-sm mb-4 inline-block">← Back to Services</a>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
                    <p className="text-slate-300 text-lg max-w-2xl">{service.desc}</p>
                </div>
            </div>

            <div className="content-container mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <main className="lg:w-2/3">
                        <div className="bg-white p-8 rounded-2xl border border-slate-700 mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">What We Offer</h2>
                            <ul className="space-y-4">
                                {service.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                                        <span className="text-slate-700">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </main>

                    <aside className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl border border-slate-700 shadow-xl sticky top-28">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Enquire Now</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-primary" />
                                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-primary" />
                                <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-primary" />
                                <textarea rows={3} placeholder="Your requirements" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-primary resize-none" />
                                <button type="button" className="w-full btn-primary flex items-center justify-center gap-2">
                                    <Send className="w-5 h-5" /> Send Enquiry
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

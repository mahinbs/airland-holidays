import { Shield, Plane, Building2, Car, Compass, Camera, Ship, FileCheck, CreditCard, Users, Palette } from 'lucide-react';

const services = [
    { id: 'flight-booking', icon: Plane, title: 'Flight Booking', desc: 'Global air ticketing with negotiated rates for first and business class.' },
    { id: 'hotel-reservation', icon: Building2, title: 'Hotel Reservations', desc: 'Exclusive perks at over 1,000 premium luxury hotels worldwide.' },
    { id: 'cruise-booking', icon: Ship, title: 'Cruise Booking', desc: 'Luxury cruises and ocean voyages to exotic destinations.' },
    { id: 'airport-transfers', icon: Car, title: 'Transport & Transfers', desc: 'Chauffeured airport pickups, car rentals, and inter-city transport.' },
    { id: 'passport-assistance', icon: FileCheck, title: 'Passport Assistance', desc: 'Guidance and support for passport applications and renewals.' },
    { id: 'visa-assistance', icon: FileCheck, title: 'Visa Assistance', desc: 'Expert visa processing for 50+ countries. We handle the paperwork.' },
    { id: 'forex', icon: CreditCard, title: 'Currency Exchange', desc: 'Competitive forex rates and multi-currency travel cards.' },
    { id: 'travel-insurance', icon: Shield, title: 'Travel Insurance', desc: 'Comprehensive coverage for medical emergencies, cancellations, and lost baggage.' },
    { id: 'guided-tours', icon: Compass, title: 'Private Guided Tours', desc: 'Expert local guides offering insider knowledge at every destination.' },
    { id: 'group-travel', icon: Users, title: 'Group Travel Planning', desc: 'Custom itineraries for corporate groups, weddings, and large parties.' },
    { id: 'holiday-customisation', icon: Palette, title: 'Holiday Package Customisation', desc: 'Tailor-made itineraries designed around your preferences.' },
    { id: 'photography', icon: Camera, title: 'Travel Photography', desc: 'Professional photographers arranged to capture your honeymoon or family trip.' }
];

export default function Services() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero */}
            <div className="bg-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">What We Offer</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Comprehensive Travel Services</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Beyond packaged tours, we provide a full suite of ancillary travel services. From private jet charters to global travel insurance, we've got you covered.
                    </p>
                </div>
            </div>

            <div className="content-container mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                    {services.map(srv => {
                        const Icon = srv.icon;
                        return (
                            <div key={srv.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-16 h-16 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold font-sans text-slate-900 mb-4">{srv.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">{srv.desc}</p>
                                <a href={`/services/${srv.id}`} className="text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:text-primary-dark transition-colors">
                                    Inquire Now &rarr;
                                </a>
                            </div>
                        )
                    })}
                </div>

                {/* Corporate Banner */}
                <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute inset-0 mix-blend-overlay opacity-30">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" alt="Corporate" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-white gap-8">
                        <div className="max-w-xl">
                            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">For Business</span>
                            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-4 text-white">Corporate Travel Management</h2>
                            <p className="text-white/70 text-lg">
                                Streamline your company's travel with our dedicated corporate booking tools, negotiated rates, and 24/7 executive support.
                            </p>
                        </div>
                        <button className="bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-50 hover:scale-105 transition-all whitespace-nowrap">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

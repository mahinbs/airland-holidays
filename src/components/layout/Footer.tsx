import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, Plane } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="content-container relative pt-16 pb-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand - spans 4 cols */}
                    <div className="lg:col-span-4">
                        <a href="/" className="inline-flex items-center gap-2.5 group mb-6">
                            <img src="/logo-white.png" alt="Logo" className="w-[15rem]" />
                        </a>
                        <p className="text-slate-200 leading-relaxed max-w-sm mb-6">
                            Crafting premium, unforgettable travel experiences across the globe. Your journey begins with exceptional planning.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: '#' },
                                { icon: Facebook, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Youtube, href: '#' },
                            ].map(({ icon: Icon, href }) => (
                                <a
                                    key={Icon.name}
                                    href={href}
                                    className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-200"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        {/* Small map - desktop only */}
                        <div className="hidden lg:block mt-6 rounded-xl overflow-hidden border border-slate-700/50 h-32 max-w-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.716780654789!2d72.8776559!3d19.076090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da8edae78ad58a!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Airland Holidays - Mumbai"
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Explore - 2 cols */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Plane className="w-4 h-4 text-secondary" />
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'All Packages', href: '/packages' },
                                { label: 'Destinations', href: '/destinations' },
                                { label: 'Visa Services', href: '/visa' },
                                { label: 'Travel Blog', href: '/guide' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Testimonials', href: '/testimonials' },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} className="text-slate-200 hover:text-secondary transition-colors inline-block py-1 group">
                                        {label}
                                        <span className="inline-block w-0 group-hover:w-2 h-px bg-secondary ml-1 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services - 2 cols */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Services</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Flight Booking', href: '/services/flight-booking' },
                                { label: 'Hotel Reservation', href: '/services/hotel-reservation' },
                                { label: 'Travel Insurance', href: '/services/travel-insurance' },
                                { label: 'Forex Exchange', href: '/services/forex' },
                                { label: 'Help & FAQ', href: '/faq' },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} className="text-slate-200 hover:text-secondary transition-colors inline-block py-1 group">
                                        {label}
                                        <span className="inline-block w-0 group-hover:w-2 h-px bg-secondary ml-1 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - 4 cols */}
                    <div className="lg:col-span-4">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <a href="/contact" className="flex gap-4 items-start group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                </div>
                                <span className="text-slate-200 group-hover:text-slate-300">123 Premium Travel Boulevard, Mumbai, Maharashtra 400001</span>
                            </a>
                            <a href="tel:+18001234567" className="flex gap-4 items-center group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                    <Phone className="w-5 h-5 text-secondary" />
                                </div>
                                <span className="text-slate-200 group-hover:text-slate-300">+1 (800) 123-4567</span>
                            </a>
                            <a href="mailto:hello@airlandholidays.com" className="flex gap-4 items-center group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                    <Mail className="w-5 h-5 text-secondary" />
                                </div>
                                <span className="text-slate-200 group-hover:text-slate-300">hello@airlandholidays.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        &copy; {currentYear} Airland Holidays. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <a href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                        <a href="/sitemap" className="text-slate-400 hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

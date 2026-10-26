import { MapPin, Phone, Mail, Plane, Clock, MessageCircle } from 'lucide-react';
import { useServices, useFooterConfig } from '../../hooks/useContent';
import { buildServiceNavItems } from '../../lib/servicesCms';
import { defaultFooterConfig } from '../../data/defaultCmsContent';
import type { FooterConfig } from '../../types/cms';
import { SocialIcon, normalizePlatform } from '../common/SocialIcon';
import RichContent from '../common/RichContent';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { data: cmsServices } = useServices();
    const { data: cmsFooter } = useFooterConfig<FooterConfig>();
    const footer: FooterConfig = {
        ...defaultFooterConfig,
        ...(cmsFooter ?? {}),
        businessHours: { ...defaultFooterConfig.businessHours, ...(cmsFooter?.businessHours ?? {}) },
    };
    const hours = [footer.businessHours.weekdays, footer.businessHours.weekend, footer.businessHours.holidays].filter(Boolean);
    const serviceLinks = buildServiceNavItems(cmsServices).filter((link) => link.href !== '/services');
    const footerServices = [
        ...serviceLinks.slice(0, 5),
        { label: 'Help & FAQ', href: '/faq' },
    ];

    return (
        <footer className="relative bg-primary text-slate-300 overflow-hidden">
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
                            {footer.tagline}
                        </p>
                        <div className="flex gap-3">
                            {footer.socials.filter((s) => s.enabled && s.href).map(({ platform, href }) => (
                                <a
                                    key={normalizePlatform(platform)}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={platform}
                                    className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-200 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-200"
                                >
                                    <SocialIcon platform={platform} className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        {/* Small map - desktop only */}
                        <div className="hidden lg:block mt-6 rounded-xl overflow-hidden border border-slate-700/50 h-32 max-w-sm">
                            <iframe
                                src={footer.mapEmbedUrl}
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
                            {footerServices.map(({ label, href }) => (
                                <li key={href}>
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
                                <span className="text-slate-200 group-hover:text-slate-300">{footer.corporateAddress}</span>
                            </a>
                            <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="flex gap-4 items-center group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                    <Phone className="w-5 h-5 text-secondary" />
                                </div>
                                <span className="text-slate-200 group-hover:text-slate-300">{footer.phone}</span>
                            </a>
                            {footer.mobile && footer.mobile !== footer.phone && (
                                <a href={`tel:${footer.mobile.replace(/\s/g, '')}`} className="flex gap-4 items-center group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                        <Phone className="w-5 h-5 text-secondary" />
                                    </div>
                                    <span className="text-slate-200 group-hover:text-slate-300">{footer.mobile}</span>
                                </a>
                            )}
                            {footer.whatsapp && (
                                <a href={`https://wa.me/${footer.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                        <MessageCircle className="w-5 h-5 text-secondary" />
                                    </div>
                                    <span className="text-slate-200 group-hover:text-slate-300">WhatsApp: +{footer.whatsapp.replace(/\D/g, '')}</span>
                                </a>
                            )}
                            <a href={`mailto:${footer.email}`} className="flex gap-4 items-center group p-3 rounded-xl hover:bg-slate-800/50 transition-colors -m-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                                    <Mail className="w-5 h-5 text-secondary" />
                                </div>
                                <span className="text-slate-200 group-hover:text-slate-300">{footer.email}</span>
                            </a>
                            {hours.length > 0 && (
                                <div className="flex gap-4 items-start p-3 -m-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div className="text-slate-200 text-sm space-y-0.5">
                                        {hours.map((h) => <p key={h}>{h}</p>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {footer.registeredAddress && (
                    <p className="text-slate-400 text-xs mb-4 text-center md:text-left">Registered office: {footer.registeredAddress}</p>
                )}
                {footer.seoContent && (
                    <RichContent html={footer.seoContent} className="!text-slate-400 !text-xs !leading-relaxed mb-6 [&_*]:!text-slate-400 [&_a]:!text-secondary" />
                )}

                {/* Bottom bar */}
                <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        &copy; {currentYear} Airland Holidays. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        {footer.quickLinks.filter((l) => l.enabled).map(({ label, href }) => (
                            <a key={href} href={href} className="text-slate-400 hover:text-white transition-colors">{label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

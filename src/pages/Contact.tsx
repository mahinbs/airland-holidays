import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import MapEmbed from '../components/common/MapEmbed';
import Dropdown from '../components/common/Dropdown';
import { submitContact } from '../services/submissions';
import { isSupabaseConfigured } from '../lib/supabase';
import { useSiteSetting, useFooterConfig } from '../hooks/useContent';
import { defaultFooterConfig } from '../data/defaultCmsContent';
import type { FooterConfig } from '../types/cms';

const interestedInOptions = [
    { value: 'tour-packages', label: 'Tour Packages' },
    { value: 'destinations', label: 'Destinations' },
    { value: 'custom-itinerary', label: 'Custom Itinerary' },
    { value: 'visa-services', label: 'Visa Services' },
    { value: 'flight-hotel', label: 'Flight/Hotel Booking' },
    { value: 'other', label: 'Other' },
];

const defaultContact = {
    address: '123 Premium Travel Boulevard, Mumbai, Maharashtra 400001',
    phones: ['+91-9090403075'],
    emails: ['hello@airlandholidays.com', 'support@airlandholidays.com'],
    whatsapp: '919090403075',
    office_hours: 'Mon - Fri: 9:00 AM - 8:00 PM',
};

export default function Contact() {
    const [interestedIn, setInterestedIn] = useState('tour-packages');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const { data: contactInfo } = useSiteSetting<typeof defaultContact>('contact_info');
    const { data: cmsFooter } = useFooterConfig<FooterConfig>();
    const footer = cmsFooter ? { ...defaultFooterConfig, ...cmsFooter } : defaultFooterConfig;
    const contact = contactInfo ?? {
        address: footer.corporateAddress,
        phones: [footer.phone, footer.mobile].filter(Boolean),
        emails: [footer.email],
        whatsapp: footer.whatsapp.replace(/\D/g, ''),
        office_hours: `${footer.businessHours.weekdays}; ${footer.businessHours.weekend}`,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isSupabaseConfigured) {
                await submitContact({ first_name: firstName, last_name: lastName, email, phone, interested_in: interestedIn, message });
            }
            setSubmitted(true);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-48 px-4 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1562976540-150a82e38473?auto=format&fit=crop&q=80&w=2000" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-slate-900/75" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Get in Touch</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">Ready to plan your next adventure? Our travel experts are standing by to curate your perfect itinerary.</p>
                </div>
            </div>

            <div className="content-container relative -mt-32 z-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
                    <div className="lg:w-1/3 bg-primary text-white p-10 md:p-12 relative overflow-hidden">
                        <h2 className="text-3xl font-sans font-bold mb-8 text-white">Contact Information</h2>
                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Head Office</h3>
                                    <p className="text-white/70">{contact.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Phone Number</h3>
                                    {contact.phones.map((p, i) => <p key={`${p}-${i}`} className="text-white/70">{p}</p>)}
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Email Address</h3>
                                    {contact.emails.map((e) => <p key={e} className="text-white/70">{e}</p>)}
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Office Hours</h3>
                                    <p className="text-white/70">{contact.office_hours}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MessageCircle className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">WhatsApp</h3>
                                    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:underline">{contact.phones[0]}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 p-10 md:p-12">
                        {submitted ? (
                            <div className="text-center py-12">
                                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
                                <p className="text-slate-600">Our team will get back to you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-sans font-bold text-slate-900 mb-8">Send Us A Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                            <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="John" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="+91..." />
                                        </div>
                                    </div>
                                    <Dropdown label="Interested In" options={interestedInOptions} value={interestedIn} onChange={setInterestedIn} size="lg" />
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                        <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Tell us about your dream trip..." />
                                    </div>
                                    <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto px-10 py-4 text-lg justify-center gap-2 disabled:opacity-50">
                                        <Send className="w-5 h-5" /> {loading ? 'Sending...' : 'Send Enquiry'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
                <MapEmbed
                    src={footer.mapEmbedUrl}
                    query={contact.address}
                    title="Airland Holidays office location"
                    className="mt-8"
                />
            </div>
        </div>
    );
}

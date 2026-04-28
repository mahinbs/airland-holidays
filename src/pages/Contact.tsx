import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Dropdown from '../components/common/Dropdown';

const interestedInOptions = [
    { value: 'tour-packages', label: 'Tour Packages' },
    { value: 'destinations', label: 'Destinations' },
    { value: 'custom-itinerary', label: 'Custom Itinerary' },
    { value: 'visa-services', label: 'Visa Services' },
    { value: 'flight-hotel', label: 'Flight/Hotel Booking' },
    { value: 'other', label: 'Other' },
];

export default function Contact() {
    const [interestedIn, setInterestedIn] = useState('tour-packages');
    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-48 px-4 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1562976540-150a82e38473?auto=format&fit=crop&q=80&w=2000"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-slate-900/75" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none z-[1]"></div>
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Get in Touch</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Ready to plan your next adventure? Our travel experts are standing by to curate your perfect itinerary.
                    </p>
                </div>
            </div>

            <div className="content-container relative -mt-32 z-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">

                    {/* Contact Information */}
                    <div className="lg:w-1/3 bg-primary text-white p-10 md:p-12 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-12 translate-y-12"></div>

                        <h2 className="text-3xl font-sans font-bold mb-8 text-white">Contact Information</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Head Office</h3>
                                    <p className="text-white/70">123 Premium Travel Boulevard<br />Mumbai, Maharashtra 400001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Phone Number</h3>
                                    <p className="text-white/70">+1 (800) 123-4567<br />+1 (800) 987-6543</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Email Address</h3>
                                    <p className="text-white/70">hello@airlandholidays.com<br />support@airlandholidays.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">Office Hours</h3>
                                    <p className="text-white/70">Mon - Fri: 9:00 AM - 8:00 PM<br />24/7 Support for Active Travelers</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <MessageCircle className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">WhatsApp</h3>
                                    <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:underline">+91 12345 67890</a>
                                    <p className="text-slate-50 text-sm mt-1">Chat with us for quick queries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3 p-10 md:p-12">
                        <h2 className="text-3xl font-sans font-bold text-slate-900 mb-8">Send Us A Message</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                    <input type="tel" className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>

                            <div>
                                <Dropdown
                                    label="Interested In"
                                    options={interestedInOptions}
                                    value={interestedIn}
                                    onChange={setInterestedIn}
                                    size="lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full bg-slate-50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Tell us about your dream trip..."></textarea>
                            </div>

                            <button type="button" className="btn-primary w-full md:w-auto px-10 py-4 text-lg justify-center gap-2">
                                <Send className="w-5 h-5" /> Send Enquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Google Map - Mumbai */}
            <div className="content-container mt-16 mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Find Us on Map</h2>
                <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-slate-700 shadow-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.716780654789!2d72.8776559!3d19.076090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da8edae78ad58a!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Airland Holidays - Mumbai Office Location"
                        className="w-full h-full min-h-[300px]"
                    />
                </div>
            </div>
        </div>
    );
}

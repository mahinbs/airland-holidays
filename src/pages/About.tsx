import { Award, Users, Globe, PlayCircle } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Hero */}
            <div className="bg-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Redefining Premium Travel</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Founded in 1999, Airland Holidays was built on a simple premise: travel should be transformative, seamless, and extraordinary.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="content-container mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-6">A Legacy of Excellence</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            For over two decades, we have been the architects of unforgettable journeys. What started as a small boutique agency in the heart of the city has grown into a global travel network.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            Our secret? We possess an unwavering commitment to detail. From the moment you contact us to the day you safely return home, our concierge team anticipates your every need.
                        </p>
                        <div className="flex gap-8">
                            <div>
                                <span className="block text-4xl font-bold text-primary mb-1">20+</span>
                                <span className="text-sm font-semibold text-slate-500 uppercase">Years Experience</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold text-primary mb-1">50k</span>
                                <span className="text-sm font-semibold text-slate-500 uppercase">Happy Clients</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-4 bg-secondary/10 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" alt="Office" className="relative rounded-2xl shadow-2xl w-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <PlayCircle className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CEO / Founder Message */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-8">A Message from Our Founder</h2>
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="Founder" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-lg leading-relaxed mb-4 italic">
                                &ldquo;Travel transforms us. At Airland Holidays, we believe every journey should be extraordinary. For over 25 years, we have dedicated ourselves to crafting experiences that go beyond the ordinary—where every detail is considered and every moment is memorable.&rdquo;
                            </p>
                            <p className="font-bold text-slate-900">— Founder & CEO, Airland Holidays</p>
                        </div>
                    </div>
                </div>

                {/* Team Introduction */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Travel Advisors', desc: 'Expert consultants with first-hand destination knowledge.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400' },
                            { name: 'Operations Team', desc: '24/7 support ensuring seamless travel execution.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400' },
                            { name: 'Destination Experts', desc: 'Local partners in 120+ countries worldwide.', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400' },
                        ].map((t, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t.name}</h3>
                                    <p className="text-slate-600">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Client Success Stories */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-8">Client Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { quote: 'Airland planned our dream honeymoon to the Maldives. Every detail was perfect—from the overwater villa to the private dinner on the beach.', author: 'Priya & Rahul', trip: 'Maldives Honeymoon' },
                            { quote: 'Our corporate retreat to Switzerland was flawlessly executed. The team handled 50+ attendees with zero hiccups.', author: 'TechCorp Inc.', trip: 'Swiss Alps Group Tour' },
                        ].map((s, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                                <p className="text-slate-700 italic mb-6">&ldquo;{s.quote}&rdquo;</p>
                                <p className="font-bold text-slate-900">{s.author}</p>
                                <p className="text-primary text-sm font-medium">{s.trip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Us Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Global Network</h3>
                        <p className="text-slate-600">Direct partnerships with the world's finest hotels, airlines, and local guides.</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Advisors</h3>
                        <p className="text-slate-600">Our agents have personally traveled to over 100 countries to provide first-hand knowledge.</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Award Winning</h3>
                        <p className="text-slate-600">Recognized globally for outstanding customer service and premium itinerary curation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

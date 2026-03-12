import { useParams } from 'react-router-dom';
import { FileCheck, Clock, CreditCard, Send, CheckCircle } from 'lucide-react';

const visaData: Record<string, { name: string; type: string; processingTime: string; fees: string; requirements: string[]; documents: string[] }> = {
    dubai: { name: 'Dubai (UAE)', type: 'E-Visa', processingTime: '2-3 Days', fees: '$95', requirements: ['Valid passport (6 months)', 'Passport-size photo', 'Return ticket', 'Hotel booking'], documents: ['Passport copy', 'Photo', 'Application form'] },
    singapore: { name: 'Singapore', type: 'E-Visa', processingTime: '3-5 Days', fees: '$45', requirements: ['Valid passport', 'Photo', 'Travel itinerary'], documents: ['Passport', 'Photo', 'Bank statement'] },
    thailand: { name: 'Thailand', type: 'Visa on Arrival / E-Visa', processingTime: '1-2 Days', fees: '$60', requirements: ['Passport', 'Photo', 'Proof of accommodation'], documents: ['Passport copy', 'Photo'] },
    schengen: { name: 'Schengen Area', type: 'Sticker Visa', processingTime: '15-20 Days', fees: '$120', requirements: ['Valid passport', 'Photo', 'Travel insurance', 'Itinerary'], documents: ['Passport', 'Photo', 'Bank statement', 'Hotel bookings'] },
    uk: { name: 'United Kingdom', type: 'Sticker Visa', processingTime: '15-21 Days', fees: '$150', requirements: ['Valid passport', 'Photo', 'Proof of funds'], documents: ['Passport', 'Photo', 'Bank statement'] },
    malaysia: { name: 'Malaysia', type: 'E-Visa', processingTime: '3-4 Days', fees: '$40', requirements: ['Valid passport', 'Photo', 'Return ticket'], documents: ['Passport copy', 'Photo'] },
    australia: { name: 'Australia', type: 'E-Visa', processingTime: '10-15 Days', fees: '$135', requirements: ['Valid passport', 'Photo', 'Character documents'], documents: ['Passport', 'Photo', 'Employment proof'] },
    usa: { name: 'United States', type: 'Sticker Visa', processingTime: 'Varies', fees: '$160', requirements: ['Valid passport', 'Photo', 'DS-160 form', 'Interview'], documents: ['Passport', 'Photo', 'Appointment letter'] },
};

export default function VisaDetail() {
    const { country } = useParams();
    const data = country ? visaData[country.toLowerCase()] : null;

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Visa not found</h1>
                    <a href="/visa" className="btn-primary">Back to Visa Services</a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container relative z-10">
                    <a href="/visa" className="text-primary font-medium text-sm mb-4 inline-block">← Back to Visa Services</a>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{data.name} Visa</h1>
                    <p className="text-slate-300 text-lg">{data.type} • Processing: {data.processingTime}</p>
                </div>
            </div>

            <div className="content-container mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <main className="lg:w-2/3 space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Visa Requirements</h2>
                            <ul className="space-y-3">
                                {data.requirements.map((r, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Required Documents</h2>
                            <ul className="space-y-3">
                                {data.documents.map((d, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                                <Clock className="w-12 h-12 text-primary" />
                                <div>
                                    <p className="text-slate-500 text-sm font-semibold uppercase">Processing Time</p>
                                    <p className="text-xl font-bold text-slate-900">{data.processingTime}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                                <CreditCard className="w-12 h-12 text-primary" />
                                <div>
                                    <p className="text-slate-500 text-sm font-semibold uppercase">Visa Fees</p>
                                    <p className="text-xl font-bold text-slate-900">{data.fees}</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    <aside className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-28">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Visa Enquiry Form</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary" />
                                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary" />
                                <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary" />
                                <textarea rows={3} placeholder="Travel dates or questions" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary resize-none" />
                                <button type="button" className="w-full btn-primary flex items-center justify-center gap-2">
                                    <Send className="w-5 h-5" /> Apply for Visa
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

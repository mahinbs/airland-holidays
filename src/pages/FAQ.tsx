import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
    {
        category: 'Booking & Payment', questions: [
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and direct bank transfers. For specific regions, we also support Stripe and local payment gateways.' },
            { q: 'Is my payment secure?', a: 'Yes, all our payments are processed securely through bank-grade encrypted payment gateways. We do not store your credit card information.' },
            { q: 'Can I pay in installments?', a: 'Yes, for packages booked at least 6 months in advance, we offer a 3-part flexible payment plan.' },
        ]
    },
    {
        category: 'Visas & Documentation', questions: [
            { q: 'Do you guarantee visa approval?', a: 'While we ensure your application is perfect and meets all embassy requirements, the final decision always rests with the respective consulate.' },
            { q: 'How long does an E-Visa take?', a: 'E-Visa processing times vary by country but generally take between 2 to 5 working days.' },
        ]
    },
    {
        category: 'Travel & Accommodations', questions: [
            { q: 'Are flights included in the packages?', a: 'Our standard packages exclude international flights to give you flexibility. However, we have a dedicated flight ticketing team that can book them for you at competitive rates.' },
            { q: 'Can I customize an existing package?', a: 'Absolutely. All our itineraries are fully customizable. Speak to our travel advisors to tailor the trip to your specific needs.' },
        ]
    }
];

export default function FAQ() {
    const [openQ, setOpenQ] = useState<string | null>('What payment methods do you accept?');

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Frequently Asked Questions</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        Find answers to the most common questions about booking, visas, and our premium travel services.
                    </p>
                    <div className="max-w-xl mx-auto relative flex items-center">
                        <Search className="absolute left-4 text-slate-400 w-5 h-5" />
                        <input type="text" placeholder="Search for a question..." className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary shadow-lg" />
                    </div>
                </div>
            </div>

            <div className="content-container mt-16 max-w-4xl">
                {faqs.map((group, idx) => (
                    <div key={idx} className="mb-12">
                        <h2 className="text-2xl font-sans font-bold text-slate-900 mb-6 flex items-center gap-4">
                            {group.category}
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </h2>

                        <div className="space-y-4">
                            {group.questions.map((item) => (
                                <div key={item.q} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                                    <button
                                        className="w-full flex items-center justify-between p-6 text-left"
                                        onClick={() => setOpenQ(openQ === item.q ? null : item.q)}
                                    >
                                        <span className="font-bold text-slate-800 text-lg">{item.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openQ === item.q ? 'rotate-180 text-primary' : ''}`} />
                                    </button>

                                    <div className={`px-6 pb-6 overflow-hidden transition-all duration-300 ease-in-out ${openQ === item.q ? 'block opacity-100' : 'hidden opacity-0'}`}>
                                        <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">{item.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10 mt-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Still have questions?</h3>
                    <p className="text-slate-600 mb-6">Our dedicated support team is here to help you 24/7.</p>
                    <button className="btn-primary">Contact Support</button>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFaq } from '../hooks/useContent';
import RichContent from '../components/common/RichContent';

const staticFaqs: { category: string; questions: { q: string; a: string }[] }[] = [
    { category: 'Booking & Payment', questions: [
        { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and direct bank transfers.' },
        { q: 'Is my payment secure?', a: 'Yes, all our payments are processed securely through bank-grade encrypted payment gateways.' },
    ]},
    { category: 'Visas & Documentation', questions: [
        { q: 'Do you guarantee visa approval?', a: 'While we ensure your application is perfect, the final decision rests with the respective consulate.' },
    ]},
];

export default function FAQ() {
    const { data: cmsFaq } = useFaq({ module: 'global' });
    const faqs = useMemo((): { category: string; questions: { q: string; a: string }[] }[] => {
        if (cmsFaq?.length) {
            return cmsFaq.map((cat: { name: string; questions: { question: string; answer: string }[] }) => ({
                category: cat.name,
                questions: cat.questions.map((q) => ({ q: q.question, a: q.answer })),
            }));
        }
        return staticFaqs;
    }, [cmsFaq]);

    const [openQ, setOpenQ] = useState<string | null>(null);

    useEffect(() => {
        if (openQ === null && faqs[0]?.questions[0]?.q) {
            setOpenQ(faqs[0].questions[0].q);
        }
    }, [faqs, openQ]);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Frequently Asked Questions</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">Find answers to the most common questions about booking, visas, and our premium travel services.</p>
                </div>
            </div>

            <div className="content-container mt-16 max-w-4xl">
                {faqs.length === 0 && (
                    <p className="text-center text-slate-500 py-16">No FAQ entries published yet. Check back soon.</p>
                )}
                {faqs.map((group, idx) => (
                    <div key={idx} className="mb-12">
                        <h2 className="text-2xl font-sans font-bold text-slate-900 mb-6 flex items-center gap-4">
                            {group.category}
                            <div className="flex-1 h-px bg-slate-700"></div>
                        </h2>
                        <div className="space-y-4">
                            {group.questions.map((item) => (
                                <div key={item.q} className="bg-white rounded-2xl border border-slate-700 overflow-hidden shadow-sm">
                                    <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenQ(openQ === item.q ? null : item.q)}>
                                        <span className="font-bold text-slate-800 text-lg">{item.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-slate-700 transition-transform duration-300 ${openQ === item.q ? 'rotate-180 text-primary' : ''}`} />
                                    </button>
                                    <div className={`px-6 pb-6 ${openQ === item.q ? 'block' : 'hidden'}`}>
                                        <RichContent html={item.a} className="pt-2 border-t border-slate-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const articles: Record<string, { title: string; category: string; date: string; author: string; content: string; img: string }> = {
    '1': { title: 'The Ultimate Guide to Island Hopping in Greece', category: 'Destination Guides', date: 'Oct 15, 2023', author: 'Elena R.', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', content: 'Greece is a paradise for island hoppers. With over 6,000 islands and islets, each offering unique charm, planning your route can be overwhelming. Start with the Cyclades—Mykonos, Santorini, and Naxos form a perfect triangle. Ferries run frequently in summer. Book accommodation in advance for July and August. Consider a 10-day itinerary: Athens (1 day) → Mykonos (2) → Santorini (3) → Naxos (2) → Athens. Each island has its own character: Mykonos for nightlife, Santorini for sunsets, Naxos for beaches and authenticity.' },
    '2': { title: 'How to Pack for a Two-Week European Tour', category: 'Travel Tips', date: 'Oct 10, 2023', author: 'Mark T.', img: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800', content: 'Packing for two weeks in Europe requires strategy. Stick to a capsule wardrobe: 2-3 base colors, mix-and-match pieces. Bring one pair of comfortable walking shoes, a lightweight rain jacket, and layers. Roll clothes to save space. Use packing cubes. Don\'t forget adapters, a portable charger, and copies of important documents. Laundry services are available in most cities if you need to refresh mid-trip.' },
    '3': { title: 'Schengen Visa Updates: What You Need to Know in 2024', category: 'Visa Updates', date: 'Oct 05, 2023', author: 'Sarah J.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', content: 'The Schengen visa process has seen updates in 2024. ETIAS (European Travel Information and Authorisation System) is now in effect for visa-exempt travellers. Application fees have been adjusted. Processing times remain 15-21 days for most consulates. Ensure your passport is valid for at least 3 months beyond your return date. Travel insurance covering €30,000 is mandatory. Book your appointment well in advance during peak travel seasons.' },
};

export default function GuideArticle() {
    const { id } = useParams();
    const article = id ? articles[id] : null;

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Article not found</h1>
                    <a href="/guide" className="btn-primary">Back to Travel Guide</a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
                <a href="/guide" className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:text-primary-dark">
                    <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
                </a>

                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                    <div className="aspect-video md:aspect-[21/9]">
                        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 md:p-12">
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">{article.category}</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">{article.title}</h1>
                        <div className="flex gap-6 text-slate-500 text-sm mb-8">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                            <p>{article.content}</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

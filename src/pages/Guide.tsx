import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { useGuideArticles } from '../hooks/useContent';
import { mapGuideToArticle } from '../lib/mapContent';

const staticArticles = [
    { id: 'island-hopping-greece', title: 'The Ultimate Guide to Island Hopping in Greece', category: 'Destination Guides', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800', date: 'Oct 15, 2023', author: 'Elena R.' },
    { id: 'pack-european-tour', title: 'How to Pack for a Two-Week European Tour', category: 'Travel Tips', img: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800', date: 'Oct 10, 2023', author: 'Mark T.' },
    { id: 'schengen-visa-2024', title: 'Schengen Visa Updates: What You Need to Know in 2024', category: 'Visa Updates', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', date: 'Oct 05, 2023', author: 'Sarah J.' },
];

export default function Guide() {
    const { data: cmsArticles } = useGuideArticles();
    const articles = cmsArticles?.length
        ? cmsArticles.map((a) => mapGuideToArticle(a as unknown as Record<string, unknown>))
        : staticArticles;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="content-container text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Travel Guides & Stories</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">Inspiring travel tales, expert tips, visa updates, and ultimate destination guides curated by our advisors.</p>
                </div>
            </div>

            <div className="content-container mt-16">
                {articles[0] && (
                    <div className="mb-16">
                        <Link to={`/guide/${articles[0].id}`} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-[500px] flex items-end block">
                            <img src={articles[0].img} alt={articles[0].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                            <div className="relative z-10 p-8 md:p-12 w-full md:w-2/3">
                                <span className="bg-secondary text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">Featured • {articles[0].category}</span>
                                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-4">{articles[0].title}</h2>
                                <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
                                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {articles[0].date}</span>
                                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> {articles[0].author}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(1).map((article) => (
                        <Link key={article.id} to={`/guide/${article.id}`} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{article.category}</div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold font-sans text-slate-900 mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                                <div className="mt-auto flex items-center justify-between text-slate-600 text-sm font-medium pt-4 border-t border-slate-100">
                                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
                                    <span className="font-bold text-primary">Read Article →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

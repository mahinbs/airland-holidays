import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ChevronDown, Tag } from 'lucide-react';
import { useGuideArticle, useGuideArticles } from '../hooks/useContent';
import { useSeo } from '../hooks/useSeo';
import { mapGuideToArticle } from '../lib/mapContent';
import { isSupabaseConfigured } from '../lib/supabase';
import RichContent from '../components/common/RichContent';

const staticArticles: Record<
  string,
  { title: string; category: string; date: string; author: string; content: string; img: string }
> = {
  'island-hopping-greece': {
    title: 'The Ultimate Guide to Island Hopping in Greece',
    category: 'Destination Guides',
    date: 'Oct 15, 2023',
    author: 'Elena R.',
    img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
    content:
      'Greece is a paradise for island hoppers. With over 6,000 islands and islets, each offering unique charm, planning your route can be overwhelming. Start with the Cyclades—Mykonos, Santorini, and Naxos form a perfect triangle.',
  },
  'pack-european-tour': {
    title: 'How to Pack for a Two-Week European Tour',
    category: 'Travel Tips',
    date: 'Oct 10, 2023',
    author: 'Mark T.',
    img: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800',
    content:
      "Packing for two weeks in Europe requires strategy. Stick to a capsule wardrobe: 2-3 base colors, mix-and-match pieces. Bring one pair of comfortable walking shoes and a lightweight rain jacket.",
  },
  'schengen-visa-2024': {
    title: 'Schengen Visa Updates: What You Need to Know in 2024',
    category: 'Visa Updates',
    date: 'Oct 05, 2023',
    author: 'Sarah J.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    content:
      'The Schengen visa process has seen updates in 2024. ETIAS is now in effect for visa-exempt travellers. Processing times remain 15-21 days for most consulates.',
  },
};

type ArticleView = {
  title: string;
  category: string;
  date: string;
  author: string;
  img: string;
  content: string;
  excerpt?: string;
  tags: string[];
  faqs: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
};

export default function GuideArticle() {
  const { id } = useParams();
  const slug = id ?? '';
  const { data: cmsArticle, isLoading } = useGuideArticle(slug);
  const { data: allArticles = [] } = useGuideArticles();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const article = useMemo<ArticleView | null>(() => {
    if (cmsArticle) {
      const mapped = mapGuideToArticle(cmsArticle as unknown as Record<string, unknown>);
      return {
        title: mapped.title,
        category: mapped.category,
        date: mapped.date,
        author: mapped.author,
        img: mapped.img,
        content: mapped.body,
        excerpt: mapped.excerpt,
        tags: mapped.tags,
        faqs: mapped.faqs,
        seoTitle: mapped.seoTitle,
        seoDescription: mapped.seoDescription,
      };
    }
    const fallback = slug ? staticArticles[slug] : null;
    return fallback ? { ...fallback, tags: [], faqs: [] } : null;
  }, [cmsArticle, slug]);

  const related = useMemo(() => {
    const mapped = allArticles
      .map((a) => mapGuideToArticle(a as unknown as Record<string, unknown>))
      .filter((a) => a.id !== slug);
    const sameCategory = mapped.filter((a) => article && a.category && a.category === article.category);
    return [...sameCategory, ...mapped.filter((a) => !sameCategory.includes(a))].slice(0, 3);
  }, [allArticles, article, slug]);

  useSeo({
    title: article ? article.seoTitle || `${article.title} | Airland Holidays` : undefined,
    description: article ? article.seoDescription || article.excerpt : undefined,
    image: article?.img,
  });

  if (isLoading && isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article not found</h1>
          <Link to="/guide" className="btn-primary">
            Back to Travel Guide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <Link to="/guide" className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:text-primary-dark">
          <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          {article.img && (
            <div className="aspect-video md:aspect-[21/9]">
              <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8 md:p-12">
            {article.category && <span className="text-primary font-bold text-sm uppercase tracking-wider">{article.category}</span>}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">{article.title}</h1>
            <div className="flex flex-wrap gap-6 text-slate-600 text-sm mb-6">
              {article.date && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {article.date}
                </span>
              )}
              {article.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {article.author}
                </span>
              )}
            </div>
            {article.excerpt && <p className="text-lg text-slate-600 border-l-4 border-secondary pl-4 mb-8 italic">{article.excerpt}</p>}
            <RichContent html={article.content} />

            {article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-slate-100">
                <Tag className="w-4 h-4 text-slate-400" />
                {article.tags.map((tag) => (
                  <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {article.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {article.faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-slate-800 hover:bg-slate-50"
                        aria-expanded={openFaq === i}
                      >
                        {faq.question}
                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5">
                          <RichContent html={faq.answer} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Keep Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/guide/${r.id}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  {r.img && <img src={r.img} alt={r.title} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                  <div className="p-5">
                    {r.category && <span className="text-xs font-bold uppercase tracking-wide text-primary">{r.category}</span>}
                    <h3 className="font-bold text-slate-900 mt-1 group-hover:text-primary transition-colors">{r.title}</h3>
                    {r.excerpt && <p className="text-sm text-slate-500 mt-2 line-clamp-2">{r.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

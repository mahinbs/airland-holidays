import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useGuideArticle } from '../hooks/useContent';
import { mapGuideToArticle } from '../lib/mapContent';
import { isSupabaseConfigured } from '../lib/supabase';

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

export default function GuideArticle() {
  const { id } = useParams();
  const slug = id ?? '';
  const { data: cmsArticle, isLoading } = useGuideArticle(slug);

  const article = useMemo(() => {
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
      };
    }
    return slug ? staticArticles[slug] : null;
  }, [cmsArticle, slug]);

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

  const isHtml = article.content.trim().startsWith('<');

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <Link to="/guide" className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:text-primary-dark">
          <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <div className="aspect-video md:aspect-[21/9]">
            <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">{article.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">{article.title}</h1>
            <div className="flex gap-6 text-slate-600 text-sm mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {article.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {article.author}
              </span>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              {isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <p>{article.content}</p>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

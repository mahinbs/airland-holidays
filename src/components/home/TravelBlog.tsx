import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useGuideArticles } from '../../hooks/useContent';
import { mapGuideToArticle } from '../../lib/mapContent';

const staticBlogPosts = [
    { id: 1, title: 'Discover the Serene Beauty of Dal Lake', date: 'Mar 5, 2025', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800', slug: 'dal-lake-kashmir', span: 'md:col-span-1 md:row-span-2' },
    { id: 2, title: 'Best Manali Tour Packages from Coimbatore', date: 'Mar 10, 2025', image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&q=80&w=800', slug: 'best-manali-tour-packages-coimbatore', span: 'md:col-span-2 md:row-span-1' },
    { id: 3, title: 'Must Try Water Activities in Singapore', date: 'Mar 8, 2025', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', slug: 'water-activities-singapore', span: 'md:col-span-1 md:row-span-2' },
];

const spans = ['md:col-span-1 md:row-span-2', 'md:col-span-2 md:row-span-1', 'md:col-span-1 md:row-span-2', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1'];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

function BlogCard({ post }: { post: { title: string; date: string; image: string; slug: string; span: string } }) {
    return (
        <motion.a
            href={`/guide/${post.slug}`}
            variants={item}
            className={`group relative block overflow-hidden rounded-2xl ${post.span}`}
        >
            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/70 text-xs mb-1">{post.date}</p>
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-secondary transition-colors">{post.title}</h3>
            </div>
        </motion.a>
    );
}

export default function TravelBlog() {
    const { data: articles = [] } = useGuideArticles();
    const blogPosts = articles.length
        ? articles.slice(0, 5).map((a, i) => {
            const mapped = mapGuideToArticle(a as unknown as Record<string, unknown>);
            return {
                id: i + 1,
                title: mapped.title,
                date: mapped.date || 'Recent',
                image: mapped.img || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
                slug: mapped.id,
                span: spans[i % spans.length],
            };
        })
        : staticBlogPosts;

    return (
        <section className="section-padding bg-white">
            <div className="content-container">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Travel Blog</p>
                        <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-slate-900">Stories & Travel Tips</h2>
                    </div>
                    <a href="/guide" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[180px]" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    {blogPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'Discover the Serene Beauty of Dal Lake',
        date: 'Mar 5, 2025',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
        slug: 'dal-lake-kashmir',
        span: 'md:col-span-1 md:row-span-2',
    },
    {
        id: 2,
        title: 'Best Manali Tour Packages from Coimbatore',
        date: 'Mar 10, 2025',
        image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&q=80&w=800',
        slug: 'best-manali-tour-packages-coimbatore',
        span: 'md:col-span-2 md:row-span-1',
    },
    {
        id: 3,
        title: 'Must Try Water Activities in Singapore',
        date: 'Mar 8, 2025',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        slug: 'water-activities-singapore',
        span: 'md:col-span-1 md:row-span-2',
    },
    {
        id: 4,
        title: 'Sunset Views: Best Beaches for Couples',
        date: 'Mar 2, 2025',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
        slug: 'best-beaches-couples',
        span: 'md:col-span-1 md:row-span-1',
    },
    {
        id: 5,
        title: 'Temple Trails: Heritage Tour of South India',
        date: 'Feb 28, 2025',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
        slug: 'heritage-tour-south-india',
        span: 'md:col-span-1 md:row-span-1',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
    return (
        <a href="/guide" className="group block h-full min-h-[280px] md:min-h-[320px]">
            <article className="relative h-full min-h-[280px] md:min-h-[320px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col items-center text-center">
                    <h3 className="text-white font-bold uppercase tracking-wide text-sm md:text-base lg:text-lg leading-snug line-clamp-2 mb-3">
                        {post.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-sm font-semibold group-hover:bg-primary-dark transition-colors">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </article>
        </a>
    );
}

export default function TravelBlog() {
    return (
        <section className="section-padding bg-[#f5f0e8]">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        Our Travel Blog!
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Inspiring stories, expert tips, and destination guides from our travel experts.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6"
                >
                    {blogPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            variants={item}
                            className={post.span}
                        >
                            <BlogCard post={post} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-14"
                >
                    <a
                        href="/guide"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                    >
                        View All Posts
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

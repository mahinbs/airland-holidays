import { useMemo, useState } from 'react';
import { Camera, Images, PartyPopper, Trophy } from 'lucide-react';

type GalleryCategory = 'all' | 'trips' | 'customer-moments' | 'recognitions' | 'celebrations' | 'activities';

type GalleryItem = {
  title: string;
  image: string;
  category: Exclude<GalleryCategory, 'all'>;
  location: string;
  year: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: 'International Group Departure',
    image: '/whychooseus/1.jpeg',
    category: 'trips',
    location: 'Dubai',
    year: '2025',
  },
  {
    title: 'Guest Celebration Moment',
    image: '/whychooseus/2.jpeg',
    category: 'customer-moments',
    location: 'Singapore',
    year: '2025',
  },
  {
    title: 'Industry Recognition Event',
    image: '/whychooseus/3.jpeg',
    category: 'recognitions',
    location: 'Chennai',
    year: '2024',
  },
  {
    title: 'Annual Team Celebration',
    image: '/whychooseus/4.jpeg',
    category: 'celebrations',
    location: 'Chennai',
    year: '2025',
  },
  {
    title: 'Founder Felicitation',
    image: '/founder.png',
    category: 'recognitions',
    location: 'India',
    year: '2026',
  },
  {
    title: 'Company Activity Day',
    image: '/whychooseus/5.jpeg',
    category: 'activities',
    location: 'Office',
    year: '2025',
  },
];

const categoryMeta: Record<Exclude<GalleryCategory, 'all'>, { label: string; icon: typeof Camera }> = {
  trips: { label: 'Trips', icon: Images },
  'customer-moments': { label: 'Customer Moments', icon: Camera },
  recognitions: { label: 'Recognitions & Awards', icon: Trophy },
  celebrations: { label: 'Celebrations', icon: PartyPopper },
  activities: { label: 'Company Activities', icon: Camera },
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="min-h-screen bg-[#f8f6f1] py-14 md:py-20">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-secondary/20 text-primary font-bold">
            <Images className="w-4 h-4" />
            Company Gallery
          </p>
          <h1 className="mt-5 font-['Marcellus'] text-3xl md:text-5xl text-primary leading-tight">
            Trip Images, Moments & Company Highlights
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
            Browse travel memories, customer experiences, recognitions, certificates, celebrations and activities.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary/20 hover:bg-primary/5'
              }`}
          >
            All
          </button>
          {(Object.keys(categoryMeta) as Array<Exclude<GalleryCategory, 'all'>>).map((key) => {
            const Icon = categoryMeta[key].icon;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors inline-flex items-center gap-2 ${activeCategory === key ? 'bg-primary text-white' : 'bg-white text-primary border border-primary/20 hover:bg-primary/5'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {categoryMeta[key].label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="group bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.location} • {item.year}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

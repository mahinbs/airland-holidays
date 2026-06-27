import { useMemo, useState } from 'react';
import { Camera, Images, PartyPopper, Trophy } from 'lucide-react';
import { useGalleryItems } from '../hooks/useContent';
import { mapGalleryItem } from '../lib/mapContent';

type GalleryCategory = 'all' | 'trips' | 'customer-moments' | 'recognitions' | 'celebrations' | 'activities';

type GalleryItem = {
  title: string;
  image: string;
  category: Exclude<GalleryCategory, 'all'>;
  location: string;
  year: string;
};

const staticGalleryItems: GalleryItem[] = [
  { title: 'International Group Departure', image: '/whychooseus/1.jpeg', category: 'trips', location: 'Dubai', year: '2025' },
  { title: 'Guest Celebration Moment', image: '/whychooseus/2.jpeg', category: 'customer-moments', location: 'Singapore', year: '2025' },
  { title: 'Industry Recognition Event', image: '/whychooseus/3.jpeg', category: 'recognitions', location: 'Chennai', year: '2024' },
  { title: 'Annual Team Celebration', image: '/whychooseus/4.jpeg', category: 'celebrations', location: 'Chennai', year: '2025' },
  { title: 'Founder Felicitation', image: '/founder.png', category: 'recognitions', location: 'India', year: '2026' },
  { title: 'Company Activity Day', image: '/whychooseus/5.jpeg', category: 'activities', location: 'Office', year: '2025' },
];

const categoryMeta: Record<Exclude<GalleryCategory, 'all'>, { label: string; icon: typeof Camera }> = {
  trips: { label: 'Trips', icon: Images },
  'customer-moments': { label: 'Customer Moments', icon: Camera },
  recognitions: { label: 'Recognitions & Awards', icon: Trophy },
  celebrations: { label: 'Celebrations', icon: PartyPopper },
  activities: { label: 'Company Activities', icon: Camera },
};

export default function Gallery() {
  const { data: cmsItems } = useGalleryItems();
  const galleryItems = useMemo(() => {
    if (cmsItems?.length) {
      return cmsItems.map((g) => {
        const mapped = mapGalleryItem(g);
        const category = mapped.category in categoryMeta
          ? (mapped.category as Exclude<GalleryCategory, 'all'>)
          : 'activities';
        return { ...mapped, category };
      });
    }
    return staticGalleryItems;
  }, [cmsItems]);

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  return (
    <section className="min-h-screen bg-[#f8f6f1] py-14 md:py-20">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-secondary/20 text-primary font-bold">
            <Images className="w-4 h-4" />
            Our Gallery
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-6 mb-4">Moments That Matter</h1>
          <p className="text-slate-600 text-lg">Trips, celebrations, recognitions, and the people behind Airland Holidays.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-10">
          <button onClick={() => setActiveCategory('all')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>All</button>
          {(Object.keys(categoryMeta) as Exclude<GalleryCategory, 'all'>[]).map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {categoryMeta[cat].label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={`${item.title}-${item.image}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="font-bold text-lg">{item.title}</p>
                <p className="text-white/80 text-sm">{item.location} · {item.year}</p>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p className="col-span-full text-center text-slate-500 py-12">No gallery items in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

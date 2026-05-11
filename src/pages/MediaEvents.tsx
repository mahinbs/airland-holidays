import { useMemo, useState } from 'react';
import { PlayCircle, Images, Trophy, Camera, Megaphone, UserCircle2 } from 'lucide-react';

type MediaType = 'image' | 'video';
type Category = 'awards' | 'recognition' | 'events' | 'media' | 'founder';

type MediaItem = {
  title: string;
  category: Category;
  type: MediaType;
  src: string;
  poster?: string;
  location: string;
  year: string;
};

const categoryMeta: Record<Category, { label: string; icon: typeof Trophy }> = {
  awards: { label: 'Awards', icon: Trophy },
  recognition: { label: 'Recognition', icon: Images },
  events: { label: 'Events', icon: Camera },
  media: { label: 'Media Appearances', icon: Megaphone },
  founder: { label: 'Founder Visuals', icon: UserCircle2 },
};

const mediaItems: MediaItem[] = [
  {
    title: 'TAFI Leadership Recognition',
    category: 'awards',
    type: 'image',
    src: '/whychooseus/1.jpeg',
    location: 'India',
    year: '2024',
  },
  {
    title: 'Tourism Board Partnership Meet',
    category: 'recognition',
    type: 'image',
    src: '/whychooseus/2.jpeg',
    location: 'Chennai',
    year: '2024',
  },
  {
    title: 'National Day Industry Event',
    category: 'events',
    type: 'image',
    src: '/whychooseus/3.jpeg',
    location: 'Chennai',
    year: '2025',
  },
  {
    title: 'Founder Office Portrait',
    category: 'founder',
    type: 'image',
    src: '/founder.png',
    location: 'Chennai',
    year: '2026',
  },
  {
    title: 'Tourism Awareness Session',
    category: 'media',
    type: 'image',
    src: '/whychooseus/4.jpeg',
    location: 'Chennai',
    year: '2025',
  },
  // Future-ready video sample shape:
  // {
  //   title: 'Founder Message',
  //   category: 'founder',
  //   type: 'video',
  //   src: '/media/founder-message.mp4',
  //   poster: '/founder.png',
  //   location: 'Chennai',
  //   year: '2026',
  // },
];

export default function MediaEvents() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const visibleItems = useMemo(
    () =>
      activeCategory === 'all'
        ? mediaItems
        : mediaItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="min-h-screen bg-[#f8f6f1] py-14 md:py-20">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-secondary/20 text-primary font-bold">
            <Images className="w-4 h-4" />
            Company Archive
          </p>
          <h1 className="mt-5 font-['Marcellus'] text-3xl md:text-5xl text-primary leading-tight">
            Media &amp; Events Gallery
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
            Explore awards, recognitions, events, media highlights and founder visuals in one scalable gallery.
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
          {(Object.keys(categoryMeta) as Category[]).map((key) => {
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
          {visibleItems.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="group bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-auto mx-auto h-full object-cover bg-white transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                )}

                {item.type === 'video' && (
                  <div className="absolute top-3 right-3 rounded-full bg-black/60 text-white px-2.5 py-1 text-xs inline-flex items-center gap-1">
                    <PlayCircle className="w-3.5 h-3.5" />
                    Video
                  </div>
                )}
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

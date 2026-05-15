import { PlayCircle, Youtube } from 'lucide-react';

type VideoItem = {
  title: string;
  description: string;
  youtubeId: string;
  type: 'youtube' | 'media';
};

const videoItems: VideoItem[] = [
  {
    title: 'Customer Travel Story',
    description: 'Featured guest journey and destination highlights.',
    youtubeId: 'dQw4w9WgXcQ',
    type: 'youtube',
  },
  {
    title: 'Company Recognition Video',
    description: 'Moments from awards and recognitions.',
    youtubeId: '3JZ_D3ELwOQ',
    type: 'media',
  },
  {
    title: 'Trip Celebration Reel',
    description: 'Celebration snippets and group travel experiences.',
    youtubeId: 'kJQP7kiw5Fk',
    type: 'youtube',
  },
];

export default function MediaPage() {
  return (
    <section className="min-h-screen bg-[#f8f6f1] py-14 md:py-20">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-secondary/20 text-primary font-bold">
            <Youtube className="w-4 h-4" />
            Media Page
          </p>
          <h1 className="mt-5 font-['Marcellus'] text-3xl md:text-5xl text-primary leading-tight">
            YouTube Videos & Media Highlights
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
            A dedicated section to showcase YouTube videos and other media content with future CMS upload support.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {videoItems.map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}`}
                  title={item.title}
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary font-semibold">
                  <PlayCircle className="w-4 h-4" />
                  {item.type === 'youtube' ? 'YouTube' : 'Media Content'}
                </p>
                <h3 className="mt-2 text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

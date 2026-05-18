/**
 * Homepage “Journey Beyond” (WindowScroll) banner.
 * Point CMS/admin exports at this shape: swap `media` for image or short muted loop video.
 */

export type JourneyBannerMedia =
  | {
      type: 'image';
      src: string;
      alt?: string;
    }
  | {
      type: 'video';
      /** Short clip; keep files small & encoded for web (H.264 + webm optional later) */
      src: string;
      /** Still used while loading, on error, and for SEO/preview — high-quality cinematic frame */
      poster: string;
      /** If omitted, `poster` is used when the video fails to load */
      fallbackSrc?: string;
      alt?: string;
    };

export type JourneyBeyondBannerConfig = {
  media: JourneyBannerMedia;
  eyebrow: string;
  title: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const journeyBeyondBanner: JourneyBeyondBannerConfig = {
  media: {
    type: 'video',
    src: '/hero/3.mp4',
    poster:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070',
    fallbackSrc:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070',
    alt: 'Immersive premium travel',
  },
  eyebrow: 'Discover the Unseen',
  title: 'Journey Beyond',
  primaryCta: { label: 'Explore Packages', href: '/packages' },
  secondaryCta: { label: 'Talk to an expert', href: '/contact' },
};

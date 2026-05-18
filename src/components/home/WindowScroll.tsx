import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  journeyBeyondBanner,
  type JourneyBeyondBannerConfig,
} from '../../data/journeyBeyondBanner';

type Props = {
  /** Override defaults when wiring CMS / admin */
  banner?: JourneyBeyondBannerConfig;
};

export default function WindowScroll({ banner = journeyBeyondBanner }: Props) {
  const { media, eyebrow, title, primaryCta, secondaryCta } = banner;
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  /** Defer loading video until the banner is near the viewport (saves data & main-thread work). */
  const [videoAttached, setVideoAttached] = useState(false);

  const showVideo =
    media.type === 'video' &&
    !reduceMotion &&
    !videoFailed &&
    videoAttached &&
    typeof document !== 'undefined';

  const imageFallbackSrc =
    media.type === 'image' ? media.src : (media.fallbackSrc ?? media.poster);

  const imageAlt =
    media.type === 'image' ? (media.alt ?? '') : (media.alt ?? 'Travel experience');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (media.type !== 'video' || reduceMotion || videoFailed) return;
    const root = containerRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVideoAttached(true);
      },
      { rootMargin: '140px 0px', threshold: 0 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [media.type, reduceMotion, videoFailed]);

  const syncPlayback = useCallback(
    (play: boolean) => {
      const v = videoRef.current;
      if (!v || !showVideo) return;
      if (play) {
        v.play().catch(() => setVideoFailed(true));
      } else {
        v.pause();
      }
    },
    [showVideo]
  );

  useEffect(() => {
    if (!showVideo) return;
    const root = containerRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([e]) => {
        syncPlayback(e.isIntersecting && e.intersectionRatio > 0.12);
      },
      { threshold: [0, 0.12, 0.25, 0.5] }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [showVideo, syncPlayback]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-8%', '-15%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1.2, 1.1, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.72, 0.62, 0.55, 0.65]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [80, 20, -40]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.65], [0, 1, 0.9]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.45], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 -inset-y-[20%] w-full bg-slate-900"
        >
          <div className="relative h-full w-full">
            <img
              src={media.type === 'image' ? media.src : imageFallbackSrc}
              alt={imageAlt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                showVideo && videoReady ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              decoding="async"
            />

            {media.type === 'video' && showVideo && (
              <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  videoReady ? 'opacity-100' : 'opacity-0'
                }`}
                src={media.src}
                poster={media.poster}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-hidden
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoFailed(true)}
              />
            )}
          </div>
        </motion.div>

        {/* <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/55 to-slate-950/85"
        /> */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <motion.div
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
            className="max-w-4xl"
          >
            <span className="mb-4 block font-serif text-2xl italic text-white/95 md:text-3xl">
              {eyebrow}
            </span>
            <h2 className="text-5xl font-bold uppercase tracking-widest text-white md:text-7xl">
              {title}
            </h2>

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110"
                  >
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-white/40 bg-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

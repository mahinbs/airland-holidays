import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WindowScroll() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Multi-layer parallax: each element moves at a different rate for depth
    // Background image - slowest parallax (moves up gently as you scroll)
    const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-8%", "-15%"]);
    const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1.20, 1.10, 1]);

    // Mid-layer - overlay gradient shifts
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 0.5, 0.4, 0.5]);

    // Foreground text - fastest parallax (moves up more, creating depth)
    const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [80, 20, -40]);
    const textOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.65], [0, 1, 0.9]);
    const textScale = useTransform(scrollYProgress, [0.2, 0.45], [0.9, 1]);

    return (
        <section ref={containerRef} className="relative min-h-[100vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Parallax background image - moves slowest */}
                <motion.div
                    style={{ y: imageY, scale: imageScale }}
                    className="absolute inset-0 -inset-y-[20%] w-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070"
                        alt="Immersive Travel"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient overlay - mid-layer parallax */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80"
                />

                {/* Foreground content - fastest parallax for depth */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <motion.div
                        style={{ y: textY, opacity: textOpacity, scale: textScale }}
                        className="max-w-4xl"
                    >
                        <span className="text-white/95 font-serif italic text-2xl md:text-3xl mb-4 block">
                            Discover the Unseen
                        </span>
                        <h2 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-widest">
                            Journey Beyond
                        </h2>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

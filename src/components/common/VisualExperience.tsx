import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { 
    Volume2, VolumeX, Share2, ArrowRight, X, Play, Pause, 
    ChevronLeft, ChevronRight 
} from 'lucide-react';

interface VisualItem {
    id: number;
    type: 'video' | 'image';
    url: string;
    thumbnail: string;
    title: string;
    packageId: string;
    packageName: string;
}

interface VisualExperienceProps {
    items: VisualItem[];
    title?: string;
    subtitle?: string;
}

export default function VisualExperience({ items, title = "Explore by Visual Experiences", subtitle = "Immerse yourself in the world's most beautiful destinations through our lens." }: VisualExperienceProps) {
    const [muted, setMuted] = useState(true);
    const [selectedItem, setSelectedItem] = useState<VisualItem | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1.2,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2.2, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3.2, spacing: 24 },
            },
            "(min-width: 1280px)": {
                slides: { perView: 3.5, spacing: 24 },
            },
        },
    });

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMuted(!muted);
    };

    const handleItemClick = (item: VisualItem) => {
        setSelectedItem(item);
        setIsPlaying(false);
    };

    const handleShare = (e: React.MouseEvent, item: VisualItem) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: `Check out this amazing experience in ${item.packageName}!`,
                url: window.location.href,
            });
        } else {
            alert('Sharing not supported on this browser');
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
                        <p className="text-slate-600 max-w-2xl">{subtitle}</p>
                    </div>
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={() => instanceRef.current?.prev()}
                            className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => instanceRef.current?.next()}
                            className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div ref={sliderRef} className="keen-slider pb-8">
                    {items.map((item) => (
                        <div key={item.id} className="keen-slider__slide">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.type === 'video' ? (
                                    <div className="absolute inset-0">
                                        <video
                                            src={item.url}
                                            poster={item.thumbnail}
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-all">
                                                <Play className="w-8 h-8 text-white fill-white" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0">
                                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                    {item.type === 'video' && (
                                        <button
                                            onClick={toggleMute}
                                            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                                        >
                                            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => handleShare(e, item)}
                                        className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                                    <p className="text-white/80 text-sm mb-4 line-clamp-1">{item.packageName}</p>
                                    <a
                                        href={`/packages/${item.packageId}`}
                                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View Package <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
                        >
                            <div className="relative w-full max-w-lg h-full md:h-auto md:max-h-[90vh] aspect-[9/16] bg-slate-900 rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                                {selectedItem.type === 'video' ? (
                                    <>
                                        <video
                                            ref={videoRef}
                                            src={selectedItem.url}
                                            muted={muted}
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover cursor-pointer"
                                            onClick={() => togglePlay()}
                                        />
                                        {!isPlaying && (
                                            <div 
                                                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-20"
                                                onClick={() => togglePlay()}
                                            >
                                                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl transform transition-all hover:scale-110 active:scale-95">
                                                    <Play className="w-12 h-12 text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-cover" />
                                )}

                                <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                                    {selectedItem.type === 'video' && (
                                        <button
                                            onClick={() => togglePlay()}
                                            className="w-12 h-12 bg-primary backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition-all shadow-lg scale-110"
                                        >
                                            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedItem(null);
                                            setIsPlaying(false);
                                        }}
                                        className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                    {selectedItem.type === 'video' && (
                                        <button
                                            onClick={toggleMute}
                                            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                        >
                                            {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                        </button>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                    <h3 className="text-white font-bold text-2xl mb-2">{selectedItem.title}</h3>
                                    <p className="text-white/80 mb-6">{selectedItem.packageName}</p>
                                    <a
                                        href={`/packages/${selectedItem.packageId}`}
                                        className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary-dark transition-all transform active:scale-95"
                                    >
                                        Explore This Package <ArrowRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}

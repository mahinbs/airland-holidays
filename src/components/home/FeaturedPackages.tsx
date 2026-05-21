import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import PackageCardStack from '../common/PackageCardStack';
import {
    featuredDestinations,
    type DestinationMedia,
    type FeaturedDestination,
} from '../../data/featuredDestinations';

type TabType = 'international' | 'india';

function getPosterSrc(media: DestinationMedia): string {
    return media.type === 'video' ? media.poster : media.src;
}

function DestinationCardMedia({
    media,
    name,
    playVideo,
    showHoverImage,
    isMobileStack = false,
}: {
    media: DestinationMedia;
    name: string;
    playVideo: boolean;
    showHoverImage?: boolean;
    isMobileStack?: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const posterSrc = getPosterSrc(media);
    const hoverSrc = media.type === 'image' ? media.hoverSrc : undefined;
    const motionClass = isMobileStack ? '' : 'transition-all duration-700';

    useEffect(() => {
        const video = videoRef.current;
        if (!video || media.type !== 'video') return;

        if (playVideo) {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => undefined);
            }
        } else {
            video.pause();
            if (!isMobileStack) {
                video.currentTime = 0;
            }
        }
    }, [playVideo, media, isMobileStack]);

    return (
        <div className="absolute inset-0">
            <img
                src={posterSrc}
                alt={name}
                className={`absolute inset-0 h-full w-full object-cover ${motionClass} ${
                    playVideo && media.type === 'video' ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                } ${showHoverImage && hoverSrc ? 'group-hover:opacity-0 group-hover:scale-105' : !isMobileStack ? 'group-hover:scale-105' : ''}`}
                loading="lazy"
                draggable={false}
            />

            {media.type === 'image' && hoverSrc && (
                <img
                    src={hoverSrc}
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 h-full w-full object-cover opacity-0 ${motionClass} lg:group-hover:scale-105 lg:group-hover:opacity-100`}
                    loading="lazy"
                    draggable={false}
                />
            )}

            {media.type === 'video' && (
                <video
                    ref={videoRef}
                    src={media.src}
                    poster={media.poster}
                    muted
                    loop
                    playsInline
                    preload={isMobileStack ? 'none' : 'metadata'}
                    disablePictureInPicture
                    className={`absolute inset-0 h-full w-full object-cover ${isMobileStack ? '' : 'transition-opacity duration-700'} ${
                        playVideo ? 'scale-105 opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        </div>
    );
}

function DestinationCardInfo({
    destination,
    size = 'desktop',
}: {
    destination: FeaturedDestination;
    size?: 'mobile' | 'desktop';
}) {
    const isMobile = size === 'mobile';

    return (
        <div className={`absolute inset-x-0 bottom-0 z-10 ${isMobile ? 'p-5 pb-6' : 'p-4 pb-5 md:p-5'}`}>
            <h3
                className={`font-['Marcellus'] font-bold leading-tight tracking-wide text-white drop-shadow-md ${
                    isMobile ? 'mb-1.5 text-2xl' : 'mb-1 text-xl md:text-2xl lg:text-[1.65rem]'
                }`}
            >
                {destination.name}
            </h3>
            <p className={`font-medium text-white/90 ${isMobile ? 'text-sm' : 'text-xs md:text-sm'}`}>
                <span className="text-white/70">Starts From: </span>
                <span className="font-semibold text-white">{destination.startsFrom}</span>
            </p>
        </div>
    );
}

const DestinationCard = memo(function DestinationCard({
    destination,
    variant,
    playVideo = false,
}: {
    destination: FeaturedDestination;
    variant: 'mobile' | 'desktop';
    playVideo?: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = variant === 'mobile';
    const shouldPlayVideo =
        destination.media.type === 'video' && (isMobile ? playVideo : isHovered);

    return (
        <a
            href={destination.href}
            className={`group relative block h-full w-full select-none overflow-hidden bg-slate-900 ${
                isMobile ? 'rounded-3xl touch-pan-y' : 'rounded-2xl'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            draggable={false}
        >
            <div className={`relative w-full overflow-hidden ${isMobile ? 'h-full' : 'aspect-[3/4]'}`}>
                <DestinationCardMedia
                    media={destination.media}
                    name={destination.name}
                    playVideo={shouldPlayVideo}
                    showHoverImage={!isMobile}
                    isMobileStack={isMobile}
                />
                <DestinationCardInfo destination={destination} size={variant} />
            </div>
        </a>
    );
});

export default function FeaturedPackages() {
    const [activeTab, setActiveTab] = useState<TabType>('international');
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);

    const filteredDestinations = useMemo(
        () => featuredDestinations.filter((destination) => destination.type === activeTab),
        [activeTab]
    );

    const activeMobileDestinationId = filteredDestinations[activeMobileIndex]?.id;

    return (
        <section className="section-padding bg-white">
            <div className="content-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <h2 className="mb-2 font-['Marcellus'] text-3xl leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                            Destinations Worth Discovering
                        </h2>
                        <p className="text-base font-light text-slate-600 md:text-lg">
                            Curated for unforgettable experiences.
                        </p>
                    </div>

                    <div className="inline-flex w-fit rounded-xl border border-slate-700 bg-slate-100 p-1">
                        <button
                            onClick={() => {
                                setActiveTab('international');
                                setActiveMobileIndex(0);
                            }}
                            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                                activeTab === 'international'
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-slate-700 hover:text-primary'
                            }`}
                            type="button"
                        >
                            International
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('india');
                                setActiveMobileIndex(0);
                            }}
                            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                                activeTab === 'india'
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-slate-700 hover:text-primary'
                            }`}
                            type="button"
                        >
                            India
                        </button>
                    </div>
                </motion.div>

                {/* Mobile: stacked card swiper */}
                <div className="flex justify-center px-2 pb-2 md:hidden">
                    <PackageCardStack
                        key={`${activeTab}-${filteredDestinations.length}`}
                        onActiveIndexChange={setActiveMobileIndex}
                    >
                        {filteredDestinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                                variant="mobile"
                                playVideo={destination.id === activeMobileDestinationId}
                            />
                        ))}
                    </PackageCardStack>
                </div>

                {/* Desktop / tablet: horizontal carousel */}
                <div className="group/slider relative hidden md:block">
                    <button
                        type="button"
                        aria-label="Previous destinations"
                        onClick={() => swiperInstance?.slidePrev()}
                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-white/95 text-primary shadow-md opacity-0 pointer-events-none transition-opacity group-hover/slider:pointer-events-auto group-hover/slider:opacity-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        aria-label="Next destinations"
                        onClick={() => swiperInstance?.slideNext()}
                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-white/95 text-primary shadow-md opacity-0 pointer-events-none transition-opacity group-hover/slider:pointer-events-auto group-hover/slider:opacity-100"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <Swiper
                        modules={[Autoplay]}
                        onSwiper={setSwiperInstance}
                        autoplay={{ delay: 2600, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        loop={filteredDestinations.length > 6}
                        speed={700}
                        grabCursor
                        slidesPerView={2}
                        spaceBetween={14}
                        breakpoints={{
                            640: { slidesPerView: 3, spaceBetween: 16 },
                            768: { slidesPerView: 4, spaceBetween: 18 },
                            1024: { slidesPerView: 6, spaceBetween: 20 },
                        }}
                        className="pb-4"
                    >
                        {filteredDestinations.map((destination) => (
                            <SwiperSlide key={destination.id}>
                                <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-md transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
                                    <DestinationCard destination={destination} variant="desktop" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <a
                        href="/packages"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        Explore Now <ArrowRight className="h-4 w-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

import React, { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';

interface PackageCardStackProps {
    children: React.ReactNode;
    onActiveIndexChange?: (index: number) => void;
}

const PackageCardStack: React.FC<PackageCardStackProps> = ({ children, onActiveIndexChange }) => {
    const childrenArray = React.Children.toArray(children);
    const sourceLength = childrenArray.length;
    const canLoop = sourceLength >= 3;

    const syncActiveIndex = useCallback(
        (swiper: SwiperType) => {
            if (!onActiveIndexChange || sourceLength === 0) return;
            onActiveIndexChange(swiper.realIndex);
        },
        [onActiveIndexChange, sourceLength]
    );

    return (
        <div className="w-[300px] sm:w-[350px]">
            <style>{`
                .destination-card-stack .swiper-slide {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    transform: translate3d(0, 0, 0);
                    will-change: transform;
                }
                .destination-card-stack.swiper-cards .swiper-slide-shadow {
                    display: none;
                }
            `}</style>
            <Swiper
                effect="cards"
                grabCursor
                modules={[EffectCards]}
                loop={canLoop}
                speed={420}
                longSwipesMs={280}
                threshold={6}
                touchAngle={40}
                touchReleaseOnEdges
                preventInteractionOnTransition
                resistanceRatio={0.82}
                cardsEffect={{
                    perSlideOffset: 9,
                    perSlideRotate: 2,
                    rotate: true,
                    slideShadows: false,
                }}
                onTransitionEnd={syncActiveIndex}
                onSwiper={syncActiveIndex}
                className="destination-card-stack h-[480px] w-full overflow-visible"
            >
                {childrenArray.map((child, index) => {
                    const slideKey =
                        React.isValidElement(child) && child.key != null ? String(child.key) : `slide-${index}`;

                    return (
                        <SwiperSlide
                            key={slideKey}
                            className="flex flex-col overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
                        >
                            {child}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default PackageCardStack;

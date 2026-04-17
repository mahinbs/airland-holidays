import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

interface PackageCardStackProps {
    children: React.ReactNode;
}

const PackageCardStack: React.FC<PackageCardStackProps> = ({ children }) => {
    // Convert children to array and duplicate for smooth looping
    const childrenArray = React.Children.toArray(children);
    const duplicatedChildren = [...childrenArray, ...childrenArray, ...childrenArray];

    return (
        <div className="w-[300px] sm:w-[350px] md:w-[400px]">
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                loop={true}
                cardsEffect={{ 
                    perSlideOffset: 12, 
                    rotate: true, 
                    slideShadows: false 
                }}
                className="w-full h-[500px] overflow-visible"
            >
                {duplicatedChildren.map((child, index) => (
                    <SwiperSlide 
                        key={index} 
                        className="rounded-3xl bg-white shadow-xl flex flex-col overflow-hidden"
                    >
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PackageCardStack;

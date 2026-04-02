import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CountryCard } from './CountryCard';
import type { CountryVisa } from '../../data/visaData';

interface FeaturedVisasProps {
    countries: CountryVisa[];
}

export const FeaturedVisas = ({ countries }: FeaturedVisasProps) => {
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            loop: true,
            created() {
                setLoaded(true);
            },
            slides: {
                perView: 1.1,
                spacing: 16,
            },
            breakpoints: {
                '(min-width: 640px)': {
                    slides: { perView: 2.1, spacing: 20 },
                },
                '(min-width: 1024px)': {
                    slides: { perView: 3.1, spacing: 24 },
                },
                '(min-width: 1280px)': {
                    slides: { perView: 4.1, spacing: 32 },
                },
            },
        },
        [
            (slider) => {
                let timeout: any;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 3000);
                }
                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', nextTimeout);
                slider.on('updated', nextTimeout);
            },
        ]
    );

    return (
        <div className="py-20 bg-white">
            <div className="content-container">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Destinations</h2>
                        <p className="text-slate-500">Most popular choices for business and leisure.</p>
                    </div>
                    <a
                        href="#all-countries"
                        className="hidden sm:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors"
                    >
                        View All <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Slider Container */}
            <div className="relative overflow-hidden px-4 md:px-12">
                <div ref={sliderRef} className="keen-slider py-4">
                    {countries.map((country, idx) => (
                        <div key={country.slug} className="keen-slider__slide">
                            <CountryCard country={country} index={idx} large />
                        </div>
                    ))}
                </div>

                {/* Desktop Navigation Buttons Below */}
                {loaded && instanceRef.current && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                instanceRef.current?.prev();
                            }}
                            className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 border border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group/btn"
                        >
                            <ChevronRight className="w-6 h-6 rotate-180" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                instanceRef.current?.next();
                            }}
                            className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 border border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group/btn"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

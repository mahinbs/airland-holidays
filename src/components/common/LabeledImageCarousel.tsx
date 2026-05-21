import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { PackageLabeledImage } from "../../types/packageDetail";

type Props = {
  items: PackageLabeledImage[];
  /** Prefix for alt text when title is empty */
  ariaLabel?: string;
  className?: string;
};

function StaticLabeledFigure({ item, ariaLabel, index }: { item: PackageLabeledImage; ariaLabel: string; index: number }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
        <img
          src={item.src}
          alt={item.title ? item.title : `${ariaLabel} ${index + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      {item.title ? (
        <figcaption className="border-t border-slate-100 bg-white px-3 py-2.5">
          <p className="truncate text-sm font-semibold tracking-tight text-slate-900">{item.title}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Horizontal swiper: touch-friendly slides, nav arrows only when slides overflow.
 */
export default function LabeledImageCarousel({ items, ariaLabel = "Gallery", className = "" }: Props) {
  if (!items.length) return null;

  const filtered = items.filter((i) => i.src?.trim());
  if (!filtered.length) return null;

  if (filtered.length === 1) {
    return (
      <div className={`labeled-image-carousel relative -mx-1 ${className}`}>
        <StaticLabeledFigure item={filtered[0]} ariaLabel={ariaLabel} index={0} />
      </div>
    );
  }

  return (
    <div className={`labeled-image-carousel relative -mx-1 ${className}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        breakpoints={{
          520: { slidesPerView: 1.2, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 14 },
          1024: { slidesPerView: 2.25, spaceBetween: 16 },
        }}
        centeredSlides={false}
        grabCursor
        watchOverflow
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        className="detail-labeled-swiper pb-10"
      >
        {filtered.map((item, idx) => (
          <SwiperSlide key={`${item.src}-${idx}`} className="!h-auto">
            <StaticLabeledFigure item={item} ariaLabel={ariaLabel} index={idx} />
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .detail-labeled-swiper .swiper-button-next,
        .detail-labeled-swiper .swiper-button-prev {
          color: white;
          background: rgba(15, 23, 42, 0.45);
          width: 38px;
          height: 38px;
          border-radius: 9999px;
          backdrop-filter: blur(8px);
        }
        .detail-labeled-swiper .swiper-button-next:after,
        .detail-labeled-swiper .swiper-button-prev:after { font-size: 14px; font-weight: 800; }
        .detail-labeled-swiper .swiper-button-disabled,
        .detail-labeled-swiper.swiper-overflow .swiper-button-next,
        .detail-labeled-swiper.swiper-overflow .swiper-button-prev,
        .detail-labeled-swiper.swiper-overflow .swiper-pagination {
          display: none !important;
        }
        .detail-labeled-swiper .swiper-pagination-bullet {
          background: var(--color-primary, #0f172a);
          opacity: 0.35;
        }
        .detail-labeled-swiper .swiper-pagination-bullet-active { opacity: 1; }
      `}</style>
    </div>
  );
}

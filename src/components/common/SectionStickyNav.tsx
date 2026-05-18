import { useEffect, useRef } from 'react';

type SectionNavItem = {
  id: string;
  label: string;
};

type SectionStickyNavProps = {
  items: SectionNavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  className?: string;
  useContainer?: boolean;
};

export default function SectionStickyNav({
  items,
  activeSection,
  onNavigate,
  className = '',
  useContainer = true,
}: SectionStickyNavProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Center the active tab inside the horizontal scroll bar WITHOUT touching page scroll
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !activeSection) return;

    const activeBtn = scroller.querySelector<HTMLElement>(
      `[data-section-id="${activeSection}"]`
    );
    if (!activeBtn) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const targetScrollLeft =
      scroller.scrollLeft +
      (btnRect.left - scrollerRect.left) -
      scrollerRect.width / 2 +
      btnRect.width / 2;

    scroller.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  }, [activeSection]);

  const list = (
    <div
      ref={scrollerRef}
      className="flex overflow-x-auto gap-3 md:gap-6 hide-scrollbar py-3"
    >
      {items.map((item) => (
        <button
          key={item.id}
          data-section-id={item.id}
          type="button"
          onClick={() => onNavigate(item.id)}
          className={`px-4 py-2 whitespace-nowrap text-[12px] md:text-sm font-bold uppercase tracking-wider transition-all rounded-lg shrink-0 ${
            activeSection === item.id
              ? 'bg-primary text-white shadow-sm'
              : 'bg-transparent text-slate-800 font-semibold hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className={`sticky top-[4.25rem] md:top-[4rem] lg:top-[6.5rem] z-40 bg-white border-b border-slate-200 shadow-sm w-full font-sans ${className}`.trim()}
    >
      {useContainer ? (
        <div className="content-container px-6 lg:px-8">{list}</div>
      ) : (
        <div className="px-2 md:px-4">{list}</div>
      )}
    </div>
  );
}

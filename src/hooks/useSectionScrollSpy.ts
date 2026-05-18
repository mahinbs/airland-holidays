import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type UseSectionScrollSpyOptions = {
  initialSection?: string;
  /**
   * px distance from the top of the viewport to the bottom of the combined
   * sticky bars (main navbar + section tab bar + a little breathing room).
   *
   * Breakdown (desktop):
   *   Main navbar  ≈ 104 px  (lg:top-[6.5rem] + bar height)
   *   Section nav  ≈  50 px
   *   Buffer       ≈  16 px
   *   Default      = 170 px
   *
   * Mobile is smaller but 170 px still gives a comfortable gap.
   */
  topOffset?: number;
};

export function useSectionScrollSpy(
  sectionIds: string[],
  options?: UseSectionScrollSpyOptions
) {
  const normalizedIds = useMemo(
    () => sectionIds.filter((id, i) => id && sectionIds.indexOf(id) === i),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectionIds.join(',')]
  );

  const topOffset = options?.topOffset ?? 170;
  const initialSection = options?.initialSection ?? normalizedIds[0] ?? '';
  const [activeSection, setActiveSection] = useState(initialSection);

  const isClickScrollingRef = useRef(false);
  const clickTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!normalizedIds.length) return;

    const detect = () => {
      if (isClickScrollingRef.current) return;

      const sectionEls = normalizedIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      // Walk through sections; the last one whose top has passed the offset line is active
      let current = normalizedIds[0] ?? '';
      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= topOffset) {
          current = el.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', detect, { passive: true });
    detect(); // run once on mount

    return () => {
      window.removeEventListener('scroll', detect);
      if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current);
    };
  }, [normalizedIds, topOffset]);

  const scrollToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      // Immediately lock spy so scroll events don't fight back
      isClickScrollingRef.current = true;
      setActiveSection(id);

      if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current);

      const targetY =
        target.getBoundingClientRect().top + window.scrollY - topOffset + 8;

      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });

      // Release lock once smooth scroll finishes (~700 ms is enough)
      clickTimerRef.current = window.setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 900);
    },
    [topOffset]
  );

  return { activeSection, scrollToSection };
}

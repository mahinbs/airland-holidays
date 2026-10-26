import type { HeaderConfig, MarqueeItem } from '../types/nav';

/** Legacy marquee strings started with an emoji — map the known ones to an icon key. */
const EMOJI_ICON: Record<string, string> = {
  '✈': 'Plane',
  '🏆': 'Trophy',
  '🌍': 'Globe',
  '⚡': 'Zap',
  '🎯': 'Target',
  '📞': 'Phone',
  '⭐': 'Star',
  '🎁': 'Gift',
  '🛳': 'Ship',
  '🏨': 'Hotel',
};

let counter = 0;
const newId = () => `m${Date.now().toString(36)}${(counter++).toString(36)}`;

export function createMarqueeItem(partial: Partial<MarqueeItem> = {}): MarqueeItem {
  return { id: newId(), icon: '', text: '', link: '', enabled: true, ...partial };
}

/** Converts a legacy string ("✈ 10,000+ Visas Processed") into a structured item. */
export function parseLegacyMarquee(text: string): MarqueeItem {
  const trimmed = text.trim();
  const first = Array.from(trimmed)[0] ?? '';
  const stripped = first.replace(/️/g, '');
  if (stripped && EMOJI_ICON[stripped]) {
    return createMarqueeItem({ icon: EMOJI_ICON[stripped], text: trimmed.slice(first.length).replace(/^️?\s*/, '') });
  }
  // Unknown leading emoji → drop it, keep text only.
  if (stripped && !/[\p{L}\p{N}]/u.test(stripped)) {
    return createMarqueeItem({ text: trimmed.slice(first.length).replace(/^️?\s*/, '') });
  }
  return createMarqueeItem({ text: trimmed });
}

/** Structured entries win; otherwise migrate the legacy `marqueeItems` strings. */
export function resolveMarqueeEntries(config: Pick<HeaderConfig, 'marqueeItems' | 'marqueeEntries'>): MarqueeItem[] {
  if (config.marqueeEntries?.length) {
    return config.marqueeEntries.map((e) => ({ ...e, id: e.id ?? newId(), icon: e.icon ?? '', enabled: e.enabled !== false }));
  }
  return (config.marqueeItems ?? []).filter((t) => t.trim()).map(parseLegacyMarquee);
}

/** Plain-text mirror stored in `marqueeItems` so older consumers keep working. */
export function marqueeToLegacy(entries: MarqueeItem[]): string[] {
  return entries.filter((e) => e.enabled && e.text.trim()).map((e) => e.text.trim());
}

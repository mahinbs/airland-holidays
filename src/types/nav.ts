export type NavLink = { label: string; href: string };

export type MegaColumn = { heading: string; destinations: string[] };

export type MegaPromo = {
  src: string;
  label: string;
  sub: string;
  cta: string;
  href: string;
};

export type MegaTab = {
  id: string;
  label: string;
  columns: MegaColumn[];
  promoImage?: MegaPromo;
};

export type NavItemLink = { label: string; type: 'link'; href: string };
export type NavItemDropdown = { label: string; type: 'dropdown'; items: NavLink[] };
export type NavItemMega = { label: string; type: 'mega'; tabs: MegaTab[]; quickLinks: NavLink[] };

export type NavItem = NavItemLink | NavItemDropdown | NavItemMega;

export type MarqueeSettings = {
  enabled: boolean;
  autoScroll: boolean;
  scrollSpeed: number;
  pauseOnHover: boolean;
};

/** Structured utility-bar announcement. `icon` is a key of MARQUEE_ICONS (empty = no icon). */
export type MarqueeItem = {
  id?: string;
  icon: string;
  text: string;
  link?: string;
  enabled: boolean;
};

export type HeaderConfig = {
  phone: string;
  whatsapp: string;
  socials: { platform: string; href: string; enabled?: boolean }[];
  /** Plain-text mirror of the enabled marquee entries (kept for backwards compatibility). */
  marqueeItems: string[];
  /** Structured announcements — source of truth when present. */
  marqueeEntries?: MarqueeItem[];
  marqueeSettings?: MarqueeSettings;
  enquireLabel?: string;
  enquireHref?: string;
  payNowLabel?: string;
  payNowHref?: string;
};

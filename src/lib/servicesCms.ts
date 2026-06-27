import type { ServiceRow } from '../types/database';
import { navStructure } from '../data/navConfig';

export type ServiceNavLink = { label: string; href: string };

export type ServiceOverviewItem = {
  title: string;
  desc: string;
  path: string;
  badge: string;
  visuals: string[];
};

const defaultServiceNavItems =
  (navStructure.find((item) => item.label === 'Services' && item.type === 'dropdown')?.items as
    | ServiceNavLink[]
    | undefined) ?? [];

const defaultOverviewItems: ServiceOverviewItem[] = [
  {
    title: 'Flight Booking',
    desc: 'Expert route planning with the best fares and ultimate comfort.',
    path: '/services/flight-booking',
    badge: 'Most Booked',
    visuals: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
      'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80',
    ],
  },
  {
    title: 'Visa Assistance',
    desc: 'High-success visa processing with complete expert guidance.',
    path: '/visa',
    badge: '99% Success Rate',
    visuals: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80'],
  },
  {
    title: 'Forex & Currency',
    desc: 'Secure and best-rate currency exchange for all your destinations.',
    path: '/services/forex',
    badge: 'Best Rates',
    visuals: ['https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80'],
  },
  {
    title: 'Travel Insurance',
    desc: 'Complete protection for safe, secure, and worry-free journeys.',
    path: '/services/travel-insurance',
    badge: 'Full Coverage',
    visuals: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80'],
  },
];

const fallbackVisual =
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800';

export function buildServiceNavItems(cmsRows?: ServiceRow[] | null): ServiceNavLink[] {
  if (cmsRows?.length) {
    return [
      { label: 'All Services', href: '/services' },
      ...cmsRows.map((row) => ({
        label: row.title,
        href: `/services/${row.slug}`,
      })),
    ];
  }
  return defaultServiceNavItems;
}

export function buildServiceOverviewItems(cmsRows?: ServiceRow[] | null): ServiceOverviewItem[] {
  if (!cmsRows?.length) return defaultOverviewItems;

  const featured = cmsRows.filter((row) => row.priority);
  const list = (featured.length ? featured : cmsRows).slice(0, 8);

  return list.map((row) => ({
    title: row.title,
    desc: row.summary ?? '',
    path: `/services/${row.slug}`,
    badge: row.badge ?? 'Service',
    visuals: row.image ? [row.image] : [fallbackVisual],
  }));
}

import { useQuery } from '@tanstack/react-query';
import {
  fetchPublished,
  fetchBySlug,
  fetchFaqWithItems,
  fetchSingleton,
  fetchSiteSetting,
} from '../services/content';
import type {
  PackageRow,
  DestinationRow,
  ContinentRow,
  FeaturedDestinationRow,
  VisaCountryRow,
  CruiseRow,
  ServiceRow,
  GuideArticleRow,
  HeroSlideRow,
  FestivalEventRow,
  FixedDepartureRow,
  FeaturedExperienceRow,
  TestimonialRow,
  GalleryItemRow,
  MediaVideoRow,
  MediaEventRow,
} from '../types/database';

export function usePackages() {
  return useQuery({ queryKey: ['packages'], queryFn: () => fetchPublished<PackageRow>('packages') });
}

export function usePackage(slug: string) {
  return useQuery({
    queryKey: ['package', slug],
    queryFn: () => fetchBySlug<PackageRow>('packages', slug),
    enabled: Boolean(slug),
  });
}

export function useDestinations() {
  return useQuery({ queryKey: ['destinations'], queryFn: () => fetchPublished<DestinationRow>('destinations') });
}

export function useDestination(slug: string) {
  return useQuery({
    queryKey: ['destination', slug],
    queryFn: () => fetchBySlug<DestinationRow>('destinations', slug),
    enabled: Boolean(slug),
  });
}

export function useContinents() {
  return useQuery({ queryKey: ['continents'], queryFn: () => fetchPublished<ContinentRow>('continents') });
}

export function useContinent(slug: string) {
  return useQuery({
    queryKey: ['continent', slug],
    queryFn: () => fetchBySlug<ContinentRow>('continents', slug),
    enabled: Boolean(slug),
  });
}

export function useFeaturedDestinations() {
  return useQuery({
    queryKey: ['featured_destinations'],
    queryFn: () => fetchPublished<FeaturedDestinationRow>('featured_destinations'),
  });
}

export function useVisaCountries() {
  return useQuery({ queryKey: ['visa_countries'], queryFn: () => fetchPublished<VisaCountryRow>('visa_countries') });
}

export function useVisaCountry(slug: string) {
  return useQuery({
    queryKey: ['visa', slug],
    queryFn: () => fetchBySlug<VisaCountryRow>('visa_countries', slug),
    enabled: Boolean(slug),
  });
}

export function useCruises() {
  return useQuery({ queryKey: ['cruises'], queryFn: () => fetchPublished<CruiseRow>('cruises') });
}

export function useCruise(slug: string) {
  return useQuery({
    queryKey: ['cruise', slug],
    queryFn: () => fetchBySlug<CruiseRow>('cruises', slug),
    enabled: Boolean(slug),
  });
}

export function useServices() {
  return useQuery({ queryKey: ['services'], queryFn: () => fetchPublished<ServiceRow>('services') });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: () => fetchBySlug<ServiceRow>('services', slug),
    enabled: Boolean(slug),
  });
}

export function useGuideArticles() {
  return useQuery({ queryKey: ['guide_articles'], queryFn: () => fetchPublished<GuideArticleRow>('guide_articles') });
}

export function useGuideArticle(slug: string) {
  return useQuery({
    queryKey: ['guide', slug],
    queryFn: () => fetchBySlug<GuideArticleRow>('guide_articles', slug),
    enabled: Boolean(slug),
  });
}

export function useHeroSlides() {
  return useQuery({ queryKey: ['hero_slides'], queryFn: () => fetchPublished<HeroSlideRow>('hero_slides') });
}

export function useFestivalsEvents() {
  return useQuery({ queryKey: ['festivals_events'], queryFn: () => fetchPublished<FestivalEventRow>('festivals_events') });
}

export function useFixedDepartures() {
  return useQuery({ queryKey: ['fixed_departures'], queryFn: () => fetchPublished<FixedDepartureRow>('fixed_departures') });
}

export function useFeaturedExperiences() {
  return useQuery({
    queryKey: ['featured_experiences'],
    queryFn: () => fetchPublished<FeaturedExperienceRow>('featured_experiences'),
  });
}

export function useTestimonials() {
  return useQuery({ queryKey: ['testimonials'], queryFn: () => fetchPublished<TestimonialRow>('testimonials') });
}

export function useGalleryItems() {
  return useQuery({ queryKey: ['gallery_items'], queryFn: () => fetchPublished<GalleryItemRow>('gallery_items') });
}

export function useMediaVideos() {
  return useQuery({ queryKey: ['media_videos'], queryFn: () => fetchPublished<MediaVideoRow>('media_videos') });
}

export function useMediaEvents() {
  return useQuery({ queryKey: ['media_events'], queryFn: () => fetchPublished<MediaEventRow>('media_events') });
}

export function useFaq(options?: { module?: 'global' | 'package' | 'visa' | 'cruise' | 'service' | 'destination' | 'payment' }) {
  return useQuery({
    queryKey: ['faq', options?.module ?? 'global'],
    queryFn: async () => {
      const [categories, mapping] = await Promise.all([
        fetchFaqWithItems(),
        fetchSiteSetting<Record<string, string>>('faq_module_mapping'),
      ]);
      if (!options?.module || options.module === 'global') {
        return categories.filter((cat: { id: string }) => {
          const mod = mapping?.[cat.id];
          return !mod || mod === 'global';
        });
      }
      return categories.filter((cat: { id: string }) => mapping?.[cat.id] === options.module);
    },
  });
}

export function useJourneyBanner() {
  return useQuery({
    queryKey: ['journey_beyond_banner'],
    queryFn: () => fetchSingleton<{ config: unknown }>('journey_beyond_banner'),
  });
}

export function useAboutPage() {
  return useQuery({
    queryKey: ['about_page'],
    queryFn: () => fetchSingleton<{ content: unknown }>('about_page'),
  });
}

export function useNavConfig() {
  return useQuery({
    queryKey: ['nav_config'],
    queryFn: () => fetchSingleton<{ structure: unknown }>('nav_config'),
  });
}

export function useSiteSetting<T>(key: string) {
  return useQuery({ queryKey: ['site_setting', key], queryFn: () => fetchSiteSetting<T>(key) });
}

export function useFooterConfig<T>() {
  return useSiteSetting<T>('footer_config');
}

export function useHomepageConfig<T>() {
  return useSiteSetting<T>('homepage_config');
}

export function useServicesPageConfig<T>() {
  return useSiteSetting<T>('services_page_config');
}

export type ContentStatus = 'draft' | 'published';
export type SubmissionStatus = 'new' | 'read' | 'archived';
export type VisaStatusType = 'required' | 'free' | 'on-arrival';

export interface PackageRow {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  destination: string;
  country?: string | null;
  duration?: string | null;
  travel_type?: string | null;
  best_time?: string | null;
  visa_info?: string | null;
  price: number;
  rating?: number | null;
  reviews_count?: number | null;
  image?: string | null;
  images?: unknown;
  video_url?: string | null;
  overview?: string | null;
  highlights?: unknown;
  itinerary?: unknown;
  inclusions?: unknown;
  exclusions?: unknown;
  insights?: unknown;
  tags?: unknown;
  badge?: string | null;
  category?: string | null;
  continent?: string | null;
  style_tags?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface DestinationRow {
  id: string;
  slug: string;
  name: string;
  region?: string | null;
  continent?: string | null;
  hero_image?: string | null;
  hero_video?: string | null;
  overview?: string | null;
  highlights?: unknown;
  detail?: unknown;
  linked_package_slugs?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface ContinentRow {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  featured_image?: string | null;
  countries?: unknown;
  detail?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface FeaturedDestinationRow {
  id: string;
  name: string;
  starts_from?: string | null;
  media: unknown;
  dest_type: 'india' | 'international';
  href?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface VisaCountryRow {
  id: string;
  slug: string;
  name: string;
  image?: string | null;
  flag?: string | null;
  price?: number | null;
  highlight_text?: string | null;
  visa_status: VisaStatusType;
  featured?: boolean | null;
  detail?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface CruiseRow {
  id: string;
  slug: string;
  name: string;
  image?: string | null;
  video_url?: string | null;
  duration?: string | null;
  departure_location?: string | null;
  starting_price?: number | null;
  category?: string | null;
  featured?: boolean | null;
  destination?: string | null;
  overview?: string | null;
  highlights?: unknown;
  itinerary?: unknown;
  inclusions?: unknown;
  exclusions?: unknown;
  experience?: unknown;
  accommodation?: unknown;
  gallery?: unknown;
  faqs?: unknown;
  detail?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface ServiceRow {
  id: string;
  slug: string;
  icon?: string | null;
  title: string;
  summary?: string | null;
  value_statement?: string | null;
  image?: string | null;
  badge?: string | null;
  priority?: boolean | null;
  detail?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface GuideArticleRow {
  id: string;
  slug: string;
  title: string;
  category?: string | null;
  excerpt?: string | null;
  body?: string | null;
  cover_image?: string | null;
  author?: string | null;
  published_at?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface HeroSlideRow {
  id: string;
  title: string;
  subtitle?: string | null;
  top_text?: string | null;
  image?: string | null;
  video?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface FestivalEventRow {
  id: string;
  external_id?: string | null;
  tag?: string | null;
  name: string;
  location?: string | null;
  month?: string | null;
  month_num?: number | null;
  hook_line?: string | null;
  media?: unknown;
  price?: string | null;
  duration?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  trending?: boolean | null;
  event_type?: 'international' | 'india' | null;
  /** Extra CMS fields: eventDate, gallery, videos */
  detail?: unknown;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface FixedDepartureRow {
  id: string;
  external_id?: string | null;
  category?: string | null;
  badge?: string | null;
  badge_type?: string | null;
  title: string;
  images?: unknown;
  duration?: string | null;
  date_range?: string | null;
  month_num?: number | null;
  price?: string | null;
  price_note?: string | null;
  micro_info?: unknown;
  seats_left?: number | null;
  href?: string | null;
  /** Added by migration 004_cms_enhancements.sql */
  destination?: string | null;
  featured_image?: string | null;
  banner_image?: string | null;
  availability_status?: 'available' | 'limited' | 'sold-out' | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface FeaturedExperienceRow {
  id: string;
  title: string;
  destination?: string | null;
  duration?: string | null;
  price?: string | null;
  image?: string | null;
  href?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role?: string | null;
  text?: string | null;
  rating?: number | null;
  avatar?: string | null;
  video_url?: string | null;
  testimonial_type?: 'written' | 'video' | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface FaqCategoryRow {
  id: string;
  name: string;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface FaqItemRow {
  id: string;
  category_id: string;
  question: string;
  answer: string;
  sort_order?: number | null;
  /** Added by migration 004_cms_enhancements.sql — null/true means visible */
  enabled?: boolean | null;
}

export interface GalleryItemRow {
  id: string;
  title: string;
  image: string;
  category: string;
  location?: string | null;
  year?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface MediaVideoRow {
  id: string;
  title: string;
  youtube_id?: string | null;
  embed_url?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface MediaEventRow {
  id: string;
  title: string;
  image?: string | null;
  category?: string | null;
  date?: string | null;
  description?: string | null;
  sort_order?: number | null;
  status: ContentStatus;
}

export interface ContactSubmissionRow {
  id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  interested_in?: string | null;
  message?: string | null;
  status: SubmissionStatus;
  admin_notes?: string | null;
  created_at?: string;
}

export interface PaymentSubmissionRow {
  id: string;
  name: string;
  mobile: string;
  amount?: string | null;
  service?: string | null;
  transaction_id?: string | null;
  notes?: string | null;
  screenshot_url?: string | null;
  email?: string | null;
  payment_type?: string | null;
  status: SubmissionStatus;
  admin_notes?: string | null;
  created_at?: string;
}

export interface PackageEnquiryRow {
  id: string;
  package_slug?: string | null;
  package_title?: string | null;
  destination?: string | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  travel_date?: string | null;
  travelers?: string | null;
  message?: string | null;
  status: SubmissionStatus;
  admin_notes?: string | null;
  created_at?: string;
}

export interface AdminUserRow {
  id: string;
  user_id: string;
  email: string;
  is_super_admin?: boolean;
  /** Added by supabase/migrations/005_admin_roles_and_proofs.sql — falls back to site_settings when absent. */
  name?: string | null;
  mobile?: string | null;
  role?: string | null;
  permissions?: Record<string, boolean> | null;
  active?: boolean | null;
  created_at?: string;
}

export interface AdminAccessRequestRow {
  id: string;
  user_id: string;
  email: string;
  full_name?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  requested_at?: string;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
}

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUserRow;
        Insert: Partial<AdminUserRow>;
        Update: Partial<AdminUserRow>;
        Relationships: [];
      };
      admin_access_requests: {
        Row: AdminAccessRequestRow;
        Insert: Partial<AdminAccessRequestRow>;
        Update: Partial<AdminAccessRequestRow>;
        Relationships: [];
      };
      packages: { Row: PackageRow; Insert: Partial<PackageRow>; Update: Partial<PackageRow> };
      destinations: { Row: DestinationRow; Insert: Partial<DestinationRow>; Update: Partial<DestinationRow> };
      continents: { Row: ContinentRow; Insert: Partial<ContinentRow>; Update: Partial<ContinentRow> };
      featured_destinations: { Row: FeaturedDestinationRow; Insert: Partial<FeaturedDestinationRow>; Update: Partial<FeaturedDestinationRow> };
      visa_countries: { Row: VisaCountryRow; Insert: Partial<VisaCountryRow>; Update: Partial<VisaCountryRow> };
      cruises: { Row: CruiseRow; Insert: Partial<CruiseRow>; Update: Partial<CruiseRow> };
      services: { Row: ServiceRow; Insert: Partial<ServiceRow>; Update: Partial<ServiceRow> };
      guide_articles: { Row: GuideArticleRow; Insert: Partial<GuideArticleRow>; Update: Partial<GuideArticleRow> };
      hero_slides: { Row: HeroSlideRow; Insert: Partial<HeroSlideRow>; Update: Partial<HeroSlideRow> };
      festivals_events: { Row: FestivalEventRow; Insert: Partial<FestivalEventRow>; Update: Partial<FestivalEventRow> };
      fixed_departures: { Row: FixedDepartureRow; Insert: Partial<FixedDepartureRow>; Update: Partial<FixedDepartureRow> };
      featured_experiences: { Row: FeaturedExperienceRow; Insert: Partial<FeaturedExperienceRow>; Update: Partial<FeaturedExperienceRow> };
      testimonials: { Row: TestimonialRow; Insert: Partial<TestimonialRow>; Update: Partial<TestimonialRow> };
      faq_categories: { Row: FaqCategoryRow; Insert: Partial<FaqCategoryRow>; Update: Partial<FaqCategoryRow> };
      faq_items: { Row: FaqItemRow; Insert: Partial<FaqItemRow>; Update: Partial<FaqItemRow> };
      gallery_items: { Row: GalleryItemRow; Insert: Partial<GalleryItemRow>; Update: Partial<GalleryItemRow> };
      media_videos: { Row: MediaVideoRow; Insert: Partial<MediaVideoRow>; Update: Partial<MediaVideoRow> };
      media_events: { Row: MediaEventRow; Insert: Partial<MediaEventRow>; Update: Partial<MediaEventRow> };
      contact_submissions: { Row: ContactSubmissionRow; Insert: Partial<ContactSubmissionRow>; Update: Partial<ContactSubmissionRow> };
      payment_submissions: { Row: PaymentSubmissionRow; Insert: Partial<PaymentSubmissionRow>; Update: Partial<PaymentSubmissionRow> };
      package_enquiries: { Row: PackageEnquiryRow; Insert: Partial<PackageEnquiryRow>; Update: Partial<PackageEnquiryRow> };
      site_settings: { Row: { key: string; value: unknown; updated_at?: string }; Insert: { key: string; value: unknown }; Update: { value?: unknown } };
      about_page: { Row: { id: string; content: unknown; updated_at?: string }; Insert: { content: unknown }; Update: { content?: unknown } };
      nav_config: { Row: { id: string; structure: unknown; updated_at?: string }; Insert: { structure: unknown }; Update: { structure?: unknown } };
      journey_beyond_banner: { Row: { id: string; config: unknown; updated_at?: string }; Insert: { config: unknown }; Update: { config?: unknown } };
    };
    Views: Record<string, never>;
    Functions: {
      request_admin_access: {
        Args: { p_full_name?: string | null };
        Returns: string;
      };
      register_admin_user: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      list_pending_admin_requests: {
        Args: Record<string, never>;
        Returns: AdminAccessRequestRow[];
      };
      approve_admin_request: {
        Args: { p_request_id: string };
        Returns: boolean;
      };
      reject_admin_request: {
        Args: { p_request_id: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

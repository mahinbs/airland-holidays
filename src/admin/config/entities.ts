import type { LucideIcon } from 'lucide-react';
import {
  Package,
  MapPin,
  Globe,
  Star,
  Ship,
  Briefcase,
  BookOpen,
  Home,
  MessageSquare,
  Image,
  Video,
  HelpCircle,
  Settings,
  Inbox,
  Sparkles,
  PanelTop,
  CreditCard,
  LayoutTemplate,
  Users,
  Instagram,
} from 'lucide-react';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'json'
  | 'image'
  | 'boolean'
  | 'datetime'
  | 'string-list'
  | 'image-gallery'
  | 'faq-list'
  | 'itinerary'
  | 'richtext'
  | 'media'
  | 'video'
  | 'package-select'
  | 'cruise-select'
  | 'policy-table'
  | 'repeatable'
  | 'multi-select'
  | 'date';

export type RepeatableColumnDef = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'image' | 'video' | 'number' | 'boolean' | 'select';
  options?: { value: string; label: string }[];
};

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  fullWidth?: boolean;
  /** Virtual field — stored inside insights/detail JSON on save */
  storageKey?: string;
  /** For repeatable field type */
  columns?: RepeatableColumnDef[];
  /** Repeatable field: show an Enable / Disable switch on each item */
  withEnabled?: boolean;
  /** Multi-select field: allow typing values that are not in `options` */
  allowCustom?: boolean;
};

export type SectionConfig = {
  key: string;
  label: string;
  fieldNames: string[];
};

export type EntityConfig = {
  key: string;
  table: string;
  label: string;
  plural: string;
  icon: LucideIcon;
  slugField?: string;
  fields: FieldConfig[];
  sections?: SectionConfig[];
};

/** Shared SEO title / description fields, stored under `seo.*` in the entity's JSON blob. */
const SEO_FIELDS: FieldConfig[] = [
  { name: '_seo_title', label: 'SEO Title', type: 'text', storageKey: 'seo.title' },
  { name: '_seo_description', label: 'SEO Description', type: 'textarea', storageKey: 'seo.description' },
];

const BENEFIT_ICONS = [
  { value: 'FileCheck', label: 'Visa / Documents' },
  { value: 'Wallet', label: 'Budget / Money' },
  { value: 'Plane', label: 'Flights' },
  { value: 'Star', label: 'Attractions / Rating' },
  { value: 'Heart', label: 'Romance / Honeymoon' },
  { value: 'Users', label: 'Family / Groups' },
  { value: 'Sun', label: 'Weather' },
  { value: 'MapPin', label: 'Location' },
  { value: 'Utensils', label: 'Food' },
  { value: 'ShoppingBag', label: 'Shopping' },
];

export const TRAVEL_CATEGORY_OPTIONS = [
  'Domestic',
  'International',
  'Honeymoon',
  'Group',
  'Family',
  'Pilgrimage',
  'Fixed Departure',
  'Luxury',
].map((c) => ({ value: c, label: c }));

export const entityConfigs: EntityConfig[] = [
  {
    key: 'packages',
    table: 'packages',
    label: 'Package',
    plural: 'Packages',
    icon: Package,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Basic Info', fieldNames: ['slug', 'title', 'subtitle', 'destination', 'country', 'duration', 'price', 'category', '_categories', 'continent', 'badge', 'status', 'sort_order'] },
      { key: 'hero', label: 'Hero Section', fieldNames: ['image', 'images', 'video_url', 'rating', 'reviews_count'] },
      { key: 'overview', label: 'Package Overview', fieldNames: ['overview', 'tags', 'style_tags'] },
      { key: 'highlights', label: 'Highlights', fieldNames: ['highlights'] },
      { key: 'accommodation', label: 'Accommodation', fieldNames: ['_accommodation_title', '_accommodation_desc', '_accommodation_options'] },
      { key: 'itinerary', label: 'Itinerary Builder', fieldNames: ['itinerary'] },
      { key: 'inclusions', label: 'Inclusions & Exclusions', fieldNames: ['inclusions', 'exclusions'] },
      { key: 'travel', label: 'Travel Information', fieldNames: ['travel_type', 'best_time', 'visa_info', '_travel_notes', '_map_embed_url'] },
      { key: 'faqs', label: 'FAQs', fieldNames: ['_faqs'] },
      { key: 'experiences', label: 'Guest Experiences', fieldNames: ['_social_gallery'] },
      { key: 'related', label: 'Related Packages', fieldNames: ['_related_slugs'] },
      { key: 'gallery', label: 'Package Gallery', fieldNames: ['_gallery'] },
      { key: 'seo', label: 'SEO Settings', fieldNames: ['_seo_title', '_seo_description'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'destination', label: 'Destination', type: 'text', required: true },
      { name: 'country', label: 'Country', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'price', label: 'Price (INR)', type: 'number' },
      { name: 'category', label: 'Primary Category', type: 'text' },
      { name: '_categories', label: 'Travel Categories (multi-select)', type: 'multi-select', options: TRAVEL_CATEGORY_OPTIONS, allowCustom: true, fullWidth: true, storageKey: 'categories' },
      { name: 'continent', label: 'Continent', type: 'text' },
      { name: 'badge', label: 'Badge', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
      { name: 'image', label: 'Cover Image', type: 'image' },
      { name: 'images', label: 'Hero Slider Images', type: 'image-gallery', fullWidth: true },
      { name: 'video_url', label: 'Hero Video', type: 'video' },
      { name: 'rating', label: 'Rating', type: 'number' },
      { name: 'reviews_count', label: 'Reviews Count', type: 'number' },
      { name: 'travel_type', label: 'Travel Type', type: 'text' },
      { name: 'best_time', label: 'Best Time to Visit', type: 'text' },
      { name: 'visa_info', label: 'Visa / Travel Information', type: 'text' },
      { name: 'tags', label: 'Tags', type: 'string-list', fullWidth: true },
      { name: 'style_tags', label: 'Style Tags', type: 'string-list', fullWidth: true },
      { name: 'overview', label: 'Overview', type: 'richtext', fullWidth: true },
      { name: 'highlights', label: 'Highlights', type: 'string-list', fullWidth: true },
      { name: '_accommodation_title', label: 'Accommodation Title', type: 'text', storageKey: 'accommodation.title' },
      { name: '_accommodation_desc', label: 'Accommodation Description', type: 'textarea', storageKey: 'accommodation.desc' },
      { name: '_accommodation_options', label: 'Accommodation Options', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'accommodation.options', columns: [
        { key: 'name', label: 'Name' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image', type: 'image' },
      ] },
      { name: 'itinerary', label: 'Itinerary Days', type: 'itinerary', fullWidth: true },
      { name: 'inclusions', label: 'Inclusions', type: 'string-list', fullWidth: true },
      { name: 'exclusions', label: 'Exclusions', type: 'string-list', fullWidth: true },
      { name: '_travel_notes', label: 'Travel Notes (Rich Text)', type: 'richtext', fullWidth: true, storageKey: 'travelNotes' },
      { name: '_map_embed_url', label: 'Google Map embed URL (Share → Embed a map; leave empty to map the destination automatically)', type: 'text', fullWidth: true, storageKey: 'mapEmbedUrl' },
      { name: '_faqs', label: 'Package FAQs', type: 'faq-list', fullWidth: true, storageKey: 'faqs' },
      { name: '_related_slugs', label: 'Related Package Slugs', type: 'package-select', fullWidth: true, storageKey: 'relatedSlugs' },
      { name: '_social_gallery', label: 'Guest Experiences Gallery', type: 'image-gallery', fullWidth: true, storageKey: 'socialGalleryUrls' },
      { name: '_gallery', label: 'Package Gallery Images', type: 'image-gallery', fullWidth: true, storageKey: 'gallery' },
      ...SEO_FIELDS,
    ],
  },
  {
    key: 'destinations',
    table: 'destinations',
    label: 'Destination',
    plural: 'Destinations',
    icon: MapPin,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Basic Info', fieldNames: ['slug', 'name', 'region', 'continent', 'status', 'sort_order'] },
      { key: 'hero', label: 'Hero Section', fieldNames: ['hero_image', 'hero_video', 'overview'] },
      { key: 'content', label: 'Destination Content', fieldNames: ['highlights', 'linked_package_slugs'] },
      { key: 'detail', label: 'About & Statistics', fieldNames: ['_about', '_statistics'] },
      { key: 'benefits', label: 'Benefits Section', fieldNames: ['_benefits'] },
      { key: 'attractions', label: 'Attractions', fieldNames: ['_attractions'] },
      { key: 'airports', label: 'Airport & Connectivity', fieldNames: ['_airports'] },
      { key: 'travelinfo', label: 'Travel Information', fieldNames: ['_best_time', '_travel_tips', '_visa_info'] },
      { key: 'gallery', label: 'Gallery', fieldNames: ['_gallery'] },
      { key: 'seo', label: 'SEO Settings', fieldNames: ['_seo_title', '_seo_description'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'region', label: 'Region', type: 'text' },
      { name: 'continent', label: 'Continent', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
      { name: 'hero_image', label: 'Hero Image', type: 'image' },
      { name: 'hero_video', label: 'Hero Video', type: 'video' },
      { name: 'overview', label: 'Destination Overview', type: 'richtext', fullWidth: true },
      { name: 'highlights', label: 'Key Highlights', type: 'string-list', fullWidth: true },
      { name: 'linked_package_slugs', label: 'Featured Packages', type: 'package-select', fullWidth: true },
      { name: '_about', label: 'About Destination', type: 'richtext', fullWidth: true, storageKey: 'about' },
      { name: '_statistics', label: 'Traveller Statistics', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'statistics', columns: [
        { key: 'value', label: 'Value' },
        { key: 'label', label: 'Label' },
      ] },
      { name: '_benefits', label: 'Benefits Section ("Why travellers love this destination")', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'benefits', columns: [
        { key: 'title', label: 'Title' },
        { key: 'icon', label: 'Icon', type: 'select', options: BENEFIT_ICONS },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ] },
      { name: '_attractions', label: 'Attractions', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'attractions', columns: [
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category', type: 'select', options: ['Nature', 'Cultural', 'Adventure', 'City', 'Beach', 'Food'].map((c) => ({ value: c, label: c })) },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image', type: 'image' },
      ] },
      { name: '_best_time', label: 'Best Time to Visit', type: 'richtext', fullWidth: true, storageKey: 'bestTimeToVisit' },
      { name: '_travel_tips', label: 'Travel Tips', type: 'richtext', fullWidth: true, storageKey: 'travelTips' },
      { name: '_visa_info', label: 'Visa Information', type: 'richtext', fullWidth: true, storageKey: 'visaInfo' },
      ...SEO_FIELDS,
      { name: '_airports', label: 'Airport & Connectivity', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'airports', columns: [
        { key: 'name', label: 'Airport Name' },
        { key: 'code', label: 'Code' },
        { key: 'city', label: 'City' },
        { key: 'distance', label: 'Connectivity / Distance Notes' },
      ] },
      { name: '_gallery', label: 'Gallery Images', type: 'image-gallery', fullWidth: true, storageKey: 'gallery' },
    ],
  },
  {
    key: 'continents',
    table: 'continents',
    label: 'Continent',
    plural: 'Continents',
    icon: Globe,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Hero & Basic Info', fieldNames: ['slug', 'name', 'description', 'featured_image', '_hero_video', 'status', 'sort_order'] },
      { key: 'content', label: 'Overview & Stats', fieldNames: ['countries', '_statistics', '_insights'] },
      { key: 'packages', label: 'Trending Packages', fieldNames: ['_trending_slugs'] },
      { key: 'airports', label: 'Major Airports', fieldNames: ['_major_airports'] },
      { key: 'experiences', label: 'Visual Experiences', fieldNames: ['_visual_experiences', '_highlights'] },
      { key: 'seo', label: 'SEO Settings', fieldNames: ['_seo_title', '_seo_description'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'description', label: 'Overview Content', type: 'richtext', fullWidth: true },
      { name: 'featured_image', label: 'Hero Image', type: 'image' },
      { name: '_hero_video', label: 'Hero Video (optional)', type: 'video', storageKey: 'heroVideo' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
      { name: 'countries', label: 'Countries', type: 'string-list', fullWidth: true },
      { name: '_statistics', label: 'Traveller Statistics', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'statistics', columns: [
        { key: 'value', label: 'Value' },
        { key: 'label', label: 'Label' },
      ] },
      { name: '_insights', label: 'Traveller Insights', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'insights', columns: [
        { key: 'title', label: 'Title' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ] },
      { name: '_trending_slugs', label: 'Trending Package Mapping', type: 'package-select', fullWidth: true, storageKey: 'trendingSlugs' },
      { name: '_major_airports', label: 'Major Airports', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'majorAirports', columns: [
        { key: 'name', label: 'Airport Name' },
        { key: 'code', label: 'IATA Code' },
        { key: 'city', label: 'City' },
        { key: 'notes', label: 'Notes' },
      ] },
      { name: '_visual_experiences', label: 'Visual Experiences', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'visualExperiences', columns: [
        { key: 'title', label: 'Title' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'video', label: 'Video URL' },
      ] },
      { name: '_highlights', label: 'Key Highlights', type: 'string-list', fullWidth: true, storageKey: 'highlights' },
      { name: '_seo_title', label: 'SEO Title', type: 'text', storageKey: 'seo.title' },
      { name: '_seo_description', label: 'SEO Description', type: 'textarea', storageKey: 'seo.description' },
    ],
  },
  {
    key: 'featured-destinations',
    table: 'featured_destinations',
    label: 'Featured Destination',
    plural: 'Featured Destinations',
    icon: Star,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'starts_from', label: 'Starts From', type: 'text' },
      { name: 'media', label: 'Media (Image or Video)', type: 'media', fullWidth: true },
      { name: 'dest_type', label: 'Type', type: 'select', options: [{ value: 'india', label: 'India' }, { value: 'international', label: 'International' }] },
      { name: 'href', label: 'Link', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'visas',
    table: 'visa_countries',
    label: 'Visa Country',
    plural: 'Visa Countries',
    icon: Globe,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Basic Info', fieldNames: ['slug', 'name', 'flag', 'price', 'highlight_text', 'visa_status', 'featured', 'status', 'sort_order'] },
      { key: 'hero', label: 'Hero Section', fieldNames: ['image'] },
      { key: 'overview', label: 'Visa Overview', fieldNames: ['_intro', '_fees', '_processing_time'] },
      { key: 'types', label: 'Visa Types', fieldNames: ['_visa_types'] },
      { key: 'documents', label: 'Documentation Guide', fieldNames: ['_documents'] },
      { key: 'embassy', label: 'Embassy Information', fieldNames: ['_embassy'] },
      { key: 'terms', label: 'Terms & Conditions', fieldNames: ['_terms'] },
      { key: 'faqs', label: 'FAQs', fieldNames: ['_faqs'] },
      { key: 'seo', label: 'SEO Settings', fieldNames: ['_seo_title', '_seo_description'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'name', label: 'Country Name', type: 'text', required: true },
      { name: 'image', label: 'Hero Banner', type: 'image' },
      { name: 'flag', label: 'Flag Emoji', type: 'text' },
      { name: 'price', label: 'Price (INR)', type: 'number' },
      { name: 'highlight_text', label: 'Highlight Text', type: 'text' },
      { name: 'visa_status', label: 'Visa Status', type: 'select', options: [{ value: 'required', label: 'Required' }, { value: 'free', label: 'Free' }, { value: 'on-arrival', label: 'On Arrival' }] },
      { name: 'featured', label: 'Featured on Visa Page', type: 'boolean' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
      { name: '_intro', label: 'Visa Overview', type: 'richtext', fullWidth: true, storageKey: 'intro' },
      { name: '_fees', label: 'Visa Fees (summary shown on page)', type: 'text', storageKey: 'fees' },
      { name: '_processing_time', label: 'Processing Time (summary)', type: 'text', storageKey: 'processingTime' },
      ...SEO_FIELDS,
      { name: '_visa_types', label: 'Visa Types', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'visaTypes', columns: [
        { key: 'name', label: 'Type Name' },
        { key: 'duration', label: 'Duration' },
        { key: 'price', label: 'Price' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ] },
      { name: '_documents', label: 'Documentation Guide', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'documents', columns: [
        { key: 'name', label: 'Document' },
        { key: 'required', label: 'Required (yes/no)' },
        { key: 'notes', label: 'Notes', type: 'textarea' },
      ] },
      { name: '_embassy', label: 'Embassy Information', type: 'richtext', fullWidth: true, storageKey: 'embassy' },
      { name: '_terms', label: 'Terms & Conditions', type: 'richtext', fullWidth: true, storageKey: 'terms' },
      { name: '_faqs', label: 'Country FAQs', type: 'faq-list', fullWidth: true, storageKey: 'faqs' },
    ],
  },
  {
    key: 'cruises',
    table: 'cruises',
    label: 'Cruise',
    plural: 'Cruises',
    icon: Ship,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Basic Info', fieldNames: ['slug', 'name', 'duration', 'departure_location', 'destination', 'category', 'featured', 'starting_price', 'status', 'sort_order'] },
      { key: 'hero', label: 'Hero Section', fieldNames: ['image', 'video_url'] },
      { key: 'overview', label: 'Cruise Overview', fieldNames: ['overview', 'highlights'] },
      { key: 'accommodation', label: 'Cabin & Accommodation', fieldNames: ['accommodation'] },
      { key: 'itinerary', label: 'Itinerary', fieldNames: ['itinerary'] },
      { key: 'inclusions', label: 'Inclusions & Exclusions', fieldNames: ['inclusions', 'exclusions'] },
      { key: 'gallery', label: 'Gallery', fieldNames: ['gallery'] },
      { key: 'faqs', label: 'FAQs', fieldNames: ['faqs'] },
      { key: 'related', label: 'Related Cruises', fieldNames: ['_related_slugs'] },
      { key: 'seo', label: 'SEO Settings', fieldNames: ['_seo_title', '_seo_description'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'image', label: 'Cover Image', type: 'image' },
      { name: 'video_url', label: 'Hero Video', type: 'video' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'departure_location', label: 'Departure Location', type: 'text' },
      { name: 'destination', label: 'Destination', type: 'text' },
      { name: 'category', label: 'Category', type: 'select', options: [{ value: 'International', label: 'International' }, { value: 'India', label: 'India' }] },
      { name: 'featured', label: 'Featured / Trending', type: 'boolean' },
      { name: 'starting_price', label: 'Starting Price', type: 'number' },
      { name: 'overview', label: 'Overview', type: 'richtext', fullWidth: true },
      { name: 'highlights', label: 'Highlights', type: 'string-list', fullWidth: true },
      { name: 'accommodation', label: 'Cabin & Accommodation', type: 'repeatable', fullWidth: true, withEnabled: true, columns: [
        { key: 'name', label: 'Cabin Type' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'price', label: 'Starting Price' },
      ] },
      { name: 'itinerary', label: 'Itinerary', type: 'itinerary', fullWidth: true },
      { name: 'inclusions', label: 'Inclusions', type: 'string-list', fullWidth: true },
      { name: 'exclusions', label: 'Exclusions', type: 'string-list', fullWidth: true },
      { name: 'gallery', label: 'Gallery Images', type: 'image-gallery', fullWidth: true },
      { name: 'faqs', label: 'Cruise FAQs', type: 'faq-list', fullWidth: true },
      { name: '_related_slugs', label: 'Related Cruises', type: 'cruise-select', fullWidth: true, storageKey: 'relatedSlugs' },
      ...SEO_FIELDS,
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'services',
    table: 'services',
    label: 'Service',
    plural: 'Services',
    icon: Briefcase,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Basic Info', fieldNames: ['slug', 'title', 'icon', 'summary', 'value_statement', 'image', 'badge', 'priority', 'status', 'sort_order'] },
      { key: 'overview', label: 'Service Overview', fieldNames: ['_overview'] },
      { key: 'features', label: 'Features', fieldNames: ['_features'] },
      { key: 'faqs', label: 'FAQs', fieldNames: ['_faqs'] },
      { key: 'seo', label: 'SEO Settings', fieldNames: ['_seo_title', '_seo_description'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'icon', label: 'Icon Name (Lucide)', type: 'text' },
      { name: 'summary', label: 'Summary', type: 'textarea', fullWidth: true },
      { name: 'value_statement', label: 'Value Statement', type: 'text' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'badge', label: 'Badge', type: 'text' },
      { name: 'priority', label: 'Show on Homepage', type: 'boolean' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
      { name: '_overview', label: 'Overview Content', type: 'richtext', fullWidth: true, storageKey: 'overview' },
      { name: '_features', label: 'Features', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'features', columns: [
        { key: 'title', label: 'Title' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ] },
      { name: '_faqs', label: 'Service FAQs', type: 'faq-list', fullWidth: true, storageKey: 'faqs' },
      ...SEO_FIELDS,
    ],
  },
  {
    key: 'guides',
    table: 'guide_articles',
    label: 'Guide Article',
    plural: 'Guide Articles',
    icon: BookOpen,
    slugField: 'slug',
    sections: [
      { key: 'basic', label: 'Article Info', fieldNames: ['slug', 'title', 'category', 'author', 'published_at', 'status', 'sort_order'] },
      { key: 'content', label: 'Content', fieldNames: ['excerpt', 'cover_image', 'body'] },
      { key: 'seo', label: 'SEO', fieldNames: ['_seo_title', '_seo_description', '_tags'] },
      { key: 'faqs', label: 'FAQs', fieldNames: ['_faqs'] },
    ],
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', options: [
        { value: 'Destination Guides', label: 'Destination Guides' },
        { value: 'Travel Tips', label: 'Travel Tips' },
        { value: 'Visa Updates', label: 'Visa Updates' },
        { value: 'Budget Travel', label: 'Budget Travel Suggestions' },
        { value: 'Seasonal Travel', label: 'Seasonal Travel Ideas' },
      ] },
      { name: 'excerpt', label: 'Summary', type: 'textarea', fullWidth: true },
      { name: 'body', label: 'Rich Content', type: 'richtext', fullWidth: true },
      { name: 'cover_image', label: 'Featured Image', type: 'image' },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'published_at', label: 'Published At', type: 'datetime' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
      { name: '_seo_title', label: 'SEO Title', type: 'text', storageKey: 'seoTitle' },
      { name: '_seo_description', label: 'SEO Description', type: 'textarea', storageKey: 'seoDescription' },
      { name: '_tags', label: 'Tags', type: 'string-list', fullWidth: true, storageKey: 'tags' },
      { name: '_faqs', label: 'Article FAQs', type: 'faq-list', fullWidth: true, storageKey: 'faqs' },
    ],
  },
  {
    key: 'testimonials',
    table: 'testimonials',
    label: 'Testimonial',
    plural: 'Testimonials',
    icon: MessageSquare,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role / Location', type: 'text' },
      { name: 'text', label: 'Review Text', type: 'textarea', fullWidth: true },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'avatar', label: 'Avatar / Thumbnail', type: 'image' },
      { name: 'video_url', label: 'Video URL', type: 'video' },
      { name: 'testimonial_type', label: 'Type', type: 'select', options: [{ value: 'written', label: 'Written' }, { value: 'video', label: 'Video' }] },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'gallery',
    table: 'gallery_items',
    label: 'Gallery Item',
    plural: 'Gallery',
    icon: Image,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'category', label: 'Category', type: 'select', options: [
        { value: 'trips', label: 'Trips' },
        { value: 'customer-moments', label: 'Customer Moments' },
        { value: 'recognitions', label: 'Recognitions & Awards' },
        { value: 'celebrations', label: 'Celebrations' },
        { value: 'activities', label: 'Company Activities' },
      ] },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'year', label: 'Year', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'media-videos',
    table: 'media_videos',
    label: 'Media Video',
    plural: 'Media Videos',
    icon: Video,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'youtube_id', label: 'YouTube Video ID', type: 'text' },
      { name: 'embed_url', label: 'Embed URL', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'media-events',
    table: 'media_events',
    label: 'Media Event',
    plural: 'Media Events',
    icon: Sparkles,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'category', label: 'Category', type: 'select', options: [
        { value: 'awards', label: 'Awards' },
        { value: 'recognition', label: 'Recognition' },
        { value: 'events', label: 'Events' },
        { value: 'media', label: 'Media Appearances' },
        { value: 'founder', label: 'Founder Visuals' },
      ] },
      { name: 'date', label: 'Date / Year', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'hero-slides',
    table: 'hero_slides',
    label: 'Hero Slide',
    plural: 'Hero Slides',
    icon: Home,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'top_text', label: 'Top Text', type: 'text' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'video', label: 'Video', type: 'video' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'festivals',
    table: 'festivals_events',
    label: 'Festival/Event',
    plural: 'Festivals & Events',
    icon: Sparkles,
    sections: [
      { key: 'basic', label: 'Event Info', fieldNames: ['name', 'external_id', 'tag', 'location', 'event_type', '_event_date', 'month', 'month_num', 'status', 'sort_order'] },
      { key: 'content', label: 'Description & Pricing', fieldNames: ['hook_line', 'price', 'duration', 'cta_label', 'cta_href', 'trending'] },
      { key: 'media', label: 'Media', fieldNames: ['media', '_gallery', '_event_videos'] },
    ],
    fields: [
      { name: 'name', label: 'Event Name', type: 'text', required: true },
      { name: 'external_id', label: 'External ID (slug)', type: 'text' },
      { name: 'tag', label: 'Event Type Tag', type: 'text' },
      { name: 'location', label: 'Destination / Country', type: 'text' },
      { name: '_event_date', label: 'Event Date', type: 'date', storageKey: 'eventDate' },
      { name: 'month', label: 'Month Label (auto from Event Date if empty)', type: 'text' },
      { name: 'month_num', label: 'Month Number 1–12 (auto from Event Date if empty)', type: 'number' },
      { name: 'hook_line', label: 'Description', type: 'textarea', fullWidth: true },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'cta_label', label: 'CTA Label', type: 'text' },
      { name: 'cta_href', label: 'CTA Link', type: 'text' },
      { name: 'trending', label: 'Trending', type: 'boolean' },
      { name: 'media', label: 'Hero Banner (Image/Video)', type: 'media', fullWidth: true },
      { name: '_gallery', label: 'Event Gallery', type: 'image-gallery', fullWidth: true, storageKey: 'gallery' },
      { name: '_event_videos', label: 'Event Videos', type: 'repeatable', fullWidth: true, withEnabled: true, storageKey: 'eventVideos', columns: [
        { key: 'title', label: 'Video Title' },
        { key: 'url', label: 'Video (URL or upload)', type: 'video' },
      ] },
      { name: 'event_type', label: 'Category', type: 'select', options: [{ value: 'international', label: 'International' }, { value: 'india', label: 'India' }] },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'fixed-departures',
    table: 'fixed_departures',
    label: 'Fixed Departure',
    plural: 'Fixed Departures',
    icon: Package,
    sections: [
      { key: 'basic', label: 'Departure Info', fieldNames: ['title', 'destination', 'external_id', 'category', 'status', 'sort_order'] },
      { key: 'schedule', label: 'Travel Dates & Duration', fieldNames: ['duration', 'date_range', 'month_num'] },
      { key: 'pricing', label: 'Pricing & Availability', fieldNames: ['price', 'price_note', 'seats_left', 'availability_status'] },
      { key: 'media', label: 'Media', fieldNames: ['featured_image', 'banner_image', 'images'] },
      { key: 'details', label: 'Additional Info', fieldNames: ['badge', 'badge_type', 'micro_info', 'href'] },
    ],
    fields: [
      { name: 'title', label: 'Departure Name', type: 'text', required: true },
      { name: 'destination', label: 'Destination', type: 'text' },
      { name: 'external_id', label: 'External ID (slug)', type: 'text' },
      { name: 'category', label: 'Category', type: 'select', options: [{ value: 'international', label: 'International' }, { value: 'india', label: 'India' }] },
      { name: 'badge', label: 'Badge Text', type: 'text' },
      { name: 'badge_type', label: 'Badge Type', type: 'select', options: [
        { value: 'limited', label: 'Limited Seats' },
        { value: 'trending', label: 'Trending' },
        { value: 'festival', label: 'Festival Special' },
      ] },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'date_range', label: 'Travel Dates', type: 'text' },
      { name: 'month_num', label: 'Month Number (1–12)', type: 'number' },
      { name: 'price', label: 'Pricing', type: 'text' },
      { name: 'price_note', label: 'Price Note', type: 'text' },
      { name: 'seats_left', label: 'Availability (Seats Left)', type: 'number' },
      { name: 'availability_status', label: 'Availability Status', type: 'select', options: [
        { value: 'available', label: 'Available' },
        { value: 'limited', label: 'Limited Seats' },
        { value: 'sold-out', label: 'Sold Out' },
      ] },
      { name: 'featured_image', label: 'Featured Image (card)', type: 'image' },
      { name: 'banner_image', label: 'Banner Image (hover / detail)', type: 'image' },
      { name: 'images', label: 'Additional Images', type: 'image-gallery', fullWidth: true },
      { name: 'micro_info', label: 'Quick Info Tags', type: 'string-list', fullWidth: true },
      { name: 'href', label: 'Link', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
  {
    key: 'experiences',
    table: 'featured_experiences',
    label: 'Experience',
    plural: 'Featured Experiences',
    icon: Star,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'destination', label: 'Continent / Region', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'href', label: 'Link', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
      { name: 'sort_order', label: 'Display Order', type: 'number' },
    ],
  },
];

export const adminNavItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { to: '/admin/submissions', label: 'Submissions', icon: Inbox },
  { to: '/admin/header', label: 'Header & Nav', icon: PanelTop },
  { to: '/admin/footer', label: 'Footer', icon: LayoutTemplate },
  { to: '/admin/payment', label: 'Payment Page', icon: CreditCard },
  { to: '/admin/about', label: 'About Page', icon: BookOpen },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/homepage', label: 'Homepage Sections', icon: Sparkles },
  { to: '/admin/instagram', label: 'Instagram Reels', icon: Instagram },
  { to: '/admin/services-page', label: 'Services Page', icon: Briefcase },
  ...entityConfigs.map((e) => ({ to: `/admin/${e.key}`, label: e.plural, icon: e.icon })),
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function getEntityConfig(key: string): EntityConfig | undefined {
  return entityConfigs.find((e) => e.key === key);
}

/** Which JSON blob column stores virtual fields per entity */
export function getVirtualStorageColumn(entityKey: string): 'insights' | 'detail' | null {
  if (['packages'].includes(entityKey)) return 'insights';
  if (['destinations', 'continents', 'visas', 'services', 'festivals', 'cruises', 'guides'].includes(entityKey)) return 'detail';
  return null;
}

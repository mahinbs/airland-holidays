-- 001_base_schema.sql
-- Base schema for the Airland Holidays website + CMS.
-- Creates every table the app reads/writes, Row Level Security, updated_at triggers and the public `media` bucket.
-- Idempotent: safe to run more than once (uses IF NOT EXISTS / DROP POLICY IF EXISTS).
--
-- Run order: 001 (this file) → 002_seed_data → 003_admin_access_approval → 004_cms_enhancements
--            → 005_admin_roles_and_proofs → 006_enforce_active_admins

-- ─────────────────────────────────────────────────────────────────────────
-- Helpers
-- ─────────────────────────────────────────────────────────────────────────
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- Admin tables (referenced by the policies below)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null unique references auth.users(id) on delete cascade,
  email          text not null,
  is_super_admin boolean not null default false,
  created_at     timestamptz not null default now()
);

create table if not exists public.admin_access_requests (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null unique references auth.users(id) on delete cascade,
  email        text not null,
  full_name    text,
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  requested_at timestamptz not null default now(),
  reviewed_at  timestamptz,
  reviewed_by  uuid
);

-- SECURITY DEFINER so they can be used inside RLS policies on the same tables without recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid() and is_super_admin = true);
$$;

grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.is_super_admin() to anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- Content tables
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.packages (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  subtitle      text,
  destination   text not null default '',
  country       text,
  duration      text,
  travel_type   text,
  best_time     text,
  visa_info     text,
  price         numeric not null default 0,
  rating        numeric,
  reviews_count integer,
  image         text,
  images        jsonb not null default '[]'::jsonb,
  video_url     text,
  overview      text,
  highlights    jsonb not null default '[]'::jsonb,
  itinerary     jsonb not null default '[]'::jsonb,
  inclusions    jsonb not null default '[]'::jsonb,
  exclusions    jsonb not null default '[]'::jsonb,
  insights      jsonb not null default '{}'::jsonb,
  tags          jsonb not null default '[]'::jsonb,
  badge         text,
  category      text,
  continent     text,
  style_tags    jsonb not null default '[]'::jsonb,
  sort_order    integer not null default 0,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.destinations (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique,
  name                 text not null,
  region               text,
  continent            text,
  hero_image           text,
  hero_video           text,
  overview             text,
  highlights           jsonb not null default '[]'::jsonb,
  detail               jsonb not null default '{}'::jsonb,
  linked_package_slugs jsonb not null default '[]'::jsonb,
  sort_order           integer not null default 0,
  status               text not null default 'draft' check (status in ('draft', 'published')),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table if not exists public.continents (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  name           text not null,
  description    text,
  featured_image text,
  countries      jsonb not null default '[]'::jsonb,
  detail         jsonb not null default '{}'::jsonb,
  sort_order     integer not null default 0,
  status         text not null default 'draft' check (status in ('draft', 'published')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.featured_destinations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  starts_from text,
  media       jsonb not null default '{}'::jsonb,
  dest_type   text not null default 'international' check (dest_type in ('india', 'international')),
  href        text,
  sort_order  integer not null default 0,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.visa_countries (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  name           text not null,
  image          text,
  flag           text,
  price          numeric,
  highlight_text text,
  visa_status    text not null default 'required' check (visa_status in ('required', 'free', 'on-arrival')),
  featured       boolean not null default false,
  detail         jsonb not null default '{}'::jsonb,
  sort_order     integer not null default 0,
  status         text not null default 'draft' check (status in ('draft', 'published')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.cruises (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  name               text not null,
  image              text,
  video_url          text,
  duration           text,
  departure_location text,
  starting_price     numeric,
  category           text,
  featured           boolean not null default false,
  destination        text,
  overview           text,
  highlights         jsonb not null default '[]'::jsonb,
  itinerary          jsonb not null default '[]'::jsonb,
  inclusions         jsonb not null default '[]'::jsonb,
  exclusions         jsonb not null default '[]'::jsonb,
  experience         jsonb not null default '[]'::jsonb,
  accommodation      jsonb not null default '{}'::jsonb,
  gallery            jsonb not null default '[]'::jsonb,
  faqs               jsonb not null default '[]'::jsonb,
  detail             jsonb not null default '{}'::jsonb,
  sort_order         integer not null default 0,
  status             text not null default 'draft' check (status in ('draft', 'published')),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists public.services (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  icon            text,
  title           text not null,
  summary         text,
  value_statement text,
  image           text,
  badge           text,
  priority        boolean not null default false,
  detail          jsonb not null default '{}'::jsonb,
  sort_order      integer not null default 0,
  status          text not null default 'draft' check (status in ('draft', 'published')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.guide_articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  category     text,
  excerpt      text,
  body         text,
  cover_image  text,
  author       text,
  published_at timestamptz,
  sort_order   integer not null default 0,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  subtitle   text,
  top_text   text,
  image      text,
  video      text,
  sort_order integer not null default 0,
  status     text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.festivals_events (
  id          uuid primary key default gen_random_uuid(),
  external_id text,
  tag         text,
  name        text not null,
  location    text,
  month       text,
  month_num   integer,
  hook_line   text,
  media       jsonb not null default '{}'::jsonb,
  price       text,
  duration    text,
  cta_label   text,
  cta_href    text,
  trending    boolean not null default false,
  event_type  text check (event_type is null or event_type in ('international', 'india')),
  detail      jsonb not null default '{}'::jsonb,
  sort_order  integer not null default 0,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.fixed_departures (
  id          uuid primary key default gen_random_uuid(),
  external_id text,
  category    text,
  badge       text,
  badge_type  text,
  title       text not null,
  images      jsonb not null default '[]'::jsonb,
  duration    text,
  date_range  text,
  month_num   integer,
  price       text,
  price_note  text,
  micro_info  jsonb not null default '[]'::jsonb,
  seats_left  integer,
  href        text,
  sort_order  integer not null default 0,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.featured_experiences (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  destination text,
  duration    text,
  price       text,
  image       text,
  href        text,
  sort_order  integer not null default 0,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.testimonials (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  role             text,
  text             text,
  rating           numeric,
  avatar           text,
  video_url        text,
  testimonial_type text not null default 'written' check (testimonial_type in ('written', 'video')),
  sort_order       integer not null default 0,
  status           text not null default 'draft' check (status in ('draft', 'published')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  image      text not null,
  category   text not null default 'trips',
  location   text,
  year       text,
  sort_order integer not null default 0,
  status     text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_videos (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  youtube_id text,
  embed_url  text,
  sort_order integer not null default 0,
  status     text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  image       text,
  category    text,
  date        text,
  description text,
  sort_order  integer not null default 0,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.faq_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  sort_order integer not null default 0,
  status     text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.faq_categories(id) on delete cascade,
  question    text not null,
  answer      text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists faq_items_category_idx on public.faq_items (category_id, sort_order);

-- ─────────────────────────────────────────────────────────────────────────
-- Singletons / settings
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.about_page (
  id         uuid primary key default gen_random_uuid(),
  content    jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.nav_config (
  id         uuid primary key default gen_random_uuid(),
  structure  jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.journey_beyond_banner (
  id         uuid primary key default gen_random_uuid(),
  config     jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Submissions (public forms insert; only admins read)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  last_name     text,
  email         text not null,
  phone         text,
  interested_in text,
  message       text,
  status        text not null default 'new' check (status in ('new', 'read', 'archived')),
  admin_notes   text,
  created_at    timestamptz not null default now()
);

create table if not exists public.payment_submissions (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  mobile         text not null,
  amount         text,
  service        text,
  transaction_id text,
  notes          text,
  screenshot_url text,
  status         text not null default 'new' check (status in ('new', 'read', 'archived')),
  admin_notes    text,
  created_at     timestamptz not null default now()
);

create table if not exists public.package_enquiries (
  id            uuid primary key default gen_random_uuid(),
  package_slug  text,
  package_title text,
  name          text not null,
  email         text,
  phone         text,
  travel_date   text,
  travelers     text,
  message       text,
  status        text not null default 'new' check (status in ('new', 'read', 'archived')),
  admin_notes   text,
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- updated_at triggers
-- ─────────────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array[
    'packages','destinations','continents','featured_destinations','visa_countries','cruises','services',
    'guide_articles','hero_slides','festivals_events','fixed_departures','featured_experiences','testimonials',
    'gallery_items','media_videos','media_events','faq_categories','faq_items','site_settings','about_page',
    'nav_config','journey_beyond_banner'
  ] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security
--   * Public site: read published rows only (admins also see drafts, for Save & Preview).
--   * CMS: any CMS admin can write. Finer per-role limits are in 005 (suggested policies).
-- ─────────────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  -- Content tables with a `status` column
  foreach t in array array[
    'packages','destinations','continents','featured_destinations','visa_countries','cruises','services',
    'guide_articles','hero_slides','festivals_events','fixed_departures','featured_experiences','testimonials',
    'gallery_items','media_videos','media_events','faq_categories'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format('create policy "public read published" on public.%I for select to anon, authenticated using (status = ''published'' or public.is_admin())', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;

  -- Settings / singletons: readable by everyone (they drive the public pages), writable by admins
  foreach t in array array['site_settings','about_page','nav_config','journey_beyond_banner'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;

  -- Form submissions: anyone may submit, only admins read / manage
  foreach t in array array['contact_submissions','payment_submissions','package_enquiries'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "anyone can submit" on public.%I', t);
    execute format('create policy "anyone can submit" on public.%I for insert to anon, authenticated with check (true)', t);
    execute format('drop policy if exists "admin manage" on public.%I', t);
    execute format('create policy "admin manage" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- FAQ items follow their category's visibility
alter table public.faq_items enable row level security;
drop policy if exists "public read faq items" on public.faq_items;
create policy "public read faq items" on public.faq_items for select to anon, authenticated
  using (
    public.is_admin()
    or exists (select 1 from public.faq_categories c where c.id = faq_items.category_id and c.status = 'published')
  );
drop policy if exists "admin write" on public.faq_items;
create policy "admin write" on public.faq_items for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Admin tables
alter table public.admin_users enable row level security;
drop policy if exists "read own or super" on public.admin_users;
create policy "read own or super" on public.admin_users for select to authenticated
  using (user_id = auth.uid() or public.is_super_admin());
drop policy if exists "super admin writes" on public.admin_users;
create policy "super admin writes" on public.admin_users for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

alter table public.admin_access_requests enable row level security;
drop policy if exists "read own or super" on public.admin_access_requests;
create policy "read own or super" on public.admin_access_requests for select to authenticated
  using (user_id = auth.uid() or public.is_super_admin());
-- (inserts/updates happen through the SECURITY DEFINER functions in 003)

-- ─────────────────────────────────────────────────────────────────────────
-- Storage: public `media` bucket (images/videos shown on the site). Only admins may upload/replace/delete.
-- ─────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media: public read" on storage.objects;
create policy "media: public read" on storage.objects for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "media: admin insert" on storage.objects;
create policy "media: admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media: admin update" on storage.objects;
create policy "media: admin update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media: admin delete" on storage.objects;
create policy "media: admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());

notify pgrst, 'reload schema';

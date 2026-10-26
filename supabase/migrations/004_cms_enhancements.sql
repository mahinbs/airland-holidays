-- 004_cms_enhancements.sql
-- CMS enhancement & backend restructure (22-06-2026 requirements).
-- Idempotent: safe to run more than once in the Supabase SQL editor.
--
-- The admin works without this migration (it drops unknown columns on save and shows a warning),
-- but the new Fixed Departure fields and FAQ enable/disable only persist once these columns exist.

-- ── Fixed Departures: dedicated destination, images and availability ─────────────────────────
alter table public.fixed_departures add column if not exists destination text;
alter table public.fixed_departures add column if not exists featured_image text;
alter table public.fixed_departures add column if not exists banner_image text;
alter table public.fixed_departures
  add column if not exists availability_status text
  check (availability_status is null or availability_status in ('available', 'limited', 'sold-out'));

-- ── FAQ items: enable / disable without deleting ─────────────────────────────────────────────
alter table public.faq_items add column if not exists enabled boolean not null default true;

-- Make sure the JSON "detail" column used for extra fields (event date, gallery, videos) exists.
alter table public.festivals_events add column if not exists detail jsonb not null default '{}'::jsonb;

-- Ask PostgREST to refresh its schema cache so the new columns are usable immediately.
notify pgrst, 'reload schema';

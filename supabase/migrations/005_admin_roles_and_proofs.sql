-- 005_admin_roles_and_proofs.sql
-- CMS user roles / permissions + payment-proof storage + submission columns.
--
-- Run once in Supabase Dashboard → SQL Editor. Safe to re-run (idempotent).
--
-- IMPORTANT — what is and is NOT enforced:
--   * The CMS UI hides menu items and blocks pages a role cannot use (src/admin/config/permissions.ts).
--   * That is UI-level only. A technically savvy user with a valid session could still call the API directly.
--     Real enforcement needs Row Level Security. Section 5 contains policy suggestions — they are COMMENTED OUT
--     because enabling them without checking your existing policies can lock every admin out. Apply them one table
--     at a time, test with a non-super-admin account, and keep the SQL editor open to roll back.

-- ─────────────────────────────────────────────────────────────────────────
-- 1. admin_users: profile, role, permissions, active flag
-- ─────────────────────────────────────────────────────────────────────────
alter table public.admin_users add column if not exists name        text;
alter table public.admin_users add column if not exists mobile      text;
alter table public.admin_users add column if not exists role        text not null default 'Admin';
alter table public.admin_users add column if not exists permissions jsonb not null default '{}'::jsonb;
alter table public.admin_users add column if not exists active      boolean not null default true;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'admin_users_role_check') then
    alter table public.admin_users
      add constraint admin_users_role_check
      check (role in ('Super Admin','Admin','Sales Manager','Content Manager','Finance Manager','Operations Manager'));
  end if;
end $$;

-- Existing super admins keep the Super Admin role label.
update public.admin_users set role = 'Super Admin' where is_super_admin = true and role <> 'Super Admin';

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Helper functions (SECURITY DEFINER so they work under RLS)
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.cms_is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid() and is_super_admin = true and coalesce(active, true)
  );
$$;

create or replace function public.cms_is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid() and coalesce(active, true)
  );
$$;

-- Does the current admin have a permission key? (role defaults are mirrored here for RLS use)
create or replace function public.cms_has_permission(p_key text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  r record;
  defaults boolean;
  override jsonb;
begin
  select role, permissions, is_super_admin, coalesce(active, true) as active
    into r from public.admin_users where user_id = auth.uid();
  if not found or not r.active then return false; end if;
  if r.is_super_admin then return true; end if;

  override := r.permissions -> p_key;
  if override is not null and jsonb_typeof(override) = 'boolean' then
    return (override)::text::boolean;
  end if;

  defaults := case r.role
    when 'Admin' then true
    when 'Sales Manager'      then p_key in ('view_leads','export_data','manage_packages','manage_departures')
    when 'Content Manager'    then p_key in ('manage_packages','manage_visas','manage_cruises','manage_destinations',
                                             'manage_services','manage_departures','manage_guides','manage_homepage','manage_faq')
    when 'Finance Manager'    then p_key in ('manage_payments','view_leads','export_data')
    when 'Operations Manager' then p_key in ('view_leads','manage_departures','manage_site_chrome')
    else false
  end;
  return coalesce(defaults, false);
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Super-admin RPCs used by CMS → User Management
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.admin_upsert_user(
  p_user_id uuid,
  p_email text,
  p_name text,
  p_mobile text,
  p_role text,
  p_permissions jsonb default '{}'::jsonb
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cms_is_super_admin() then
    raise exception 'Only super admins can create CMS users';
  end if;
  if p_role = 'Super Admin' then
    raise exception 'Super Admin cannot be assigned from the CMS';
  end if;

  update public.admin_users
     set name = p_name, mobile = p_mobile, role = p_role,
         permissions = coalesce(p_permissions, '{}'::jsonb), active = true
   where user_id = p_user_id;
  if not found then
    insert into public.admin_users (user_id, email, is_super_admin, name, mobile, role, permissions, active)
    values (p_user_id, lower(p_email), false, p_name, p_mobile, p_role, coalesce(p_permissions, '{}'::jsonb), true);
  end if;
  return true;
end;
$$;

create or replace function public.admin_update_user(
  p_user_id uuid,
  p_role text default null,
  p_permissions jsonb default null,
  p_active boolean default null,
  p_name text default null,
  p_mobile text default null
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  target_is_super boolean;
begin
  if not public.cms_is_super_admin() then
    raise exception 'Only super admins can change CMS users';
  end if;
  select is_super_admin into target_is_super from public.admin_users where user_id = p_user_id;
  if not found then raise exception 'User not found'; end if;

  if target_is_super and (p_role is not null or p_permissions is not null or p_active is not null) then
    raise exception 'Super admin role, permissions and status cannot be changed';
  end if;
  if p_role = 'Super Admin' then
    raise exception 'Super Admin cannot be assigned from the CMS';
  end if;
  if p_user_id = auth.uid() and p_active = false then
    raise exception 'You cannot deactivate your own account';
  end if;

  update public.admin_users set
    role        = coalesce(p_role, role),
    permissions = coalesce(p_permissions, permissions),
    active      = coalesce(p_active, active),
    name        = coalesce(p_name, name),
    mobile      = coalesce(p_mobile, mobile)
  where user_id = p_user_id;
  return true;
end;
$$;

create or replace function public.admin_remove_user(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  target_is_super boolean;
begin
  if not public.cms_is_super_admin() then
    raise exception 'Only super admins can remove CMS users';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'You cannot remove your own access';
  end if;
  select is_super_admin into target_is_super from public.admin_users where user_id = p_user_id;
  if target_is_super then
    raise exception 'Super admin access cannot be removed';
  end if;
  delete from public.admin_users where user_id = p_user_id;
  return true;
end;
$$;

grant execute on function public.cms_is_super_admin()   to authenticated;
grant execute on function public.cms_is_active_admin()  to authenticated;
grant execute on function public.cms_has_permission(text) to authenticated;
grant execute on function public.admin_upsert_user(uuid, text, text, text, text, jsonb) to authenticated;
grant execute on function public.admin_update_user(uuid, text, jsonb, boolean, text, text) to authenticated;
grant execute on function public.admin_remove_user(uuid) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- 4. Submissions: extra columns shown in the CMS + private payment-proof bucket
-- ─────────────────────────────────────────────────────────────────────────
alter table public.payment_submissions add column if not exists email        text;
alter table public.payment_submissions add column if not exists payment_type text;
alter table public.package_enquiries   add column if not exists destination  text;

-- Payment screenshots: PRIVATE bucket. The public payment form uploads; only CMS admins can read (signed URLs).
-- The CMS now stores the object path (e.g. proofs/123-abc.png) and signs it on demand; legacy full URLs still work.
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', false)
on conflict (id) do nothing;

-- If the bucket was created public earlier, make it private so screenshots are not world-readable:
-- update storage.buckets set public = false where id = 'payment-proofs';

drop policy if exists "payment proofs: anyone can upload" on storage.objects;
create policy "payment proofs: anyone can upload"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'payment-proofs');

drop policy if exists "payment proofs: admins can read" on storage.objects;
create policy "payment proofs: admins can read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'payment-proofs' and public.cms_is_active_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- 5. SUGGESTED RLS (commented out on purpose — review before enabling!)
--    Test each block with a non-super-admin account. If you lock yourself out, disable RLS from the SQL editor:
--      alter table public.<table> disable row level security;
-- ─────────────────────────────────────────────────────────────────────────

-- 5a. admin_users: everyone can read their own row; super admins manage all rows.
-- alter table public.admin_users enable row level security;
-- drop policy if exists "admin_users: read own" on public.admin_users;
-- create policy "admin_users: read own" on public.admin_users for select to authenticated
--   using (user_id = auth.uid() or public.cms_is_super_admin());
-- drop policy if exists "admin_users: super admin writes" on public.admin_users;
-- create policy "admin_users: super admin writes" on public.admin_users for all to authenticated
--   using (public.cms_is_super_admin()) with check (public.cms_is_super_admin());

-- 5b. Submissions: only admins with the matching permission can read / update.
--     (Keep the existing public INSERT policies so the website forms keep working.)
-- create policy "contact_submissions: leads viewers read" on public.contact_submissions for select to authenticated
--   using (public.cms_has_permission('view_leads'));
-- create policy "contact_submissions: leads viewers update" on public.contact_submissions for update to authenticated
--   using (public.cms_has_permission('view_leads'));
-- create policy "package_enquiries: leads viewers read" on public.package_enquiries for select to authenticated
--   using (public.cms_has_permission('view_leads'));
-- create policy "package_enquiries: leads viewers update" on public.package_enquiries for update to authenticated
--   using (public.cms_has_permission('view_leads'));
-- create policy "payment_submissions: finance read" on public.payment_submissions for select to authenticated
--   using (public.cms_has_permission('manage_payments'));
-- create policy "payment_submissions: finance update" on public.payment_submissions for update to authenticated
--   using (public.cms_has_permission('manage_payments'));

-- 5c. Content tables: writes limited to admins holding the module permission, e.g. packages:
-- create policy "packages: managers write" on public.packages for all to authenticated
--   using (public.cms_has_permission('manage_packages')) with check (public.cms_has_permission('manage_packages'));
--   -- repeat per table: visa_countries→manage_visas, cruises→manage_cruises, destinations/continents→manage_destinations,
--   -- services→manage_services, guide_articles→manage_guides, fixed_departures/festivals_events→manage_departures,
--   -- faq_categories/faq_items→manage_faq, site_settings→manage_site_chrome (or manage_settings) …
--   -- Remember to keep public SELECT policies for status = 'published' rows.

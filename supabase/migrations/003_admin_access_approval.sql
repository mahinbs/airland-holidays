-- 003_admin_access_approval.sql
-- Admin sign-up approval flow used by the CMS login page and Users / Access Requests screens.
-- Idempotent. Requires 001_base_schema.sql.
--
-- How it works
--   * Anyone can create an account on /admin/login. Calling request_admin_access() either
--       - registers them as the PRIMARY (super) admin if their verified email is the primary admin email, or
--       - files a pending request that the super admin approves in CMS → Access Requests.
--   * The primary admin email is read from the table public.cms_primary_admins (edit it in SQL if it changes).
--
-- SECURITY NOTE: auto-approval trusts the email on the signed-in JWT. Keep "Confirm email" enabled in
-- Supabase → Authentication → Providers → Email so nobody can claim the primary email without owning it,
-- and sign in with the primary account right after running this migration.

create table if not exists public.cms_primary_admins (
  email text primary key
);
alter table public.cms_primary_admins enable row level security;  -- no policies: only SECURITY DEFINER functions read it

insert into public.cms_primary_admins (email) values ('admin@airlandholiday.com')
on conflict (email) do nothing;

create or replace function public.cms_current_email()
returns text
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

-- Registers the caller as super admin when their email is a primary admin email.
create or replace function public.register_admin_user()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  mail text := public.cms_current_email();
begin
  if uid is null then raise exception 'Not signed in'; end if;
  if not exists (select 1 from public.cms_primary_admins where email = mail) then
    raise exception 'This account is not the primary admin';
  end if;
  insert into public.admin_users (user_id, email, is_super_admin)
  values (uid, mail, true)
  on conflict (user_id) do update set is_super_admin = true;
  update public.admin_access_requests set status = 'approved', reviewed_at = now() where user_id = uid;
  return true;
end;
$$;

-- Returns: 'already_approved' | 'approved' | 'pending' | 'rejected'
create or replace function public.request_admin_access(p_full_name text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  mail text := public.cms_current_email();
  existing_status text;
begin
  if uid is null then raise exception 'Not signed in'; end if;

  if exists (select 1 from public.admin_users where user_id = uid) then
    return 'already_approved';
  end if;

  if exists (select 1 from public.cms_primary_admins where email = mail) then
    perform public.register_admin_user();
    return 'approved';
  end if;

  select status into existing_status from public.admin_access_requests where user_id = uid;
  if existing_status = 'rejected' then return 'rejected'; end if;
  if existing_status = 'approved' then
    insert into public.admin_users (user_id, email, is_super_admin) values (uid, mail, false)
    on conflict (user_id) do nothing;
    return 'approved';
  end if;

  insert into public.admin_access_requests (user_id, email, full_name, status)
  values (uid, mail, p_full_name, 'pending')
  on conflict (user_id) do update
    set full_name = coalesce(excluded.full_name, public.admin_access_requests.full_name)
    where public.admin_access_requests.status = 'pending';
  return 'pending';
end;
$$;

create or replace function public.list_pending_admin_requests()
returns setof public.admin_access_requests
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin() then raise exception 'Only the super admin can view access requests'; end if;
  return query select * from public.admin_access_requests where status = 'pending' order by requested_at;
end;
$$;

create or replace function public.approve_admin_request(p_request_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare r public.admin_access_requests;
begin
  if not public.is_super_admin() then raise exception 'Only the super admin can approve access'; end if;
  select * into r from public.admin_access_requests where id = p_request_id;
  if not found then raise exception 'Request not found'; end if;
  insert into public.admin_users (user_id, email, is_super_admin) values (r.user_id, lower(r.email), false)
  on conflict (user_id) do nothing;
  update public.admin_access_requests set status = 'approved', reviewed_at = now(), reviewed_by = auth.uid() where id = p_request_id;
  return true;
end;
$$;

create or replace function public.reject_admin_request(p_request_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin() then raise exception 'Only the super admin can reject access'; end if;
  update public.admin_access_requests set status = 'rejected', reviewed_at = now(), reviewed_by = auth.uid() where id = p_request_id;
  return true;
end;
$$;

grant execute on function public.register_admin_user() to authenticated;
grant execute on function public.request_admin_access(text) to authenticated;
grant execute on function public.list_pending_admin_requests() to authenticated;
grant execute on function public.approve_admin_request(uuid) to authenticated;
grant execute on function public.reject_admin_request(uuid) to authenticated;

notify pgrst, 'reload schema';

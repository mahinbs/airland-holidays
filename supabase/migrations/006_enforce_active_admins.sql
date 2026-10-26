-- 006_enforce_active_admins.sql
-- Run AFTER 005. Makes database-level access follow the CMS "active" flag, so a deactivated team member
-- immediately loses write access / submission access even if they still hold a valid session.
-- (Per-permission RLS — e.g. only Finance can read payments — is still left as the commented suggestions in 005.)

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid() and coalesce(active, true));
$$;

notify pgrst, 'reload schema';

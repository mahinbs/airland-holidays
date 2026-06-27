/** Primary CMS admin — auto-approved; all other signups require this admin's approval. */
export const PRIMARY_ADMIN_EMAIL =
  (import.meta.env.VITE_PRIMARY_ADMIN_EMAIL as string | undefined)?.trim().toLowerCase() ||
  'admin@airlandholidays.com';

export type AdminAccessStatus = 'none' | 'pending' | 'approved' | 'rejected';

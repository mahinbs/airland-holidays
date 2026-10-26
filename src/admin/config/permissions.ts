/**
 * Role & permission model for the CMS.
 *
 * NOTE: this is UI-level enforcement (nav hiding + route guard). Real data protection must also be applied in
 * Supabase with RLS policies — see supabase/migrations/005_admin_roles_and_proofs.sql.
 */

export const ROLES = ['Super Admin', 'Admin', 'Sales Manager', 'Content Manager', 'Finance Manager', 'Operations Manager'] as const;
export type Role = (typeof ROLES)[number];

export type PermissionKey =
  | 'view_leads'
  | 'export_data'
  | 'manage_payments'
  | 'manage_guides'
  | 'manage_settings'
  | 'manage_packages'
  | 'manage_visas'
  | 'manage_cruises'
  | 'manage_destinations'
  | 'manage_services'
  | 'manage_departures'
  | 'manage_homepage'
  | 'manage_faq'
  | 'manage_site_chrome';

export type PermissionDef = { key: PermissionKey; label: string; group: 'Operations' | 'Content' | 'Site' };

export const PERMISSIONS: PermissionDef[] = [
  { key: 'view_leads', label: 'Can View Leads', group: 'Operations' },
  { key: 'export_data', label: 'Can Export Data', group: 'Operations' },
  { key: 'manage_payments', label: 'Can Manage Payments', group: 'Operations' },
  { key: 'manage_settings', label: 'Can Manage Settings', group: 'Operations' },
  { key: 'manage_guides', label: 'Can Manage Guides', group: 'Content' },
  { key: 'manage_packages', label: 'Can Manage Packages', group: 'Content' },
  { key: 'manage_visas', label: 'Can Manage Visa Pages', group: 'Content' },
  { key: 'manage_cruises', label: 'Can Manage Cruises', group: 'Content' },
  { key: 'manage_destinations', label: 'Can Manage Destinations & Continents', group: 'Content' },
  { key: 'manage_services', label: 'Can Manage Services', group: 'Content' },
  { key: 'manage_departures', label: 'Can Manage Fixed Departures & Events', group: 'Content' },
  { key: 'manage_homepage', label: 'Can Manage Homepage, About & Media', group: 'Site' },
  { key: 'manage_faq', label: 'Can Manage FAQs', group: 'Site' },
  { key: 'manage_site_chrome', label: 'Can Manage Header & Footer', group: 'Site' },
];

export const ALL_PERMISSION_KEYS = PERMISSIONS.map((p) => p.key);

export type PermissionMap = Partial<Record<PermissionKey, boolean>>;

const only = (...keys: PermissionKey[]): PermissionMap => Object.fromEntries(keys.map((k) => [k, true]));

export const ROLE_DEFAULTS: Record<Role, PermissionMap> = {
  'Super Admin': only(...ALL_PERMISSION_KEYS),
  Admin: only(...ALL_PERMISSION_KEYS),
  'Sales Manager': only('view_leads', 'export_data', 'manage_packages', 'manage_departures'),
  'Content Manager': only(
    'manage_packages',
    'manage_visas',
    'manage_cruises',
    'manage_destinations',
    'manage_services',
    'manage_departures',
    'manage_guides',
    'manage_homepage',
    'manage_faq'
  ),
  'Finance Manager': only('manage_payments', 'view_leads', 'export_data'),
  'Operations Manager': only('view_leads', 'manage_departures', 'manage_site_chrome'),
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  'Super Admin': 'Full system access, including user management and access requests.',
  Admin: 'All content modules, submissions, exports and settings. Cannot manage users.',
  'Sales Manager': 'Leads & package enquiries, exports, packages and fixed departures.',
  'Content Manager': 'Packages, visas, cruises, destinations, services, guides, homepage and FAQs.',
  'Finance Manager': 'Payment page, payment submissions and payment exports.',
  'Operations Manager': 'Fixed departures, festivals & events, header/footer and lead viewing.',
};

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}

/** Role defaults with the per-user overrides applied on top. */
export function resolvePermissions(role: Role, overrides?: PermissionMap | null): Record<PermissionKey, boolean> {
  const base = ROLE_DEFAULTS[role] ?? {};
  const out = {} as Record<PermissionKey, boolean>;
  for (const key of ALL_PERMISSION_KEYS) {
    const override = overrides?.[key];
    out[key] = typeof override === 'boolean' ? override : Boolean(base[key]);
  }
  return out;
}

/** Only the keys that differ from the role defaults — this is what gets stored per user. */
export function diffFromRole(role: Role, effective: Record<PermissionKey, boolean>): PermissionMap {
  const base = ROLE_DEFAULTS[role] ?? {};
  const diff: PermissionMap = {};
  for (const key of ALL_PERMISSION_KEYS) {
    if (effective[key] !== Boolean(base[key])) diff[key] = effective[key];
  }
  return diff;
}

type RouteRule = { prefix: string; permission: PermissionKey | 'super' | 'any' };

/** First matching prefix wins — keep more specific prefixes first. */
const ROUTE_RULES: RouteRule[] = [
  { prefix: '/admin/dashboard', permission: 'any' },
  { prefix: '/admin/users', permission: 'super' },
  { prefix: '/admin/access-requests', permission: 'super' },
  { prefix: '/admin/submissions', permission: 'view_leads' },
  { prefix: '/admin/settings', permission: 'manage_settings' },
  { prefix: '/admin/payment', permission: 'manage_payments' },
  { prefix: '/admin/guides', permission: 'manage_guides' },
  { prefix: '/admin/packages', permission: 'manage_packages' },
  { prefix: '/admin/visas', permission: 'manage_visas' },
  { prefix: '/admin/cruises', permission: 'manage_cruises' },
  { prefix: '/admin/destinations', permission: 'manage_destinations' },
  { prefix: '/admin/continents', permission: 'manage_destinations' },
  { prefix: '/admin/featured-destinations', permission: 'manage_destinations' },
  { prefix: '/admin/services-page', permission: 'manage_services' },
  { prefix: '/admin/services', permission: 'manage_services' },
  { prefix: '/admin/fixed-departures', permission: 'manage_departures' },
  { prefix: '/admin/festivals', permission: 'manage_departures' },
  { prefix: '/admin/experiences', permission: 'manage_departures' },
  { prefix: '/admin/header', permission: 'manage_site_chrome' },
  { prefix: '/admin/footer', permission: 'manage_site_chrome' },
  { prefix: '/admin/faq', permission: 'manage_faq' },
  { prefix: '/admin/homepage', permission: 'manage_homepage' },
  { prefix: '/admin/about', permission: 'manage_homepage' },
  { prefix: '/admin/instagram', permission: 'manage_homepage' },
  { prefix: '/admin/hero-slides', permission: 'manage_homepage' },
  { prefix: '/admin/testimonials', permission: 'manage_homepage' },
  { prefix: '/admin/gallery', permission: 'manage_homepage' },
  { prefix: '/admin/media-videos', permission: 'manage_homepage' },
  { prefix: '/admin/media-events', permission: 'manage_homepage' },
];

export function requiredPermissionForPath(pathname: string): PermissionKey | 'super' | 'any' {
  const clean = pathname.replace(/\/+$/, '');
  const rule = ROUTE_RULES.find((r) => clean === r.prefix || clean.startsWith(`${r.prefix}/`));
  // Unknown admin pages default to the Settings permission rather than being open to everyone.
  return rule?.permission ?? 'manage_settings';
}

export function canAccessPath(
  pathname: string,
  access: { isSuperAdmin: boolean; permissions: Partial<Record<PermissionKey, boolean>> }
): boolean {
  if (access.isSuperAdmin) return true;
  const required = requiredPermissionForPath(pathname);
  if (required === 'any') return true;
  if (required === 'super') return false;
  return access.permissions[required] === true;
}

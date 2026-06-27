import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminNavItems } from '../config/entities';
import { countPendingAdminRequests } from '../../lib/adminAccess';

// Define grouped navigation structure
const NAV_GROUPS = [
  {
    label: 'Operations',
    items: ['/admin/dashboard', '/admin/submissions', '/admin/access-requests', '/admin/users'],
  },
  {
    label: 'Content Modules',
    items: [
      '/admin/packages',
      '/admin/destinations',
      '/admin/continents',
      '/admin/visas',
      '/admin/cruises',
      '/admin/services',
      '/admin/guides',
      '/admin/festivals',
      '/admin/fixed-departures',
      '/admin/hero-slides',
      '/admin/featured-destinations',
      '/admin/experiences',
      '/admin/testimonials',
      '/admin/gallery',
      '/admin/media-videos',
      '/admin/media-events',
    ],
  },
  {
    label: 'Page Sections',
    items: [
      '/admin/homepage',
      '/admin/about',
      '/admin/services-page',
      '/admin/header',
      '/admin/footer',
      '/admin/payment',
    ],
  },
  {
    label: 'Settings & Tools',
    items: ['/admin/faq', '/admin/settings'],
  },
];

function NavItem({ item, pendingAccess }: { item: (typeof adminNavItems)[0]; pendingAccess: number }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
          isActive
            ? 'bg-white/15 text-white shadow-sm'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      <span className="flex items-center gap-2.5 truncate">
        <item.icon className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{item.label}</span>
      </span>
      {item.to === '/admin/access-requests' && pendingAccess > 0 && (
        <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0">
          {pendingAccess}
        </span>
      )}
    </NavLink>
  );
}

function NavGroup({
  label,
  items,
  pendingAccess,
  isSuperAdmin,
}: {
  label: string;
  items: string[];
  pendingAccess: number;
  isSuperAdmin: boolean;
}) {
  const [open, setOpen] = useState(true);
  const navItemsInGroup = adminNavItems.filter((i) => items.includes(i.to));

  // Filter out super-admin-only items if not super admin
  const visibleItems = navItemsInGroup.filter((i) => {
    if (i.to === '/admin/access-requests' || i.to === '/admin/users') return isSuperAdmin;
    return true;
  });

  if (visibleItems.length === 0) return null;

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors"
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <div className="space-y-0.5 mt-0.5">
          {visibleItems.map((item) => (
            <NavItem key={item.to} item={item} pendingAccess={pendingAccess} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { signOut, user, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const { data: pendingAccess = 0 } = useQuery({
    queryKey: ['admin', 'access-requests-count'],
    queryFn: countPendingAdminRequests,
    enabled: isSuperAdmin,
    refetchInterval: 60_000,
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-60 bg-gradient-to-b from-primary-dark via-primary to-primary-light text-white flex flex-col shrink-0 fixed h-full overflow-y-auto shadow-xl">
        <div className="p-4 border-b border-white/10">
          <img src="/logo-white.png" alt="Airland Holidays" className="h-8 w-auto mb-2.5" />
          <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-semibold">Content Management</p>
          <p className="text-white/70 text-[10px] mt-1.5 truncate">{user?.email}</p>
        </div>
        <nav className="flex-1 p-2.5 py-3 space-y-2">
          {NAV_GROUPS.map((group) => (
            <NavGroup
              key={group.label}
              label={group.label}
              items={group.items}
              pendingAccess={pendingAccess}
              isSuperAdmin={isSuperAdmin}
            />
          ))}
        </nav>
        <div className="p-2.5 border-t border-white/10 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-60 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

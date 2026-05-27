import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  FileText,
  GraduationCap,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const links = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Students', to: '/admin/students', icon: UsersRound },
  { label: 'Academic', to: '/admin/academic', icon: BookOpen },
  { label: 'Logo', to: '/admin/logo', icon: Image },
  { label: 'Teachers', to: '/admin/teachers', icon: UserRound },
  { label: 'Admissions', to: '/admin/admissions', icon: ShieldCheck },
  { label: 'Results', to: '/admin/results', icon: GraduationCap },
  { label: 'Payments', to: '/admin/payments', icon: CreditCard },
  { label: 'Events', to: '/admin/events', icon: CalendarDays },
  { label: 'News', to: '/admin/news', icon: Newspaper },
  { label: 'Gallery', to: '/admin/gallery', icon: Image },
  { label: 'Settings', to: '/admin/settings', icon: Settings }
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
      isActive ? 'bg-brand-blue text-white' : 'text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800'
    }`;

  const sidebar = (
    <aside className="h-full w-72 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-heading text-lg font-bold text-slate-950 dark:text-white">Admin Panel</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Mater Dei Erudite School</p>
        </div>
        <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Close admin menu">
          <X aria-hidden="true" />
        </button>
      </div>
      <nav className="grid gap-1" aria-label="Admin navigation">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} className={navClass} onClick={() => setOpen(false)}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 flex w-full items-center gap-3 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
      >
        <LogOut size={18} aria-hidden="true" />
        Logout
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        <p className="font-heading font-bold text-slate-950 dark:text-white">Admin</p>
        <button type="button" onClick={() => setOpen(true)} className="rounded-xl bg-brand-blue p-3 text-white" aria-label="Open admin menu">
          <Menu aria-hidden="true" />
        </button>
      </header>

      <div className="lg:flex">
        <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
        {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>{sidebar}</div>}
        <main className="min-h-screen flex-1 p-4 lg:ml-72 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

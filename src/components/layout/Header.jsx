import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, X, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { siteInfo } from '../../data/siteInfo';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Academics', to: '/academics' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'News', to: '/news' },
  { label: 'Events', to: '/events' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Portal', to: '/student-portal' }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold ${
      isActive
        ? 'bg-blue-100 text-brand-blue dark:bg-blue-950 dark:text-blue-200'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={siteInfo.logo} alt="Mater Dei Erudite School logo" className="h-12 w-12 rounded-full object-contain" />
          <span className="max-w-[180px] font-heading text-sm font-bold leading-tight text-slate-950 dark:text-white sm:max-w-none sm:text-base">
            {siteInfo.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/pay-fees" className="hidden items-center gap-2 rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 sm:inline-flex">
            <CreditCard size={17} aria-hidden="true" />
            Pay Fees
          </NavLink>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle mobile menu"
            aria-expanded={open}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="grid gap-2 pt-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/pay-fees" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 text-sm font-bold text-slate-950" onClick={() => setOpen(false)}>
              <CreditCard size={18} aria-hidden="true" />
              Pay Fees
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteInfo } from '../../data/siteInfo';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export default function Footer() {
  const { logoUrl, siteName } = useSiteSettings();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 pb-24 pt-12 text-slate-200 sm:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <img src={logoUrl} alt={`${siteName} logo`} className="mb-4 h-16 w-16 rounded-full bg-white object-contain" />
          <h2 className="font-heading text-xl font-bold text-white">{siteName}</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">{siteInfo.motto}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            A private school in Ota, Ogun State, nurturing excellence, character and purpose from nursery to senior secondary.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-white">Pages</h3>
          <div className="mt-4 grid gap-2 text-sm">
            {['About', 'Admissions', 'Academics', 'Gallery', 'News', 'Events', 'FAQ', 'Student Portal'].map((label) => (
              <Link key={label} to={`/${label.toLowerCase().replace(' ', '-')}`} className="hover:text-brand-yellow">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex gap-2"><MapPin size={18} aria-hidden="true" /> {siteInfo.address}</p>
            <p className="flex gap-2"><Phone size={18} aria-hidden="true" /> {siteInfo.phones.join(', ')}</p>
            <p className="flex gap-2"><Mail size={18} aria-hidden="true" /> {siteInfo.email}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-800 px-4 pt-6 text-sm text-slate-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-brand-yellow">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-yellow">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

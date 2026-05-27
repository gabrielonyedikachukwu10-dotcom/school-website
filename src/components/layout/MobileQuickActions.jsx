import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteInfo } from '../../data/siteInfo';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export default function MobileQuickActions() {
  return (
    <>
      <a
        href={buildWhatsAppLink('Hello Mater Dei Erudite School, I would like to make an enquiry.')}
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg sm:hidden"
        aria-label="Chat with the school on WhatsApp"
      >
        <MessageCircle aria-hidden="true" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xl dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:hidden">
        <Link to="/admissions" className="flex min-h-16 flex-col items-center justify-center gap-1">
          <MessageCircle size={18} aria-hidden="true" />
          Apply Now
        </Link>
        <a href={`tel:${siteInfo.phones[0]}`} className="flex min-h-16 flex-col items-center justify-center gap-1 border-x border-slate-200 dark:border-slate-800">
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
        <Link to="/contact" className="flex min-h-16 flex-col items-center justify-center gap-1">
          <MapPin size={18} aria-hidden="true" />
          Location
        </Link>
      </div>
    </>
  );
}

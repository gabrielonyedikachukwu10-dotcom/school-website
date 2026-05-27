import { Mail, MapPin, Phone } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import WhatsAppForm from '../components/forms/WhatsAppForm';
import { siteInfo } from '../data/siteInfo';

export default function Contact() {
  return (
    <>
      <SEO title="Contact Us" description="Contact Mater Dei Erudite School in Ota, Ogun State by phone, WhatsApp, email or visit our school location." />
      <PageHero title="Contact Us" text="We are ready to answer your questions about admissions, academics and school life." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Reach us" title="School contact details" />
            <div className="mt-6 space-y-4">
              <p className="flex gap-3 rounded-xl bg-blue-50 p-4 dark:bg-slate-900"><MapPin className="text-brand-blue" aria-hidden="true" /> {siteInfo.address}</p>
              <p className="flex gap-3 rounded-xl bg-blue-50 p-4 dark:bg-slate-900"><Phone className="text-brand-blue" aria-hidden="true" /> {siteInfo.phones.join(', ')}</p>
              <p className="flex gap-3 rounded-xl bg-blue-50 p-4 dark:bg-slate-900"><Mail className="text-brand-blue" aria-hidden="true" /> {siteInfo.email}</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl shadow-soft">
              <iframe
                title="General map of Ota, Ogun State"
                src={siteInfo.mapsEmbed}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Send a message" title="Contact form" text="This form opens WhatsApp with your message ready to send." />
            <div className="mt-6">
              <WhatsAppForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

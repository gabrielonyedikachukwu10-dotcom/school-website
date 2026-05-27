import { CheckCircle2, MessageCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import WhatsAppForm from '../components/forms/WhatsAppForm';
import { siteInfo } from '../data/siteInfo';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function Admissions() {
  const requirements = [
    'Completed application form',
    'Previous school report / transfer certificate',
    'Passport photographs of the child',
    'Parent/guardian contact details',
    'Entrance assessment for Primary and Secondary applicants'
  ];

  return (
    <>
      <SEO title="Admissions 2025/2026 Ota" description="Apply to Mater Dei Erudite School, a nursery, primary and secondary private school in Ota, Ogun State. View admission requirements and contact us on WhatsApp." />
      <PageHero title="Admissions" text="Start your child's journey at Mater Dei Erudite School." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Requirements" title="Admission Requirements" />
            <ul className="mt-6 space-y-3">
              {requirements.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-blue-50 p-4 dark:bg-slate-900">
                  <CheckCircle2 className="shrink-0 text-brand-blue" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button href="#" variant="outline" className="mt-6">Download Application Form</Button>
            {/* TODO: Replace # with the real admission PDF download link later. */}
          </div>
          <div>
            <SectionHeader eyebrow="Apply by WhatsApp" title="Admission inquiry form" text="Fill this short form and it will open WhatsApp with your details ready to send." />
            <div className="mt-6">
              <WhatsAppForm type="admission" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-14 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader centered eyebrow="Process" title="Simple 3-step admission process" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {['Submit application form and documents', 'Attend entrance assessment/interview', 'Receive admission offer and complete registration'].map((step, index) => (
              <div key={step} className="rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-950">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow font-heading text-xl font-bold text-slate-950">{index + 1}</div>
                <h3 className="font-heading text-lg font-bold text-slate-950 dark:text-white">Step {index + 1}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-950">
            <MessageCircle className="mb-3 text-brand-blue" aria-hidden="true" />
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              For questions about admissions, contact us on WhatsApp or call {siteInfo.phones.join(', ')}.
            </p>
            <Button href={buildWhatsAppLink('Hello, I have questions about admission at Mater Dei Erudite School.')} variant="accent" className="mt-4">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

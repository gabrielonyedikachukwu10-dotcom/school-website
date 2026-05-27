import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(faqs[0]?.id);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div key={faq.id} className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-heading font-bold text-slate-950 dark:text-white"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
              aria-controls={`faq-${faq.id}`}
            >
              {faq.question}
              <ChevronDown className={open ? 'rotate-180' : ''} size={20} aria-hidden="true" />
            </button>
            {open && (
              <div id={`faq-${faq.id}`} className="px-5 pb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

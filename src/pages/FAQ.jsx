import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import FAQAccordion from '../components/common/FAQAccordion';
import faqs from '../data/faqs.json';

export default function FAQ() {
  return (
    <>
      <SEO title="FAQ" description="Answers to common questions about admission, school fees, hours, curriculum and contact details for Mater Dei Erudite School." />
      <PageHero title="Frequently Asked Questions" text="Quick answers for parents and students." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* TODO: Update FAQ content in src/data/faqs.json. */}
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}

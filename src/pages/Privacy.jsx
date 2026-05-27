import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy policy for Mater Dei Erudite School website visitors, parents and students." />
      <PageHero title="Privacy Policy" text="How we handle information submitted through this website." />
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 leading-8 text-slate-700 dark:text-slate-300 sm:px-6 lg:px-8">
          <p>Mater Dei Erudite School respects the privacy of parents, students and visitors. Information submitted through contact or admission forms is used only to respond to enquiries and support school communication.</p>
          <p className="mt-4">We do not sell personal information. When future portal or payment features are added, this policy should be updated with the exact data handling and security details.</p>
          {/* TODO: Replace this placeholder privacy policy with legal-reviewed content before final public launch. */}
        </div>
      </section>
    </>
  );
}

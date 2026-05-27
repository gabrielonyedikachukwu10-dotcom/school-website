import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';

export default function Terms() {
  return (
    <>
      <SEO title="Terms" description="Terms of use for the Mater Dei Erudite School website." />
      <PageHero title="Terms of Use" text="Website terms for visitors, parents and students." />
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 leading-8 text-slate-700 dark:text-slate-300 sm:px-6 lg:px-8">
          <p>This website provides general school information, admission guidance, announcements and contact options. Content may be updated as school policies, programmes and academic calendars change.</p>
          <p className="mt-4">Parents and students should contact the school office to confirm current fees, admission status, schedules and official documents.</p>
          {/* TODO: Replace this placeholder terms page with legal-reviewed content before final public launch. */}
        </div>
      </section>
    </>
  );
}

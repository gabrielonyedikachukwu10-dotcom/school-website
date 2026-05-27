import { Award, Compass, History, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import { assetPath } from '../utils/assetPath';

export default function About() {
  const values = [
    ['Excellence', 'Striving for the best in learning and conduct.', Award],
    ['Integrity', 'Honesty, respect, and responsibility in all we do.', Compass],
    ['Character', 'Building students with strong moral values.', Sparkles],
    ['Opportunity', 'Creating chances for every child to discover and grow their potential.', History]
  ];

  return (
    <>
      <SEO title="About Our School" description="Learn about Mater Dei Erudite School, a private school in Ota, Ogun State focused on excellence, discipline and character." />
      <PageHero title="About Us" text="A school committed to academic excellence, strong values and purposeful growth." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <img src={assetPath('/images/founders.jpeg')} alt="Founders of Mater Dei Erudite School at a school event" className="rounded-2xl object-cover shadow-soft" loading="lazy" />
          <div className="space-y-8">
            <div>
              <SectionHeader eyebrow="Mission" title="Inspiring excellence" />
              <p className="mt-3 leading-8 text-slate-700 dark:text-slate-300">To provide quality education that inspires academic excellence, builds strong character, and prepares students for a purposeful future.</p>
            </div>
            <div>
              <SectionHeader eyebrow="Vision" title="Raising confident young people" />
              <p className="mt-3 leading-8 text-slate-700 dark:text-slate-300">To be a leading school known for nurturing confident, disciplined, and innovative young people who make a positive impact in society.</p>
            </div>
            <div>
              <SectionHeader eyebrow="History" title="A safe place to grow" />
              <p className="mt-3 leading-8 text-slate-700 dark:text-slate-300">Mater Dei Erudite School was founded to provide a safe, disciplined, and academically strong environment where students can grow in knowledge and character.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-14 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader centered eyebrow="Our values" title="The principles that guide us" />
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {values.map(([title, text, Icon]) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-950">
                <Icon className="text-brand-blue" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

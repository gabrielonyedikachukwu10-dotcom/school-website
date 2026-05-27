import { Baby, BookOpen, Dumbbell, GraduationCap } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';

export default function Academics() {
  const programs = [
    ['Nursery/Early Years', 'A warm foundation for early literacy, numeracy, creativity and social confidence.', Baby],
    ['Primary School', 'Strong basic education with reading, mathematics, science, technology and moral training.', BookOpen],
    ['Junior Secondary School 1-3', 'A disciplined academic bridge that prepares students for senior secondary learning.', GraduationCap],
    ['Senior Secondary School 1-3', 'Focused preparation for external examinations, character, leadership and future pathways.', GraduationCap],
    ['Extracurricular Activities', 'Creative, social and practical activities that help students discover confidence and talent.', Dumbbell]
  ];

  return (
    <>
      <SEO title="Academics" description="Explore nursery, primary, junior secondary and senior secondary education at Mater Dei Erudite School in Ota, Ogun State." />
      <PageHero title="Academics" text="Learning pathways from early years to senior secondary." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {programs.map(([title, text, Icon]) => (
            <article key={title} className="rounded-2xl bg-white p-6 shadow-soft hover:-translate-y-1 dark:bg-slate-900">
              <Icon className="text-brand-blue" size={34} aria-hidden="true" />
              <h2 className="mt-4 font-heading text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, HeartHandshake, ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeader from '../components/common/SectionHeader';
import StoryBookAnimation from '../components/home/StoryBookAnimation';
import StatsSection from '../components/home/StatsSection';
import NewsCard from '../components/common/NewsCard';
import EventCard from '../components/common/EventCard';
import FAQAccordion from '../components/common/FAQAccordion';
import { siteInfo } from '../data/siteInfo';
import { assetPath } from '../utils/assetPath';
import news from '../data/news.json';
import events from '../data/events.json';
import faqs from '../data/faqs.json';
import reviews from '../data/reviews.json';

export default function Home() {
  return (
    <>
      <SEO title="Best School in Ota" description="Mater Dei Erudite School is a private nursery, primary and secondary school in Ota, Ogun State, Nigeria, focused on excellence and character." />
      <section className="relative overflow-hidden bg-blue-50 py-12 dark:bg-slate-900 sm:py-20">
        <div className="absolute left-8 top-16 h-12 w-12 rounded-full bg-brand-yellow/30 blur-sm" aria-hidden="true" />
        <div className="absolute bottom-20 right-10 h-20 w-20 rounded-full bg-brand-blue/15 blur-md" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-blue shadow-sm dark:bg-slate-800 dark:text-blue-200">
              Nursery • Primary • Secondary
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">
              {siteInfo.name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-brand-blue dark:text-blue-300">{siteInfo.motto}</p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              A modern private school in Ota, Ogun State, building bright minds, strong character and confident learners for the future.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/admissions" variant="accent">Apply Now</Button>
              <Button to="/about" variant="outline">Learn About Us</Button>
            </div>
          </div>
          <StoryBookAnimation />
        </div>
      </section>

      <StatsSection />

      <AnimatedSection className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader centered eyebrow="Why parents choose us" title="A caring school built on excellence and character" text="We combine academic structure, discipline, practical learning and moral guidance so every child can grow with confidence." />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ['Academic Excellence', BookOpen],
              ['Character Formation', ShieldCheck],
              ['Supportive Teachers', HeartHandshake],
              ['Future Ready Learning', GraduationCap]
            ].map(([title, Icon]) => (
              <div key={title} className="rounded-2xl bg-white p-6 text-center shadow-soft hover:-translate-y-1 dark:bg-slate-900">
                <Icon className="mx-auto text-brand-blue" size={34} aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-slate-50 py-14 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <img src={assetPath('/images/principal.png')} alt="Principal Ezebulachi Gerald Chibueze seated in his office" loading="lazy" className="h-full max-h-[620px] w-full rounded-2xl object-cover shadow-soft" />
          <div className="self-center">
            <SectionHeader eyebrow="Principal's message" title="A Message from the Principal" />
            <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">{siteInfo.principal.message}</p>
            <p className="mt-5 font-heading font-bold text-slate-950 dark:text-white">{siteInfo.principal.name}</p>
            <p className="text-sm text-brand-blue dark:text-blue-300">{siteInfo.principal.title}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader eyebrow="Latest updates" title="News and announcements" />
            <Link to="/news" className="font-semibold text-brand-blue hover:text-blue-700 dark:text-blue-300">View all news</Link>
          </div>
          {/* REPLACE THESE SAMPLE POSTS WITH REAL POSTS LATER */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {news.slice(0, 3).map((post) => <NewsCard key={post.id} post={post} />)}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-blue-50 py-14 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader eyebrow="School calendar" title="Upcoming events" />
            <Link to="/events" className="font-semibold text-brand-blue hover:text-blue-700 dark:text-blue-300">View all events</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {events.slice(0, 4).map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Parent voices" title="What parents appreciate" text="These are sample parent reviews for the first version of the site." />
            <div className="mt-6 grid gap-4">
              {reviews.map((review) => (
                <blockquote key={review.id} className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
                  <p className="text-slate-700 dark:text-slate-300">“{review.text}”</p>
                  <footer className="mt-3 font-semibold text-brand-blue dark:text-blue-300">{review.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Quick answers" title="Frequently asked questions" />
            <div className="mt-6">
              <FAQAccordion faqs={faqs.slice(0, 3)} />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}

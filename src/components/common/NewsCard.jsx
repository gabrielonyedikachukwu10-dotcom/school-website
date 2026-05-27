import { CalendarDays } from 'lucide-react';

export default function NewsCard({ post }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-soft hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-blue dark:text-blue-300">
        <CalendarDays size={17} aria-hidden="true" />
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
      </div>
      <h3 className="font-heading text-xl font-bold text-slate-950 dark:text-white">{post.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
      <a href="#" className="mt-5 inline-flex font-semibold text-brand-blue hover:text-blue-700 dark:text-blue-300">
        Read More
      </a>
    </article>
  );
}

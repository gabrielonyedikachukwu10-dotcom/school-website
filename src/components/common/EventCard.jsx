import { CalendarDays, Clock } from 'lucide-react';

export default function EventCard({ event }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-heading text-xl font-bold text-slate-950 dark:text-white">{event.title}</h3>
      <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-brand-blue dark:text-blue-300">
        <span className="flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" /> {new Date(event.date).toLocaleDateString()}</span>
        <span className="flex items-center gap-2"><Clock size={16} aria-hidden="true" /> {event.time}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{event.description}</p>
    </article>
  );
}

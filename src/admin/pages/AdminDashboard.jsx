import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminDashboard() {
  const { data, sections, labels } = useAdmin();

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">Overview</p>
        <h1 className="font-heading text-3xl font-bold text-slate-950 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Manage public website content from localStorage for now.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link key={section} to={`/admin/${section}`} className="rounded-2xl bg-white p-5 shadow-soft hover:-translate-y-1 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{labels[section]}</p>
            <p className="mt-3 font-heading text-4xl font-bold text-brand-blue">{data[section]?.length || 0}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Total records</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

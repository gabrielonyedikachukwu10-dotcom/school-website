export default function PageHero({ title, text }) {
  return (
    <section className="bg-blue-50 py-12 dark:bg-slate-900 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-blue dark:text-blue-300">Mater Dei Erudite School</p>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-5xl">{title}</h1>
          {text && <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">{text}</p>}
        </div>
      </div>
    </section>
  );
}

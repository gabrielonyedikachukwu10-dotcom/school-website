export default function SectionHeader({ eyebrow, title, text, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-blue dark:text-blue-300">{eyebrow}</p>}
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">{title}</h2>
      {text && <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p>}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { siteInfo } from '../../data/siteInfo';
import { useCountUp } from '../../hooks/useCountUp';

function Stat({ item, active }) {
  const count = useCountUp(item.value, active);
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-soft dark:bg-slate-900">
      <div className="font-heading text-4xl font-bold text-brand-blue">{count}{item.suffix}</div>
      <p className="mt-2 font-semibold text-slate-700 dark:text-slate-300">{item.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-blue-50 py-12 dark:bg-slate-900">
      {/* TODO: Update homepage stats numbers in src/data/siteInfo.js later. */}
      <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {siteInfo.stats.map((item) => (
          <Stat key={item.label} item={item} active={active} />
        ))}
      </div>
    </section>
  );
}

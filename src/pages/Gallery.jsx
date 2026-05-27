import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import gallery from '../data/gallery.json';
import { assetPath } from '../utils/assetPath';

export default function Gallery() {
  return (
    <>
      <SEO title="Gallery" description="View photos and videos from Mater Dei Erudite School in Ota, Ogun State, including students, classrooms, labs and school events." />
      <PageHero title="Gallery" text="Photos and videos from school life at Mater Dei Erudite School." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TODO: Update gallery photos and videos in src/data/gallery.json. */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-2xl bg-slate-100 shadow-soft dark:bg-slate-900">
                {item.type === 'video' && item.src ? (
                  <video src={assetPath(item.src)} poster={assetPath(item.poster)} controls className="h-72 w-full object-cover" aria-label={item.alt} />
                ) : item.type === 'video' ? (
                  <div className="flex h-72 items-center justify-center bg-slate-200 p-6 text-center font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    Video placeholder. Add a real video URL in gallery.json later.
                  </div>
                ) : (
                  <img src={assetPath(item.src)} alt={item.alt} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 group-hover:brightness-110" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

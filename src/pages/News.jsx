import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import NewsCard from '../components/common/NewsCard';
import news from '../data/news.json';

export default function News() {
  return (
    <>
      <SEO title="News and Blog" description="Read school news, admission updates, announcements and student achievement stories from Mater Dei Erudite School in Ota, Ogun State." />
      <PageHero title="News / Blog" text="School updates, announcements and learning stories." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* REPLACE THESE SAMPLE POSTS WITH REAL POSTS LATER */}
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((post) => <NewsCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>
    </>
  );
}

import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import EventCard from '../components/common/EventCard';
import events from '../data/events.json';

export default function Events() {
  return (
    <>
      <SEO title="Events" description="See upcoming school events, meetings and academic activities at Mater Dei Erudite School in Ota, Ogun State." />
      <PageHero title="Events" text="Upcoming school events and important dates." />
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {/* TODO: Update school events in src/data/events.json. */}
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </section>
    </>
  );
}

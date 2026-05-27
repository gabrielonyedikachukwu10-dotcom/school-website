import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <SEO title="Page Not Found" description="The page you requested could not be found." />
      <div className="mx-auto max-w-xl px-4">
        <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">The page you are looking for is not available.</p>
        <Button to="/" className="mt-8">Go Home</Button>
      </div>
    </section>
  );
}

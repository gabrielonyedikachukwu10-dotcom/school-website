import { Clock } from 'lucide-react';
import Button from './Button';

export default function ComingSoon({ title, message, children }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-brand-blue dark:bg-blue-950 dark:text-blue-200">
          <Clock aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{message}</p>
        {children}
        <div className="mt-8">
          <Button to="/contact" variant="accent">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}

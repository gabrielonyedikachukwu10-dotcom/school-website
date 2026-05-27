import { useState } from 'react';
import Button from '../common/Button';
import { buildWhatsAppLink } from '../../utils/whatsapp';

const emptyValues = {
  name: '',
  phone: '',
  message: '',
  classLevel: ''
};

export default function WhatsAppForm({ type = 'contact' }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});

  const update = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.phone.trim()) next.phone = 'Please enter a phone number.';
    if (type === 'admission' && !values.classLevel.trim()) next.classLevel = 'Please enter the class you are applying for.';
    if (!values.message.trim()) next.message = 'Please enter your message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const message = [
      `Hello Mater Dei Erudite School, this is a ${type === 'admission' ? 'new admission enquiry' : 'contact message'}.`,
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      type === 'admission' ? `Class/Level: ${values.classLevel}` : '',
      `Message: ${values.message}`
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900 sm:p-6" noValidate>
      <div className="grid gap-4">
        <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
          Full name
          <input
            name="name"
            value={values.name}
            onChange={update}
            className="min-h-12 rounded-xl border border-slate-300 px-4 text-base text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span id="name-error" className="text-sm text-red-600">{errors.name}</span>}
        </label>

        <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
          Phone number
          <input
            name="phone"
            value={values.phone}
            onChange={update}
            className="min-h-12 rounded-xl border border-slate-300 px-4 text-base text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <span id="phone-error" className="text-sm text-red-600">{errors.phone}</span>}
        </label>

        {type === 'admission' && (
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
            Class applying for
            <input
              name="classLevel"
              value={values.classLevel}
              onChange={update}
              placeholder="e.g. Primary 3"
              className="min-h-12 rounded-xl border border-slate-300 px-4 text-base text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              aria-describedby={errors.classLevel ? 'class-error' : undefined}
              aria-invalid={Boolean(errors.classLevel)}
            />
            {errors.classLevel && <span id="class-error" className="text-sm text-red-600">{errors.classLevel}</span>}
          </label>
        )}

        <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
          Message
          <textarea
            name="message"
            value={values.message}
            onChange={update}
            rows="4"
            className="rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <span id="message-error" className="text-sm text-red-600">{errors.message}</span>}
        </label>
      </div>

      <Button type="submit" className="mt-5 w-full" variant="accent">
        Send to WhatsApp
      </Button>
    </form>
  );
}

import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const emptyForm = { title: '', description: '', date: '' };

export default function CrudPage({ section }) {
  const { data, labels, addItem, editItem, deleteItem } = useAdmin();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const items = data[section] || [];
  const title = labels[section] || section;

  const formTitle = useMemo(() => (editingId ? `Edit ${title}` : `Add ${title}`), [editingId, title]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const reset = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submit = (event) => {
    event.preventDefault();
    if (editingId) {
      editItem(section, editingId, form);
    } else {
      addItem(section, form);
    }
    reset();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, date: item.date });
  };

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">Admin section</p>
        <h1 className="font-heading text-3xl font-bold text-slate-950 dark:text-white">{title}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Add, edit, delete and list {title.toLowerCase()} records.</p>
      </div>

      <form onSubmit={submit} className="mb-8 rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-bold text-slate-950 dark:text-white">
          <Plus size={20} aria-hidden="true" />
          {formTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
            Title
            <input name="title" value={form.title} onChange={update} required className="min-h-12 rounded-xl border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
            Date
            <input name="date" type="date" value={form.date} onChange={update} required className="min-h-12 rounded-xl border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100 md:col-span-3">
            Description
            <textarea name="description" value={form.description} onChange={update} required rows="3" className="rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" />
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="min-h-11 rounded-full bg-brand-blue px-5 font-bold text-white hover:bg-blue-700">
            {editingId ? 'Save Changes' : 'Add Record'}
          </button>
          {editingId && (
            <button type="button" onClick={reset} className="min-h-11 rounded-full border border-slate-300 px-5 font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl bg-white shadow-soft dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3 font-semibold text-slate-950 dark:text-white">{item.title}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.description}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(item)} className="rounded-lg bg-blue-50 p-2 text-brand-blue dark:bg-blue-950" aria-label={`Edit ${item.title}`}>
                        <Pencil size={18} aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => deleteItem(section, item.id)} className="rounded-lg bg-red-50 p-2 text-red-700 dark:bg-red-950 dark:text-red-300" aria-label={`Delete ${item.title}`}>
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan="4">No records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

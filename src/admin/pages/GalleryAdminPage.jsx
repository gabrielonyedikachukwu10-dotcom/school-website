import { Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { uploadAdminFile } from '../utils/api';

const emptyForm = {
  title: '',
  description: '',
  date: '',
  image_url: '',
  fileType: '',
  previewUrl: ''
};

export default function GalleryAdminPage() {
  const { data, addItem, editItem, deleteItem } = useAdmin();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const items = data.gallery || [];

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const updateFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const result = await uploadAdminFile('gallery', file);
    setForm((current) => ({
      ...current,
      image_url: result.image_url,
      fileType: result.fileType,
      previewUrl: result.image_url
    }));
  };

  const reset = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      image_url: form.image_url,
      fileType: form.fileType,
      previewUrl: form.previewUrl
    };

    if (editingId) {
      await editItem('gallery', editingId, payload);
    } else {
      await addItem('gallery', payload);
    }
    reset();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || '',
      description: item.description || '',
      date: item.date || '',
      image_url: item.image_url || item.filePath || '',
      fileType: item.fileType || '',
      previewUrl: item.previewUrl || item.image_url || item.filePath || ''
    });
  };

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">Admin section</p>
        <h1 className="font-heading text-3xl font-bold text-slate-950 dark:text-white">Gallery</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Upload image and video records for the public gallery.</p>
      </div>

      <form onSubmit={submit} className="mb-8 rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-bold text-slate-950 dark:text-white">
          <Plus size={20} aria-hidden="true" />
          {editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}
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
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
            Image or video
            <span className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-brand-blue px-4 text-brand-blue dark:border-blue-300 dark:text-blue-300">
              <Upload size={18} aria-hidden="true" />
              Choose file
              <input type="file" accept="image/*,video/*" onChange={updateFile} className="sr-only" required={!editingId && !form.image_url} />
            </span>
          </label>
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100 md:col-span-3">
            Description
            <textarea name="description" value={form.description} onChange={update} required rows="3" className="rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" />
          </label>
        </div>

        {form.image_url && (
          <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <p><span className="font-bold">Permanent image_url:</span> {form.image_url}</p>
            <p className="mt-1">This file is saved by Express/Multer inside public/uploads/gallery.</p>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="min-h-11 rounded-full bg-brand-blue px-5 font-bold text-white hover:bg-blue-700">
            {editingId ? 'Save Changes' : 'Add Gallery Item'}
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
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">image_url</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3">
                    {(item.image_url || item.filePath) && item.fileType === 'video' ? (
                      <video src={item.image_url || item.filePath} className="h-16 w-24 rounded-lg object-cover" muted playsInline />
                    ) : item.image_url || item.filePath ? (
                      <img src={item.image_url || item.filePath} alt={item.title} className="h-16 w-24 rounded-lg object-cover" />
                    ) : (
                      <span className="text-slate-500">No file</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-950 dark:text-white">{item.title}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.description}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.image_url || item.filePath || 'Not set'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(item)} className="rounded-lg bg-blue-50 p-2 text-brand-blue dark:bg-blue-950" aria-label={`Edit ${item.title}`}>
                        <Pencil size={18} aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => deleteItem('gallery', item.id)} className="rounded-lg bg-red-50 p-2 text-red-700 dark:bg-red-950 dark:text-red-300" aria-label={`Delete ${item.title}`}>
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan="6">No gallery records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

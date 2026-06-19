import { Image, Save, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export default function BrandingPage() {
  const { logoUrl, siteName, refreshSiteSettings } = useSiteSettings();
  const [site_name, setSiteName] = useState(siteName);
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(logoUrl);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSiteName(siteName);
    setPreview(logoUrl);
  }, [logoUrl, siteName]);

  const selectFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      const formData = new FormData();
      formData.append('site_name', site_name);
      if (logoFile) formData.append('file', logoFile);

      await apiRequest('/api/site-settings/logo', {
        method: 'POST',
        body: formData
      });
      await refreshSiteSettings();
      setLogoFile(null);
      setStatus('Branding updated successfully.');
    } catch (error) {
      setStatus(error.message || 'Could not update branding.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">Site Settings</p>
        <h1 className="font-heading text-3xl font-bold text-slate-950 dark:text-white">Branding</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Upload the global school logo used by the navbar, footer, favicon, and admin login.</p>
      </div>

      <form onSubmit={submit} className="max-w-3xl rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
            {preview ? (
              <img src={preview} alt={`${site_name} current logo`} className="h-24 w-24 rounded-xl object-contain" />
            ) : (
              <Image className="text-slate-400" size={36} aria-hidden="true" />
            )}
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-950 dark:text-white">Current Logo</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Choose a PNG, SVG, JPG, or JPEG file. If you save without selecting a new image, the current logo stays unchanged.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
            Site name
            <input
              name="site_name"
              value={site_name}
              onChange={(event) => setSiteName(event.target.value)}
              className="min-h-12 rounded-xl border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>

          <label className="grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
            Upload Logo
            <span className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-brand-blue px-4 text-brand-blue dark:border-blue-300 dark:text-blue-300">
              <Upload size={18} aria-hidden="true" />
              {logoFile ? logoFile.name : 'Choose logo file'}
              <input type="file" accept="image/png,image/svg+xml,image/jpeg,image/jpg" onChange={selectFile} className="sr-only" />
            </span>
          </label>
        </div>

        {status && <p className="mt-4 text-sm font-semibold text-brand-blue dark:text-blue-300">{status}</p>}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-blue px-5 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={18} aria-hidden="true" />
          {saving ? 'Saving...' : 'Save Branding'}
        </button>
      </form>
    </section>
  );
}

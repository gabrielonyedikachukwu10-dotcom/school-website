import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdmin();
  const { logoUrl, siteName } = useSiteSettings();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(password);
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } catch (error) {
      setError(error.message || 'Incorrect password. Please try again.');
      return;
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 px-4 dark:bg-slate-950">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue text-white">
          <img src={logoUrl} alt={`${siteName} logo`} className="h-12 w-12 rounded-xl bg-white object-contain" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-slate-950 dark:text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter the principal password to manage website content.</p>
        <label className="mt-6 grid gap-2 font-semibold text-slate-800 dark:text-slate-100">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-h-12 rounded-xl border border-slate-300 px-4 text-base text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            aria-describedby={error ? 'admin-login-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </label>
        {error && <p id="admin-login-error" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" className="mt-6 min-h-12 w-full rounded-full bg-brand-blue px-5 font-bold text-white hover:bg-blue-700">
          Login
        </button>
      </form>
    </main>
  );
}

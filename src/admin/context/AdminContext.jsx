import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../utils/api';

const AdminContext = createContext(null);

const sectionNames = [
  'students',
  'academic',
  'logo',
  'teachers',
  'admissions',
  'results',
  'payments',
  'events',
  'news',
  'gallery',
  'settings'
];

const labels = {
  students: 'Students',
  academic: 'Academic',
  logo: 'Logo',
  teachers: 'Teachers',
  admissions: 'Admissions',
  results: 'Results',
  payments: 'Payments',
  events: 'Events',
  news: 'News',
  gallery: 'Gallery',
  settings: 'Settings'
};

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('admin-token')));
  const [adminUser, setAdminUser] = useState(() => {
    const stored = localStorage.getItem('admin-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [data, setData] = useState(() => sectionNames.reduce((acc, section) => ({ ...acc, [section]: [] }), {}));
  const [loading, setLoading] = useState(false);

  const loadSection = async (section) => {
    const items = await apiRequest(`/api/admin/${section}`);
    setData((current) => ({ ...current, [section]: items }));
    return items;
  };

  const loadAllSections = async () => {
    if (!localStorage.getItem('admin-token')) return;
    setLoading(true);
    try {
      const entries = await Promise.all(sectionNames.map(async (section) => [section, await apiRequest(`/api/admin/${section}`)]));
      setData(Object.fromEntries(entries));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadAllSections().catch(() => logout());
  }, [isAuthenticated]);

  const login = async (password, email = 'principal@materdei.local') => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('admin-token', response.token);
    localStorage.setItem('admin-user', JSON.stringify(response.user));
    setAdminUser(response.user);
    setIsAuthenticated(true);
    await loadAllSections();
    return true;
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    setAdminUser(null);
    setIsAuthenticated(false);
  };

  const addItem = async (section, item) => {
    const created = await apiRequest(`/api/admin/${section}`, {
      method: 'POST',
      body: JSON.stringify(item)
    });
    setData((current) => ({ ...current, [section]: [created, ...(current[section] || [])] }));
    return created;
  };

  const editItem = async (section, id, item) => {
    const response = await apiRequest(`/api/admin/${section}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item)
    });
    setData((current) => ({
      ...current,
      [section]: (current[section] || []).map((record) => (record.id === id ? response.item : record))
    }));
    return response.item;
  };

  const deleteItem = async (section, id) => {
    await apiRequest(`/api/admin/${section}/${id}`, { method: 'DELETE' });
    setData((current) => ({ ...current, [section]: (current[section] || []).filter((record) => record.id !== id) }));
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      adminUser,
      login,
      logout,
      data,
      loading,
      sections: sectionNames,
      labels,
      loadSection,
      loadAllSections,
      addItem,
      editItem,
      deleteItem
    }),
    [adminUser, data, isAuthenticated, loading]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used inside AdminProvider');
  return context;
}

import { createContext, useContext, useMemo, useState } from 'react';

const AdminContext = createContext(null);
const PASSWORD = '@principal codex';

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

const createPlaceholder = (section) => [
  {
    id: crypto.randomUUID(),
    title: `${labels[section]} sample item`,
    description: `Placeholder ${labels[section].toLowerCase()} record. Edit or delete this from the admin panel.`,
    date: new Date().toISOString().slice(0, 10)
  }
];

const getStored = (key, fallback) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
};

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin-auth') === 'true');
  const [data, setData] = useState(() =>
    sectionNames.reduce((acc, section) => {
      acc[section] = getStored(`admin-${section}`, createPlaceholder(section));
      return acc;
    }, {})
  );

  const persistSection = (section, nextItems) => {
    localStorage.setItem(`admin-${section}`, JSON.stringify(nextItems));
    setData((current) => ({ ...current, [section]: nextItems }));
  };

  const login = (password) => {
    if (password !== PASSWORD) return false;
    localStorage.setItem('admin-auth', 'true');
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
  };

  const addItem = (section, item) => {
    const nextItems = [{ ...item, id: crypto.randomUUID() }, ...data[section]];
    persistSection(section, nextItems);
  };

  const editItem = (section, id, item) => {
    const nextItems = data[section].map((record) => (record.id === id ? { ...record, ...item } : record));
    persistSection(section, nextItems);
  };

  const deleteItem = (section, id) => {
    const nextItems = data[section].filter((record) => record.id !== id);
    persistSection(section, nextItems);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      data,
      sections: sectionNames,
      labels,
      addItem,
      editItem,
      deleteItem
    }),
    [data, isAuthenticated]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used inside AdminProvider');
  return context;
}

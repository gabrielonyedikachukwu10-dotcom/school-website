import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AdminProvider } from './admin/context/AdminContext.jsx';
import { SiteSettingsProvider } from './context/SiteSettingsContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.PROD ? import.meta.env.BASE_URL : '/'}>
      <AdminProvider>
        <SiteSettingsProvider>
          <App />
        </SiteSettingsProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);

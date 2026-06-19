import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { siteInfo as fallbackSiteInfo } from '../data/siteInfo';

const SiteSettingsContext = createContext(null);

const defaultSettings = {
  site_name: fallbackSiteInfo.name,
  logo_url: fallbackSiteInfo.logo,
  updated_at: ''
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  const applyFavicon = (logoUrl) => {
    const href = logoUrl || fallbackSiteInfo.logo;
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('type', 'image/png');
    favicon.setAttribute('href', href);
  };

  const loadSiteSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      const data = await response.json();
      const nextSettings = {
        site_name: data.site_name || fallbackSiteInfo.name,
        logo_url: data.logo_url || fallbackSiteInfo.logo,
        updated_at: data.updated_at || ''
      };
      setSettings(nextSettings);
      applyFavicon(nextSettings.logo_url);
      return nextSettings;
    } catch {
      applyFavicon(fallbackSiteInfo.logo);
      return defaultSettings;
    }
  };

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const value = useMemo(
    () => ({
      settings,
      logoUrl: settings.logo_url || fallbackSiteInfo.logo,
      siteName: settings.site_name || fallbackSiteInfo.name,
      refreshSiteSettings: loadSiteSettings
    }),
    [settings]
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) throw new Error('useSiteSettings must be used inside SiteSettingsProvider');
  return context;
}

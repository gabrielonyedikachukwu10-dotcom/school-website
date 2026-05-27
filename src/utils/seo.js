import { siteInfo } from '../data/siteInfo';

export function setPageMeta(title, description) {
  document.title = `${title} | ${siteInfo.name}`;

  const ensureMeta = (selector, attr, value) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      const [key, val] = attr;
      tag.setAttribute(key, val);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  };

  ensureMeta('meta[name="description"]', ['name', 'description'], description);
  ensureMeta('meta[property="og:title"]', ['property', 'og:title'], `${title} | ${siteInfo.name}`);
  ensureMeta('meta[property="og:description"]', ['property', 'og:description'], description);
  ensureMeta('meta[property="og:image"]', ['property', 'og:image'], siteInfo.shareImage);
  ensureMeta('meta[name="twitter:card"]', ['name', 'twitter:card'], 'summary_large_image');
}

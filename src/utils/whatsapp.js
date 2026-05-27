import { siteInfo } from '../data/siteInfo';

export function buildWhatsAppLink(message) {
  return `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

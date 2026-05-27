import { useEffect } from 'react';
import { setPageMeta } from '../../utils/seo';

export default function SEO({ title, description }) {
  useEffect(() => {
    setPageMeta(title, description);
  }, [title, description]);

  return null;
}

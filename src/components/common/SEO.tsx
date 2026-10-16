import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { BlogPost } from '@/types';

interface SEOProps { title: string; description: string; image?: string; article?: BlogPost; noindex?: boolean }

export function SEO({ title, description, image = '/images/cloud.webp', article, noindex = false }: SEOProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    const origin = (import.meta.env.VITE_SITE_URL || 'https://sahim.dev').replace(/\/$/, '');
    const url = `${origin}${pathname}`;
    const cover = new URL(image, origin).href;
    document.title = title;
    const set = (key: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let node = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!node) { node = document.createElement('meta'); node.setAttribute(attr, key); document.head.append(node); }
      node.content = content;
    };
    set('description', description);
    set('robots', noindex ? 'noindex, follow' : 'index, follow');
    set('og:title', title, true); set('og:description', description, true);
    set('og:url', url, true); set('og:image', cover, true);
    set('og:type', article ? 'article' : 'website', true);
    set('twitter:card', 'summary_large_image'); set('twitter:title', title);
    set('twitter:description', description); set('twitter:image', cover);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = url;
    document.getElementById('page-schema')?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json'; script.id = 'page-schema';
    script.textContent = JSON.stringify(article ? {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
      description, image: cover, datePublished: article.date, dateModified: article.date,
      author: { '@type': 'Person', name: 'Sahim Sakir', url: origin },
      mainEntityOfPage: url, keywords: article.tags.join(', '), articleBody: article.content.join('\n'),
    } : { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url });
    document.head.append(script);
    return () => script.remove();
  }, [title, description, image, article, pathname, noindex]);
  return null;
}

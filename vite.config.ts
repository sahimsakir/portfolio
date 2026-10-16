import { defineConfig, loadEnv } from 'vite';
import { blogPosts } from './src/data/blog';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const origin = (loadEnv(mode, process.cwd(), '').VITE_SITE_URL || 'https://sahim.dev').replace(/\/$/, '');
  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
  return {
  plugins: [react(), {
    name: 'static-route-seo',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') return;
      const routes = [{ path: '/', title: 'Sahim Sakir — Senior Software Engineer', description: 'Laravel, PHP, AWS and Docker engineering by Sahim Sakir in Dhaka, Bangladesh.', image: '/images/cloud.webp', post: undefined }, { path: '/blog', title: 'Backend & Cloud Engineering Blog — Sahim Sakir', description: 'Practical engineering notes on Laravel performance, AWS delivery and database synchronization.', image: '/images/cloud.webp', post: undefined }, ...blogPosts.map(post => ({ path: `/blog/${post.slug}`, title: `${post.title} — Sahim Sakir`, description: post.excerpt, image: post.coverImage, post }))];
      const template = String(index.source);
      for (const route of routes) {
        let html = template.replaceAll('https://sahim.dev', origin).replace(/<title>.*?<\/title>/s, `<title>${escape(route.title)}</title>`)
          .replace(/<meta\s+(?:name="(?:description|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/gs, '');
        const schema = route.post ? { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: route.post.title, description: route.description, image: origin + route.image, datePublished: route.post.date, author: { '@type': 'Person', name: 'Sahim Sakir', url: origin }, mainEntityOfPage: origin + route.path, keywords: route.post.tags.join(', ') } : null;
        const metadata = `<link rel="canonical" href="${origin}${route.path}"/><meta name="description" content="${escape(route.description)}"/><meta property="og:type" content="${route.post ? 'article' : 'website'}"/><meta property="og:title" content="${escape(route.title)}"/><meta property="og:description" content="${escape(route.description)}"/><meta property="og:url" content="${origin}${route.path}"/><meta property="og:image" content="${origin}${route.image}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(route.title)}"/><meta name="twitter:description" content="${escape(route.description)}"/><meta name="twitter:image" content="${origin}${route.image}"/>${schema ? `<script id="page-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}`;
        html = html.replace('</head>', metadata + '</head>');
        const content = route.post ? `<article><h1>${escape(route.post.title)}</h1>${route.post.content.map(text => text.startsWith('## ') ? `<h2>${escape(text.slice(3))}</h2>` : `<p>${escape(text)}</p>`).join('')}</article>` : `<h1>${escape(route.title)}</h1><p>${escape(route.description)}</p>${blogPosts.map(post => `<p><a href="/blog/${post.slug}">${escape(post.title)}</a></p>`).join('')}`;
        html = html.replace('<div id="root"></div>', `<div id="root"></div><noscript>${content}</noscript>`);
        if (route.path === '/') index.source = html;
        else this.emitFile({ type: 'asset', fileName: `${route.path.slice(1)}/index.html`, source: html });
      }
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${origin}${route.path}</loc></url>`).join('')}</urlset>` });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` });
    },
  }],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
};
});

export const NAV_LINKS = [
  { label: 'about', href: '#about', type: 'anchor' },
  { label: 'skills', href: '#skills', type: 'anchor' },
  { label: 'experience', href: '#experience', type: 'anchor' },
  { label: 'projects', href: '#projects', type: 'anchor' },
  { label: 'education', href: '#education', type: 'anchor' },
  { label: 'blog', href: '/blog', type: 'route' },
  { label: 'contact', href: '#contact', type: 'anchor' },
] as const;

export const SITE = {
  name: 'Sahim Sakir',
  domain: 'sahim.dev',
};

// PLACEHOLDER: create a free account at https://emailjs.com and replace these
// with your real Service ID, Template ID and Public Key to enable the contact form.
export const EMAILJS_CONFIG = {
  serviceId: 'PLACEHOLDER_SERVICE_ID',
  templateId: 'PLACEHOLDER_TEMPLATE_ID',
  publicKey: 'PLACEHOLDER_PUBLIC_KEY',
};

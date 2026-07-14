# Sahim Sakir — Portfolio

A premium, dark-themed portfolio built with React 19, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## ⚠️ Placeholders to replace before launch

This site was generated from a resume that didn't include a dedicated **Projects** section,
photos, logos, or several other assets. Everything below is a placeholder — search the
codebase for `PLACEHOLDER` and `isPlaceholder` to find every instance.

| Asset | Location | Notes |
|---|---|---|
| Profile photo | `src/assets/images/profile-placeholder.svg` → replace with `profile-photo.jpg` | Update `personal.photo` in `src/data/resume.ts` |
| Projects (4) | `src/data/resume.ts` → `projects` array | Titles, descriptions, tech, GitHub/demo links, screenshots are placeholders |
| Project screenshots | `src/assets/images/project-*-placeholder.svg` | Replace with real screenshots |
| Company logos (4) | `src/assets/images/logo-*-placeholder.svg` | JB Connect, AdPlay, Nvisio, Banglamark |
| Achievement stats | `src/data/resume.ts` → `achievements` | Estimated from resume timeline — verify real numbers |
| Certification issuers | `src/data/resume.ts` → `certifications` | A few issuing bodies weren't listed on the resume |
| EmailJS credentials | `src/constants/index.ts` → `EMAILJS_CONFIG` | Create a free account at emailjs.com |
| Domain / OG URL | `index.html`, `public/sitemap.xml`, `public/robots.txt` | Currently set to `sahimsakir.dev` |
| Favicon / OG cover | `public/favicon.svg`, `public/og-cover.svg` | Simple generated marks — swap for real branding if desired |

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router · React Hook Form ·
EmailJS · Lucide Icons · React Icons (brand marks) · General Sans + JetBrains Mono

## Project structure

```
src/
 ├── assets/        static images (currently placeholders)
 ├── components/
 │   ├── common/    Loader, SEO, ScrollToTop, ErrorBoundary, etc.
 │   ├── layout/    Header, Footer, Layout
 │   ├── sections/  Hero, About, Skills, Experience, Projects, etc.
 │   └── ui/        Button, Card, Badge, SectionHeading
 ├── pages/         Home, NotFound
 ├── hooks/         useScrollProgress, useMousePosition, useActiveSection
 ├── context/       ThemeContext (dark/light)
 ├── animations/    Framer Motion variants
 ├── data/          resume.ts — single source of truth for all content
 ├── constants/     nav links, EmailJS config
 ├── services/      emailService.ts
 └── types/         shared TypeScript interfaces
```

## Design notes

Redesigned around Linear / Raycast / Vercel-style product aesthetics: near-black canvas
(`#0A0A0C`), an indigo → cyan gradient accent (`#6366F1` → `#22D3EE`), refined glassmorphism
cards with a subtle hover-lift, and General Sans (display/body) paired with JetBrains Mono
(labels, code, technical values). A light mode toggle is available in the header.

Signature motifs:
- **kbd-style section labels** — small pulsing dot + tracked uppercase text, replacing generic section headers
- **Percentage-based skills dashboard** — animated circular rings for featured skills, animated linear bars for the full category breakdown
- **Engineer-themed preloader** — a simulated build pipeline (`git commit` → `npm install` → compile → test → deploy → ✓) instead of a generic spinner
- **Rotating hero titles** + floating tech-stack icons + a live "status card" mockup in place of a literal terminal window
- Ripple micro-interaction on primary buttons, hover-lift on every card, image zoom on project thumbnails


# Sahim Sakir — Portfolio

React 19, TypeScript, Vite, Tailwind CSS and Framer Motion portfolio with selected project contributions and an engineering blog.

## Development

```sh
npm ci
npm run dev
npm run build
npm run lint
npm run preview
```

## Configuration

Set `VITE_SITE_URL` to the final public origin before building (defaults to the existing `https://sahim.dev`). The build generates canonical and social metadata, article schema, individual blog HTML files, sitemap and robots.txt. Serve the generated route directories before applying an SPA fallback for unknown routes. Client-side unknown routes show a noindex 404; configure real HTTP 404 responses on your host as appropriate.

The contact form opens the visitor's email app by default. Optional direct delivery requires all three variables: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Never place private credentials in Vite environment variables.

## Content

- `src/data/resume.ts`: biography, career, education, skills and project case studies.
- `src/data/blog.ts`: articles, ISO publication dates, tags and official reference links.
- `public/images/project-ui-*.webp`: generated UI concept previews for project cards and dialogs, with fictional demo data; available at 1280px and 640px.
- `public/images/`: generated concept artwork in 1280px and 640px WebP versions. These are illustrations, not screenshots of employer systems. Private projects intentionally have no invented demo or repository links.
- `public/resume.pdf`: existing downloadable resume, retained as provided. Review its contents independently before publishing.

New blog entries automatically receive build-time HTML metadata and sitemap entries. The article body includes a no-JavaScript fallback; the interactive application still renders on the client.

## Browser checks

```sh
npx playwright install chromium
npm run dev -- --host 127.0.0.1
node scripts/check-ui.mjs
```

The browser script checks home, blog and article layouts at 320, 390, 768, 1024 and 1440px; image loading; featured article search; and Escape dismissal for project dialogs. Run it against the local development server.

## Artwork provenance

Generated using the built-in imagegen tool. Each prompt requested a wide 16:9, mobile-crop-safe editorial 3D illustration, dark navy with indigo/cyan light, no text or logos:

- `public/images/rtb.webp`: advertising exchange with luminous signals, glass servers and campaign panels.
- `public/images/sync.webp`: three database towers connected by light ribbons.
- `public/images/catalog.webp`: unbranded product tiles and a central browser-like frame.
- `public/images/cloud.webp`: sculptural cloud over server modules and a deployment path.

The corresponding `-640.webp` files provide smaller card images. Complete generation prompts are preserved in `docs/image-prompts.md`.

Project UI prompts are documented in `docs/project-ui-prompts.md`. The experience count is maintained in `src/data/resume.ts` and displayed consistently as 6+ years.

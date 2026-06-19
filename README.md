<<<<<<< HEAD
# Mater Dei Erudite School Website

## Run Locally

a. npm install

b. npm run dev

For the backend API, open a second terminal and run:

```bash
npm run dev:server
```

c. Open http://localhost:5173 in browser

d. Explain where to replace placeholder content

Replace placeholder content in these places:

- `src/data/news.json` for blog/news posts.
- `src/data/events.json` for school events.
- `src/data/gallery.json` for gallery photos and videos.
- `src/data/faqs.json` for FAQ questions and answers.
- `src/data/reviews.json` for parent review placeholders.
- `src/data/siteInfo.js` for school contact details, WhatsApp number, SEO details, bank details, and Google Maps embed.
- `public/images/` for the logo, school photos, principal photo, and gallery images.
- `public/sitemap.xml` and `public/robots.txt` when the final domain name is ready.

The GitHub Pages base path is set in `vite.config.js` as `/school-website/`. Change it there if your repository name changes.

## Admin Backend

The Express backend lives in `server/`.

- Login API: `POST /api/auth/login`
- Register API: `POST /api/auth/register`
- Upload API: `POST /api/upload/gallery`, `POST /api/upload/news`, `POST /api/upload/logo`
- Uploaded files are saved in `public/uploads/<folder>` and served from `/uploads/<folder>/<filename>`.
- The default admin login email is `principal@materdei.local`.
- The default password is `@principal codex`.
=======
# school-website
React + Vite school website with a client-side admin panel for managing students, teachers, events, and site content using local Storage
>>>>>>> 1322a63b3161fe187cbd900dab0a2bb9c99a8e4d

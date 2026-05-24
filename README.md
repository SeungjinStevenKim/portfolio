# Seungjin Kim's Portfolio

A static, responsive portfolio built with React, Vite, and Tailwind CSS.

## Live site

- **GitHub Pages**: https://seungjinstevenkim.github.io/portfolio/
- (Legacy Vercel deployment may still exist from an earlier setup.)

## Tech stack

- React 18, Vite, Tailwind CSS, React Router (HashRouter)
- Content: JSON files in `client/src/data/` (no backend required for the live site)

## Quick start (local)

**Prerequisites:** Node.js 18+

```bash
npm run install:all
npm run dev
```

Open http://localhost:5173

Preview the production build:

```bash
npm run build
npm run preview
```

## Updating content

Edit these files and push to `main`:

| File | Content |
|------|---------|
| [`client/src/data/experience.json`](client/src/data/experience.json) | Work history |
| [`client/src/data/projects.json`](client/src/data/projects.json) | Projects |
| [`client/src/components/AboutSection.jsx`](client/src/components/AboutSection.jsx) | About text and skills |

Optional: add a profile photo at [`client/public/profile.jpg`](client/public/profile.jpg).

## GitHub Pages deployment

Deployments run automatically on push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**One-time setup:** Repository → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.

The Vite `base` path is `/portfolio/` for this repository. If you rename the repo, update `repoName` in [`client/vite.config.js`](client/vite.config.js).

## Project structure

```
portfolio/
├── client/                 # React app (deployed to GitHub Pages)
│   ├── src/
│   │   ├── data/           # experience.json, projects.json
│   │   ├── components/
│   │   └── pages/Home.jsx
│   └── public/
├── server/                 # Legacy Express + MySQL API (not used by static site)
├── docker-compose.yml      # Legacy local MySQL (optional)
└── .github/workflows/      # GitHub Pages CI
```

## Legacy backend

The [`server/`](server/) folder is kept for reference. It powered an earlier dynamic version with MySQL and an admin panel. The current site does not require running the server or database.

To run the old stack locally, see `server/.env.example` and `server/database/schema.sql`.

---

**Built by Seungjin Kim**

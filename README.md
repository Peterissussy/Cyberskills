# Cyberskills

This repository contains two separate web projects, both deployed from the repository root.

## Project structure

```text
Cyberskills/
├── main/       # Cyberskills landing page (HTML, CSS, JavaScript)
├── robot/      # Robot Fight (React, TypeScript, Vite)
├── package.json
└── vercel.json # Deployment and URL routing
```

## URLs

| Project | Production URL | Source |
| --- | --- | --- |
| Cyberskills website | `https://cyberskills.li/main` | `main/` |
| Robot Fight | `https://cyberskills.li/robot` | `robot/` |

The repository root is only the shared project/deployment root. The Cyberskills website is no longer served from `/`.

## Cyberskills website

The landing page is a static site:

```text
main/
├── index.html
├── form.html
├── css/
├── js/
└── assets/
```

## Robot Fight

Robot Fight is a standalone React application:

```text
robot/
├── src/        # Application source
├── dist/       # Production build
├── package.json
└── vite.config.ts
```

Run it locally:

```bash
npm install
npm --prefix robot run dev
```

Build it for production:

```bash
npm run build
```

The production build keeps `/robot/` as its asset base. Vercel routing for both projects is defined in the root-level `vercel.json`.

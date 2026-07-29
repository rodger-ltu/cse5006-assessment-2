# TONDAW

TONDAW (Timely Online Notices — Distributed Announcement Web) is a frontend
prototype that brings announcements from university subjects and services into
one clear, scannable feed. It was created for CSE5006 Assessment 1 and uses
sample TypeScript data in place of the RSS server planned for Assessment 2.

## Technology

- Next.js App Router
- React
- TypeScript
- CSS Modules and shared CSS theme variables
- Browser `localStorage` for interface preferences

## Run the project

Install dependencies after cloning the repository:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```powershell
npm run lint
npm run build
```

## Main features

- Reusable React components for the application shell, feed and preferences
- Home, Feeds, About, Settings and dynamic announcement-detail pages
- Day, Night, Ocean and Terminal themes
- Selectable top or side navigation with a responsive hamburger menu
- Saved theme, navigation and welcome-guide preferences
- Typed sample announcements ready to be replaced by Assessment 2 API data
- Keyboard navigation, semantic landmarks, breadcrumbs and visible focus states

## Project structure

- `app/` — routes, page metadata and global theme variables
- `components/` — reusable content, feed, layout and preference components
- `data/` — typed frontend sample announcements
- `docs/` — staged development decisions for the written and video justification

## Assessment scope

Assessment 1 is frontend only. It does not process live RSS feeds, use a
database or provide backend APIs. The later project stage can replace the
sample data while retaining the current component interface.

Created by Rodger Herbert, student number 22838962.

## GitHub repository

https://github.com/rodger-ltu/cse5006-assessment-1

# TONDAW development log

This short log preserves the reasoning behind each staged Git commit and the
main points to cover in the assessment video and written justification.

## Stage 1 — Project foundation

- Created the project with the required `npx create-next-app .` workflow.
- Used the App Router, React, TypeScript and the recommended Next.js defaults.
- Recorded a clean baseline before changing the generated interface.

## Stage 2 — Reusable application shell

- Added separate header, navigation, footer, page-header and content components.
- Kept route files under `app/` and reusable interface code under `components/`.
- Used a top navigation bar because it is explicit in the rubric and prominent
  in the lecturer's examples. A selectable side layout is planned for Stage 6.
- Included the required assessment title, student name and student number.

## Stage 3 — Typed announcement feed

- Replaced repeated page markup with a typed announcement array rendered by
  reusable `AnnouncementFeed` and `AnnouncementCard` components.
- Used university subjects, internships, events and volunteering as the sample
  content because the workshop clarified the intended feed purpose.
- Chose the name TONDAW: Timely Online Notices — Distributed Announcement Web.
- Considered CAMP (Campus Announcements and Messages Portal) and CALF (Campus
  Announcements Live Feed), then selected TONDAW because it describes both the
  user benefit and the planned distributed feed structure.
- Kept the data separate so an Assessment 2 API can replace it without
  redesigning the interface components.

## Stage 4 — LMS-style latest announcements and dynamic pages

- Added a compact latest-announcements panel to the right of the Home content,
  reflecting the LMS panel demonstrated in the workshop without copying Moodle.
- Kept the detailed feed cards on the Feeds page so users can scan summaries,
  sources, authors and dates before opening a complete announcement.
- Added one reusable dynamic route for all announcement detail pages rather than
  creating a separate hard-coded page for every item.
- Added breadcrumbs to clarify location and provide a direct route back.

## Stage 5 — Themes and saved preference

- Added Day, Night, Ocean and Terminal themes using shared CSS variables so the
  same components remain reusable in every visual mode.
- Used a React context provider for theme state instead of passing the setting
  through every page and component.
- Used native radio controls, visible focus indicators and descriptive labels
  so theme selection works with keyboard and assistive technology.
- Saved the selected theme in `localStorage` so the preference survives reloads
  without requiring an Assessment 2 database or account system.

## Stage 6 — Responsive and selectable navigation

- Added an animated hamburger button for compact screens, including transformed
  icon lines, `aria-expanded`, keyboard focus and Escape-key closing.
- Added top and left-side navigation layouts to resolve the tension between the
  rubric's top-navigation examples and the Inoreader-inspired side navigation.
- Integrated the desktop side navigation as a full-height visual rail rather
  than a small floating card, making it feel like part of the application shell.
- Kept the header, navigation and footer visible while the central page content
  scrolls, matching the behaviour expected from an RSS reader application.
- Reused the preferences context and `localStorage` so the selected layout is
  restored without duplicating state logic.
- Kept the compact hamburger behaviour for both layouts so navigation remains
  usable when a permanent side panel would make the content too narrow.

## Video points retained for later

- Initial RSS-reader research found several email-like or visually plain
  interfaces; Inoreader provided the cleanest visual inspiration.
- The top navigation follows the assessment emphasis and lecture examples. The
  layout preference also retains the left-side navigation inspiration.
- The compact Home panel and detailed Feeds page serve different scanning needs.
- Saved preferences demonstrate React state and browser persistence.

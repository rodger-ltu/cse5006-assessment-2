# TONDAW assessment video script

The red **ACTION** lines are reminders for the recording. Do not read them aloud.

## Introduction

🔴 **ACTION:** Start with your camera visible. Hold your student ID beside your face.

Hi, I'm Rodger Herbert, and my student number is 22838962. This is my frontend
design and usability project for CSE5006 Assessment 1.

The application is called TONDAW, which stands for Timely Online Notices —
Distributed Announcement Web. This assessment is frontend only, so the notices
are sample TypeScript data. The RSS server and API work belong in the later
assessment stages.

🔴 **ACTION:** Lower your ID. Share the browser showing the Home page.

## What the application is for

The written brief describes an RSS-to-LMS project, but the workshop made the
actual use case much clearer to me. The idea is to bring notices from university
subjects and services into one place, instead of expecting students to find
everything across different subjects and emails.

I looked at a few RSS readers before designing this. Some looked like email
clients and some were very plain. I liked Inoreader's clean layout and its side
navigation. At the same time, the assignment examples focused on a top navbar,
so I decided to support both layouts and let the user choose between them.

This first panel is a short welcome guide. It explains the main pages without
filling the screen with instructions every time the application opens.

🔴 **ACTION:** Click `Start using TONDAW`.

Once the guide is dismissed, the Home page shows two different sources. Current
subject is for CSE5006 notices. Other subjects and services is for things such as
internships, cybersecurity updates, hackathons and student support.

I originally used Featured and Latest as the two labels, but that didn't properly
describe the difference. Latest is just an order by date. The new labels explain
where each notice came from, which I think is much clearer.

I kept the heading as "Your announcements", but made it smaller, centred it over
the panels and moved the content higher. The colour comes from the shared CSS
variable called `--accent-strong`. Each theme gives that variable a different
value, so the heading changes correctly with Day, Night, Ocean and Terminal. I
felt that was cleaner than writing a separate heading rule for every theme.

## Pages and component structure

🔴 **ACTION:** Switch to VS Code. In Explorer, open `app`, then click `page.tsx`.

This is the Home page route. It finds the current-subject notice, separates the
other notices, and passes them into reusable components. The route file stays
fairly short because it assembles the page rather than containing the entire
interface.

🔴 **ACTION:** Under `app`, open `feeds`, then click `page.tsx`.

This is the Feeds page. It supports All announcements, Current subject, and
Other subjects and services. The selected filter decides which data is passed
to the shared AnnouncementFeed component.

🔴 **ACTION:** Under `app`, briefly click the `about/page.tsx` and `settings/page.tsx` files.

About explains the project and identifies my work. Settings assembles the theme,
navigation and welcome-guide controls. These files are default exports because
Next.js requires one default page component for each route. The reusable
components themselves use named exports.

The main point here is that the `app` folder defines the routes, while the
`components` folder holds the reusable interface parts. That keeps the React
architecture modular instead of turning each page into a large block of JSX.

## Sample data and feed components

🔴 **ACTION:** In Explorer, open `data`, then click `announcements.ts`.

This file defines the Announcement type and contains the sample data array. Each
notice follows the same structure: title, date, source, author, category,
summary, full content and its source group.

Keeping the data separate from the interface is important for the next stage.
The sample array can later be replaced by API or RSS data without rebuilding all
the cards and pages.

🔴 **ACTION:** Open `components`, then `feed`, then click `AnnouncementFeed.tsx`.

AnnouncementFeed maps over the selected data and creates an AnnouncementCard for
each record. The slug is used as React's unique key. This means five notices are
not five separately copied blocks of JSX.

🔴 **ACTION:** Click `AnnouncementCard.tsx`.

AnnouncementCard receives one announcement through its props and displays the
date, source, author, summary and Read more link in a consistent format. The same
card is reused for the Current subject panel on Home, so that markup is not
duplicated either.

🔴 **ACTION:** Click `announcementDate.ts`.

This small helper handles the long and compact date formats in one place. I
added it during the code audit after noticing that two components were doing the
same formatting work.

## Using the feed and detail pages

🔴 **ACTION:** Return to the browser. Click `Feeds`, then demonstrate the three filters.

All announcements combines everything. Current subject shows CSE5006, and Other
subjects and services shows the notices coming from elsewhere in the university.
The same cards are reused for all three views; only the supplied data changes.

🔴 **ACTION:** Open a notice with `Read more`, then use its Back link.

Read more opens the complete notice on a dynamic page. The Back link remembers
where the notice was opened, so it can return to Home, All announcements, Current
subject, or Other subjects and services rather than always sending the user to
one fixed page.

🔴 **ACTION:** In VS Code, open `app`, `feeds`, `[slug]`, then `page.tsx`.

This one dynamic route handles every announcement. The slug in the address finds
the matching item in the data. I don't need a separate manually written page for
every notice. This routing is provided by the Next.js App Router, so I haven't
added React Router as another dependency.

The central content area scrolls independently, while the header, navigation
and footer remain available. That avoids making someone scroll through weeks of
notices just to reach the main navigation or footer.

## Themes and navigation choices

🔴 **ACTION:** Return to the browser. Open `Settings` and demonstrate Day, Night, Ocean and Terminal.

The four themes change the same application components. Day and Night provide
the basic light and dark choices. Ocean and Terminal show that the shared theme
system can support more than two appearances without duplicating every
stylesheet.

🔴 **ACTION:** Select Top navigation, then Side navigation. Refresh the page to show the selection remains.

I was genuinely split between top and side navigation, so I made it a saved user
preference. The theme, navigation layout and welcome-guide choice are stored in
the browser and restored after a refresh.

🔴 **ACTION:** In VS Code, open `components`, `preferences`, then `PreferencesProvider.tsx`.

PreferencesProvider manages those choices in one shared place. This is React
state connected to local storage. It demonstrates persistence on the frontend
without pretending that Assessment 1 already has a database.

🔴 **ACTION:** Open `app`, then click `globals.css`.

The four theme sections are here. They define shared variables for the
background, surfaces, headings, text, borders, focus ring and accent colours.
The component styles use those variables, so changing the theme updates the
whole interface through the CSS cascade.

## Responsive behaviour and accessibility

🔴 **ACTION:** Make the browser window narrow. Open and close the hamburger menu.

On a narrow screen, either desktop navigation choice becomes a hamburger menu.
It reports whether it is open, closes after a link is selected, and can also be
closed with Escape.

🔴 **ACTION:** Press Tab until the Skip to main content link and keyboard focus are visible.

I also included semantic headings and page sections, keyboard controls, visible
focus, ARIA labels, readable contrast, breadcrumbs and a Skip to main content
link. The consistent position of dates and source information also makes the
feed easier to scan.

## AI and Git workflow

🔴 **ACTION:** Switch to VS Code and click Source Control. Then open the terminal and run `git log --oneline --decorate --graph --all`.

Full AI use is allowed for this assessment. I used Codex conversationally to
create and edit the project files. I reviewed each visual result, asked for
specific corrections, checked the code structure, and ran ESLint, TypeScript
and production-build checks. I will include the required AI acknowledgement.

I built the project in stages and used Git commits as checkpoints: the Next.js
foundation, reusable application shell, announcement feed, detail pages,
themes, responsive navigation, accessibility and finalisation. I also used
feature branch names to show which stage each checkpoint belonged to.

The history is mostly a straight line because I completed and reviewed one stage
before starting the next. For this individual project, that was easier to follow
than creating artificial parallel branches and merging them for no practical
reason.

## Conclusion

🔴 **ACTION:** Return to the TONDAW Home page.

So, the finished Assessment 1 project is a component-based React frontend for
university notices. It has typed sample data, reusable feed components, dynamic
detail pages, responsive navigation, four persistent themes and accessibility
features. The current version stays within the frontend brief, while its data
structure is ready to be replaced by real RSS and API data later.

Thanks for watching.

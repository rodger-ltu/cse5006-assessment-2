# TONDAW assessment video — four recording sections


## Section 1 — Introduction, purpose and workflow

🔴 **ACTION:** Start recording with your camera visible. Hold your student ID beside your face.

Hi, I’m Rodger Herbert, and my student number is 22838962. This is my CSE5006 Assessment 2 project, covering backend APIs, database persistence and Docker deployment.

The application is called TONDAW, Timely Online Notices—Distributed Announcement Web.

🔴 **ACTION:** Lower your student ID and share the online TONDAW homepage.

TONDAW brings announcements from different university subjects and services into one interface. Assessment 1 established the React and Next.js frontend. Assessment 2 extends that work into a full-stack web application.

The displayed announcements are now retrieved from an SQLite database through Next.js APIs. Prisma provides the Object-Relational Mapping layer between the server code and the database.

The application now includes database-backed announcement management, CRUD APIs, an RSS Server and RSS Client, health and request-monitoring endpoints, and a reproducible Docker deployment.

🔴 **ACTION:** Briefly show the GitHub repository or VS Code Source Control.

git branch --show-current
git status --short
git log --oneline --decorate --graph --all -15

I followed a repeated development workflow. For each major feature, I created a separate Git branch, implemented the feature, tested it using ESLint, TypeScript and production builds, committed it with a descriptive message, pushed it to GitHub and then merged it into the clean main branch.

This produced recoverable checkpoints while allowing the database, APIs, RSS functionality and Docker deployment to be developed and tested independently.

🔴 **ACTION:** Return to the TONDAW homepage.

In the next section, I’ll demonstrate the Prisma database structure and follow a CRUD operation from the browser interface through the API and into SQLite.

🔴 **ACTION:** Stop recording Section 1.

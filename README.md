# TONDAW — CSE5006 Assessment 2

TONDAW stands for **Timely Online Notices — Distributed Announcement Web**.
It extends the Assessment 1 frontend prototype into a full-stack,
database-backed RSS announcement platform for CSE5006 Cloud-Based Web
Application Assessment 2.

**Student:** Rodger Herbert

**Student ID:** 22838962

**Repository:** https://github.com/rodger-ltu/cse5006-assessment-2

## Implemented functionality

- Responsive Next.js, React and TypeScript interface
- SQLite database managed through Prisma ORM
- Feed, announcement, author and request-metric database models
- CRUD APIs for feeds and announcements
- Browser interface for creating, editing and deleting announcements
- RSS server that generates RSS 2.0 XML from database records
- RSS client that retrieves and displays the generated feed
- Health, request-count and database-statistics endpoints
- Server dashboard that presents operational information and endpoint links
- Docker Compose deployment with a persistent named volume
- Deployment and verification on an AWS EC2 instance

The Manage page edits announcements. Feed CRUD is available through the API.
The demonstration feeds are hosted by TONDAW; importing arbitrary external RSS
feeds is outside the Assessment 2 scope.

## System architecture

```text
Browser interface
       |
       v
Next.js pages and Route Handlers
       |
       v
Prisma ORM
       |
       v
SQLite database

Database announcements
       |
       v
/api/rss (RSS 2.0 XML)
       |
       v
TONDAW RSS client
```

The pages are the visible client and server-rendered interface. Route Handlers
provide the JSON, RSS and operational APIs. Prisma maps TypeScript operations to
the SQLite database. In Docker, the database is stored in a named volume so its
records survive container replacement.

## Database model

- `Feed` identifies a current-subject or other-subject/service channel.
- `Announcement` stores a notice and belongs to one feed and one author.
- `Author` stores the notice author and optional unique email address.
- `RequestMetric` records route, method, client, status and response duration.

The Prisma schema is in `prisma/schema.prisma`. Versioned migrations are in
`prisma/migrations`, and `prisma/seed.ts` creates repeatable demonstration data.

## Local installation

Requirements: Node.js 22 and npm.

```powershell
git clone https://github.com/rodger-ltu/cse5006-assessment-2.git
cd cse5006-assessment-2
Copy-Item .env.example .env
npm ci
npm run db:deploy
npm run db:seed
npm run dev
```

Open http://localhost:3000. The development database is `prisma/dev.db` and is
ignored by Git.

Useful database commands:

```powershell
npm run db:generate
npm run db:migrate
npm run db:deploy
npm run db:seed
npm run db:studio
```

`db:migrate` creates a migration while developing. `db:deploy` applies existing
migrations in a deployment without modifying the schema history.

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Latest current-subject notices and other university notices |
| `/feeds` | Filterable database-backed announcement list |
| `/feeds/[slug]` | Full announcement detail |
| `/manage` | Announcement create, read, update and delete interface |
| `/rss-client` | Client view of the generated RSS feed |
| `/server` | Operational dashboard and server endpoint links |
| `/settings` | Theme and navigation preferences |
| `/about` | Project information and assessment video area |

## API routes

| Method and endpoint | Purpose |
| --- | --- |
| `GET /api/feeds` | List feeds and announcement counts |
| `POST /api/feeds` | Create a feed |
| `GET /api/feeds/[id]` | Read one feed |
| `PUT /api/feeds/[id]` | Update one feed |
| `DELETE /api/feeds/[id]` | Delete one feed and its announcements |
| `GET /api/announcements` | List announcements with feed and author data |
| `POST /api/announcements` | Create an announcement |
| `GET /api/announcements/[id]` | Read one announcement |
| `PUT /api/announcements/[id]` | Update one announcement |
| `DELETE /api/announcements/[id]` | Delete one announcement |
| `GET /api/rss` | Generate the combined RSS 2.0 document |
| `GET /api/rss?feed=[slug]` | Generate one active feed's RSS document |
| `GET /api/health` | Report service and database health |
| `GET /api/count` | Aggregate recorded API requests |
| `GET /api/stats` | Report feed, announcement, author and request statistics |

Successful JSON CRUD responses use a consistent `{ data, meta }` structure.
Validation and missing-record responses use `{ error: { code, message } }` with
an appropriate HTTP status.

## Docker deployment

Build and start the application from the repository root:

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100 tondaw
curl -i http://localhost:3000/api/health
```

The container applies committed Prisma migrations, loads repeatable sample data
and starts the optimized Next.js server. The `tondaw-data` named volume stores
`/app/data/tondaw.db`, keeping database changes after a container is recreated.

For the AWS EC2 deployment, the repository was cloned onto an Amazon Linux 2023
instance and the same Docker Compose commands were run. Inbound TCP port 3000
was restricted to the demonstrator's public IP in the EC2 security group. The
application was then available at `http://EC2_PUBLIC_IP:3000`.

## Verification

Run these checks before deployment or submission:

```powershell
npm run lint
npx prisma validate
npx tsc --noEmit --incremental false
npm run build
```

The Docker verification checks the running container, startup logs,
`/api/health`, CRUD behaviour and persistence after container recreation.

## Git workflow

Development used a repeated feature workflow:

1. Create a feature branch from the current `main` branch.
2. Implement one bounded component of the assessment.
3. Run lint, type, build and relevant API/browser checks.
4. Commit and push the feature branch.
5. Merge the verified branch into `main`.

The repository history therefore records the database, CRUD APIs, operational
endpoints, frontend integration, RSS integration, Docker deployment,
documentation and final-polish stages separately.

## Known limitations

- Authentication and role-based administration are not implemented.
- Feed creation is exposed through the API rather than a dedicated browser form.
- TONDAW publishes its own database records; external RSS import is a future
  enhancement.
- SQLite suits this single-instance assessment deployment. A multi-instance
  production service would use a shared database such as PostgreSQL.

## References

Docker, Inc. (n.d.). *Docker Compose*. Retrieved August 11, 2026, from
https://docs.docker.com/compose/

GitHub, Inc. (n.d.). *About branches*. Retrieved August 11, 2026, from
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches

OpenJS Foundation. (n.d.). *Node.js documentation*. Retrieved August 11, 2026,
from https://nodejs.org/docs/latest/api/

Prisma Data, Inc. (n.d.). *Prisma ORM documentation*. Retrieved August 11,
2026, from https://www.prisma.io/docs/orm

RSS Advisory Board. (2009, March 30). *RSS 2.0 specification*.
https://www.rssboard.org/rss-specification

SQLite Consortium. (n.d.). *About SQLite*. Retrieved August 11, 2026, from
https://www.sqlite.org/about.html

Vercel. (n.d.). *Next.js documentation*. Retrieved August 11, 2026, from
https://nextjs.org/docs

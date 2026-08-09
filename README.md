# TONDAW — CSE5006 Assessment 2

TONDAW stands for Timely Online Notices — Distributed Announcement Web.

This Assessment 2 project extends the frontend prototype developed for Assessment 1 into a database-backed RSS announcement platform.

## Starting point

The initial codebase contains the Assessment 1 frontend:

- Home dashboard
- Announcement feeds and filtering
- Announcement details
- Responsive navigation
- Display preferences
- Sample TypeScript announcement data

Assessment 2 functionality will be introduced and tested incrementally.

## Planned Assessment 2 functionality

- Prisma database access
- SQLite persistent storage
- Feed, author and announcement models
- Announcement and feed CRUD APIs
- Announcement management interface
- RSS 2.0 server output
- RSS client integration
- Health and request-count endpoints
- Automated and end-to-end testing
- Docker containerisation
- AWS EC2 deployment

## Development workflow

Each component follows the same workflow:

1. Understand the requirement.
2. Implement the component locally.
3. Test the component.
4. Review the Git changes.
5. Commit and push the completed chunk.
6. Record evidence for final verification.
7. Deploy the completed application through Docker on AWS.

## Local development

Install the locked dependencies:

```bash
npm ci
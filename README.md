# TONDAW — CSE5006 Assessment 2

TONDAW stands for **Timely Online Notices — Distributed Announcement Web**.

This project extends the Assessment 1 frontend prototype into a full-stack, database-backed RSS announcement platform. It was developed for CSE5006 Cloud-Based Web Application Assessment 2.

**Student:** Rodger Herbert

**Student ID:** 22838962

**Repository:** https://github.com/rodger-ltu/cse5006-assessment-2

## Implemented functionality

- Responsive Next.js and React interface
- SQLite database managed through Prisma ORM
- Database models for feeds, announcements, authors and request metrics
- CRUD APIs for feeds and announcements
- Feed and announcement management interface
- RSS server that generates RSS XML
- RSS client that retrieves and displays RSS content
- Health, request-count and database-statistics APIs
- Persistent Docker storage using a named volume
- Docker Compose deployment
- Deployment and testing on an AWS EC2 instance

## System architecture

The application follows this general flow:

```text
Browser interface
       |
       v
Next.js pages and API routes
       |
       v
Prisma ORM
       |
       v
SQLite database
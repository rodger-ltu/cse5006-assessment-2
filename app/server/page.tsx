import { PageHeader } from "@/components/layout/PageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import styles from "@/components/server/ServerTools.module.css";

export const dynamic = "force-dynamic";

export default async function ServerPage() {
  const [feeds, announcements, requests] = await Promise.all([
    prisma.feed.count({ where: { isActive: true } }),
    prisma.announcement.count(),
    prisma.requestMetric.count(),
  ]);

  return (
    <>
      <PageHeader breadcrumbs={[{ href: "/", label: "Home" }, { label: "Server" }]} title="RSS server" />
      <div className={styles.grid}>
        <section className={styles.panel}><h2>Active feeds</h2><p className={styles.value}>{feeds}</p></section>
        <section className={styles.panel}><h2>Published notices</h2><p className={styles.value}>{announcements}</p></section>
        <section className={styles.panel}><h2>Recorded requests</h2><p className={styles.value}>{requests}</p></section>
      </div>
      <nav className={styles.links} aria-label="Server endpoints">
        <Link href="/api/health">Health</Link><Link href="/api/count">Request count</Link>
        <Link href="/api/stats">Statistics</Link><Link href="/api/announcements">JSON API</Link>
        <Link href="/api/rss">RSS XML</Link>
      </nav>
    </>
  );
}

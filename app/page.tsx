import Link from "next/link";

import { ContentPanel } from "@/components/content/ContentPanel";
import { LatestAnnouncements } from "@/components/feed/LatestAnnouncements";
import { PageHeader } from "@/components/layout/PageHeader";
import { announcements } from "@/data/announcements";

import styles from "./page.module.css";

const pageLinks = [
  {
    href: "/feeds",
    title: "Feeds",
    description: "Browse sample announcements from multiple university sources.",
  },
  {
    href: "/about",
    title: "About",
    description: "Read about the project and its planned RSS-to-LMS workflow.",
  },
  {
    href: "/settings",
    title: "Settings",
    description: "Manage display and navigation preferences.",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Home"
        title="University announcements in one feed"
      />

      <div className={styles.homeLayout}>
        <ContentPanel title="Explore the application">
          <nav aria-label="Home page links">
            <ul className={styles.linkGrid}>
              {pageLinks.map((pageLink) => (
                <li key={pageLink.href}>
                  <Link className={styles.pageLink} href={pageLink.href}>
                    <span className={styles.linkTitle}>{pageLink.title}</span>
                    <span className={styles.linkDescription}>
                      {pageLink.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ContentPanel>

        <LatestAnnouncements announcements={announcements} />
      </div>
    </>
  );
}

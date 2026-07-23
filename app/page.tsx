import { LatestAnnouncements } from "@/components/feed/LatestAnnouncements";
import { HomePrimaryContent } from "@/components/home/HomePrimaryContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { announcements } from "@/data/announcements";

import styles from "./page.module.css";

export default function HomePage() {
  const featuredAnnouncement = announcements.at(-1) ?? announcements[0];

  return (
    <>
      <PageHeader
        eyebrow="Home"
        title="University announcement feed"
      />

      <div className={styles.homeLayout}>
        <HomePrimaryContent featuredAnnouncement={featuredAnnouncement} />

        <LatestAnnouncements announcements={announcements} />
      </div>
    </>
  );
}

import { OtherAnnouncementsPanel } from "@/components/feed/OtherAnnouncementsPanel";
import { HomePrimaryContent } from "@/components/home/HomePrimaryContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAnnouncements } from "@/lib/announcementRepository";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const announcements = await getAnnouncements();
  const currentSubjectAnnouncements = announcements.filter(
    (announcement) => announcement.sourceGroup === "current",
  );
  const otherAnnouncements = announcements.filter(
    (announcement) => announcement.sourceGroup === "other",
  );

  return (
    <>
      <PageHeader title="Announcements" />

      <div className={styles.homeLayout}>
        <HomePrimaryContent
          currentSubjectAnnouncements={currentSubjectAnnouncements}
        />

        <OtherAnnouncementsPanel announcements={otherAnnouncements} />
      </div>
    </>
  );
}

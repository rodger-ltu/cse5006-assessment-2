import { OtherAnnouncementsPanel } from "@/components/feed/OtherAnnouncementsPanel";
import { HomePrimaryContent } from "@/components/home/HomePrimaryContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAnnouncements } from "@/lib/announcementRepository";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const announcements = await getAnnouncements();
  const currentSubjectAnnouncement = announcements.find(
    (announcement) => announcement.sourceGroup === "current",
  );
  const otherAnnouncements = announcements.filter(
    (announcement) => announcement.sourceGroup === "other",
  );

  if (!currentSubjectAnnouncement) {
    return null;
  }

  return (
    <>
      <PageHeader title="Announcements" />

      <div className={styles.homeLayout}>
        <HomePrimaryContent
          currentSubjectAnnouncement={currentSubjectAnnouncement}
        />

        <OtherAnnouncementsPanel announcements={otherAnnouncements} />
      </div>
    </>
  );
}

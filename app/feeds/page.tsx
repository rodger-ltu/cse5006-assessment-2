import type { Metadata } from "next";

import { AnnouncementFeed } from "@/components/feed/AnnouncementFeed";
import { PageHeader } from "@/components/layout/PageHeader";
import { announcements } from "@/data/announcements";

export const metadata: Metadata = {
  title: "Feeds",
};

export default function FeedsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Feeds"
        title="Announcement feed"
        description="Announcements from different university sources will be presented here as a clear, scannable feed."
      />

      <AnnouncementFeed announcements={announcements} />
    </>
  );
}

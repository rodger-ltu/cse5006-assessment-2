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
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Feeds" },
        ]}
        title="All announcements"
      />

      <AnnouncementFeed announcements={announcements} />
    </>
  );
}

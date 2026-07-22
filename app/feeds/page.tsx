import type { Metadata } from "next";

import { ContentPanel } from "@/components/content/ContentPanel";
import { PageHeader } from "@/components/layout/PageHeader";

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

      <ContentPanel title="Feed structure">
        <p>
          Typed sample data and reusable announcement components are added in
          the next stage.
        </p>
      </ContentPanel>
    </>
  );
}

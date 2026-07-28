import type { Metadata } from "next";

import { AnnouncementFeed } from "@/components/feed/AnnouncementFeed";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  announcements,
  getAnnouncementsByFilter,
  type FeedFilter,
} from "@/data/announcements";

export const metadata: Metadata = {
  title: "Feeds",
};

type FeedsPageProps = {
  searchParams: Promise<{ filter?: string | string[] }>;
};

const filterLabels: Record<FeedFilter, string> = {
  all: "All announcements",
  current: "Current subject announcements",
  other: "Other subjects and services announcements",
};

function getSelectedFilter(value: string | string[] | undefined): FeedFilter {
  const filter = Array.isArray(value) ? value[0] : value;

  return filter === "current" || filter === "other" ? filter : "all";
}

export default async function FeedsPage({ searchParams }: FeedsPageProps) {
  const selectedFilter = getSelectedFilter((await searchParams).filter);
  const filteredAnnouncements = getAnnouncementsByFilter(selectedFilter);
  const counts = {
    all: announcements.length,
    current: getAnnouncementsByFilter("current").length,
    other: getAnnouncementsByFilter("other").length,
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Feeds" }]}
        title="Announcement feed"
      />

      <FeedFilters activeFilter={selectedFilter} counts={counts} />
      <AnnouncementFeed
        announcements={filteredAnnouncements}
        label={filterLabels[selectedFilter]}
        returnContext={selectedFilter}
      />
    </>
  );
}

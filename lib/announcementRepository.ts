import "server-only";

import type { Announcement as DatabaseAnnouncement } from "@prisma/client";

import type { Announcement, FeedFilter } from "@/data/announcements";
import { prisma } from "@/lib/prisma";

type AnnouncementRecord = DatabaseAnnouncement & {
  author: { name: string };
  feed: { name: string; sourceGroup: string };
};

export function toAnnouncement(record: AnnouncementRecord): Announcement {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    source: record.feed.name,
    sourceGroup: record.feed.sourceGroup === "current" ? "current" : "other",
    author: record.author.name,
    category: record.category,
    publishedAt: record.publishedAt.toISOString(),
    summary: record.summary,
    content: record.content.split("\n\n"),
    imageUrl: record.imageUrl ?? undefined,
    linkUrl: record.linkUrl ?? undefined,
  };
}

export async function getAnnouncements(filter: FeedFilter = "all") {
  const records = await prisma.announcement.findMany({
    where:
      filter === "all" ? undefined : { feed: { sourceGroup: filter } },
    include: { author: true, feed: true },
    orderBy: { publishedAt: "desc" },
  });

  return records.map(toAnnouncement);
}

export async function getAnnouncementBySlug(slug: string) {
  const record = await prisma.announcement.findUnique({
    where: { slug },
    include: { author: true, feed: true },
  });

  return record ? toAnnouncement(record) : null;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnnouncementDetail } from "@/components/feed/AnnouncementDetail";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  announcements,
  getAnnouncementBySlug,
} from "@/data/announcements";

type AnnouncementPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return announcements.map((announcement) => ({
    slug: announcement.slug,
  }));
}

export async function generateMetadata({
  params,
}: AnnouncementPageProps): Promise<Metadata> {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);

  return {
    title: announcement?.title ?? "Announcement not found",
  };
}

export default async function AnnouncementPage({
  params,
}: AnnouncementPageProps) {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/feeds", label: "Feeds" },
          { label: announcement.title },
        ]}
        eyebrow={announcement.category}
        title={announcement.title}
        description={announcement.summary}
      />

      <AnnouncementDetail announcement={announcement} />
    </>
  );
}

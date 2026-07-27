import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnnouncementDetail } from "@/components/feed/AnnouncementDetail";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  announcements,
  getAnnouncementBySlug,
  type AnnouncementReturnContext,
} from "@/data/announcements";

type AnnouncementPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

const returnDestinations: Record<
  AnnouncementReturnContext,
  { href: string; label: string }
> = {
  all: { href: "/feeds", label: "Back to all announcements" },
  current: {
    href: "/feeds?filter=current",
    label: "Back to current subject",
  },
  home: { href: "/", label: "Back to Home" },
  other: {
    href: "/feeds?filter=other",
    label: "Back to other subjects & services",
  },
};

function getReturnContext(
  value: string | string[] | undefined,
): AnnouncementReturnContext {
  const context = Array.isArray(value) ? value[0] : value;

  return context === "home" || context === "current" || context === "other"
    ? context
    : "all";
}

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
  searchParams,
}: AnnouncementPageProps) {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);
  const returnContext = getReturnContext((await searchParams).from);
  const returnDestination = returnDestinations[returnContext];

  if (!announcement) {
    notFound();
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: returnDestination.href, label: "Feeds" },
          { label: announcement.title },
        ]}
        eyebrow={announcement.category}
        title={announcement.title}
        description={announcement.summary}
      />

      <AnnouncementDetail
        announcement={announcement}
        returnHref={returnDestination.href}
        returnLabel={returnDestination.label}
      />
    </>
  );
}

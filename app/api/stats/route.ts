import { successResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

export async function GET(request: Request) {
  const startedAt = Date.now();
  const [feeds, announcementCount, authorCount] = await Promise.all([
    prisma.feed.findMany({
      include: { _count: { select: { announcements: true, requests: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.announcement.count(),
    prisma.author.count(),
  ]);

  const response = successResponse({
    feedCount: feeds.length,
    announcementCount,
    authorCount,
    feeds: feeds.map((feed) => ({
      id: feed.id,
      name: feed.name,
      slug: feed.slug,
      announcements: feed._count.announcements,
      requests: feed._count.requests,
      active: feed.isActive,
    })),
  });

  await recordRequest({ request, route: "/api/stats", statusCode: 200, startedAt });
  return response;
}

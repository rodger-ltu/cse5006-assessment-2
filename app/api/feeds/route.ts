import { createSlug } from "@/lib/announcementInput";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

export async function GET(request: Request) {
  const startedAt = Date.now();
  const feeds = await prisma.feed.findMany({
    include: { _count: { select: { announcements: true } } },
    orderBy: { name: "asc" },
  });
  const response = successResponse(feeds);
  await recordRequest({ request, route: "/api/feeds", statusCode: 200, startedAt });
  return response;
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) return errorResponse("INVALID_FEED", "Feed name is required.", 400);

    const slug = createSlug(typeof body.slug === "string" ? body.slug : name);
    const feed = await prisma.feed.create({
      data: {
        name,
        slug,
        description: typeof body.description === "string" ? body.description : "",
        siteUrl: typeof body.siteUrl === "string" ? body.siteUrl : "",
        feedUrl:
          typeof body.feedUrl === "string" && body.feedUrl
            ? body.feedUrl
            : `http://localhost:3000/api/rss?feed=${slug}`,
        sourceGroup: body.sourceGroup === "current" ? "current" : "other",
      },
    });

    await recordRequest({ request, route: "/api/feeds", statusCode: 201, startedAt, feedId: feed.id });
    return successResponse(feed, 201);
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "Unable to create feed.";
    return errorResponse("FEED_CREATE_FAILED", message, 400);
  }
}

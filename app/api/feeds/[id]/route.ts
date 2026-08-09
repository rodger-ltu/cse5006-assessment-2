import { createSlug } from "@/lib/announcementInput";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(request: Request, context: RouteContext<"/api/feeds/[id]">) {
  const startedAt = Date.now();
  const id = parseId((await context.params).id);
  if (!id) return errorResponse("INVALID_ID", "A positive feed ID is required.", 400);

  const feed = await prisma.feed.findUnique({
    where: { id },
    include: { announcements: true },
  });
  await recordRequest({ request, route: "/api/feeds/[id]", statusCode: feed ? 200 : 404, startedAt, feedId: id });
  return feed ? successResponse(feed) : errorResponse("NOT_FOUND", "Feed not found.", 404);
}

export async function PUT(request: Request, context: RouteContext<"/api/feeds/[id]">) {
  const startedAt = Date.now();
  const id = parseId((await context.params).id);
  if (!id) return errorResponse("INVALID_ID", "A positive feed ID is required.", 400);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) return errorResponse("INVALID_FEED", "Feed name is required.", 400);

    const feed = await prisma.feed.update({
      where: { id },
      data: {
        name,
        slug: createSlug(typeof body.slug === "string" ? body.slug : name),
        description: typeof body.description === "string" ? body.description : "",
        siteUrl: typeof body.siteUrl === "string" ? body.siteUrl : "",
        feedUrl: typeof body.feedUrl === "string" ? body.feedUrl : "",
        sourceGroup: body.sourceGroup === "current" ? "current" : "other",
        isActive: body.isActive !== false,
      },
    });
    await recordRequest({ request, route: "/api/feeds/[id]", statusCode: 200, startedAt, feedId: id });
    return successResponse(feed);
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "Unable to update feed.";
    return errorResponse("FEED_UPDATE_FAILED", message, 400);
  }
}

export async function DELETE(request: Request, context: RouteContext<"/api/feeds/[id]">) {
  const startedAt = Date.now();
  const id = parseId((await context.params).id);
  if (!id) return errorResponse("INVALID_ID", "A positive feed ID is required.", 400);

  try {
    await prisma.feed.delete({ where: { id } });
    await recordRequest({ request, route: "/api/feeds/[id]", statusCode: 200, startedAt });
    return successResponse({ deletedId: id });
  } catch {
    return errorResponse("NOT_FOUND", "Feed not found.", 404);
  }
}

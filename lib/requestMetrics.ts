import "server-only";

import { prisma } from "@/lib/prisma";

type MetricInput = {
  request: Request;
  route: string;
  statusCode: number;
  startedAt: number;
  feedId?: number;
};

export function getClientId(request: Request) {
  return (
    request.headers.get("x-client-id") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "browser-client"
  );
}

export async function recordRequest({
  request,
  route,
  statusCode,
  startedAt,
  feedId,
}: MetricInput) {
  await prisma.requestMetric.create({
    data: {
      route,
      method: request.method,
      clientId: getClientId(request),
      statusCode,
      durationMs: Math.max(0, Date.now() - startedAt),
      feedId,
    },
  });
}

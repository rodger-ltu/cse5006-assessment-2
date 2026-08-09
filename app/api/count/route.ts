import { successResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

export async function GET(request: Request) {
  const startedAt = Date.now();
  const [totalRequests, groupedRoutes, uniqueClients] = await Promise.all([
    prisma.requestMetric.count(),
    prisma.requestMetric.groupBy({
      by: ["route"],
      _count: { _all: true },
      orderBy: { _count: { route: "desc" } },
    }),
    prisma.requestMetric.groupBy({ by: ["clientId"] }),
  ]);

  const response = successResponse({
    totalRequests,
    uniqueClients: uniqueClients.length,
    requestsByRoute: groupedRoutes.map((item) => ({
      route: item.route,
      count: item._count._all,
    })),
  });

  await recordRequest({ request, route: "/api/count", statusCode: 200, startedAt });
  return response;
}

import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

export async function GET(request: Request) {
  const startedAt = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const response = Response.json({
      status: "ok",
      database: "connected",
      service: "TONDAW RSS Server",
      timestamp: new Date().toISOString(),
    });

    await recordRequest({ request, route: "/api/health", statusCode: 200, startedAt });
    return response;
  } catch {
    return Response.json(
      { status: "error", database: "unavailable" },
      { status: 503 },
    );
  }
}

export function successResponse<T>(data: T, status = 200) {
  const count = Array.isArray(data) ? data.length : 1;

  return Response.json(
    { data, meta: { count, timestamp: new Date().toISOString() } },
    { status },
  );
}

export function errorResponse(code: string, message: string, status: number) {
  return Response.json({ error: { code, message } }, { status });
}

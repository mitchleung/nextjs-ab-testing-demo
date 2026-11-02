// app/api/exposure/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  console.log("[exposure]", body);
  return new Response(null, { status: 204 });
}

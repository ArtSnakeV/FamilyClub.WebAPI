export const dynamic = "force-dynamic";

const payload = {
  status: "Healthy",
  service: "family.club.react",
};

export async function GET() {
  return Response.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}

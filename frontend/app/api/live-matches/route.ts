import { getCurrentMatches } from "@/lib/cricket";

export async function GET() {
  try {
    const data = await getCurrentMatches();

    return Response.json(data);
  } catch (error) {
  console.error("Live Matches API Error:", error);

  return Response.json(
    { error: "Failed to fetch live matches" },
    { status: 500 }
  );
}
}
import axios from "axios";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const prompt = body.prompt;
console.log("API Key Loaded:", !!process.env.OPENROUTER_API_KEY);
console.log(
  "API Key Prefix:",
  process.env.OPENROUTER_API_KEY?.substring(0, 12)
);
const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
You are Crici AI.

Generate a cinematic Instagram Reel script for a cricket match.

Rules:
- Hook in the first line.
- 20–30 seconds narration.
- Mention live match situation.
- Build excitement.
- End with a strong CTA.
- Output only the script.
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
console.log("========== RESPONSE ==========");
console.dir(response.data, { depth: null });

    console.log("Choices:", response.data.choices);
    const script =
      response.data.choices[0].message.content;

    return Response.json({
      script,
    });


  } catch (error: any) {

    console.log("FULL ERROR:");
console.dir(error.response?.data, { depth: null });

return Response.json({
  script:
    error.response?.data?.error?.message ||
    error.message ||
    "AI reel generation failed.",
});

  }
}
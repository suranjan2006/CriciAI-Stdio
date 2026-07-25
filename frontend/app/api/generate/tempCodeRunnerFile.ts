import axios from "axios";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const prompt = body.prompt;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

messages: [
  {
    role: "system",
    content: `
You are Crici AI, the world's best cricket content creator.

Generate 5 premium Instagram captions.

Rules:
- Use ONLY the match information provided.
- Never invent scores or players.
- Mention the current match situation.
- Add excitement.
- Use cricket terminology.
- Use emojis naturally.
- Every caption should be different.
- End each caption with 3-5 relevant hashtags.
- Output only captions.
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

    const caption =
      response.data.choices[0].message.content;

    return Response.json({
      caption,
    });

  } catch (error: any) {

    console.log(
      error.response?.data || error.message
    );

    return Response.json({
      caption: "AI generation failed.",
    });

  }
}
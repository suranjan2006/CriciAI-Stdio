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
You are Crici AI, the world's best cricket analyst.

Generate a professional cricket match summary.

Rules:

- Use ONLY the information provided.
- Never invent players or scores.
- Explain the current match situation.
- Mention which team has the advantage.
- Mention the latest score.
- Mention the venue.
- Mention the match status.
- Write in a professional sports journalist style.
- Do not hallucinate.
- Output in Markdown.

Format exactly like this:

🏏 Match Summary

(Current summary paragraph)

━━━━━━━━━━━━━━━━━━

📊 Match Situation

(Current situation)

━━━━━━━━━━━━━━━━━━

🔥 Key Highlights

• Highlight 1

• Highlight 2

• Highlight 3

━━━━━━━━━━━━━━━━━━

📍 Venue

(Venue)

━━━━━━━━━━━━━━━━━━

📈 AI Match Analysis

(Your analysis based ONLY on provided information)

━━━━━━━━━━━━━━━━━━

🏆 Who Has the Advantage?

(Explain why)
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

    const summary =
      response.data.choices[0].message.content;

    return Response.json({
      summary,
    });

  } catch (error: any) {

    console.log(
      error.response?.data || error.message
    );

    return Response.json({
      summary: "AI summary generation failed.",
    });

  }
}
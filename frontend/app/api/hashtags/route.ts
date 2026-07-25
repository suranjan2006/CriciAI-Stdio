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
You are Crici AI.

Generate exactly 30 Instagram hashtags.

Rules:
- Return ONLY hashtags.
- One hashtag per line.
- No numbering.
- No explanation.
- Mix:
  • Team hashtags
  • Tournament hashtags
  • Cricket hashtags
  • Trending hashtags
  • Viral hashtags
  • Fan hashtags
- No duplicate hashtags.
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

    let hashtags = response.data.choices[0].message.content;

hashtags = hashtags
  .replace(/ +/g, " ")
  .replace(/#/g, "\n#")
  .trim();

    return Response.json({
      hashtags,
    });

  } catch (error: any) {

    console.log(
      error.response?.data || error.message
    );

    return Response.json({
      hashtags: "AI hashtag generation failed.",
    });

  }
}
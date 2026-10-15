import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const summarizeWithAI = async (text, maxSentences = 3) => {
  const response = await client.chat.complete({
    model: "ministral-3b-2512",
    messages: [
      {
        role: "system",
        content: `Summarize the user's text in simple language using at most ${maxSentences} sentences. Return only the summary.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  const summary = response.choices?.[0]?.message?.content;

  if (typeof summary !== "string" || !summary.trim()) {
    throw new Error("Mistral returned an empty summary");
  }

  return summary.trim();
};
import { summarizeText } from "../services/local-summarizer.service.js";
import { summarizeWithAI } from "../services/ai-summarizer.service.js";
import db from "../config/database.js";

export const summarizeController = async (req, res) => {
  try {
    const {
      text,
      maxSentences = 3,
      mode = "local",
    } = req.body;

    // Validate text
    if (typeof text !== "string" || text.trim().length < 50) {
      return res.status(400).json({
        error: "Text must contain at least 50 characters",
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        error: "Text must not exceed 10000 characters",
      });
    }

    // Validate maxSentences
    if (
      !Number.isInteger(maxSentences) ||
      maxSentences < 1 ||
      maxSentences > 10
    ) {
      return res.status(400).json({
        error: "maxSentences must be between 1 and 10",
      });
    }

    // Validate mode
    if (!["local", "ai"].includes(mode)) {
      return res.status(400).json({
        error: "Mode must be local or ai",
      });
    }

    const cleanText = text.trim();
    let summary;

    // Select summarization service
    if (mode === "local") {
      summary = summarizeText(cleanText, maxSentences);
    } else {
      summary = await summarizeWithAI(cleanText, maxSentences);
    }

    // Store the summary in the database
    const insertSummary = db.prepare(`
      INSERT INTO summaries (method, summary)
      VALUES (?, ?)
    `);

insertSummary.run(mode, summary);
    return res.status(200).json({
      summary,
      method: mode,
      originalCharacters: cleanText.length,
      summaryCharacters: summary.length,
    });
  } catch (error) {
  console.error("Mistral/API error:", error);

  return res.status(500).json({
    error: "Failed to summarize text",
  });
}
};
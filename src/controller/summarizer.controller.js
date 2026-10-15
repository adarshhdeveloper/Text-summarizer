import { summarizeText } from "../services/local-summarizer.service.js";

export const summarizeController = (req, res) => {
  try {
    const { text, maxSentences = 3, mode = "local" } = req.body;

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

    if (
      !Number.isInteger(maxSentences) ||
      maxSentences < 1 ||
      maxSentences > 10
    ) {
      return res.status(400).json({
        error: "maxSentences must be between 1 and 10",
      });
    }

    if (!["local", "ai"].includes(mode)) {
      return res.status(400).json({
        error: "Invalid mode",
      });
    }

    if (mode === "ai") {
      return res.status(501).json({
        error: "AI mode is not implemented yet",
      });
    }

    const summary = summarizeText(text.trim(), maxSentences);

    return res.status(200).json({
      summary,
      method: "local",
      originalCharacters: text.length,
      summaryCharacters: summary.length,
    });
  } catch (error) {
    console.error("Summarization failed");

    return res.status(500).json({
      error: "Failed to summarize text",
    });
  }
};
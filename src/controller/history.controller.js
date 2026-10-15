import db from "../config/database.js";

export const getHistory = (req, res) => {
  try {
    const history = db.prepare(`
      SELECT id, createdAt, method, summary
      FROM summaries
      ORDER BY id DESC
      LIMIT 10
    `).all();

    return res.status(200).json({ history });
  } catch (error) {
    console.error("History fetch failed");

    return res.status(500).json({
      error: "Failed to fetch history",
    });
  }
};
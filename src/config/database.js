import Database from "better-sqlite3";

const db = new Database("summarizer.db");

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    method TEXT NOT NULL,
    summary TEXT NOT NULL
  )
`);

export default db;
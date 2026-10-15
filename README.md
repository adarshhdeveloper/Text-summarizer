# AI Text Summarizer API

A REST API built with Node.js, Express.js, and SQLite that summarizes text using a local algorithm or Mistral AI model

## Features

- Local text summarization without an AI API key.
- AI-powered summarization using Mistral.
- Control summary length using `maxSentences`.
- Save summaries in SQLite.
- View the latest 10 summaries.
- Input validation and error handling.

## Tech Stack

- Node.js
- Express.js
- SQLite (`better-sqlite3`)
- Mistral AI API
- dotenv

## Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER/backend
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file**

```env
PORT=3000
MISTRAL_API_KEY=your_mistral_api_key
```

Keep your API key private. Never upload your `.env` file to GitHub.

**4. Start the server**

```bash
npm run dev
```

Server URL: `http://localhost:3000`

## API Endpoints

### 1. Health Check

**GET** `/health`

Checks whether the API is running.

Example response:

```json
{
  "status": "ok"
}
```

### 2. Summarize Text

**POST** `/api/summarize`

Request body:

```json
{
  "text": "Artificial intelligence is changing the world. It helps businesses automate repetitive tasks and improve productivity. Machine learning allows computers to learn from data. Many companies use AI to analyze information and make better decisions. AI is also used in healthcare and education.",
  "maxSentences": 2,
  "mode": "local"
}
```

Use `"mode": "local"` for local summarization or `"mode": "ai"` for Mistral AI.

Example response:

```json
{
  "summary": "Artificial intelligence is changing the world. It helps businesses automate repetitive tasks and improve productivity.",
  "method": "local",
  "originalCharacters": 0,
  "summaryCharacters": 0
}
```

Character counts and summary text depend on the actual input and generated result.

**Validation rules:**
- Text must contain at least 50 characters.
- Text must not exceed 10,000 characters.
- `maxSentences` must be an integer from 1 to 10.
- `mode` must be `local` or `ai`.

### 3. Summary History

**GET** `/api/history`

Returns the latest 10 saved summaries.

Example response:

```json
{
  "history": [
    {
      "id": 1,
      "createdAt": "2026-10-15 03:00:00",
      "method": "local",
      "summary": "Artificial intelligence is changing the world."
    }
  ]
}
```

The response contains actual database records.

## Database

SQLite stores the generated summaries in `summarizer.db`.

Each record contains:
- `id`
- `createdAt`
- `method`
- `summary`

## Testing

Test the endpoints using Postman:

1. `GET /health`
2. `POST /api/summarize` with `"mode": "local"`
3. `POST /api/summarize` with `"mode": "ai"`
4. `POST /api/summarize` with text shorter than 50 characters.
5. `GET /api/history`

Mistral AI requests require valid API access and available quota. Local mode works without an AI API key.

## Learnings

- Building REST APIs with Express.js.
- Using separate controllers and services.
- Integrating an AI API.
- Saving data with SQLite.
- Validating requests and handling errors.

## Author

Your Name

# EmailUnify API

Unified transactional email analytics API. Aggregate delivery events from SendGrid, Postmark, and more into a single normalized endpoint.

## Quick Start

```bash
npm install
npm start
```

Server starts on `http://0.0.0.0:3000` (or `$PORT`).

## Demo Key

`eu_demo_key_abc123` — works without registration. 200 seed events pre-loaded.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/providers` | Yes | Register provider |
| GET | `/providers` | Yes | List providers |
| GET | `/events` | Yes | Query events |
| GET | `/stats` | Yes | Aggregate stats |
| POST | `/webhooks/inbound/:provider` | No | Ingest webhooks |
| GET | `/docs` | No | API documentation |

## Authentication

Pass `X-API-Key: eu_demo_key_abc123` or `Authorization: Bearer eu_demo_key_abc123`.

## Replit Deployment

1. Import this repo at replit.com/new
2. Click Run — no config needed
3. Server binds to `0.0.0.0:$PORT` automatically

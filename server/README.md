# Jargonaut Server (minimal MERN-style)

This lightweight Express server serves the blog data to the client via a small REST API.

Features
- GET /api/health - simple health check
- GET /api/blogs - returns all blogs (falls back to client `src/data/blogs.jsx`)
- GET /api/blogs/:id - returns a single blog by numeric id

Usage (local development)

1. Install dependencies

```bash
cd server
npm install
```

2. Start dev server (auto-restart)

```bash
npm run dev
```

3. Optional: Seed MongoDB

Set `MONGO_URI` then run:

```bash
MONGO_URI="mongodb://..." npm run seed
```

## Vercel Deployment

This server is configured for Vercel serverless deployment:

- **Serverless functions**: Located in `api/` folder
  - `api/health.js` - Health check endpoint
  - `api/blogs.js` - Blog data endpoint (supports `?id=` query param)

- **Configuration**: `vercel.json` routes all `/api/*` requests to serverless functions

Deploy with:
```bash
vercel --prod
```

Or connect your Git repo in the Vercel Dashboard. See [DEPLOYMENT.md](../DEPLOYMENT.md) for full instructions.

Notes
- By default the server uses the blog data embedded in the client as an in-memory fallback. If you set `MONGO_URI` the server will try to connect to MongoDB and return stored documents instead.
- In production you can build the client into `client_copy/dist` and the server will serve it as static files.

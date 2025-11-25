# The Jargonaut - MERN Project

**Client** (React + Vite) is in `client_copy/`  
**Server** (Node + Express + optional MongoDB) is in `server/`

---

## 🚀 Ready to Deploy to Vercel?

**Your project is 100% deployment-ready!** Complete guides included:

### 📚 Deployment Documentation

| Document | Purpose | Time |
|----------|---------|------|
| **[DEPLOYMENT_COMPLETE.md](./DEPLOYMENT_COMPLETE.md)** | 🎯 **START HERE** - Overview & guide map | 5 min read |
| **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** | ✅ Step-by-step checklist (recommended) | 10-15 min |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | 📘 Comprehensive deployment guide | 20 min read |
| **[DEPLOYMENT_WORKFLOW.md](./DEPLOYMENT_WORKFLOW.md)** | 📊 Visual workflow diagrams | 10 min read |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | 🏗️ System architecture & data flow | 15 min read |
| **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** | 🔧 Debug help & common issues | Reference |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | ⚡ Quick reference card | Reference |

### 🎯 Quick Deploy (5 minutes)

1. **Deploy Backend**: Vercel Dashboard → New Project → Root: `server` → Deploy
2. **Deploy Frontend**: Vercel Dashboard → New Project → Root: `client_copy` → Add env var `VITE_API_URL` → Deploy
3. **Done!** 🎉

Full instructions: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## Quick Start (Local Development)

### 1. Server

Install dependencies and start:

```bash
cd server
npm install
npm start
```

(or `npm run dev` with nodemon for auto-restart)

Server runs at `http://localhost:4000` by default.

**Endpoints:**
- `GET /api/health` – health check
- `GET /api/blogs` – list all blogs
- `GET /api/blogs/:id` – fetch one blog by id

**Optional Mongo:** Copy `.env.example` to `.env`, set `MONGO_URI`, and run `npm run seed` to populate.

### 2. Client

If you want the React dev server to proxy to the backend, update `vite.config.js` with:

```js
server: {
  proxy: {
    '/api': 'http://localhost:4000'
  }
}
```

Then:

```bash
cd client_copy
npm install
npm run dev
```

The client will fetch from `/api/blogs` (the server) and fall back to local data if unavailable.

### 3. Environment Variables

**Client** (optional for local dev, required for production):
```bash
cd client_copy
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:4000 (or leave empty for proxy)
```

**Server** (optional for MongoDB):
```bash
cd server
cp .env.example .env
# Edit .env and set MONGO_URI if using MongoDB
```

---

## 🚀 Deploying to Vercel

This project is ready to deploy to Vercel! See the detailed guides:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete step-by-step deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick checklist for deployment

### Quick Deploy Summary

1. **Deploy Backend** (serverless API):
   - Root directory: `server`
   - Framework: Other
   - Your API will be at `https://your-api.vercel.app`

2. **Deploy Frontend** (React app):
   - Root directory: `client_copy`
   - Framework: Vite
   - Set env var: `VITE_API_URL=https://your-api.vercel.app`
   - Your site will be at `https://your-app.vercel.app`

Both deployments auto-update on every push to `main`! 🎉

---

## Notes

- **Lightweight**: The server defaults to in-memory blog data loaded directly from `client_copy/src/data/blogs.jsx` for simplicity, so you don't need a database to run or test.
- **Production build**: After running `npm run build` in the client, copy the `client_copy/dist` folder and the server will serve it as static files at `/`.
- **Optional Docker**: Add `Dockerfile` and `docker-compose.yml` to containerize server + client.

---

Enjoy coding! 🚀

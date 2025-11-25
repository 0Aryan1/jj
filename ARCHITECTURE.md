# 🏗️ Architecture Overview

## Development (Local)

```
┌─────────────────────────────────────────────────────────┐
│                    Your Computer                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐         ┌──────────────────┐    │
│  │   Vite Dev       │  Proxy  │   Node/Express   │    │
│  │   Server         │────────▶│   Server         │    │
│  │   :5173          │ /api/*  │   :4000          │    │
│  └──────────────────┘         └──────────────────┘    │
│         │                              │               │
│         │                              │               │
│         ▼                              ▼               │
│  ┌──────────────────┐         ┌──────────────────┐    │
│  │  React Client    │         │  blogs.jsx       │    │
│  │  Components      │         │  (fallback data) │    │
│  └──────────────────┘         └──────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**How it works:**
- Client runs on `http://localhost:5173`
- Server runs on `http://localhost:4000`
- Vite proxy forwards `/api/*` to server
- Client uses local blog data as fallback

---

## Production (Vercel)

```
┌──────────────────────────────────────────────────────────────┐
│                          Vercel Cloud                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Frontend Project (Static)                      │ │
│  │         https://jargonaut.vercel.app                   │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  • Served from CDN (fast global delivery)              │ │
│  │  • Built React app (static HTML/CSS/JS)                │ │
│  │  • Env: VITE_API_URL = backend URL                     │ │
│  └──────────────┬─────────────────────────────────────────┘ │
│                 │                                            │
│                 │ HTTPS Requests                             │
│                 │ /api/blogs                                 │
│                 ▼                                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Backend Project (Serverless)                   │ │
│  │         https://jargonaut-api.vercel.app               │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  • Serverless Functions (auto-scale)                   │ │
│  │    - /api/health  → api/health.js                      │ │
│  │    - /api/blogs   → api/blogs.js                       │ │
│  │  • No server to maintain                               │ │
│  │  • Optional: MongoDB Atlas connection                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**How it works:**
1. User visits `https://jargonaut.vercel.app`
2. Static React app loads from CDN (instant)
3. React fetches blog data from API at `https://jargonaut-api.vercel.app/api/blogs`
4. Serverless function executes on-demand
5. Returns blog data (from memory or MongoDB)
6. React displays the content

---

## Data Flow

```
User Browser
    │
    │ 1. Request page
    ▼
┌─────────────────┐
│  React Client   │
│  (Vercel CDN)   │
└────────┬────────┘
         │
         │ 2. Fetch /api/blogs
         ▼
┌─────────────────┐
│  API Endpoint   │
│  (Serverless)   │
└────────┬────────┘
         │
         │ 3. Load data
         ▼
┌─────────────────┐
│  Data Source    │
│  blogs.jsx or   │
│  MongoDB Atlas  │
└────────┬────────┘
         │
         │ 4. Return JSON
         ▼
┌─────────────────┐
│  React Client   │
│  (renders UI)   │
└─────────────────┘
```

---

## Benefits of This Architecture

### ✅ Performance
- **Static client** served from CDN (global edge network)
- **Serverless API** auto-scales with traffic
- **No cold starts** for simple blog queries (in-memory data)

### ✅ Cost
- **Free tier** for most traffic on Vercel
- **Pay per request** only when API is called
- **No server** to run 24/7

### ✅ Developer Experience
- **Auto deploys** on git push
- **Preview deployments** for every PR
- **Zero config** with provided files

### ✅ Scalability
- Handles traffic spikes automatically
- Global CDN distribution
- Serverless functions scale to zero when idle

---

## File Structure for Deployment

```
jj/
├── client_copy/              # Frontend React App
│   ├── src/
│   ├── public/
│   ├── vercel.json          # SPA routing config
│   ├── .env.example         # Env var template
│   └── package.json
│
├── server/                   # Backend API
│   ├── api/                 # ⚡ Serverless functions
│   │   ├── health.js        # GET /api/health
│   │   └── blogs.js         # GET /api/blogs?id=X
│   ├── vercel.json          # Serverless config
│   ├── .env.example         # Env var template
│   └── package.json
│
├── DEPLOYMENT.md            # 📘 Full deployment guide
├── DEPLOYMENT_CHECKLIST.md # ✅ Quick checklist
└── README.md                # 📖 Project overview
```

---

## Environment Variables

### Frontend (client_copy)
```bash
VITE_API_URL=https://your-api.vercel.app
```

### Backend (server) - Optional
```bash
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

---

## Monitoring & Debugging

### Vercel Dashboard Provides:
- Real-time logs for each function invocation
- Performance analytics
- Error tracking
- Deployment history
- Custom domain management

### Debug Checklist:
1. Check function logs in Vercel dashboard
2. Test API endpoints directly with `curl`
3. Verify environment variables are set
4. Check browser Network tab for CORS issues
5. Review build logs if deployment fails

---

**Questions?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions!

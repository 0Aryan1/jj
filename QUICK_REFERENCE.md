# ⚡ Quick Reference Card

## 🎯 Deploy in 5 Minutes

### Backend (API)
1. Vercel Dashboard → New Project
2. Root: `server` | Framework: Other
3. Deploy → Copy URL

### Frontend (App)
1. Vercel Dashboard → New Project
2. Root: `client_copy` | Framework: Vite
3. Add Env Var: `VITE_API_URL` = backend URL
4. Deploy → Done! 🎉

---

## 📂 Project Structure

```
├── server/              Backend (Serverless API)
│   ├── api/            ⚡ Functions
│   │   ├── health.js   GET /api/health
│   │   └── blogs.js    GET /api/blogs?id=X
│   └── vercel.json     Config
│
└── client_copy/        Frontend (React + Vite)
    ├── src/
    ├── public/
    └── vercel.json     Config
```

---

## 🔌 API Endpoints

```bash
GET /api/health          # Health check
GET /api/blogs           # All blogs
GET /api/blogs?id=1      # Single blog
```

---

## 🌐 Environment Variables

### Frontend
```env
VITE_API_URL=https://your-api.vercel.app
```

### Backend (optional)
```env
MONGO_URI=mongodb+srv://...
```

---

## 🧪 Testing

```bash
# Local
cd server && npm start           # http://localhost:4000
cd client_copy && npm run dev    # http://localhost:5173

# Production
curl https://your-api.vercel.app/api/health
curl https://your-api.vercel.app/api/blogs
```

---

## 🐛 Common Fixes

| Issue | Fix |
|-------|-----|
| 404 errors | Check `VITE_API_URL` env var |
| CORS errors | Verify CORS headers in API files |
| Blank page | Check `vercel.json` in client |
| No data | Test API directly with curl |
| Build fails | Run `npm run build` locally first |

---

## 📚 Documentation

- 📘 [DEPLOYMENT.md](./DEPLOYMENT.md) - Full guide
- ✅ [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Step-by-step
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - How it works
- 🔧 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Debug help

---

## 🚀 Commands

```bash
# Deploy
vercel --prod                    # Deploy to production

# Logs
vercel logs <url> --follow       # Watch logs

# List
vercel ls                        # List deployments

# Environment
vercel env pull                  # Download env vars
vercel env add                   # Add env var
```

---

## ✨ Pro Tips

- ✓ Deploy backend first to get API URL
- ✓ Test API endpoints before deploying frontend
- ✓ Use Preview Deployments for testing (auto on PRs)
- ✓ Enable Vercel Analytics for insights
- ✓ Set up custom domain in project settings

---

**Need Help?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**Ready to Deploy?** Follow [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

Made with ❤️ for The Jargonaut | Last Updated: Nov 2025

# 🚀 Vercel Deployment Checklist

## Before Deploying

- [ ] Push your code to GitHub/GitLab/Bitbucket
- [ ] Create a Vercel account at [vercel.com](https://vercel.com)
- [ ] Test locally: `cd server && npm start` and `cd client_copy && npm run dev`

---

## Backend Deployment

- [ ] Login to Vercel Dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import your Git repository
- [ ] Configure settings:
  - [ ] Root Directory: `server`
  - [ ] Framework: Other
  - [ ] Build Command: (leave empty)
  - [ ] Install Command: `npm install`
- [ ] Click "Deploy"
- [ ] **Copy the API URL** (e.g., `https://jargonaut-api.vercel.app`)

---

## Frontend Deployment

- [ ] Create another new project in Vercel
- [ ] Import the same repository
- [ ] Configure settings:
  - [ ] Root Directory: `client_copy`
  - [ ] Framework: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
  - [ ] Install Command: `npm install`
- [ ] Add Environment Variable:
  - [ ] Name: `VITE_API_URL`
  - [ ] Value: `https://your-backend-api.vercel.app` (from step above)
- [ ] Click "Deploy"
- [ ] **Copy the app URL** (e.g., `https://jargonaut.vercel.app`)

---

## Testing

- [ ] Test API health: `curl https://your-api.vercel.app/api/health`
- [ ] Test API blogs: `curl https://your-api.vercel.app/api/blogs`
- [ ] Open your app URL in browser
- [ ] Verify blogs load from API (check Network tab in DevTools)
- [ ] Click on individual blog posts to test detail pages
- [ ] Test on mobile/tablet viewports

---

## Optional: Custom Domain

- [ ] Go to your frontend project in Vercel
- [ ] Settings → Domains
- [ ] Add your custom domain
- [ ] Follow DNS configuration instructions

---

## 🎉 Done!

Your app is live at: `https://your-app.vercel.app`
Your API is live at: `https://your-api.vercel.app`

### Share your links:
- Website: ________________
- API: ________________

---

**Pro Tip**: Every push to your `main` branch will automatically deploy! 🚀

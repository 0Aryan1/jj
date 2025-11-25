# 🚀 Deploying The Jargonaut to Vercel

This guide walks you through deploying both the client (React) and server (API) to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** (optional): `npm i -g vercel`
3. **Git Repository**: Push your project to GitHub/GitLab/Bitbucket

---

## 🎯 Deployment Strategy

We'll deploy **two separate Vercel projects**:
- **Backend API** (`server/` folder) → Serverless functions
- **Frontend Client** (`client_copy/` folder) → Static React app

---

## 📦 Part 1: Deploy the Backend API

### Option A: Using Vercel Dashboard (Recommended)

1. **Login to Vercel**: Go to [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Create New Project**:
   - Click "Add New" → "Project"
   - Import your Git repository
   - Select the repository containing your project

3. **Configure Project Settings**:
   ```
   Framework Preset: Other
   Root Directory: server
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your API URL (e.g., `https://your-api.vercel.app`)

### Option B: Using Vercel CLI

```bash
cd server
vercel
# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: (select your account)
# - Link to existing project: N
# - Project name: jargonaut-api
# - In which directory: ./
# - Override settings: N
```

**Note your API URL** after deployment (e.g., `https://jargonaut-api.vercel.app`)

---

## 🎨 Part 2: Deploy the Frontend Client

### Option A: Using Vercel Dashboard (Recommended)

1. **Create Another New Project**:
   - Go back to Vercel Dashboard
   - Click "Add New" → "Project"
   - Select the same repository

2. **Configure Project Settings**:
   ```
   Framework Preset: Vite
   Root Directory: client_copy
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Add Environment Variable**:
   - Go to "Environment Variables" section
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-api.vercel.app
     ```
   - Replace with your actual API URL from Part 1

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-app.vercel.app`

### Option B: Using Vercel CLI

```bash
cd client_copy

# Create .env.production file
echo "VITE_API_URL=https://your-api.vercel.app" > .env.production

# Deploy
vercel --prod
# Follow prompts similar to Part 1
```

---

## ⚙️ Configuration Files Included

### Server (`server/vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

### Client (`client_copy/vercel.json`)
Already configured for SPA routing.

---

## 🔧 Environment Variables

### Backend (Optional - for MongoDB)
If you want to use MongoDB Atlas:

1. Go to your backend project in Vercel Dashboard
2. Settings → Environment Variables
3. Add:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jargonaut
   ```

### Frontend (Required)
```
VITE_API_URL=https://your-backend-api.vercel.app
```

---

## ✅ Testing Your Deployment

### Test Backend API:
```bash
# Health check
curl https://your-api.vercel.app/api/health

# Get all blogs
curl https://your-api.vercel.app/api/blogs

# Get single blog
curl https://your-api.vercel.app/api/blogs?id=1
```

### Test Frontend:
Open `https://your-app.vercel.app` in your browser and verify:
- ✓ Homepage loads
- ✓ Blog cards display
- ✓ Individual blog pages open
- ✓ Data is fetched from API (check Network tab)

---

## 🔄 Automatic Deployments

Once set up, Vercel will automatically deploy:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

---

## 🐛 Troubleshooting

### Issue: API returns 404
- Check that `server/api/` folder exists with `blogs.js` and `health.js`
- Verify `vercel.json` is in the `server/` directory

### Issue: Frontend shows no data
- Verify `VITE_API_URL` environment variable is set correctly
- Check browser console for CORS errors
- Ensure API URL doesn't have trailing slash

### Issue: Build fails
- Run `npm run build` locally to test
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

---

## 📝 Quick Commands Reference

```bash
# Deploy backend
cd server && vercel --prod

# Deploy frontend
cd client_copy && vercel --prod

# View logs
vercel logs <deployment-url>

# List all deployments
vercel ls
```

---

## 🎉 Success!

Your app is now live! Share these URLs:
- 🌐 **Website**: `https://your-app.vercel.app`
- 🔌 **API**: `https://your-api.vercel.app/api/blogs`

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

---

**Need help?** Check Vercel's support or open an issue in your repository.

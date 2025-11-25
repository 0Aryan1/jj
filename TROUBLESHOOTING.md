# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. API Returns 404 in Production

**Symptoms:**
- Frontend loads but shows no blog posts
- Browser console shows `404 Not Found` for `/api/blogs`

**Solutions:**
```bash
# ✅ Check 1: Verify API URL is correct
# In Vercel dashboard → Frontend project → Settings → Environment Variables
# Ensure VITE_API_URL points to your backend URL (no trailing slash)
VITE_API_URL=https://your-api.vercel.app

# ✅ Check 2: Test API directly
curl https://your-api.vercel.app/api/health
curl https://your-api.vercel.app/api/blogs

# ✅ Check 3: Verify serverless functions exist
# In Vercel dashboard → Backend project → Functions tab
# Should see: api/health.js and api/blogs.js
```

**Fix:**
- Redeploy backend if functions are missing
- Add/update `VITE_API_URL` env var in frontend project
- Redeploy frontend after updating env vars

---

### 2. CORS Errors

**Symptoms:**
```
Access to fetch at 'https://api.vercel.app/api/blogs' from origin 
'https://app.vercel.app' has been blocked by CORS policy
```

**Solutions:**
- ✅ The serverless functions already include CORS headers
- ✅ Verify both `api/health.js` and `api/blogs.js` have:
  ```js
  res.setHeader('Access-Control-Allow-Origin', '*');
  ```

**Fix:**
If CORS errors persist:
1. Check Network tab → Response Headers
2. Ensure backend returns proper CORS headers
3. Redeploy backend if headers are missing

---

### 3. Environment Variables Not Working

**Symptoms:**
- `import.meta.env.VITE_API_URL` is undefined
- API calls go to wrong URL or fail

**Solutions:**
```bash
# ✅ Check 1: Variable name starts with VITE_
# ❌ Wrong: API_URL=https://...
# ✅ Correct: VITE_API_URL=https://...

# ✅ Check 2: Set in Vercel Dashboard
# Project Settings → Environment Variables → Add
# Name: VITE_API_URL
# Value: https://your-api.vercel.app
# Environment: Production, Preview, Development (check all)

# ✅ Check 3: Redeploy after adding env vars
# Env vars only take effect after redeployment
```

**Fix:**
1. Add `VITE_` prefix to all client env vars
2. Set in Vercel dashboard (not in code)
3. Trigger new deployment

---

### 4. Build Fails in Vercel

**Symptoms:**
- Deployment fails during build step
- Error in build logs

**Common Causes & Fixes:**

#### Missing Dependencies
```bash
# Test build locally first
cd client_copy
npm install
npm run build

# If build fails locally, fix errors before deploying
```

#### Wrong Node Version
```bash
# Add engines field to package.json
{
  "engines": {
    "node": "18.x"
  }
}
```

#### Import Errors
```bash
# Check all imports use correct paths
# ❌ Wrong: import from '../data/blogs'
# ✅ Correct: import from '../data/blogs.jsx' or '../data/blogs.js'
```

---

### 5. Blank Page After Deployment

**Symptoms:**
- Deployment succeeds but page is blank
- Console shows routing errors

**Solutions:**
```bash
# ✅ Check 1: Verify vercel.json exists in client_copy/
# Should contain:
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}

# ✅ Check 2: Check browser console
# F12 → Console tab → Look for errors

# ✅ Check 3: Verify dist/ folder was built
# In Vercel logs, should see: "Building..."
# Output should be in dist/ folder
```

---

### 6. Images Not Loading

**Symptoms:**
- Blog images show broken icon
- 404 errors for images in console

**Solutions:**
```bash
# ✅ Check 1: Images in public/ folder
# Correct structure:
client_copy/
  public/
    logo.png
    1.jpeg
    2.jpeg
    dev.jpeg

# ✅ Check 2: Image paths start with /
# ❌ Wrong: image: "1.jpeg"
# ✅ Correct: image: "/1.jpeg"

# ✅ Check 3: Verify images deployed
# Visit: https://your-app.vercel.app/1.jpeg
# Should show the image
```

---

### 7. API Returns Empty Array

**Symptoms:**
- API call succeeds but returns `[]`
- No error in console

**Solutions:**
```bash
# ✅ Check: blogs.jsx is accessible
# The serverless function needs to read from:
# ../client_copy/src/data/blogs.jsx

# File should export data:
export const blogs = [ /* ... */ ];
export default blogs;

# Test locally:
cd server
node -e "console.log(require('../client_copy/src/data/blogs.jsx'))"
```

**Fix:**
- Ensure both projects are in same repo
- Verify relative path in `api/blogs.js`
- Consider using MongoDB for production data

---

### 8. Function Timeout

**Symptoms:**
- Request takes > 10 seconds
- Vercel shows timeout error

**Solutions:**
- Vercel free tier: 10s timeout
- Vercel Pro: 60s timeout

**Fixes:**
1. Optimize serverless function code
2. Add database indexes if using MongoDB
3. Cache responses if data doesn't change often
4. Upgrade to Pro if needed

---

### 9. "Module not found" in Serverless Function

**Symptoms:**
```
Error: Cannot find module '../client_copy/src/data/blogs.jsx'
```

**Solutions:**
```bash
# Option 1: Copy data to server folder
cp client_copy/src/data/blogs.jsx server/data/blogs.js

# Update api/blogs.js:
const blogsData = require('../data/blogs.js');

# Option 2: Use MongoDB for production
# Set MONGO_URI in Vercel env vars
# Run npm run seed to populate database
```

---

### 10. Changes Not Showing After Deploy

**Symptoms:**
- Deployed successfully but changes not visible
- Old version still showing

**Solutions:**
```bash
# ✅ Check 1: Hard refresh browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# ✅ Check 2: Clear Vercel cache
# In Vercel dashboard:
# Deployments → Latest deployment → More → Redeploy
# Check "Use existing Build Cache" → OFF

# ✅ Check 3: Verify deployment URL
# Make sure you're viewing latest deployment
# Check Deployments tab for most recent URL
```

---

## Debugging Commands

```bash
# Test local build
npm run build && npm run preview

# Test API locally
cd server && npm start
curl http://localhost:4000/api/health
curl http://localhost:4000/api/blogs

# Check Vercel logs
vercel logs <deployment-url> --follow

# List deployments
vercel ls

# Pull environment variables
vercel env pull
```

---

## Getting Help

### 1. Check Vercel Logs
- Dashboard → Your Project → Deployments → Click deployment → View Function Logs

### 2. Browser DevTools
- Network tab: Check API requests/responses
- Console tab: Check for JavaScript errors
- Application tab: Check service workers/cache

### 3. Test Endpoints Directly
```bash
# Health check
curl -v https://your-api.vercel.app/api/health

# Get blogs
curl -v https://your-api.vercel.app/api/blogs | jq

# Get single blog
curl -v https://your-api.vercel.app/api/blogs?id=1 | jq
```

### 4. Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

---

## Still Stuck?

1. ✅ Follow [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) step-by-step
2. ✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
3. ✅ Check [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the setup
4. ✅ Open an issue in your GitHub repository with:
   - Error messages
   - Screenshots
   - Deployment URLs
   - Steps to reproduce

---

**Pro Tip**: Test everything locally before deploying to catch issues early! 🚀

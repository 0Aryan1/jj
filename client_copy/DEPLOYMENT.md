# Frontend Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Vercel CLI (optional, but recommended)

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the `client_copy` directory as the root
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**
   - In the deployment settings, add:
     - Key: `VITE_API_URL`
     - Value: `https://jj-39x3.vercel.app`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live!

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from client_copy directory**
   ```bash
   cd client_copy
   vercel
   ```

4. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_URL production
   # Enter: https://jj-39x3.vercel.app
   ```

5. **Redeploy with environment variable**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration Files

### `.env.production`
Already configured with your backend URL:
```
VITE_API_URL=https://jj-39x3.vercel.app
```

### `vercel.json`
Configured for SPA routing - all routes redirect to index.html

## 📝 Post-Deployment

After deployment:

1. **Test the connection**
   - Visit your deployed frontend URL
   - Check if blogs load correctly
   - Check browser console for any API errors

2. **CORS Check**
   - Make sure your backend at `https://jj-39x3.vercel.app` allows requests from your frontend domain
   - Backend should have proper CORS configuration

3. **Update Backend CORS (if needed)**
   If you get CORS errors, update your backend's `server/index.js` or `server/api/index.js` to include your frontend URL in allowed origins.

## 🐛 Troubleshooting

### API calls failing
- Check if `VITE_API_URL` is set correctly in Vercel dashboard
- Verify backend is accessible: https://jj-39x3.vercel.app/api/health
- Check browser console for CORS errors

### 404 on refresh
- Verify `vercel.json` is in the client_copy directory
- The rewrites configuration should handle SPA routing

### Build fails
- Check Node.js version compatibility
- Run `npm install` and `npm run build` locally first to verify

## 📱 Local Development

For local development:
```bash
npm install
npm run dev
```

The Vite proxy will handle API calls to localhost:4000 in development.

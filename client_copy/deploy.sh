#!/bin/bash

# Deployment script for JARGONAUT frontend

echo "🚀 JARGONAUT Frontend Deployment"
echo "================================"
echo ""
echo "Backend URL: https://jj-39x3.vercel.app"
echo ""
echo "Step 1: Building the project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed! Please fix errors and try again."
  exit 1
fi

echo "✅ Build successful!"
echo ""
echo "Step 2: Deploying to Vercel..."
echo ""
echo "You'll need to:"
echo "1. Login to Vercel (if not already logged in)"
echo "2. Select or create a project"
echo "3. Confirm deployment settings"
echo ""

# Deploy using npx vercel
npx vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "⚠️  Important: Set environment variable in Vercel Dashboard"
echo "   1. Go to your project settings on Vercel"
echo "   2. Navigate to Environment Variables"
echo "   3. Add: VITE_API_URL = https://jj-39x3.vercel.app"
echo "   4. Redeploy if needed"
echo ""

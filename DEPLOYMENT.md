# Deployment Guide for AI Resume Optimizer

This guide will help you deploy the AI Resume Optimizer to Vercel.

## Prerequisites

1. **Node.js and npm** installed on your machine
2. **Vercel CLI** installed globally: `npm install -g vercel`
3. **OpenAI API Key** from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI API Key (Required for AI features)
OPENAI_API_KEY=your_actual_openai_api_key_here

# Firebase Configuration (Optional - for cloud features)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Google Analytics (Optional)
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration (Update this with your Vercel domain after deployment)
CORS_ORIGIN=https://your-app-name.vercel.app
```

## Step 3: Test Locally

```bash
# Start the backend server
npm start

# In a new terminal, start the frontend
npm run dev
```

Visit `http://localhost:5173` to test the application.

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy the application**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `ai-resume-optimizer` (or your preferred name)
   - Directory: `.` (current directory)
   - Override settings: `N`

4. **Set environment variables**:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add CORS_ORIGIN
   ```

### Option B: Using Vercel Dashboard

1. **Push your code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add environment variables** in the Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CORS_ORIGIN`: Your Vercel domain (e.g., `https://your-app.vercel.app`)

## Step 5: Configure Environment Variables

After deployment, update the `CORS_ORIGIN` environment variable with your actual Vercel domain:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update `CORS_ORIGIN` to your actual domain (e.g., `https://your-app-name.vercel.app`)

## Step 6: Test the Deployment

1. Visit your Vercel domain
2. Test the AI optimization feature
3. Test all other features (export, templates, etc.)

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Make sure you've added the `OPENAI_API_KEY` environment variable in Vercel
   - Check that the API key is valid and has credits

2. **CORS errors**
   - Update the `CORS_ORIGIN` environment variable with your actual Vercel domain
   - Redeploy the application after updating environment variables

3. **Build errors**
   - Check that all dependencies are properly installed
   - Ensure TypeScript compilation passes locally

4. **API endpoint not found**
   - The `vercel.json` file should handle API routing
   - Make sure the server.js file is in the root directory

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for AI features |
| `CORS_ORIGIN` | Yes | Your Vercel domain for CORS |
| `REACT_APP_FIREBASE_*` | No | Firebase configuration for cloud features |
| `REACT_APP_GA_TRACKING_ID` | No | Google Analytics tracking ID |

## Production Checklist

- [ ] All environment variables are set in Vercel
- [ ] CORS_ORIGIN is updated with your actual domain
- [ ] OpenAI API key is valid and has credits
- [ ] All features are working (AI optimization, export, templates)
- [ ] Mobile responsiveness is tested
- [ ] Performance is acceptable

## Support

If you encounter issues:

1. Check the Vercel deployment logs
2. Test locally first to isolate issues
3. Check the browser console for errors
4. Verify all environment variables are set correctly

## Next Steps

After successful deployment:

1. Set up a custom domain (optional)
2. Configure Firebase for cloud features (optional)
3. Set up Google Analytics (optional)
4. Monitor performance and usage 
# Complete Setup Guide for AI Resume Optimizer

This guide will help you set up everything needed to run and deploy the AI Resume Optimizer.

## Prerequisites Installation

### 1. Install Node.js and npm

**Option A: Download from Official Website (Recommended)**
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening a new terminal/command prompt:
   ```bash
   node --version
   npm --version
   ```

**Option B: Using Chocolatey (Windows)**
```bash
choco install nodejs
```

**Option C: Using Homebrew (macOS)**
```bash
brew install node
```

### 2. Install Vercel CLI (for deployment)
```bash
npm install -g vercel
```

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# OpenAI API Key (Required for AI features)
# Get your API key from: https://platform.openai.com/api-keys
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
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Get OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key and add it to your `.env` file
5. **Important**: Keep your API key secure and never share it publicly

## Running the Application

### Development Mode

1. **Start the backend server**:
   ```bash
   npm start
   ```

2. **In a new terminal, start the frontend**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Deployment to Vercel

### 1. Prepare for Deployment

1. **Push your code to GitHub** (if not already done)
2. **Make sure your `.env` file is in `.gitignore`** (it should be)

### 2. Deploy Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: ai-resume-optimizer
# - Directory: . (current directory)
# - Override settings: N
```

### 3. Configure Environment Variables

After deployment, set up environment variables in Vercel:

```bash
# Add OpenAI API key
vercel env add OPENAI_API_KEY

# Add CORS origin (update with your actual domain)
vercel env add CORS_ORIGIN
```

### 4. Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables in the dashboard

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**
   - Install Node.js from [nodejs.org](https://nodejs.org)
   - Restart your terminal after installation

2. **"Module not found" errors**
   - Run `npm install` to install dependencies
   - Check that you're in the correct directory

3. **"OpenAI API key not configured"**
   - Add your API key to the `.env` file
   - Make sure the key is valid and has credits

4. **CORS errors**
   - Check that the backend server is running
   - Verify CORS_ORIGIN in your environment variables

5. **Build errors**
   - Check TypeScript compilation: `npm run build`
   - Fix any type errors before deployment

### Verification Steps

After setup, verify everything works:

1. **Backend**: `http://localhost:5000/api/health` should return `{"status":"OK"}`
2. **Frontend**: `http://localhost:5173` should load the application
3. **AI Features**: Test the AI optimization panel
4. **Export**: Test PDF and Word export
5. **Templates**: Test different resume templates

## File Structure

```
ai-resume-optimizer/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── services/          # API services
│   └── types/             # TypeScript types
├── server.js              # Backend server
├── package.json           # Dependencies and scripts
├── vercel.json            # Vercel configuration
├── .env                   # Environment variables (create this)
└── README.md              # Project documentation
```

## Next Steps

1. **Test all features** locally before deployment
2. **Deploy to Vercel** following the deployment guide
3. **Configure environment variables** in Vercel dashboard
4. **Test the deployed application**
5. **Set up optional features** (Firebase, Analytics)

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Check the browser console for errors
4. Ensure all environment variables are set correctly
5. Test locally before deploying

## Quick Start Commands

```bash
# Install Node.js (if not installed)
# Download from https://nodejs.org

# Install dependencies
npm install

# Start development servers
npm start          # Backend (port 5000)
npm run dev        # Frontend (port 5173)

# Build for production
npm run build

# Deploy to Vercel
vercel
``` 
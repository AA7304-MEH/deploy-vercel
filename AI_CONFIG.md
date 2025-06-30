# AI Configuration Guide

## 🔑 OpenAI API Key Setup

### Step 1: Get Your OpenAI API Key

1. **Visit OpenAI Platform**: Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Sign Up/Login**: Create an account or log in to your existing account
3. **Create API Key**: Click "Create new secret key"
4. **Copy the Key**: Copy the generated API key (it starts with `sk-`)

### Step 2: Configure Your Environment

#### Option A: Local Development (.env file)

Create a `.env` file in the root directory of your project:

```env
# OpenAI API Key (Required for AI features)
OPENAI_API_KEY=sk-your-actual-api-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

#### Option B: Vercel Deployment

1. **Go to Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select Your Project**: Choose your AI Resume Optimizer project
3. **Go to Settings**: Click on "Settings" tab
4. **Environment Variables**: Click on "Environment Variables"
5. **Add Variable**:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-your-actual-api-key-here`
   - **Environment**: Production (and Preview if needed)
6. **Save**: Click "Save" to apply the changes

### Step 3: Test Your Configuration

#### Local Testing
```bash
# Start the backend server
npm start

# In a new terminal, start the frontend
npm run dev
```

#### Verify AI Features
1. Open your application in the browser
2. Go to the Resume Editor
3. Click on "AI Optimization" button
4. Test the AI suggestions feature

### Step 4: Troubleshooting

#### Common Issues

**"OpenAI API key not configured"**
- Make sure you've added the API key to your `.env` file
- Check that the key starts with `sk-`
- Restart your server after adding the key

**"Invalid API key"**
- Verify your API key is correct
- Check that you have credits in your OpenAI account
- Ensure the key hasn't expired

**"Rate limit exceeded"**
- You've hit the OpenAI API rate limit
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan

#### API Key Security

⚠️ **Important Security Notes**:
- Never commit your API key to version control
- Keep your `.env` file in `.gitignore`
- Don't share your API key publicly
- Use environment variables in production

### Step 5: API Usage & Costs

#### OpenAI Pricing (as of 2024)
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **Typical resume analysis**: ~500-1000 tokens
- **Cost per analysis**: ~$0.001-0.002

#### Monitor Usage
1. Go to [https://platform.openai.com/usage](https://platform.openai.com/usage)
2. Check your current usage and billing
3. Set up usage alerts if needed

## 🚀 Quick Setup Commands

```bash
# Create .env file (Windows)
echo OPENAI_API_KEY=sk-your-key-here > .env

# Create .env file (Mac/Linux)
echo "OPENAI_API_KEY=sk-your-key-here" > .env

# Test configuration
npm start
```

## 📞 Support

If you need help with your OpenAI API key:

1. **OpenAI Support**: [https://help.openai.com](https://help.openai.com)
2. **API Documentation**: [https://platform.openai.com/docs](https://platform.openai.com/docs)
3. **Billing Support**: [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)

---

**Your AI Resume Optimizer is ready to use once you add your API key! 🎉** 
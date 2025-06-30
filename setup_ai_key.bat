@echo off
echo ========================================
echo    AI Resume Optimizer - API Key Setup
echo ========================================
echo.

echo This script will help you set up your OpenAI API key.
echo.

echo Step 1: Get your OpenAI API key
echo - Go to: https://platform.openai.com/api-keys
echo - Sign up or log in to your account
echo - Click "Create new secret key"
echo - Copy the key (it starts with sk-)
echo.

set /p api_key="Enter your OpenAI API key: "

if "%api_key%"=="" (
    echo Error: No API key provided.
    pause
    exit /b 1
)

echo.
echo Creating .env file with your API key...

(
echo # OpenAI API Key (Required for AI features)
echo OPENAI_API_KEY=%api_key%
echo.
echo # Server Configuration
echo PORT=5000
echo NODE_ENV=development
echo.
echo # CORS Configuration
echo CORS_ORIGIN=http://localhost:5173
) > .env

echo.
echo ✅ .env file created successfully!
echo.
echo Your API key has been saved to the .env file.
echo.
echo Next steps:
echo 1. Install dependencies: npm install
echo 2. Start the backend: npm start
echo 3. Start the frontend: npm run dev
echo.
echo ⚠️  Important: Keep your API key secure and never share it publicly!
echo.

pause 
@echo off
echo ========================================
echo    Adding Your OpenAI API Key
echo ========================================
echo.

echo Creating .env file with your API key...

(
echo # OpenAI API Key (Required for AI features)
echo OPENAI_API_KEY=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
echo.
echo # Firebase Configuration (Optional - for cloud features)
echo # REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
echo # REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
echo # REACT_APP_FIREBASE_PROJECT_ID=your_project_id
echo # REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
echo # REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
echo # REACT_APP_FIREBASE_APP_ID=your_app_id
echo.
echo # Google Analytics (Optional)
echo # REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
echo.
echo # Server Configuration
echo PORT=5000
echo NODE_ENV=development
echo.
echo # CORS Configuration
echo CORS_ORIGIN=http://localhost:5173
) > .env

echo.
echo ✅ .env file created successfully with your API key!
echo.
echo Your OpenAI API key has been added to the .env file.
echo.
echo Next steps:
echo 1. Install dependencies: npm install
echo 2. Start the backend: npm start
echo 3. Start the frontend: npm run dev
echo.
echo ⚠️  Important: Keep your API key secure and never share it publicly!
echo.

pause 
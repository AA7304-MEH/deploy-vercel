Write-Host "========================================" -ForegroundColor Green
Write-Host "   Adding Your OpenAI API Key" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Creating .env file with your API key..." -ForegroundColor Yellow

$envContent = @"
# OpenAI API Key (Required for AI features)
OPENAI_API_KEY=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

# Firebase Configuration (Optional - for cloud features)
# REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
# REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# REACT_APP_FIREBASE_APP_ID=your_app_id

# Google Analytics (Optional)
# REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ""
Write-Host "✅ .env file created successfully with your API key!" -ForegroundColor Green
Write-Host ""
Write-Host "Your OpenAI API key has been added to the .env file." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install dependencies: npm install" -ForegroundColor White
Write-Host "2. Start the backend: npm start" -ForegroundColor White
Write-Host "3. Start the frontend: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Important: Keep your API key secure and never share it publicly!" -ForegroundColor Red
Write-Host ""

Read-Host "Press Enter to continue" 
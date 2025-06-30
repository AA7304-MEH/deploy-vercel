# AI Resume Optimizer

A fully responsive AI-powered resume optimizer built with React, TypeScript, and Tailwind CSS. Create professional, ATS-friendly resumes that stand out to recruiters.

## 🚀 Features

### Core Features
- **AI-Powered Optimization**: Advanced AI analyzes your resume and provides personalized suggestions
- **Job-Specific Tailoring**: Optimize your resume for specific job descriptions and industries
- **Real-time Editing**: Edit your resume in real-time with instant preview
- **Multiple Export Formats**: Export as PDF, Word, or plain text
- **ATS-Friendly**: Ensure your resume passes through Applicant Tracking Systems
- **Professional Templates**: 8 different templates for various industries

### Advanced Features
- **Drag-and-Drop Section Reordering**: Customize the order of resume sections
- **Multi-language Support**: English, Spanish, French, and German
- **Cloud Storage**: Save and sync resumes across devices (Firebase)
- **Mobile-First Design**: Fully responsive and touch-friendly
- **Accessibility**: WCAG compliant with screen reader support
- **Analytics**: User behavior and performance tracking

### Ad Integration
- **Banner Ads**: Traditional banner advertisements strategically placed
- **Banner Ad 2**: Secondary banner ad placements for increased coverage
- **Banner Ad 3**: Third banner ad for optimal revenue distribution
- **Native Ads**: Seamlessly integrated content-relevant advertisements
- **Interstitial Ads**: Full-screen ads triggered by user actions
- **Strategic Placement**: Ads positioned for optimal user experience and revenue
- **Ad-Free Subscriptions**: Razorpay-powered premium plans to remove all ads

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + OpenAI API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Build Tool**: Vite
- **Additional**: React Router, Lucide Icons, React Hot Toast
- **Monetization**: Google AdSense integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Quick Start

### 1. Install Node.js (if not installed)
Download and install Node.js from [https://nodejs.org](https://nodejs.org)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
# OpenAI API Key (Required for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration (optional - for cloud features)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Google AdSense Configuration
VITE_ADSENSE_CLIENT_ID=ca-pub-1282864727438931~9403278883
VITE_ADSENSE_SLOT_ID=ca-pub-1282864727438931/1310818833

# Banner Ad 2 Configuration
VITE_ADSENSE_CLIENT_ID_2=ca-pub-1282864727438931~9403278883
VITE_ADSENSE_SLOT_ID_2=ca-pub-1282864727438931/1602462870

# Banner Ad 3 Configuration
VITE_ADSENSE_CLIENT_ID_3=ca-pub-1282864727438931~9403278883
VITE_ADSENSE_SLOT_ID_3=ca-pub-1282864727438931/3362267107

# Native Ad Configuration
VITE_ADSENSE_NATIVE_CLIENT_ID=ca-pub-1282864727438931~9403278883
VITE_ADSENSE_NATIVE_SLOT_ID=ca-pub-1282864727438931/1602462870

# Interstitial Ad Configuration
VITE_ADSENSE_INTERSTITIAL_CLIENT_ID=ca-pub-1282864727438931~9403278883
VITE_ADSENSE_INTERSTITIAL_SLOT_ID=ca-pub-1282864727438931/1602462870

# Google Analytics (optional)
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 4. Start the Development Server
```bash
# Start the backend
npm start

# In a separate terminal, start the frontend
npm run dev
```

### 5. Open Your Browser
Navigate to `http://localhost:5173` to view the application.

## 🔧 Configuration

### OpenAI API Setup
1. Sign up for an OpenAI account at [https://openai.com](https://openai.com)
2. Get your API key from the dashboard
3. Add it to your `.env` file

### Firebase Setup (Optional)
1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication and Firestore
3. Get your configuration from Project Settings
4. Add the configuration to your `.env` file

### Google AdSense Setup
1. Create an AdSense account at [https://www.google.com/adsense](https://www.google.com/adsense)
2. Get your publisher ID and ad unit IDs
3. Add the configuration to your `.env` file
4. Configure ad placements in the monetization service

## 📊 Ad Integration Details

### Ad Types and Placement

#### Banner Ads
- **Location**: Header, footer, and sidebar areas
- **Format**: Responsive auto-format
- **Client ID**: `ca-pub-1282864727438931~9403278883`
- **Slot ID**: `ca-pub-1282864727438931/1310818833`

#### Banner Ad 2
- **Location**: Secondary positions in content areas
- **Format**: Responsive auto-format
- **Client ID**: `ca-pub-1282864727438931~9403278883`
- **Slot ID**: `ca-pub-1282864727438931/1602462870`

#### Banner Ad 3
- **Location**: Strategic positions for optimal revenue
- **Format**: Responsive auto-format
- **Client ID**: `ca-pub-1282864727438931~9403278883`
- **Slot ID**: `ca-pub-1282864727438931/3362267107`
- **Placement Strategy**:
  - Home page: Middle content area, bottom of page
  - Resume Editor: Top of page, sidebar areas
  - Pricing page: Top of page, strategic content breaks

#### Native Ads
- **Location**: Content-relevant areas throughout the app
- **Format**: Native advanced format
- **Client ID**: `ca-pub-1282864727438931~9403278883`
- **Slot ID**: `ca-pub-1282864727438931/1602462870`
- **Placement Strategy**: 
  - Home page: After hero section, between features, before CTA
  - Resume Editor: In sidebar, content areas, preview section
  - Pricing page: After header, in middle content, before CTA

#### Interstitial Ads
- **Trigger**: User actions (save, export, AI optimize, subscribe)
- **Format**: Full-screen overlay
- **Client ID**: `ca-pub-1282864727438931~9403278883`
- **Slot ID**: `ca-pub-1282864727438931/1602462870`
- **Frequency Control**: Limited to prevent user experience degradation

### Ad Management
- **Service**: `src/services/monetization.ts`
- **Components**: 
  - `src/components/BannerAd.tsx`
  - `src/components/BannerAd2.tsx`
  - `src/components/BannerAd3.tsx`
  - `src/components/NativeAd.tsx`
  - `src/components/InterstitialAd.tsx`
- **Analytics**: Ad performance tracking integrated with Google Analytics

## 🚀 Deployment to Vercel

### Prerequisites
- Node.js and npm installed
- Vercel CLI: `npm install -g vercel`
- OpenAI API key

### Deployment Steps

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy the application**:
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CORS_ORIGIN`: Your Vercel domain (e.g., `https://your-app.vercel.app`)

4. **Test the deployment**:
   - Visit your Vercel domain
   - Test all features including AI optimization

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
src/
├── components/
│   ├── resume/           # Resume section components
│   ├── AIOptimizationPanel.tsx
│   ├── Header.tsx
│   ├── SectionOrderManager.tsx
│   └── AccessibleButton.tsx
├── pages/
│   ├── Home.tsx
│   └── ResumeEditor.tsx
├── contexts/
│   └── AuthContext.tsx   # Firebase authentication
├── services/
│   └── analytics.ts      # Analytics and tracking
├── config/
│   └── firebase.ts       # Firebase configuration
├── i18n/
│   ├── index.ts          # i18n setup
│   └── locales/          # Translation files
└── types/
    └── index.ts          # TypeScript type definitions
```

## 🎨 Available Templates

- **Modern**: Clean and contemporary design
- **Classic**: Traditional professional layout
- **Creative**: Bold and innovative styling
- **Minimal**: Simple and elegant
- **Professional**: Corporate and formal
- **Elegant**: Sophisticated and refined
- **Bold**: High-impact and attention-grabbing
- **Tech**: Technology-focused design

## 🌐 Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## ♿ Accessibility Features

- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation
- High contrast mode
- Reduced motion support
- Focus management
- ARIA labels and roles

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist folder to Netlify
```

## 🔧 Troubleshooting

### Common Issues

#### 1. "npm is not recognized"
**Solution**: Install Node.js from [https://nodejs.org](https://nodejs.org)

#### 2. "Module not found" errors
**Solution**: Run `npm install` to install dependencies

#### 3. Backend connection errors
**Solution**: Ensure the backend server is running with `npm start`

#### 4. OpenAI API errors
**Solution**: Check your API key in the `.env` file and ensure you have credits

#### 5. Firebase connection errors
**Solution**: Verify your Firebase configuration in the `.env` file

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server
npm start

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Complete setup instructions
- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Solution Summary](./SOLUTION_SUMMARY.md) - Technical implementation details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [setup guide](./SETUP_GUIDE.md)
3. Check the [deployment guide](./DEPLOYMENT.md)
4. Search existing [issues](../../issues)
5. Create a new issue with detailed information

## 🎯 Roadmap

- [ ] Advanced AI features
- [ ] More template options
- [ ] Resume scoring
- [ ] Job application tracking
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard

## 💳 Razorpay Ad-Free Subscription

### Plan Structure
- **Monthly Ad-Free**: ₹249/month (remove all ads)
- **Ad-Free Lifetime**: ₹999 one-time payment
- **Features**: Complete ad removal, renew/cancel functionality

### Frontend Components

#### AdFreeUpgrade Component
- **Location**: `src/components/AdFreeUpgrade.tsx`
- **Variants**: Button, Card, Banner
- **Features**: 
  - Upgrade to Ad-Free plans
  - Renew expired subscriptions
  - Cancel active subscriptions
  - Real-time status display

#### RazorpayCheckout Component
- **Location**: `src/components/RazorpayCheckout.tsx`
- **Features**:
  - Secure payment processing
  - Test mode support
  - Payment verification
  - Error handling

#### AdConditional Component
- **Location**: `src/components/AdConditional.tsx`
- **Purpose**: Conditionally show/hide ads based on subscription status
- **Usage**: Wraps ad components to respect Ad-Free status

### Backend API Routes

#### Payment Processing
```javascript
POST /api/razorpay/create-order
POST /api/razorpay/verify-payment
POST /api/razorpay/renew-subscription
POST /api/razorpay/cancel-subscription
```

#### Subscription Management
```javascript
GET /api/subscription/:userId
PUT /api/subscription/:userId
POST /api/razorpay/webhook
```

### Environment Variables
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
```

### Test Mode Setup
- **Test Card**: 4111 1111 1111 1111
- **Any Future Date**: Expiry date
- **Any CVV**: 3-digit code
- **Environment**: Development mode

### Webhook Events
- `payment.captured`: Payment successful
- `subscription.charged`: Monthly renewal
- `subscription.cancelled`: Subscription cancelled

### Implementation Features

#### Subscription Status Management
- Real-time status checking
- Automatic expiration handling
- Graceful degradation for expired plans
- Persistent subscription data

#### User Experience
- Seamless upgrade flow
- Clear pricing display
- Easy renewal process
- Simple cancellation

#### Security
- Payment signature verification
- Webhook signature validation
- Secure API endpoints
- Error handling and logging

### Usage Examples

#### Adding Ad-Free Upgrade Button
```jsx
import AdFreeUpgrade from '../components/AdFreeUpgrade'

<AdFreeUpgrade variant="button" />
```

#### Conditional Ad Display
```jsx
import AdConditional from '../components/AdConditional'

<AdConditional>
  <BannerAd />
</AdConditional>
```

#### Subscription Status Check
```jsx
import { useSubscription } from '../contexts/SubscriptionContext'

const { subscription, checkAdFreeStatus } = useSubscription()
const isAdFree = await checkAdFreeStatus()
```

### Deployment Checklist

1. **Razorpay Account Setup**
   - Create Razorpay account
   - Get API keys (test/live)
   - Configure webhook URL
   - Set webhook secret

2. **Environment Configuration**
   - Add Razorpay keys to environment
   - Configure webhook endpoint
   - Set up test mode

3. **Database Integration**
   - Replace in-memory storage with database
   - Add subscription table
   - Implement proper data persistence

4. **Testing**
   - Test payment flow
   - Verify webhook handling
   - Test subscription renewal
   - Test cancellation flow

5. **Production Setup**
   - Switch to live Razorpay keys
   - Configure production webhook
   - Set up monitoring and logging
   - Implement proper error handling

---

**Made with ❤️ by the AI Resume Optimizer Team** 
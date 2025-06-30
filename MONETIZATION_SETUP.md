# Monetization Setup Guide

This guide will help you set up contact-based subscriptions and Google AdSense for your AI Resume Optimizer.

## 📧 Contact-Based Subscription Setup

### Step 1: Configure Contact Form

The app now uses a contact form for subscription requests. When users click "Subscribe", they'll fill out a form with their name and email, and you'll contact them to complete the subscription process.

### Step 2: Update Pricing Configuration

Edit `src/config/pricing.ts` to customize your pricing plans:

```typescript
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    description: 'Perfect for getting started',
    features: [
      '5 AI optimizations per month',
      'Basic templates',
      'PDF export',
      'Email support'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    currency: 'USD',
    interval: 'month',
    description: 'Great for job seekers',
    popular: true,
    features: [
      'Unlimited AI optimizations',
      'All premium templates',
      'PDF & Word export',
      'Cloud storage',
      'Priority support'
    ]
  }
];
```

### Step 3: Handle Subscription Requests

When users submit the contact form, you'll receive their information. You can:

1. **Set up email notifications** to receive subscription requests
2. **Integrate with a CRM** to track leads
3. **Use a payment processor** of your choice (PayPal, Square, etc.)
4. **Manual invoicing** for enterprise clients

## 📺 Google AdSense Setup

### Step 1: Create AdSense Account

1. **Sign up for AdSense**: Go to [https://www.google.com/adsense](https://www.google.com/adsense)
2. **Complete account setup**: Verify your website and identity
3. **Wait for approval** (usually 1-2 weeks)

### Step 2: Get AdSense Code

1. **Go to AdSense Dashboard**: Ads → By ad unit
2. **Create ad units** for different placements:
   - Header Banner
   - Sidebar Rectangle
   - Footer Banner

3. **Copy the ad code** and note the client ID and slot IDs

### Step 3: Configure AdSense

Update your `.env` file with AdSense details:

```env
# Google AdSense
VITE_ADSENSE_CLIENT_ID=ca-pub-your_client_id_here
VITE_ADSENSE_SLOT_ID=your_slot_id_here
```

### Step 4: Update Ad Placements

In `src/services/monetization.ts`, update the slot IDs:

```typescript
static getAdPlacements() {
  return {
    header: {
      clientId: this.getClientId(),
      slotId: 'your_header_slot_id',
      format: 'auto',
      responsive: true,
    },
    sidebar: {
      clientId: this.getClientId(),
      slotId: 'your_sidebar_slot_id',
      format: 'rectangle',
      responsive: false,
    },
    footer: {
      clientId: this.getClientId(),
      slotId: 'your_footer_slot_id',
      format: 'auto',
      responsive: true,
    },
  };
}
```

## 💰 Pricing Strategy

### Recommended Pricing

| Plan | Price | Features | Target Audience |
|------|-------|----------|-----------------|
| **Free** | $0/month | 5 AI optimizations, Basic templates, PDF export | New users |
| **Basic** | $9.99/month | Unlimited AI, All templates, Cloud storage | Job seekers |
| **Professional** | $19.99/month | Team features, API access, White-label | HR teams, Agencies |

### Revenue Projections

**Monthly Revenue Calculator**:
- 100 Basic subscribers: $999
- 50 Professional subscribers: $999
- **Total: $1,998/month**

**Ad Revenue** (estimated):
- 10,000 page views/month: $50-200
- 100,000 page views/month: $500-2,000

## 🚀 Implementation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy your API keys to .env file
cp env.example .env
# Edit .env with your actual keys
```

### 3. Test the Application
```bash
# Start the application
npm start
npm run dev

# Test the contact form on the pricing page
```

### 4. Deploy to Production
```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

## 🔧 Advanced Configuration

### Custom Pricing Plans

Edit `src/config/pricing.ts` to customize pricing:

```typescript
export const PRICING_PLANS = [
  {
    id: 'custom',
    name: 'Custom Plan',
    price: 29.99,
    currency: 'USD',
    interval: 'month',
    description: 'For custom requirements',
    features: [
      'Custom feature 1',
      'Custom feature 2',
    ]
  }
];
```

### Ad Placement Control

Control where ads appear in `src/services/monetization.ts`:

```typescript
static shouldShowAds(): boolean {
  // Only show ads to non-subscribers
  return !this.hasActiveSubscription();
  
  // Or show ads on specific pages
  return window.location.pathname === '/pricing';
}
```

### Analytics Integration

Track monetization events:

```typescript
// Track subscription interest
MonetizationAnalytics.trackPaymentAttempt('pro', 1999);

// Track successful subscriptions
MonetizationAnalytics.trackPaymentSuccess('pro', 1999);

// Track ad views
MonetizationAnalytics.trackAdView('header');
```

## 📊 Monitoring & Analytics

### Contact Form Analytics
- Monitor subscription request volume
- Track conversion rates
- Analyze user interest by plan

### AdSense Dashboard
- Track ad performance
- Monitor revenue
- Optimize ad placements

### Custom Analytics
- Track feature usage
- Monitor conversion rates
- Analyze user behavior

## 🛡️ Security & Compliance

### Privacy Compliance
- AdSense privacy policy required
- GDPR compliance for EU users
- Cookie consent for ads

### Data Protection
- Encrypt sensitive data
- Secure API endpoints
- Regular security audits

## 🆘 Troubleshooting

### Common Contact Form Issues
- **Form not submitting**: Check network connectivity
- **No email notifications**: Verify email configuration
- **Spam submissions**: Implement CAPTCHA or rate limiting

### Common AdSense Issues
- **Ads not showing**: Check account approval status
- **Low revenue**: Optimize ad placements and content
- **Policy violations**: Review AdSense policies

## 📈 Optimization Tips

### Increase Revenue
1. **A/B test pricing**: Try different price points
2. **Feature gating**: Limit free features
3. **Upselling**: Promote higher-tier plans
4. **Retention**: Offer annual discounts

### Improve Ad Performance
1. **Strategic placement**: Above-the-fold ads perform better
2. **Content optimization**: High-quality content attracts better ads
3. **User experience**: Don't overwhelm with ads
4. **Mobile optimization**: Ensure ads work on mobile

### Subscription Process Optimization
1. **Quick response**: Respond to contact form submissions within 24 hours
2. **Clear communication**: Provide clear pricing and payment options
3. **Follow-up**: Send reminder emails for pending subscriptions
4. **Customer support**: Offer excellent support to retain customers

---

**Your AI Resume Optimizer is now ready to generate revenue! 🎉** 
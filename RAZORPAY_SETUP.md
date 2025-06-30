# Razorpay Ad-Free Subscription Setup Guide

This guide will help you set up the Razorpay integration for Ad-Free subscriptions in your AI Resume Optimizer app.

## 🚀 Quick Start

### 1. Razorpay Account Setup

1. **Create Razorpay Account**
   - Visit [https://razorpay.com](https://razorpay.com)
   - Sign up for a business account
   - Complete KYC verification

2. **Get API Keys**
   - Go to Settings → API Keys
   - Copy your Key ID and Key Secret
   - Note: Use test keys for development

3. **Configure Webhook**
   - Go to Settings → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/razorpay/webhook`
   - Select events: `payment.captured`, `subscription.charged`, `subscription.cancelled`
   - Copy the webhook secret

### 2. Environment Configuration

Add these variables to your `.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Install Dependencies

```bash
npm install razorpay
```

### 4. Test Mode Setup

For testing, use these credentials:
- **Test Card**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **Name**: Any name

## 📋 Implementation Details

### Frontend Components

#### AdFreeUpgrade Component
```jsx
import AdFreeUpgrade from '../components/AdFreeUpgrade'

// Button variant
<AdFreeUpgrade variant="button" />

// Card variant
<AdFreeUpgrade variant="card" />

// Banner variant
<AdFreeUpgrade variant="banner" />
```

#### RazorpayCheckout Component
```jsx
import RazorpayCheckout from '../components/RazorpayCheckout'

<RazorpayCheckout 
  planType="monthly" 
  onSuccess={handleSuccess}
  onClose={handleClose}
/>
```

#### AdConditional Component
```jsx
import AdConditional from '../components/AdConditional'

<AdConditional>
  <BannerAd />
</AdConditional>
```

### Backend API Endpoints

#### Create Order
```javascript
POST /api/razorpay/create-order
{
  "amount": 24900,
  "currency": "INR",
  "planType": "monthly",
  "userId": "user123"
}
```

#### Verify Payment
```javascript
POST /api/razorpay/verify-payment
{
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature",
  "planType": "monthly",
  "userId": "user123"
}
```

#### Renew Subscription
```javascript
POST /api/razorpay/renew-subscription
{
  "userId": "user123",
  "planType": "monthly"
}
```

#### Cancel Subscription
```javascript
POST /api/razorpay/cancel-subscription
{
  "userId": "user123"
}
```

### Subscription Management

#### Get Subscription Status
```javascript
GET /api/subscription/:userId
```

#### Update Subscription
```javascript
PUT /api/subscription/:userId
{
  "isAdFree": true,
  "planType": "monthly",
  "expiresAt": "2024-02-01T00:00:00.000Z"
}
```

## 🔧 Configuration Options

### Plan Pricing
Edit the plan details in `src/components/RazorpayCheckout.tsx`:

```javascript
const planDetails = {
  monthly: {
    name: 'Ad-Free Monthly',
    amount: 24900, // ₹249 in paise
    description: 'Remove all ads for 1 month',
    duration: '1 month'
  },
  lifetime: {
    name: 'Ad-Free Lifetime',
    amount: 99900, // ₹999 in paise
    description: 'Remove all ads forever',
    duration: 'Lifetime'
  }
}
```

### Webhook Events
Configure webhook handling in `server.js`:

```javascript
switch (event) {
  case 'payment.captured':
    // Handle successful payment
    break
  case 'subscription.charged':
    // Handle monthly renewal
    break
  case 'subscription.cancelled':
    // Handle cancellation
    break
}
```

## 🧪 Testing

### 1. Test Payment Flow
1. Start your development server
2. Navigate to any page with Ad-Free upgrade
3. Click "Upgrade to Ad-Free"
4. Use test card: 4111 1111 1111 1111
5. Complete payment
6. Verify subscription status

### 2. Test Webhook
1. Use ngrok to expose local server
2. Update webhook URL in Razorpay dashboard
3. Make test payment
4. Check webhook logs

### 3. Test Subscription Management
1. Test renewal flow
2. Test cancellation flow
3. Verify ad display logic
4. Check expiration handling

## 🚀 Production Deployment

### 1. Switch to Live Keys
```env
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=your_live_key_secret
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
```

### 2. Database Integration
Replace in-memory storage with database:

```javascript
// Example with MongoDB
const subscription = await Subscription.findOne({ userId })
await Subscription.updateOne({ userId }, { $set: updateData })
```

### 3. Error Handling
Add comprehensive error handling:

```javascript
try {
  // Payment processing
} catch (error) {
  console.error('Payment error:', error)
  // Send notification to admin
  // Log to monitoring service
}
```

### 4. Monitoring
Set up monitoring for:
- Payment success/failure rates
- Webhook delivery status
- Subscription metrics
- Error rates

## 🔒 Security Considerations

### 1. Signature Verification
Always verify Razorpay signatures:

```javascript
const isValid = verifySignature(orderId, paymentId, signature)
if (!isValid) {
  return res.status(400).json({ error: 'Invalid signature' })
}
```

### 2. Webhook Security
- Use HTTPS for webhook URLs
- Verify webhook signatures
- Implement idempotency
- Add rate limiting

### 3. API Security
- Validate all input data
- Implement proper authentication
- Use environment variables for secrets
- Add request logging

## 📊 Analytics & Monitoring

### 1. Payment Analytics
Track key metrics:
- Conversion rates
- Revenue per user
- Churn rates
- Payment success rates

### 2. User Behavior
Monitor:
- Upgrade funnel
- Cancellation reasons
- Renewal patterns
- Feature usage

### 3. Technical Monitoring
- API response times
- Error rates
- Webhook delivery
- Database performance

## 🆘 Troubleshooting

### Common Issues

#### Payment Fails
- Check API keys
- Verify amount format (in paise)
- Check currency code
- Validate order creation

#### Webhook Not Received
- Verify webhook URL
- Check webhook secret
- Ensure HTTPS endpoint
- Check server logs

#### Subscription Not Updated
- Verify payment verification
- Check database connection
- Validate user ID
- Check API response

#### Ads Still Showing
- Verify subscription status
- Check AdConditional component
- Clear browser cache
- Check loading states

### Debug Mode
Enable debug logging:

```javascript
console.log('Payment details:', paymentData)
console.log('Subscription status:', subscription)
console.log('Webhook payload:', req.body)
```

## 📞 Support

For issues with:
- **Razorpay Integration**: Check Razorpay documentation
- **Payment Processing**: Contact Razorpay support
- **App Implementation**: Check this guide and code comments

## 🔄 Updates & Maintenance

### Regular Tasks
- Monitor payment success rates
- Check webhook delivery
- Update dependencies
- Review security settings
- Analyze user feedback

### Version Updates
- Keep Razorpay SDK updated
- Test with new features
- Update documentation
- Monitor breaking changes

---

**Note**: This implementation uses in-memory storage for demo purposes. For production, replace with a proper database solution. 
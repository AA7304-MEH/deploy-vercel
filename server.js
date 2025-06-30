import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from 'path';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// In-memory storage for demo (replace with database in production)
const subscriptions = new Map();
const orders = new Map();

// Helper function to verify Razorpay signature
const verifySignature = (orderId, paymentId, signature) => {
  const text = orderId + '|' + paymentId;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');
  
  return generatedSignature === signature;
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/optimize-resume', async (req, res) => {
  const { resume, jobDescription } = req.body;
  
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' 
    });
  }

  if (!resume) {
    return res.status(400).json({ error: 'Resume data is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional resume coach with expertise in ATS optimization and job market trends. Provide specific, actionable suggestions to improve the resume for the given job description.' 
          },
          { 
            role: 'user', 
            content: `Here is my resume: ${resume}\n\nHere is the job description: ${jobDescription || 'No specific job description provided'}\n\nPlease provide detailed, actionable suggestions to optimize my resume for this job. Focus on:\n1. Keywords and skills alignment\n2. Experience descriptions\n3. Formatting and structure\n4. ATS optimization\n5. Impact and achievements` 
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    if (response.data.choices && response.data.choices[0]) {
      res.json({ suggestions: response.data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'No response from OpenAI API' });
    }
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid OpenAI API key' });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: 'OpenAI API rate limit exceeded. Please try again later.' });
    } else if (error.code === 'ECONNABORTED') {
      res.status(408).json({ error: 'Request timeout. Please try again.' });
    } else {
      res.status(500).json({ 
        error: 'Failed to get AI suggestions. Please check your API key and try again.',
        details: error.message 
      });
    }
  }
});

// Create Razorpay order
app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency, planType, userId, isRenewal } = req.body

    if (!amount || !currency || !planType || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      })
    }

    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: isRenewal ? `renewal_${Date.now()}_${userId}` : `order_${Date.now()}_${userId}`,
      notes: {
        planType: planType,
        userId: userId,
        isRenewal: isRenewal || false
      }
    }

    const order = await razorpay.orders.create(options)
    
    // Store order details
    orders.set(order.id, {
      ...order,
      planType,
      userId,
      isRenewal: isRenewal || false,
      createdAt: new Date().toISOString()
    })

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      isRenewal: isRenewal || false
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order' 
    })
  }
})

// Verify payment
app.post('/api/razorpay/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      planType,
      userId 
    } = req.body;

    // Verify signature
    const isValid = verifySignature(
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
    }

    // Get order details
    const order = orders.get(razorpay_order_id);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Calculate expiration date
    const expiresAt = planType === 'lifetime' 
      ? null 
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    // Update subscription
    const subscription = {
      isAdFree: true,
      planType: planType,
      expiresAt: expiresAt,
      paymentId: razorpay_payment_id,
      createdAt: new Date().toISOString(),
      cancelledAt: null
    };

    subscriptions.set(userId, subscription);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      subscription: subscription
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify payment' 
    });
  }
});

// Renew subscription
app.post('/api/razorpay/renew-subscription', async (req, res) => {
  try {
    const { userId, planType } = req.body;

    if (!userId || !planType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Create new order for renewal
    const amount = planType === 'monthly' ? 24900 : 99900 // in paise
    
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `renewal_${Date.now()}_${userId}`,
      notes: {
        planType: planType,
        userId: userId,
        type: 'renewal'
      }
    };

    const order = await razorpay.orders.create(options);
    
    // Store order details
    orders.set(order.id, {
      ...order,
      planType,
      userId,
      type: 'renewal',
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error creating renewal order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create renewal order' 
    });
  }
});

// Cancel subscription
app.post('/api/razorpay/cancel-subscription', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing user ID' 
      });
    }

    const subscription = subscriptions.get(userId);
    if (!subscription) {
      return res.status(404).json({ 
        success: false, 
        message: 'Subscription not found' 
      });
    }

    // Mark subscription as cancelled
    subscription.cancelledAt = new Date().toISOString();
    subscriptions.set(userId, subscription);

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: subscription
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to cancel subscription' 
    });
  }
});

// Get subscription status
app.get('/api/subscription/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const subscription = subscriptions.get(userId) || null;

    res.json({
      success: true,
      subscription: subscription
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch subscription' 
    });
  }
});

// Update subscription status
app.put('/api/subscription/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const existingSubscription = subscriptions.get(userId) || {};
    const updatedSubscription = { ...existingSubscription, ...updateData };
    
    subscriptions.set(userId, updatedSubscription);

    res.json({
      success: true,
      subscription: updatedSubscription
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update subscription' 
    });
  }
});

// Razorpay webhook handler
app.post('/api/razorpay/webhook', (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    const signature = req.headers['x-razorpay-signature']
    
    // Verify webhook signature
    const text = JSON.stringify(req.body)
    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(text)
      .digest('hex')
    
    if (generatedSignature !== signature) {
      console.error('Invalid webhook signature')
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid webhook signature' 
      })
    }

    const event = req.body.event
    const payload = req.body.payload

    console.log('Webhook received:', event, payload)

    switch (event) {
      case 'payment.captured':
        console.log('Payment captured:', payload.payment.entity)
        // Handle successful payment
        handlePaymentCaptured(payload.payment.entity)
        break
      
      case 'subscription.charged':
        console.log('Subscription charged:', payload.subscription.entity)
        // Handle subscription renewal
        handleSubscriptionCharged(payload.subscription.entity)
        break
      
      case 'subscription.cancelled':
        console.log('Subscription cancelled:', payload.subscription.entity)
        // Handle subscription cancellation
        handleSubscriptionCancelled(payload.subscription.entity)
        break
      
      case 'subscription.activated':
        console.log('Subscription activated:', payload.subscription.entity)
        // Handle subscription activation
        handleSubscriptionActivated(payload.subscription.entity)
        break
      
      case 'subscription.completed':
        console.log('Subscription completed:', payload.subscription.entity)
        // Handle subscription completion
        handleSubscriptionCompleted(payload.subscription.entity)
        break
      
      default:
        console.log('Unhandled webhook event:', event)
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Webhook processing failed' 
    })
  }
})

// Handle payment captured event
const handlePaymentCaptured = (paymentEntity) => {
  try {
    const { id, order_id, amount, currency, email, contact } = paymentEntity
    
    console.log(`Payment ${id} captured for order ${order_id}`)
    console.log(`Amount: ${amount} ${currency}`)
    console.log(`Customer: ${email} (${contact})`)
    
    // You can add additional payment processing logic here
    // For example, sending confirmation emails, updating analytics, etc.
    
  } catch (error) {
    console.error('Error handling payment captured:', error)
  }
}

// Handle subscription charged event (renewal)
const handleSubscriptionCharged = (subscriptionEntity) => {
  try {
    const { 
      id, 
      customer_id, 
      plan_id, 
      current_start, 
      current_end,
      status,
      charge_at,
      total_count,
      paid_count 
    } = subscriptionEntity
    
    console.log(`Subscription ${id} charged for customer ${customer_id}`)
    console.log(`Plan: ${plan_id}, Status: ${status}`)
    console.log(`Period: ${current_start} to ${current_end}`)
    console.log(`Charged at: ${charge_at}`)
    console.log(`Progress: ${paid_count}/${total_count}`)
    
    // Renew ad-free subscription in database
    renewAdFreeSubscription(customer_id, subscriptionEntity)
    
  } catch (error) {
    console.error('Error handling subscription charged:', error)
  }
}

// Handle subscription cancelled event
const handleSubscriptionCancelled = (subscriptionEntity) => {
  try {
    const { 
      id, 
      customer_id, 
      status, 
      cancelled_at,
      ended_at 
    } = subscriptionEntity
    
    console.log(`Subscription ${id} cancelled for customer ${customer_id}`)
    console.log(`Cancelled at: ${cancelled_at}, Ended at: ${ended_at}`)
    
    // Cancel ad-free subscription in database
    cancelAdFreeSubscription(customer_id, subscriptionEntity)
    
  } catch (error) {
    console.error('Error handling subscription cancelled:', error)
  }
}

// Handle subscription activated event
const handleSubscriptionActivated = (subscriptionEntity) => {
  try {
    const { 
      id, 
      customer_id, 
      plan_id, 
      status,
      started_at 
    } = subscriptionEntity
    
    console.log(`Subscription ${id} activated for customer ${customer_id}`)
    console.log(`Plan: ${plan_id}, Started at: ${started_at}`)
    
    // Activate ad-free subscription in database
    activateAdFreeSubscription(customer_id, subscriptionEntity)
    
  } catch (error) {
    console.error('Error handling subscription activated:', error)
  }
}

// Handle subscription completed event
const handleSubscriptionCompleted = (subscriptionEntity) => {
  try {
    const { 
      id, 
      customer_id, 
      status, 
      ended_at 
    } = subscriptionEntity
    
    console.log(`Subscription ${id} completed for customer ${customer_id}`)
    console.log(`Ended at: ${ended_at}`)
    
    // Handle subscription completion in database
    completeAdFreeSubscription(customer_id, subscriptionEntity)
    
  } catch (error) {
    console.error('Error handling subscription completed:', error)
  }
}

// Renew ad-free subscription in database
const renewAdFreeSubscription = (customerId, subscriptionEntity) => {
  try {
    // Calculate new expiration date (30 days from current_end)
    const currentEnd = new Date(subscriptionEntity.current_end * 1000)
    const newExpirationDate = new Date(currentEnd.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    // Update subscription in database
    const updatedSubscription = {
      isAdFree: true,
      planType: 'monthly',
      expiresAt: newExpirationDate.toISOString(),
      paymentId: subscriptionEntity.id,
      lastRenewalAt: new Date().toISOString(),
      renewalCount: (subscriptions.get(customerId)?.renewalCount || 0) + 1,
      subscriptionId: subscriptionEntity.id,
      status: 'active'
    }
    
    // Update in-memory storage (replace with database in production)
    subscriptions.set(customerId, {
      ...subscriptions.get(customerId),
      ...updatedSubscription
    })
    
    console.log(`Ad-free subscription renewed for customer ${customerId}`)
    console.log(`New expiration: ${newExpirationDate.toISOString()}`)
    
    // You can add additional logic here:
    // - Send renewal confirmation email
    // - Update analytics
    // - Log renewal event
    // - Trigger notifications
    
  } catch (error) {
    console.error('Error renewing ad-free subscription:', error)
  }
}

// Cancel ad-free subscription in database
const cancelAdFreeSubscription = (customerId, subscriptionEntity) => {
  try {
    // Update subscription status to cancelled
    const updatedSubscription = {
      isAdFree: false,
      planType: null,
      expiresAt: new Date(subscriptionEntity.ended_at * 1000).toISOString(),
      cancelledAt: new Date().toISOString(),
      subscriptionId: subscriptionEntity.id,
      status: 'cancelled'
    }
    
    // Update in-memory storage (replace with database in production)
    subscriptions.set(customerId, {
      ...subscriptions.get(customerId),
      ...updatedSubscription
    })
    
    console.log(`Ad-free subscription cancelled for customer ${customerId}`)
    
    // You can add additional logic here:
    // - Send cancellation confirmation email
    // - Update analytics
    // - Log cancellation event
    // - Trigger notifications
    
  } catch (error) {
    console.error('Error cancelling ad-free subscription:', error)
  }
}

// Activate ad-free subscription in database
const activateAdFreeSubscription = (customerId, subscriptionEntity) => {
  try {
    // Calculate expiration date (30 days from start)
    const startDate = new Date(subscriptionEntity.started_at * 1000)
    const expirationDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    // Create new subscription in database
    const newSubscription = {
      isAdFree: true,
      planType: 'monthly',
      expiresAt: expirationDate.toISOString(),
      paymentId: subscriptionEntity.id,
      createdAt: new Date().toISOString(),
      subscriptionId: subscriptionEntity.id,
      status: 'active'
    }
    
    // Store in-memory storage (replace with database in production)
    subscriptions.set(customerId, newSubscription)
    
    console.log(`Ad-free subscription activated for customer ${customerId}`)
    console.log(`Expiration: ${expirationDate.toISOString()}`)
    
    // You can add additional logic here:
    // - Send welcome email
    // - Update analytics
    // - Log activation event
    // - Trigger notifications
    
  } catch (error) {
    console.error('Error activating ad-free subscription:', error)
  }
}

// Complete ad-free subscription in database
const completeAdFreeSubscription = (customerId, subscriptionEntity) => {
  try {
    // Update subscription status to completed
    const updatedSubscription = {
      isAdFree: false,
      planType: null,
      expiresAt: new Date(subscriptionEntity.ended_at * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      subscriptionId: subscriptionEntity.id,
      status: 'completed'
    }
    
    // Update in-memory storage (replace with database in production)
    subscriptions.set(customerId, {
      ...subscriptions.get(customerId),
      ...updatedSubscription
    })
    
    console.log(`Ad-free subscription completed for customer ${customerId}`)
    
    // You can add additional logic here:
    // - Send completion email
    // - Update analytics
    // - Log completion event
    // - Trigger notifications
    
  } catch (error) {
    console.error('Error completing ad-free subscription:', error)
  }
}

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Razorpay integration enabled`);
  console.log(`Test mode: ${process.env.NODE_ENV === 'development' ? 'Yes' : 'No'}`);
});

export default app; 
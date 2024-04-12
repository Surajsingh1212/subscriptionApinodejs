const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');
const Payment = require('../models/paymentHistoryModel'); 
const razorpayHelper = require('../helpers/razorpayHelper');

async function chooseSubscriptionPlan(req, res) {
  const { userId, plan } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's subscription plan
    user.subscriptionPlan = plan;
    await user.save();

    // Create a subscription record
    const newSubscription = new Subscription({
      userId: userId,
      plan: plan
    });
    await newSubscription.save();

    // Create Razorpay order for payment
    const order = await razorpayHelper.createOrder(plan);

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Error choosing subscription plan:', error);
    res.status(500).json({ message: 'Failed to choose subscription plan' });
  }
}

async function recordPaymentStatus(req, res) {
  const { userId, plan, paymentId, status } = req.body;

  try {
    // Create a new payment record
    const newPayment = new Payment({
      userId: userId,
      plan: plan,
      paymentId: paymentId,
      status: status // 'success' or 'failed'
    });
    await newPayment.save();

    res.json({ message: 'Payment status recorded successfully' });
  } catch (error) {
    console.error('Error recording payment status:', error);
    res.status(500).json({ message: 'Failed to record payment status' });
  }
}

module.exports = {
  chooseSubscriptionPlan,
  recordPaymentStatus
};

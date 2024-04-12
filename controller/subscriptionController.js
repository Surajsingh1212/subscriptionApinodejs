const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');
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

module.exports = {
  chooseSubscriptionPlan
};

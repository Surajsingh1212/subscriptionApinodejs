// helpers/razorpayHelper.js

const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function createOrder(plan) {
  let amount;

  switch (plan) {
    case '1month':
      amount = 100; // ₹100 in paisa (100 * 100)
      break;
    case '6months':
      amount = 500; // ₹500 in paisa (500 * 100)
      break;
    case '1year':
      amount = 1000; // ₹1000 in paisa (1000 * 100)
      break;
    default:
      throw new Error('Invalid subscription plan');
  }

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: `subscription_${Date.now()}`
  };

  return razorpay.orders.create(options);
}

module.exports = {
  createOrder
};

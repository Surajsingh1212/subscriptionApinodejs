const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscriptionController');

// POST /api/subscriptions/choose-plan
router.post('/choose-plan', subscriptionController.chooseSubscriptionPlan);

module.exports = router;
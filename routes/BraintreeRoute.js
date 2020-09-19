const express = require('express');
const BrainTreeController = require('../controllers/BrainTreeController');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.route('/get-token/:userId').get(isAuthenticated, BrainTreeController.generateToken);
router.route('/payment/:userId').post(isAuthenticated, BrainTreeController.processPaymentCheckout);



module.exports = router;
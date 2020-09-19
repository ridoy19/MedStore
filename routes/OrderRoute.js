const Order = require('../models/order');
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');

router.route('/place-order/:userId').post(isAuthenticated, OrderController.placeOrder);
router.route('/orders-list/:userId').get(isAuthenticated, isAdmin, OrderController.listOrders);
// TO-DO (work with the below routes)
router.route('/update-order/:orderId/:userId').put(isAuthenticated, isAdmin, OrderController.updateOrder);


module.exports = router;
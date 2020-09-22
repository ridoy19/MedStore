const Order = require('../models/order');
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');

router.route('/place-order/:userId').post(isAuthenticated, OrderController.placeOrder);
router.route('/orders-list').get(isAuthenticated, isAdmin, OrderController.listOrders);
// TO-DO (work with the below routes)
router.route('/update-order/:orderId/:userId').put(isAuthenticated, isAdmin, OrderController.updateOrder);
router.route('/:orderId').get(isAuthenticated, OrderController.getSingleOrder);
router.route('/remove-order/:orderId').delete(isAuthenticated, isAdmin, OrderController.deleteOrder);


module.exports = router;
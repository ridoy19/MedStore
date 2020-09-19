const express = require('express');
const CartController = require('../controllers/CartController')

const router = express.Router();

router.route('/:cartId').get(CartController.getCart).delete(CartController.deleteCart);
router.route('/add').post(CartController.addToCart);
router.route('/update/:cartId').put(CartController.updateCart);
router.route('/delete-item/:cartId/:productId').delete(CartController.removeCartItem)
router.route('/delete-carts').delete(CartController.deleteAllCart);


module.exports = router;
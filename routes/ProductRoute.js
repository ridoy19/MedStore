const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const isAuthenticated = require('../middleware/isAuthenticated')


router.route('/add-product/:userId').post(isAuthenticated, /*isAdmin,*/ ProductController.addProduct);
router.route('/:productId').get(ProductController.getProductById);
router.route('/').get(ProductController.paginatedProducts);
router.route('/all-products').get(ProductController.getAllProducts);

router.route('/delete-product/:productId/:userId').delete(isAuthenticated, /*isAdmin,*/ ProductController.deleteProductById);
router.route('/update-product/:productId/:userId').put(isAuthenticated, /*isAdmin,*/ ProductController.updateProduct);
router.route('/list/by/dosage-type').get(ProductController.listProductByDosgaeType);
router.route('/list/by/companies').get(ProductController.listProductByManufacturer);
router.route('/list/by/search').get(ProductController.listProductSearch);



module.exports =  router;
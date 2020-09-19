const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const isAuthenticated = require('../middleware/isAuthenticated')
const router = express.Router();

router.route('/add-category/:userId').post(isAuthenticated, /*isAdmin,*/ CategoryController.addCategory);
router.route('/get-category/:categoryId').get(CategoryController.getCategoryById);
router.route('/get-category-list').get(CategoryController.getAllCategory);

router.route('/update-category/:categoryId/:userId').put(isAuthenticated, /*isAdmin,*/ CategoryController.updateCategory);
router.route('/delete-category/:categoryId/:userId').delete(isAuthenticated, /*isAdmin,*/ CategoryController.deleteCategoryById);


module.exports = router;
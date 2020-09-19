const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
// const {isAuthenticated, isAdmin } = require('../middleware/isAuthenticated');
const isAuthenticated = require('../middleware/isAuthenticated')


router.route('/').get(UserController.getUser)
router.route('/:userId').get(isAuthenticated, /*isAdmin,*/ UserController.findUserById);


module.exports = router;
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');


router.route('/signup').post(AuthController.signup);
router.route('/signin').post(AuthController.signin);
router.route('/signout').get(AuthController.signout);

module.exports = router;
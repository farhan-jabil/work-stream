const express = require('express');
const router = express.Router();
const signUpController = require('../controller/admin/signUpController');
const loginController = require('../controller/loginController');
const { check } = require('express-validator');

router.post('/signup', [
  check('name').notEmpty().withMessage('Name is required'),
  check('userName').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phoneNumber').isMobilePhone().withMessage('Phone number is invalid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], signUpController.signup);

router.post('/login', [
  check('userName').notEmpty().withMessage('UserName is invalid'),
  check('password').notEmpty().withMessage('Password is required')
], loginController.login);

module.exports = router;

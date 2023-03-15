const { Router } = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const router = Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('auth/login', {
      errors: errors.array(),
      email: req.body.email,
      password: req.body.password
    });
  }
})
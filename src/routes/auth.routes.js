const { Router } = require('express');
const login = require('../controllers/loginUser.controller');
const register = require('../controllers/registerUser.controller');

const router = Router();

const noAuthMiddleware = (req, res, next) => {
  if(!req.user) return next();
  else return res.redirect('/');
}

router.get('/login', noAuthMiddleware, (req, res) => {
  // Get if isset /login?error=Blah blah blah
  const errors = req.query.error;
  res.render('auth/login', { error: req.flash('error'), user: req.user });
});

router.get('/register', noAuthMiddleware, (req, res) => {
  res.render('auth/register', { error: req.flash('error'), user: req.user });
})

router.get('/logout', (req, res) => {
  req.logOut((err) => {
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
})

router.post('/login', noAuthMiddleware, login);

router.post('/register', noAuthMiddleware, register);

module.exports = router;
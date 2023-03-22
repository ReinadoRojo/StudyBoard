const { Router } = require('express');
const passport = require('passport');

const router = Router();

const onlyAuthorized = (req, res, next) => {
  passport.authenticate('jwt', {session: false, failureRedirect: '/auth/login'})(req, res, next);
}

router.get('/', (req, res) => {
  if(req.user) return res.redirect('/classrooms/list');
  res.render('index', { user: req.user, success: req.flash('success'), error: req.flash('error') });
});

router.get('/credits', (req, res) => {
  res.render('credits', { user: req.user });
})

module.exports = router;
const { Router } = require('express');
const passport = require('passport');
const { prisma } = require('../lib/prismajs');
const router = Router();

const checkAdmin = (req, res, next) => {
  // Check if the user is an admin
  passport.authenticate('jwt', {session: false, failureRedirect: '/auth/login'})(req, res, next);

  // Check if the user is an admin
  prisma.roles.findFirst({
    where: {
      id: req.user.role
    }
  }).then(role => {
    if (role.name !== 'admin') {
      req.flash('error', 'You are not authorized to access this page');
      return res.redirect('/auth/login');
    }
    next();
  }).catch(err => {
    req.flash('error', 'You are not authorized to access this page');
    return res.redirect('/auth/login');
  })
}



module.exports = router;
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const config = require('../config');

module.exports = new JWTStrategy({
  jwtFromRequest: req => req.cookies.SID,
  secretOrKey: config.jwtSecret,
  passReqToCallback: true,
}, async (req, jwtPayload, done) => {
  
  if(Date.now() > jwtPayload.expires){
    return done('Session expired', null);
  }

  const user = await User.findById(jwtPayload.id);
  if(!user){
    return done('Error finding your user in the DB! You have a good SID? Re-Login to renew it!!', null);
  }

  // req.user = JSON.stringify(user);
  return done(null, jwtPayload);
})
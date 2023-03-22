const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const logger = require('../lib/logger');
const User = require('../models/Users');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if(!user){
      return done('We could not find a user with that credentials', false);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch){
      return done('We could not find a user with that credentials', false);
    }
    
    return done(null, user)
  } catch (error) {
    req.flash('error', error.message);
    done(error)
  }
})
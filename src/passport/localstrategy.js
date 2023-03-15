const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email }})
    if(!user){
      return done('Incorrect Email / Password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch){
      return done(null, user)
    } else {
      return done('Incorrect Email / Password')
    }
  } catch (error) {
    done(error)
  }
})
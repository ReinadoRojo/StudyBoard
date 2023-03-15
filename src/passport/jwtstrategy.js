const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config');

module.exports = new JWTStrategy({
  jwtFromRequest: req => req.cookies.SID,
  secretOrKey: config.jwtSecret
}, async (jwtPayload, done) => {
  if(Date.now() > jwtPayload.expires){
    return done('Session expired', null);
  }
  
  return done(null, jwtPayload);
})
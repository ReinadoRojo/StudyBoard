const express = require('express');
const hbsengine = require('express-handlebars').engine;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const config = require('./config');
const bcrypt = require('bcrypt');
const logger = require('./lib/logger');
const localstrategy = require('./passport/localstrategy');
const jwtstrategy = require('./passport/jwtstrategy');

// Set constants
const app = express();

// Setting up the view engine
app.engine('hbs', hbsengine({
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Setting up cookies and sessions
app.use(cookieParser());
const sessionSecret = config.sessionSecret || bcrypt.hash("superSecret!!", 13, (err, hash) => {
  if (err) {
    logger.error(`ERROR IN SECRET HASHING: ${err}`);
  }
});

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}))

// Setting up flash messages
app.use(flash());

// Setting up passport
passport.use(localstrategy);
passport.use(jwtstrategy);

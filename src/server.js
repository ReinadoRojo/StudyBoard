const express = require('express');
const hbsengine = require('express-handlebars').engine;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const config = require('./config');
const logger = require('./lib/logger');
const localstrategy = require('./passport/localstrategy');
const jwtstrategy = require('./passport/jwtstrategy');
const connectSQLite = require('connect-sqlite3')(session);

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
app.use(session({
  store: new connectSQLite({
    db: './db.sqlite3',
    tableName: 'sessions'
  }),
  secret: config.sessions_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.jwtExpiration + 1000 * 60 * 60 * 24 * 30 // 30 days
  }
}))

// Setting up flash messages
app.use(flash());

// Setting up passport
passport.use(localstrategy);
passport.use(jwtstrategy);

passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user, done) {done(null, user);});

app.use(passport.initialize());
app.use(passport.session({
  secret: config.sessions_secret,
  resave: false,
  saveUninitialized: false,
}));

// Express settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

// Setting up the routes

// Index
app.use('/', require('./routes/index.routes'));
// Auth
app.use('/auth', require('./routes/auth.routes'));
// Classroom API
app.use('/cr', require('./routes/classroom.api.routes'));
// Classrooms
app.use('/classrooms', require('./routes/classrooms.routes'));

app.use((req, res, next) => {
  res.status(404).render('404', { user: req.user });
})

// Export a function to start the server
module.exports = {
  start: (port) => {
    app.listen(port, () => {
      logger.server(`Server running on port ${config.port}`);
    })
  },
  stop: () => {
    app.close();
  },
  getApp: () => {
    return app;
  },
}
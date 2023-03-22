const jwt = require('jsonwebtoken');
const localstrat = require('../passport/localstrategy');
const jwtstrat = require('../passport/jwtstrategy');
const passport = require('passport');
const config = require('../config');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try{
    passport.authenticate('local', { session: false }, (err, user) => {
    
      // Check for error or a invalid user
      if (err || !user) {
        req.flash('error', err);
        return res.redirect('/auth/login');
      }
  
      const payload = { id: user.id, names: user.names, email: user.email, surnames: user.surnames, role: user.role_id, expires: Date.now() + config.jwtExpiration || 1000 * 60 * 60 * 24 * 90,}
  
      req.login(payload, { session: true }, (err) => {
        if (err) {
          req.flash('error', err);
          return res.redirect('/auth/login');
        }
  
        const token = jwt.sign(JSON.stringify(payload), config.jwtSecret );
  
        res.cookie('SID', token, { httpOnly: true, secure: true });
        req.flash('success', "Welcome " + user.names + " " + user.surnames + "!");
        return res.redirect('/');
      })
    })(req, res);
  } catch (err) {
    req.flash('error', err);
    return res.redirect('/auth/login');
  }
}
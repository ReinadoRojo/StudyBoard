const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const localstrat = require('../passport/localstrategy');
const jwtstrat = require('../passport/jwtstrategy');
const passport = require('passport');
const config = require('../config');

module.exports = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    
    // Check for error or a invalid user
    if (err || !user) {
      return res.status(400).json({ err });
    }

    const payload = {
      names: user.names,
      // Config value or 90 days
      expires: Date.now() + config.jwtExpiration || 1000 * 60 * 60 * 24 * 90,
    }

    req.login(payload, { session: false }, (err) => {
      if (err) {
        return res.status(400).json({ err });
      }

      const token = jwt.sign(JSON.stringify(payload), config.jwtSecret );

      res.cookie('SID', token, { httpOnly: true, secure: true });
      res.status(200).json({ names });
    })
  })(req, res);
}
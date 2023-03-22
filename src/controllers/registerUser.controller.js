const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/Users');
const verifyParams = require('../lib/verifyParams');
const RoleSchema = require('../models/Roles');

module.exports = async (req, res) => {
  const { names, surnames, email, password, orgCode } = req.body;
  const hashCost = config.hashCost || 13;

  const { errors, isValid } = verifyParams(names, surnames, email, password);
  if (!isValid) {
    req.flash('error', errors);
    return res.redirect('/auth/register');
  }

  try {
    const hashPassword = await bcrypt.hash(password, hashCost);

    const userRoleID = await RoleSchema.findOne({name: 'user'});

    if(!userRoleID) {
      req.flash('error', 'Registrations are disabled! Please login to continue.');
      return res.redirect('/auth/login');
    }

    const user = new User({
      names,
      surnames,
      email,
      password: hashPassword,
      // Role_id
      role_id: userRoleID,
    })

    const newUser = await user.save();

    // Set payload
    const payload = {
      id: newUser._id,
      email: newUser.email,
      names: newUser.names,
      surnames: newUser.surnames,
      role: newUser.role,
      expires: Date.now() + config.jwtExpiration || 1000 * 60 * 60 * 24 * 90
    }
    
    // Generate token
    const token = jwt.sign(JSON.stringify(payload), config.jwtSecret );

    req.login(payload, { session: true }, (err) => {
      if (err) {
        req.flash('error', err);
        return res.redirect('/auth/register');
      }
      
      res.cookie('SID', token, { httpOnly: true, secure: true });
      return res.redirect('/');
    })


  } catch (err) {
    console.log(err);
    req.flash('error', err);
    return res.redirect('/auth/register');
  }
}
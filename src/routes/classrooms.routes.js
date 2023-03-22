const { Router } = require('express');
const passport = require('passport');
const subject = require('../models/Subjects');
const user = require('../models/Users');
const router = Router();

const onlyAuth = (req, res, next) => {
  // Check if the user is an admin
  passport.authenticate('jwt', {session: false, failureRedirect: '/auth/login'})(req, res, next);
}

router.get('/list', onlyAuth, async (req, res) => {
  // List all the classrooms where the user is member
  const data_students = await subject.find({ members: req.user.id });
  const data_teachers = await subject.find({ teachers: req.user.id });
  
  classrooms = {
    "teacher": data_teachers,
    "student": data_students
  }

  res.render('classrooms', { user: req.user, classrooms, success: req.flash('success'), error: req.flash('error') });
})

module.exports = router;
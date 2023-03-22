const { Router } = require('express');
const User = require('../models/Users');
const subject = require('../models/Subjects');
const router = Router();

router.post('/join', async (req, res) => {
  const { inviteCode } = req.body;

  if(!inviteCode) {
    req.flash('error', 'Invite code is required');
    return res.redirect('/');
  }

  // Search for the invite code in the database
  const data = await subject.findOne({ invite_code });

  if(!data) {
    req.flash('error', 'Invite code is invalid');
    return res.redirect('/');
  }
  
  // Check if is in members
  if(data.members.includes(req.user.id)) {
    req.flash('error', 'You are already a member');
    return res.redirect('/');
  }

  // Check if is in teachers
  if(data.teachers.includes(req.user.id)) {
    req.flash('error', 'You are already in the classroom');
    return res.redirect('/');
  }

  // Add it as a member
  data.members.push(req.user.id);

  // Update the data
  data.save().then(() => {
    req.flash('success', 'You are now a member');
  }).catch(err => {
    req.flash('error', 'Something went wrong');
  }).finally(() => {
    return res.redirect('/');
  })
})

module.exports = router;
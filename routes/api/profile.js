const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     Post api/profile
// @desc      Create or update a user profile
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      check('website', 'Website is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('bio', 'Bio description is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      website,
      location,
      bio,
      school,
      fieldOfStudy,
      youtube,
      instagram,
      linkedin,
      facebook
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (school) profileFields.school = school;
    if (fieldOfStudy) profileFields.fieldOfStudy = fieldOfStudy;
    if (youtube) profileFields.youtube = youtube;
    if (instagram) profileFields.instagram = instagram;
    if (linkedin) profileFields.linkedin = linkedin;
    if (facebook) profileFields.facebook = facebook;
  }
);

module.exports = router;

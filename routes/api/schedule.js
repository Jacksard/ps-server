const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Schedule = require('../../models/Schedule');

// @route     POST api/schedule/booking
// @desc      schedule a date by client
// @access    Public

router.post(
  '/booking',
  [
    check('firstName', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required for verification')
      .not()
      .isEmpty()
      .isLength({ min: 10 }),
    check('dateEvent', 'A date for the training seasion is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      trainerId,
      firstName,
      lastName,
      email,
      phone,
      goals,
      dateEvent
    } = req.body;

    try {
      let newEvent = new Schedule({
        trainerId,
        firstName,
        lastName,
        email,
        phone,
        goals,
        dateEvent
      });
      const event = await newEvent.save();
      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }

    console.log('Training seasion booked...');
  }
);

// @route     GET api/schedule/events/:id
// @desc      Get all events for a specific trainer - Testing
// @access    Public

/* router.get('/events/public/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let events = await Schedule.find({ trainerId: req.params.id });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}); */

// @route     GET api/schedule/events
// @desc      Get all events for the specific trainer
// @access    Private

router.get('/events/:id', auth, async (req, res) => {
  try {
    const events = await Schedule.find({ trainerId: req.params.id });
    if (!events) {
      return res.status(400).json({ msg: 'There is no events for this user' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

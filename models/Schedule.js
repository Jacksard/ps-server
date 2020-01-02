const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  trainerId: {
    type: String,
    ref: 'user'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  goals: [
    {
      type: String
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  dateEvent: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);

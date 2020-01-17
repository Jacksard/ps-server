const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  website: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  education: [
    {
      school: {
        type: String
      },
      fieldofstudy: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

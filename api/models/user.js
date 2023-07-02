const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: String,
  experiences: [
    {
      designation: {
        type: String,
        required: true,
      },
      organisation: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
    }
  ],
  skillSets: {
    type:[String]
  },
  educationalQualifications: [
    {
      degree: String,
      schoolName: String,
      percentage: String,
      year: String,
    }
  ],
  designation:String,
  about:String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

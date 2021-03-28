const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: [true, 'First Name field is required'],
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, 'Last Name field is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address field is required'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email field is required'],
  },
  password: {
    type: String,
    select: false,
  },
}, { timestamps: true });

schema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model('User', schema);

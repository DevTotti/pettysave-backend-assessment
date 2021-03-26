const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const userSchema = new Scheme({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;

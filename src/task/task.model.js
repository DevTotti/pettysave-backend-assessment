const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: [true, 'User ID field is required'],
  },
  title: {
    type: String,
    required: [true, 'Title field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
    required: [true, 'Status field is required'],
  },

}, { timestamps: true });

module.exports = mongoose.model('Task', schema);

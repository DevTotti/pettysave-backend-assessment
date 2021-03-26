const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const answerSchema = new Scheme({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',

  },
}, { timestamps: true });

const AnswerModel = mongoose.model('task', answerSchema);

module.exports = AnswerModel;

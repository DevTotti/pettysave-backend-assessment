const { body, validationResult } = require('express-validator');

const task = () => [
  body('user_id')
    .isString()
    .not()
    .isEmpty()
    .withMessage('User ID field is required'),
  body('title')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Title field is required'),
  body('description')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Description field is required'),
];

const validator = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length === 0) return next();
  const error = new Error(`${errors[0].param}: ${errors[0].msg}`);
  error.status = 422;
  throw error;
};

module.exports = {
  task,
  validator,
};

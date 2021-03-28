const { body, validationResult } = require('express-validator');

const user = () => [
  body('first_name')
    .isString()
    .not()
    .isEmpty()
    .withMessage('First name field is required'),
  body('last_name')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Last name field is required'),
  body('address')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Address field is required'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('password field is required and at least 4 chars long'),
  body('email')
    .isEmail()
    .withMessage('email field is required and must be valid'),
];

const validator = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length === 0) return next();
  const error = new Error(`${errors[0].param}: ${errors[0].msg}`);
  error.status = 422;
  return res.status(error.status).json({
    Error: { status: error.status, message: error.message },
  });
};

module.exports = {
  user,
  validator,
};

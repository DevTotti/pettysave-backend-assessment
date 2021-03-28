const router = require('express').Router();
const { user, validator } = require('./user.validator');
const service = require('./user.service');

router.post('/signup', user(), validator, service.signup);
router.post('/login', service.login);

module.exports = router;

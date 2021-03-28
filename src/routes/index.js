const router = require('express').Router();

const url = '/api/v1';
router.use(`${url}`, require('../user/user.router'));
router.use(`${url}/tasks`, require('../task/task.router'));

module.exports = router;

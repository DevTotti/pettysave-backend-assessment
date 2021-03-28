const router = require('express').Router();

router.use('/api/v1', require('../user/user.router'));
// router.use('/api/v1', require('../task/task.router'));

module.exports = router;

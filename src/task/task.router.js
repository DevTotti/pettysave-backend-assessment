const router = require('express').Router();
const { task, validator } = require('./task.validator');
const service = require('./task.service');
const auth = require('../routes/auth');

router.post('/new', auth, task(), validator, service.createTask);
router.post('/edit/:id', auth, service.editTask);
router.get('/', auth, service.getTasks);
router.get('/:id', auth, service.getTask);
router.get('/filter/status', auth, service.filterTaskByStatus);

module.exports = router;

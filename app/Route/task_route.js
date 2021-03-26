const express = require('express');
const checkAuth = require('../Middleware/check_auth');
const taskController = require('../Controller/task_controller');

const router = express.Router();

router.post('/task', checkAuth, taskController.createTask);
router.get('/task/:id', checkAuth, taskController.getOneTask);
router.get('/tasks', checkAuth, taskController.getAllTask);
router.put('/task/:id', checkAuth, taskController.updateTask);
router.get('/task/status', checkAuth, taskController.filterTask);
router.delete('/task/:id', checkAuth, taskController.deleteTask);

module.exports = router;

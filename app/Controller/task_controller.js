/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const Task = require('../Model/task_model');

const createTask = ((req, res) => {
  const userId = req.id;
  if (!userId) {
    return res.json({
      error: true,
      message: 'authentication failed',
    });
  }
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    user_id: userId,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  task.save()
    .then((data) => {
      res.json({
        error: false,
        message: 'task saved',
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: 'an error occured',
        response: err,
      });
    });
});

const getOneTask = ((req, res) => {
  const userId = req.id;
  const taskId = req.params.id;
  if (!userId) {
    return res.json({
      error: true,
      message: 'authentication failed',
    });
  }
  if (!taskId) {
    return res.json({
      error: true,
      message: 'invalid id',
    });
  }
  Task.findOne({ _id: taskId, user_id: userId })
    .then((data) => {
      res.json({
        error: false,
        message: 'task fetched',
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: 'error occured',
        response: err,
      });
    });
});

const getAllTask = ((req, res) => {
  const userId = req.id;
  if (!userId) {
    return res.json({
      error: true,
      message: 'authentication failed',
    });
  }
  Task.find({ user_id: userId })
    .then((data) => {
      res.json({
        error: false,
        message: 'tasks fetched',
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: 'an error occured',
        response: err,
      });
    });
});

const deleteTask = ((req, res) => {
  const userId = req.id;
  if (!userId) {
    return res.json({
      error: true,
      message: 'authentication failed',
    });
  }
  const taskId = req.params.id;
  Task.findOneAndDelete({ _id: taskId, user_id: userId })
    .then((data) => {
      if (data === null || data === undefined) {
        return res.json({
          error: true,
          message: 'invalid taskId or userId',
        });
      }
      res.json({
        error: false,
        message: 'task deleted',
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: 'unable to delete task',
        response: err,
      });
    });
});

const updateTask = ((req, res) => {
  const userId = req.id;
  const taskId = req.params.id;
  if (!userId) {
    return res.json({
      error: true,
      message: 'invalid userId ',
    });
  }
  if (!taskId) {
    return res.json({
      error: true,
      message: 'invalid taskId',
    });
  }
  Task.findOneAndUpdate({ _id: taskId, user_id: userId }, req.body)
    .then((data) => {
      res.json({
        error: false,
        message: 'task updated',
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: 'an error occured',
        response: err,
      });
    });
});

const filterTask = ((req, res) => {
  const userId = req.id;
  const stats = req.body.status;
  if (!userId) {
    return res.json({
      error: true,
      message: 'invalid userId',
    });
  }
  Task.find({ status: stats })
    .then((tasks) => {
      res.status(200).json({
        error: false,
        message: 'tasks fetched',
        response: tasks,
      });
    })
    .catch((err) => {
      res.status(403).json({
        error: true,
        message: 'error occured',
        response: err,
      });
    });
});

module.exports = {
  createTask,
  getOneTask,
  getAllTask,
  deleteTask,
  updateTask,
  filterTask,
};

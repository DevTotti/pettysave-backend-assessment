/* eslint-disable no-underscore-dangle */
const CreateError = require('http-errors');
const { ObjectId } = require('mongodb');
const Task = require('./task.model');
const User = require('../user/user.model');

const taskService = {
  // User can create a task.
  async createTask(req, res) {
    try {
      const newTask = new Task(req.body);
      const user = await User.findById(newTask.user_id);
      if (!user) return res.status(404).json(CreateError(404, 'User ID not found'));
      await newTask.save();
      return res.status(201).json({
        statusCode: 201,
        status: 'success',
        message: 'Task created successfully',
        data: newTask,
      });
    } catch (error) {
      return res.status(500).json(CreateError(500, error));
    }
  },

  //   User can edit a task using its ID.
  async editTask(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!ObjectId.isValid(id)) return res.status(400).json(CreateError(400, 'Invalid ID'));
      const task = await Task.findById(id);
      if (!task) return res.status(404).json(CreateError(404, 'Task: not found'));
      await Task.updateOne({ _id: id }, data, { runValidators: true });
      return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Task updated successfully',
        data,
      });
    } catch (error) {
      return res.status(500).json(CreateError(500, error));
    }
  },

  //   User can view all the tasks he/she have created.
  async getTasks(req, res) {
    try {
      const tasks = await Task.find({ user_id: req.user._id });
      return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Tasks retrieved successfully',
        data: tasks,
      });
    } catch (error) {
      return res.status(500).json(CreateError(500, error));
    }
  },

  //   User can view a task using its ID.
  async getTask(req, res) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) return res.status(400).json(CreateError(400, 'Invalid ID'));
      const task = await Task.findById(id);
      if (!task) return res.status(404).json(CreateError(404, 'Task: not found'));
      return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Task retrieved successfully',
        data: task,
      });
    } catch (error) {
      return res.status(500).json(CreateError(500, error));
    }
  },

  //   User can filter through tasks using task status.
  async filterTaskByStatus(req, res) {
    try {
      const { status } = req.body;
      if (status === 'pending' || status === 'in-progress' || status === 'completed') {
        const tasks = await Task.find({ status });
        return res.status(200).json({
          statusCode: 200,
          status: 'success',
          message: 'Tasks retrieved successfully',
          data: tasks,
        });
      }
      return res.status(422).json(CreateError(422, `${status}: is not a valid enum value for path 'status'`));
    } catch (error) {
      return res.status(500).json(CreateError(500, error));
    }
  },
};

module.exports = { ...taskService };

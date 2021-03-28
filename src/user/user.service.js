/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const passport = require('passport');
// const { ObjectId } = require('mongodb');
const User = require('./user.model');
const config = require('../configs/app');

const userService = {

  async signup(req, res) {
    const {
      first_name, last_name, address, email, password,
    } = req.body;
    const data = {
      first_name, last_name, address, email,
    };
    try {
      User.register(data, password, (err) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err,
          });
        }
        return passport.authenticate('local')(req, res, () => res.status(200).json({
          statusCode: 200,
          status: 'success',
          message: 'Account created successfully',
          data: req.user,
        }));
      });
    } catch (error) {
      res.json(error);
    }
  },

  async login(req, res, next) {
    try {
      passport.authenticate('local', (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });
        return req.logIn(user, (error) => {
          if (error) return next(error);
          const token = jwt.sign({ user }, config.secret,
            { expiresIn: config.token_exp_days });
          return res.status(200).json({ token, user });
        });
      })(req, res, next);
    } catch (error) {
      res.json(error);
    }
  },

};

module.exports = { ...userService };

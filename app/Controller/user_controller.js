/* eslint-disable no-shadow */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const User = require('../Model/user_model');

const jwtSecret = process.env.JWT_SECRET;

// eslint-disable-next-line consistent-return
const signUp = ((req, res) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
    return res.json({
      error: true,
      message: 'Fill all required fields',
    });
  }
  const mail = req.body.email;
  if (!validator.isEmail(mail)) {
    return res.json({
      error: true,
      message: 'Invalid email address',
    });
  }
  User.findOne({ mail })
    .then((result) => {
      if (result) {
        res.json({
          error: true,
          message: 'a user with same email exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hpass) => {
          if (err) {
            res.json({
              error: true,
              message: err.message,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              address: req.body.address,
              email: mail,
              password: hpass,
            });
            user.save()
              // eslint-disable-next-line no-unused-vars
              .then((user) => {
                res.json({
                  error: false,
                  message: 'user created',
                });
              })
              // eslint-disable-next-line no-unused-vars
              .catch((err) => {
                res.json({
                  error: true,
                  message: err.message,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        err: true,
        message: err.message,
      });
    });
});

// eslint-disable-next-line consistent-return
const signIn = ((req, res) => {
  const mail = req.body.email;
  const passkey = req.body.password;
  if (!validator.isEmail(mail)) {
    return res.json({
      error: true,
      message: 'invalid email',
    });
  }
  User.findOne({ email: mail })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.json({
          error: true,
          message: 'user with email does not exist',
        });
      }
      bcrypt.compare(passkey, user.password, (err, result) => {
        if (err) {
          return res.json({
            error: true,
            message: 'authentication failed',
          });
        }
        if (result) {
          const Token = jwt.sign({
            email: user.email,
            // eslint-disable-next-line no-underscore-dangle
            iserID: user._id,
          }, jwtSecret, {
            expiresIn: '2h',
          });
          return res.status(200).cookie('auth', Token).json({
            error: false,
            // eslint-disable-next-line no-underscore-dangle
            userId: user._id,
            message: 'You logged in successfully!',
            token: Token,
          });
        // eslint-disable-next-line no-else-return
        } else {
          return res.json({
            error: true,
            message: 'incorrect password',
          });
        }
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err.message,
      });
    });
});

module.exports = {
  signUp,
  signIn,
};

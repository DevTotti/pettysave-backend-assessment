const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const app = express();

// import config files
require('./configs/database');
require('./configs/passport');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(passport.initialize());

// route
app.use(require('./routes/index.js'));

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

module.exports = app;

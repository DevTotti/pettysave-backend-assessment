/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./app');

// db connection
const url = config.mongodbUri;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log(`Database connected: ${url}`);
});

db.on('error', (err) => {
  console.error(`connection error: ${err}`);
});

module.exports = mongoose;

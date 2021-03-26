/* eslint-disable no-console */
require('dotenv').config({ path: './credentials.env' });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('./swagger.json');

const userRoutes = require('./app/Route/user_route');
const taskRoutes = require('./app/Route/task_route');

const app = express();

const port = process.env.PORT;
const MongoCloudUri = process.env.MONGO_CLOUD_URI;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MongoCloudUri, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    console.log('Connected to MongoDB!');
    app.listen(port);
    console.log(`Listening to post ${port}`);
  })
  // eslint-disable-next-line no-unused-vars
  .catch((err) => {
    console.log('Error connecting to MongoDB!');
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use('/', taskRoutes);

app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(400).json({
    message: 'page not found',
  });
});

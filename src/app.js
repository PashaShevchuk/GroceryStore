const cors = require('cors');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const apiRouter = require('./routes/api.router');
const { appError: { NOT_ALLOWED_BY_CORS, NOT_FOUND } } = require('./errors');
const { config } = require('./configs');
const { cronRun } = require('./cron-jobs');
const { sequelize } = require('./db');
const { winston } = require('./logger');

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests,
});

const app = express();

const logger = winston('APP');

if (config.ENV === 'DEV') {
  app.use(cors());
  app.use(morgan('dev'));
} else {
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
      }

      if (config.WHITE_LIST.split(';').includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(NOT_ALLOWED_BY_CORS));
      }
    },
  }));
}

app.use(serverRequestLimit);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
  logger.error(err);
  res
    .status(err.status || 404)
    .json({
      message: err.message || NOT_FOUND,
      code: err.customCode || 404,
    });
});

sequelize
  .sync()
  .then(() => {
    app.listen(config.PORT, (err) => {
      if (err) {
        logger.info(err);
        console.log(err);
      }
      console.log(`Server listening on ${config.PORT}`);
      cronRun();
    });
  })
  .catch((reason) => {
    console.log(reason);
  });

process.on('uncaughtException', (err) => {
  logger.info(err);
  console.log(err);
});

process.on('unhandledRejection', (err) => {
  logger.info(err);
  console.log(err);
});

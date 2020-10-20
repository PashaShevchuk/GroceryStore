const cors = require('cors');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const apiRouter = require('./routes/api.router');
const { config } = require('./configs');
const { sequelize } = require('./db');

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests,
});

const app = express();

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
        callback(new Error('Not allowed by CORS'));
      }
    },
  }));
}

app.use(serverRequestLimit);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter);

app.use('*', (err, req, res) => {
  res
    .status(err.status || 404)
    .json({
      message: err.message || 'NOT FOUND',
      code: err.code || '',
    });
});

sequelize
  .sync()
  .then(() => {
    app.listen(config.PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server listening on ${config.PORT}`);
    });
  })
  .catch((reason) => {
    console.log(reason);
  });

process.on('uncaughtException', (err) => {
  console.log(err);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
});

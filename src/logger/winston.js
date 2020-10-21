const path = require('path');
const winston = require('winston');

module.exports = (label) => {
  const consoleOptions = {
    level: 'info',
    format: winston.format.combine(
      winston.format.label({ label }),
      winston.format.colorize({ colors: { info: 'yellow', error: 'red' }, all: true }),
    ),
  };
  const fileOptions = {
    level: 'error',
    filename: path.join(process.cwd(), 'src', 'logs', 'error.txt'),
    format: winston.format.combine(
      winston.format.label({ label }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json({ space: 2 }),
    ),
  };

  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(consoleOptions),
      new winston.transports.File(fileOptions),
    ],
  });

  return {
    info: (error) => logger.info(error),
    error: (error) => logger.error(error),
  };
};

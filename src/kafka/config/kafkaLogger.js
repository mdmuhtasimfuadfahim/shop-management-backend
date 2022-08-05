const { logLevel } = require('kafkajs');
const winston = require('winston');

const toWinstonLogLevel = (level) => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
    default:
        return 'all';
  }
};

const WinstonLogCreator = (logLevel) => {
  const logger = winston.createLogger({
    level: toWinstonLogLevel(logLevel),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'kafka.log' })],
  });

  return ({ namespace, level, label, log }) => {
    const { message, ...extra } = log;
    logger.log({
      namespace, label,
      level: toWinstonLogLevel(level),
      message,
      extra,
    });
  };
};

module.exports = WinstonLogCreator;

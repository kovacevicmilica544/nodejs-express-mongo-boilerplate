const winston = require('winston');
const {format} = require('winston');
const {printf} = winston.format;

const {ValidationError} = require('express-validation');

const myFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
});

const options = {
    file: {
      filename: `src/logs/combined.log`,
      format: format.combine(
            format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
            format.json(),
            myFormat
        )
    },
    fileError: {
        level: 'error',
        filename: `src/logs/error.log`,
        format: format.combine(
              format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
              format.json(),
              myFormat
        )
    },
    console: {
      level: 'info',
      format: format.combine(
            format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
            format.colorize(),
            format.json(),
            myFormat
      )
    },
};

const logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.File(options.fileError),
      new winston.transports.Console(options.console)
    ]
});

logger.stream = {
    write: function(message) {
        const tokens = message.split('..');
        const url = `${tokens[0]} - ${tokens[1]}`;
        const payload = `Status ${tokens[2]} | Response Time ${tokens[5]} ${tokens[6]}`;
        logger.info(`${url} | ${payload}`);
    }
};

const errorLoggingMiddleware = (err, req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;
    const message = err instanceof ValidationError ? err.details.body[0].message : err.message;
    logger.error(`${method} - ${url} | ${message} ${err.stack ? ' | ' + err.stack : ''}`);
    next(err);
}
  
module.exports = {
    logger,
    errorLoggingMiddleware
};
const {ValidationError} = require('express-validation');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err.details.body[0].message);
    }
    return res.status(500).json(err.message);
}

const setCORS = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next()
}

module.exports = {
    errorHandlerMiddleware,
    setCORS
}
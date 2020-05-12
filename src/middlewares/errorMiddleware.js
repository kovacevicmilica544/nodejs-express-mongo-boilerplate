const {ValidationError} = require('express-validation');

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err.details.body[0].message);
    
    if (!err.statusCode) err.statusCode = 500;
    return res.status(err.statusCode).json(err.message);
}

module.exports = {
    errorMiddleware 
}
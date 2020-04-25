const express = require("express");
const {validate} = require('express-validation');

const userService = require('../services/UserService');
const userValidators = require('../validators/userValidator')
const lodash = require('lodash');

const router = express.Router();

router.post('/sign-up', 
    validate(userValidators.registerValidator),
    (req, res, next) => {
        userService.createUser(req.body)
        .then(data => res.status(201).json(lodash.omit(data.toObject(), ['password', '_id', '__v'])))
        .catch(err => next(err));
})

router.post('/sign-in',
    validate(userValidators.loginValidator),
    (req, res, next) => {
        userService.auhenticateUser(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
})

module.exports = router;

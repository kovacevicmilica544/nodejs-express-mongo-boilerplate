const express = require("express");
const userService = require('../services/UserService');
const lodash = require('lodash');

const router = express.Router();

router.post('/sign-up', (req, res, next) => {
    userService.createUser(req.body)
    .then(data => res.status(201).json(lodash.omit(data.toObject(), ['password', '_id', '__v'])))
    .catch(err => res.status(500).json({error: err.errmsg}));
})

router.post('/sign-in', (req, res, next) => {
    userService.auhenticateUser(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}));
})

module.exports = router;

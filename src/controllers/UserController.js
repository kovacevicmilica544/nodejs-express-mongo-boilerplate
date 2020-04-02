const express = require("express");
const userService = require('../services/UserService');
const lodash = require('lodash');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    userService.getUserById(id)
    .then(data => res.status(200).json(lodash.omit(data.toObject(), ['password'])))
    .catch(err => res.status(500).json(err));
})

module.exports = router;

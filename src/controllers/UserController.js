const express = require("express");
const userService = require('../services/UserService');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    userService.getUserById(id)
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
})

module.exports = router;

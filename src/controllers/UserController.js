const express = require("express");
const userService = require('../services/UserService');

const router = express.Router();

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          $ref: "#/definitions/User"
 *       500: 
 *          description: Internal Server Error
 */
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    userService.getUserById(id)
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
})

module.exports = router;

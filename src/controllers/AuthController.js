const express = require("express");
const {validate} = require('express-validation');

const userService = require('../services/UserService');
const authService = require('../services/AuthService');
const userValidators = require('../validation/userValidator')

const router = express.Router();

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: body object
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *          required:
 *              - email
 *              - firstName
 *              - lastName
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Email for the user, needs to be unique.
 *              password:
 *                  type: string
 *                  format: password
 *                  minimum: 4
 *              firstName:
 *                  type: string 
 *              lastName:
 *                  type: string
 *     responses:
 *       201:
 *         schema:
 *           $ref: '#/definitions/User'
 *       400: 
 *          description: Validation Error
 *       500: 
 *          description: Internal Server Error
 */
router.post('/sign-up', 
    validate(userValidators.registerValidator),
    (req, res, next) => {
        userService.createUser(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err));
})

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: body object
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Email for the user, needs to be unique.
 *              password:
 *                  type: string
 *                  format: password
 *                  minimum: 4
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/definitions/User'
 *       400: 
 *          description: Validation Error
 *       500: 
 *          description: Internal Server Error
 */
router.post('/sign-in',
    validate(userValidators.loginValidator),
    (req, res, next) => {
        authService.auhenticateUser(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
})

module.exports = router;

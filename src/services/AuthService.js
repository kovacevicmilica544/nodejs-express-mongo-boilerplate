const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userService = require('../services/UserService');
const {ErrorHandler} = require('../utils/error');
const {JWT_SECRET, JWT_EXPIRE} = require('../enviroment/enviroment');

const auhenticateUser = async(data) => {
    let user = await userService.getUserByEmail(data.email);

    if (!user) return Promise.reject(new ErrorHandler(404, `Could not find user with e-mail ${data.email}!`));

    if (!bcrypt.compareSync(data.password, user.password))
        return Promise.reject(new ErrorHandler(404, `Password is not valid!`));

    const token = createToken(user);
    return Promise.resolve({
        user: user,
        token: token
    });
}

const createToken = (user) => {
    return jwt.sign(
        {user},
        JWT_SECRET,
        {expiresIn: parseInt(JWT_EXPIRE)}
    );
}

module.exports = {
    auhenticateUser,
    createToken,
}
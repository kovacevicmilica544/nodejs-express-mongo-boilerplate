const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const lodash = require('lodash');

const createUser = async (data) => {
    const user = new User({
        email: data.email,
        password: bcrypt.hashSync(data.password, 10),
        firstName: data.firstName,
        lastName: data.lastName
    });
    return await user.save(user);
}

const auhenticateUser = async(data) => {
    const user = await getUserByEmail(data.email);

    if (!user)
        return Promise.reject(`Could not find user with e-mail ${data.email}!`);
    if (!bcrypt.compareSync(data.password, user.password))
        return Promise.reject(`Password is not valid!`)

    const token = createToken(user);
    return Promise.resolve({
        user: lodash.omit(user.toObject(), ['password', '__v']),
        token: token
    });
}

const getUserById = async (id) => {
    return await User.findById(id).select('-hash');
}


const getUserByEmail = async(email) => {
    return await User.findOne({email: email});
}

const createToken = (user) => {
    return jwt.sign(
        {user},
        process.env.JWT_SECRET,
        {expiresIn: parseInt(process.env.JWT_EXPIRE)}
    );
}


module.exports = {
    createUser,
    auhenticateUser,
    getUserById
}
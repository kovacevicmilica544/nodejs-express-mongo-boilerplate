const User = require('../models/User');

const createUser = async (data) => {
    const user = new User({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
    });
    return await user.save(user);
}

const getUserById = async (id) => {
    return await User.findById(id).select('-hash');
}

const getUserByEmail = async(email) => {
    return await User.findOne({email: email});
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}
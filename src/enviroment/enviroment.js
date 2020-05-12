require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW
};
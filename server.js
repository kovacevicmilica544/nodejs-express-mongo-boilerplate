const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('express-jwt');
require('dotenv').config()

const authRoutes = require('./src/controllers/AuthController');
const userRouter = require('./src/controllers/UserController');

const app = express();
const defaultPort = 3000;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-yshbv.mongodb.net/boilerplate?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
})

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwt({secret: process.env.JWT_SECRET})
.unless({
    path: [
      '/api/auth/sign-in',
      '/api/auth/sign-up'
    ]
}));

// Set CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next()
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);

app.listen(process.env.PORT || defaultPort, () => console.log(`App listening on port ${process.env.PORT || defaultPort}`));
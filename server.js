const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('express-jwt');

const path = require('path');
const envPath = path.resolve(process.cwd(), 'src', '.env');
require('dotenv').config({
  path: envPath,
});

const {errorHandlerMiddleware, setCORS} = require('./src/util/middleware');

const authRoutes = require('./src/controllers/AuthController');
const userRouter = require('./src/controllers/UserController');

const app = express();
const defaultPort = 3000;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-yshbv.mongodb.net/test?retryWrites=true&w=majority`,{
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

app.use(setCORS);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || defaultPort, () => console.log(`App listening on port ${process.env.PORT || defaultPort}`));
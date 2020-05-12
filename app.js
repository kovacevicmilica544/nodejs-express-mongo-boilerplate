const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('express-jwt');
const morgan = require('morgan');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {setCORS} = require('./src/config/cors-config');
const swaggerOptions = require('./src/config/swagger-config');
const {errorMiddleware} = require('./src/middlewares/errorMiddleware');
const {morganMiddleware} = require('./src/middlewares/morganMiddleware');
const {errorLoggingMiddleware, logger} = require('./src/services/loggerService');
const {PORT, MONGO_USER, MONGO_PW, JWT_SECRET} = require('./src/enviroment/enviroment');

const {
  authRoutes, userRouters
} = require('./src/controllers/initRoutes');
const defaultPort = 3000;

const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use((morgan(morganMiddleware, { stream: logger.stream })));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PW}@cluster0-yshbv.mongodb.net/test?retryWrites=true&w=majority`,{
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

app.use(jwt({secret: JWT_SECRET})
.unless({
    path: [
      '/api/auth/sign-in',
      '/api/auth/sign-up',
      '/api/docs'
    ]
}));

app.use(setCORS);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouters);

// logging error
app.use(errorLoggingMiddleware);
app.use(errorMiddleware);

app.listen(PORT || defaultPort, () => console.log(`App listening on port ${PORT || defaultPort}`));
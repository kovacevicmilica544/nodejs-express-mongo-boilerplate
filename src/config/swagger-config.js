const {swagger_url} = require('../config/config');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Boilerplate",
        version: "1.0.0",
        description:
          "Boilerplate app",
        contact: {
          name: "Milica Kovacevic",
          email: "kovacevicmilica544@gmail.com"
        }
      },
      servers: [
        {
          url: swagger_url
        }
      ],
    },
    apis: ['./src/controllers/*.js', './src/models/*.js'],
};

module.exports = swaggerOptions;


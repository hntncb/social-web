import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Post API',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/',
        description: 'Vite Proxy',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/features/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

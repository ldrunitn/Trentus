const express = require('express');
const app = express();
const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];
const doc = {
  info: {
    version: '2.0.0',            
    title: 'Trentus API',             
    description: 'Documentazione delle API di Trentus'        
  },
  servers: [
    {
      url: 'http://localhost:8080',             
      description: 'Server Locale'      
    },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Bearer token per accedere alle API',
    },
  },
  security: [{ BearerAuth: [] }],
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
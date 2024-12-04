const express = require('express');
const app = express();
const swaggerAutogen = require('swagger-autogen');
const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];
const documentation = {
  info: {
    title: 'Trentus API', // API title
    description: 'Documentazione delle API di Trentus', // API description
  },
  host: 'localhost:8080', // Base URL (update for production)
  schemes: ['http'], // or ['https'] for HTTPS APIs
};
swaggerAutogen(outputFile, endpointsFiles, documentation).then(() => {
  console.log('Swagger documentation generated!');
});
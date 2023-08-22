const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('../routes/index.js');
require('../models/index.js');
// import express from 'express';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';
// import routes from './routes/index.js';
// import './db.js';

const server = express();

server.set('name', 'API');

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Use bodyParser.urlencoded
server.use(bodyParser.json({ limit: '50mb' })); // Use bodyParser.json
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

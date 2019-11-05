const express = require('express');
// const hubsRouter = require('./hubs/hubs-router.js');


const server = express();

server.use(express.json());

module.exports = server;
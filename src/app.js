var express = require('express');
const { model }= require('./logica')
var server = express();

// server.use(express.json());

server.listen(3000);

module.exports = {model, server}
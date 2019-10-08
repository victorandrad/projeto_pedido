const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const server = express();
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/hamburgueria2', {
    useNewUrlParser: true,
    useCreateIndex: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3000);

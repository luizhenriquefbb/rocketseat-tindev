const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create a server
const server = express();

// connect to mongo atlas
mongoose.connect('mongodb+srv://tindev:tindev@cluster0-qxsir.mongodb.net/tindev?retryWrites=true&w=majority',
{ useNewUrlParser: true });

server.use(cors());

// body must be a json
server.use(express.json());

// import routes
server.use(require('./routes'));

server.listen(3333);
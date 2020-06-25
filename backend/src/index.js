const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const consts = require('./config/consts');

// create a server
const app = express();
const server = require('http').Server(app);
const io = require ('socket.io')(server);


const connectedUsersHandler = require('./connectedUsersHandler');

// every time someone connect via websocket
io.on('connection', (socket) => {
    const dev_id = socket.handshake.query.dev_id;
    const socket_id = socket.id;
    connectedUsersHandler.new_user(dev_id, socket_id);
});

// connect to mongo atlas
mongoose.connect('mongodb+srv://tindev:tindev@cluster0-qxsir.mongodb.net/tindev?retryWrites=true&w=majority',
{ useNewUrlParser: true });


// middleware to pass our connected users to the controller
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsersHandler = connectedUsersHandler;
    return next();
});

app.use(cors());

// body must be a json
app.use(express.json());

// import routes
app.use(require('./routes'));

server.listen(consts.PORT);
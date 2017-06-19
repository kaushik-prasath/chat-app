//BUILT IN MODULES
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });

    socket.on('createMessage', function(message) {
        console.log('Received message from the user', message);
    });

    socket.emit('newMessage', {
        from: 'kamalakannan',
        text: 'hey buddy!Are you free this evening?',
        createdAt: 123
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
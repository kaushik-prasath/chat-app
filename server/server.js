//BUILT IN MODULES
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils/message');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });

    socket.on('createMessage', function(message,callback) {
        console.log('Received message from the user', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });


});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
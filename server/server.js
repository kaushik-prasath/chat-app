//BUILT IN MODULES
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected!');

    

    socket.on('join',function(param,callback){
        if(!isRealString(param.name) || !isRealString(param.room)){
            return callback("Both Display name and room name are required");
        }

        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,param.name,param.room);

        io.to(param.room).emit('updateUserList',users.getUserList(param.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        
        socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} has joined.`));
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has disconnected');

        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the chat.` ));
            
        }
    });

    socket.on('createMessage', function(message,callback) {
        var user = users.getUser(socket.id);
        
        if(user && isRealString(message.text)){
             io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
        

    });

    socket.on('createLocationMessage',function(coords){
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
       
    });

});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
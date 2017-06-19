  var socket = io();

  socket.on('connect', function() {
      console.log('Connected to server');


      socket.emit('createMessage', {
          from: 'kaushik prasath',
          text: 'hello server! how are u?'
      });
  });
  socket.on('disconnect', function() {
      console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
      console.log('Received a new message', message);
  });
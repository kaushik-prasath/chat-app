  var socket = io();

  socket.on('connect', function() {
      console.log('Connected to server');

  });

  socket.on('disconnect', function() {
      console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
      var formattedTime = moment(message.createdAt).format('LT');
      var li = jQuery('<li></li>');
      li.text(`${message.from} ${formattedTime} : ${message.text}`);
      jQuery('#messages').append(li);
  });
  socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('LT');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime} : `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
  });




jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var inputButton = jQuery('[name=message]');

    socket.emit('createMessage',{
        from: 'User',
        text:inputButton.val()
  },function(){
        inputButton.val('');
  });
});

let locationButton = $('#send-location');

locationButton.on('click',function() {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported in your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });

});
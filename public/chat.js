let socket = io.connect('http://localhost:4000');

// Query DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// Emit Events

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});

//Listen events

socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message..... </em></p>';
});
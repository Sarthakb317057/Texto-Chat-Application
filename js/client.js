const socket = io('http://localhost:8000');

//get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//audio that will be played on reciving the messages
var audio = new Audio('ting.ogg');

//Function that will append event info to the container 
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
//Ask the name of the user
const name = prompt("Enter your Name to Join the Chat");
socket.emit('new-user-joined', name);


//if new user joins recive name from server
socket.on('user-joined', name => {
    append(`${name} Joined the Chat`, 'center');
})

//server sends a message recive it
socket.on('recive', data => {
    append(`${data.name} :-
    ${data.message}`, 'left');
})

// if user leaves the chat apeend info to container
socket.on('left', name => {
    append(`${name} Left the Chat`, 'center');
})

// if form gets submitted send it to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
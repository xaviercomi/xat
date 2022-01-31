
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leaveRoom = document.getElementById('leave-btn');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io.connect('http://localhost:3000');
// Join chat room
socket.emit('joinRoom', { username, room }, (e)=> {
  e.preventDefault();
});
// Message from server
socket.on('message', (message) => {
  outputMessage(message)
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight                                                
});

// Get room and users 
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room) 
  outputUsers(users)
});

// Message submit'
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
      return false;
    }

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();    
});


//Prompt the user before leave chat room

leaveRoom.addEventListener('click', () => {
  const sureLeaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (sureLeaveRoom) {
    window.location = '../html/index.html';
  }
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  chatMessages.appendChild(div);
};    


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
};

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
  const li = document.createElement('li');
  li.innerText = user.username;
  userList.appendChild(li);
  });  
};




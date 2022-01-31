const formatMessage = require('./middlewares/messages');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  addMessage
} = require('./middlewares/user');

const io = require('./server')

module.exports = function(io) {

const xatName = 'xipXat ';

// Run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', async({ username, room }) => {

      try {
        const user = await userJoin(socket.id, username, room);

          socket.join(user.room);

          // Welcome current user
          socket.emit('message', formatMessage(xatName, 'Welcome to XiPXAT!'));

          // Broadcast when a user connects
          socket.broadcast
            .to(user.room)
            .emit(
              'message',
              formatMessage(xatName, `${user.username} has joined the chat`)
            );
  
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: await getRoomUsers(user.room)
          });

      } catch (error) {
          console.log(error)
      }

    });

    // Listen for chatMessage
    socket.on('chatMessage', async (msg) => {
      try {
        const user = await getCurrentUser(socket.id);

        addMessage(user, msg);

        const userToObject = Object.assign({}, user)

        const userRoom = userToObject[0].room;
        const userName = userToObject[0].username;

        io.to(userRoom).emit('message', formatMessage(userName, msg));  
      } catch (error) {
        console.log(error)
      }  
    }); 

    // Runs when client disconnects
    socket.on('disconnect', async () => {

      try {
        const user = await userLeave(socket.id);
        
        // Message to all users: who leave the chat
        if (user) {
          io.to(user.room).emit(
            'message',
            formatMessage(xatName, `${user.username} has left the chat`)
          );
          // Send users and room info to all users
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: await getRoomUsers(user.room)
          });
        };

      } catch (error) {
          console.log(error)
      }

    });

});
}
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

  const xatName = 'xipXat';

  // Run when client connects
  io.on('connection', socket => {

      socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        if (user) {

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
            users: getRoomUsers(user.room)
          });
        }

    });

      // Listen for chatMessage
      socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)
        if (user) { 
          addMessage(user, msg);
          io.to(user.room).emit('message', formatMessage(user.username, msg));
        }
      }); 

      // Runs when client disconnects
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
          io.to(user.room).emit(
            'message',
            formatMessage(xatName, `${user.username} has left the chat`)
          );
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }

      });

  });
}
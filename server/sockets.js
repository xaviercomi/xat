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
        const user = await userJoin(socket.id, username, room);

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
            users: await getRoomUsers(user.room)
          });

          
        }

      });

      // Listen for chatMessage
      socket.on('chatMessage', async (msg) => {
        console.log(msg)
        const user = await getCurrentUser(socket.id);
        addMessage(user, msg);
        const userToObject = Object.assign({}, user)
        console.log(typeof user)
        console.log(userToObject)
        const userRoom = userToObject[0].room;
        const userName = userToObject[0].username;
        io.to(userRoom).emit('message', formatMessage(userName, msg));  
        console.log(user.room, msg + "llega al servidor");
        
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
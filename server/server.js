
const express = require('express');
const app = express();
const { PORT } = require('./config');
const http = require('http').Server(app)
const io = require('socket.io')(http, 
    {cors: {
        origin: "https://localhost:3001",
        methods: ["GET", "POST"],
        alloweHeaders: ["custom"],
        credentials: true
    } 
});

const routes = require('./routes/route')
const cors = require('cors')


app.use(cors());
app.use(express.json())
app.use('/', routes);
    
require('./database');
require('./sockets')(io);

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

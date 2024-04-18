import { Server } from "socket.io";

export function initiateSocketIO(server) {
    const io = new Server(server, {
      cors: {
        // origin: 'https://review-movie-app.netlify.app', // set this when deployment
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
      }
    });

    let users = []

    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId === userId) && 
      users.push({userId, socketId })
    }

    const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
      return users.find((user) => user.userId === userId)
    }
  
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      socket.on('sendMessage', ({senderId, recieverId, content}) => {
         const user = getUser(recieverId)
         io.to(user.socketId).emit("getMessage",{
          senderId,
          content
         })
      })
      socket.on("addUser", (userId) => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)
      })
      io.emit('welcome', 'hello this is socket server')
      
      socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
        removeUser(socket.id)
        io.emit("getUsers", users)
      })
  
     
    });
  }
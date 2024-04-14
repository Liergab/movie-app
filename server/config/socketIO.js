import { Server } from "socket.io";

export function initiateSocketIO(server) {
    const io = new Server(server, {
      cors: {
        // origin: 'https://review-movie-app.netlify.app', // set this when deployment
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
      }
    });
  
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      socket.on('send_message', (data) => {
        socket.broadcast.emit('recieve_message', data)
      })
      
      socket.on("disconnected", () => {
        console.log("user diconnected", socket.id)
      })
  
     
    });
  }
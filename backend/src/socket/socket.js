import {Server} from "socket.io"
import http from "http"
import express from "express"
import Conversation from "../models/conversation.js"
import Message from "../models/message.js"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
      origin:["http://localhost:5173"],
      methods:["GET", "POST"]

    }
})

// const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ senderId, receiverId }) => {
        const roomId = [senderId, receiverId].sort().join('-');
        socket.join(roomId);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        try {
            console.log("hello")
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                });
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message,
            });

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await Promise.all([conversation.save(), newMessage.save()]);

            const roomId = [senderId, receiverId].sort().join('-');
            io.to(roomId).emit('receiveMessage', newMessage);
            console.log("sfhbjhdsfbhjdbs")
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



export  {app, io, server}


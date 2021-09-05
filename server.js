const http1 = require('http');
const app1 = require('./app');

const port = process.env.PORT || 3000;

const server1 = http1.createServer(app1);

const socketIO = require('socket.io')(server);

const socketManager = require('./sockets/socket_manager');
socketManager.startListener(socketIO);

server1.listen(port, () => console.debug("Server start at PORT 3000"));
////
const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io')
var app = express();
var arraylist = require('arraylist')
var lisstUsers = new arraylist;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var server = app.listen(3002,()=>{
    console.log('Server is running on port number 3000')
})
//Chat Server
var io = socketio.listen(server)

io.on('connection',function(socket) {

    //The moment one of your client connected to socket.io server it will obtain socket id
    //Let's print this out.
    console.log(`Connection : SocketId = ${socket.id}`)
    //Since we are going to use userName through whole socket connection, Let's make it global.   
    var userName = '';
    lisstUsers.unique();

        console.log( socket.client.conn.server.clientsCount + " users connected" );    
   
        var count = lisstUsers.find(function(userName){
            return
             userName .betValue ==result;
        }).length;
        lisstUsers.add(userName);
        console.log( count + " users connected" );  


    socket.on('subscribe', function(data) {
        console.log('subscribe trigged')
        const room_data = JSON.parse(data)
        userName = room_data.userName;
        const roomName = room_data.roomName;
    
        socket.join(`${roomName}`)
        console.log(`Username : ${userName} joined Room Name : ${roomName}`)
        
       
        // Let the other user get notification that user got into the room;
        // It can be use to indicate that person has read the messages. (Like turns "unread" into "read")

        //TODO: need to chose
        //io.to : User who has joined can get a event;
        //socket.broadcast.to : all the users except the user who has joined will get the message
        // socket.broadcast.to(`${roomName}`).emit('newUserToChatRoom',userName);
        io.to(`${roomName}`).emit('newUserToChatRoom',userName);

    })

    socket.on('unsubscribe',function(data) {
        console.log('unsubscribe trigged')
        const room_data = JSON.parse(data)
        const userName = room_data.userName;
        const roomName = room_data.roomName;
    
        console.log(`Username : ${userName} leaved Room Name : ${roomName}`)
        socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom',userName)
        socket.leave(`${roomName}`)
    })

    socket.on('newMessage',function(data) {
        console.log('newMessage triggered')

        const messageData = JSON.parse(data)
        const messageContent = messageData.messageContent
        const roomName = messageData.roomName

        console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`)
        // Just pass the data that has been passed from the writer socket

        const chatData = {
            userName : userName,
            messageContent : messageContent,
            roomName : roomName
        }
        socket.broadcast.to(`${roomName}`).emit('updateChat',JSON.stringify(chatData)) // Need to be parsed into Kotlin object in Kotlin
    })

    // socket.on('typing',function(roomNumber){ //Only roomNumber is needed here
    //     console.log('typing triggered')
    //     socket.broadcast.to(`${roomNumber}`).emit('typing')
    // })

    // socket.on('stopTyping',function(roomNumber){ //Only roomNumber is needed here
    //     console.log('stopTyping triggered')
    //     socket.broadcast.to(`${roomNumber}`).emit('stopTyping')
    // })

    socket.on('disconnect', function () {
        console.log("One of sockets disconnected from our server.")
    });
})

module.exports = server; //Exporting for test
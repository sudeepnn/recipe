const io=require('socket.io')(3000,{
    cors:{
        origin:["http://localhost:8080"],
    },
})
const user={}
io.on('connection',socket=>{
    console.log(socket.id)
    socket.on('new-user',name=>{
        user[socket.id]=name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on("send-message",(message,room)=>{
        if(room===''){
            socket.broadcast.emit('recieve-message',{message:message,name:user[socket.id]})
        }
        else{
            socket.to(room).emit('recieve-message',{message:message,name:user[socket.id]})
        }
       
    })
    socket.on("join-room",room=>{
        socket.join(room)
        
    })
})
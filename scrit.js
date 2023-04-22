import {io} from 'socket.io-client'
const message=document.getElementById("message")
const sendbtn=document.getElementById("sendbtn")
const joinbtn=document.getElementById("joinbtn")
const messageinput=document.getElementById("messageinput")
const roominput=document.getElementById("roominput")
const form=document.getElementById("form")

const socket=io('http://localhost:3000')

const name=prompt("Enter your Name: ");
displaymessage("You Joined")
socket.emit('new-user',name)

// socket.on("connect",()=>{
//     displaymessage(`you have connected to ${socket.id}`)
// })

socket.on('user-connected',name=>{
    displaymessage(`${name} Joined`)

})

socket.on('recieve-message',data=>{
    displaymessage(`${data.name}: ${data.message}`)
})

form.addEventListener("submit",e=>{
    e.preventDefault()
    const message=messageinput.value
    const room=roominput.value
    if(message==="")return
    displaymessage("You:"+message)
    socket.emit('send-message',message,room)
    messageinput.value=""
})

joinbtn.addEventListener("click",()=>{
    const room=roominput.value
    socket.emit("join-room",room)
})
function displaymessage(message){
    const div=document.createElement("div")
    // div.className="chat"
    div.classList.add("chat");
    div.textContent=message
    document.getElementById("message").append(div)
}

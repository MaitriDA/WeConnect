const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users=[];

const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId===userId) &&
        users.push({userId,socketId});
}

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId!==socketId);
}

const getUser=(userId)=>{
    return users.find(user=>user.userId===userId);
}
io.on("connection", socket => {
    io.emit("Welcome","hello this is socket server")
    //If user is online add the user to array
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users);
    })

    //Send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId);
        if(user){
            io.to(user.socketId).emit("getMessage",{
                senderId,text
            })
        }
    })

    //If the user is offline remove the user from array
    socket.on("disconnect",()=>{
        removeUser(socket.id);
        io.emit("getUsers",users)
    });
});

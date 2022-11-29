let users = [];

const SocketServer = socket => {
    // Connect and Disconnect Socket
    socket.on('johnUser', id => {
        users.push({id, socketID : socket.id})
        // console.log({users})
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketID !== socket.id)
        // console.log({users})
    })
    // Chat Socket
    socket.on("createChat", message => {
        // console.log(message)
        const user = users.find(user => user.id === message.recipient)
        user && socket.to(`${user.socketID}`).emit("createChatToClient", message)
    })
}

module.exports = SocketServer
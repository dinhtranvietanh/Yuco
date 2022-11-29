require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const req = require('express/lib/request')
const SocketServer = require('./socketserver')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/chatRouter'))


const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  SocketServer(socket)
})
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {


    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('connected')
}
)
const port = process.env.PORT || 7070
app.listen(port, () => {
    console.log('server is runningon port', port)
})
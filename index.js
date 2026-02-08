const express = require('express');
const app = express();
const http = require('http').createServer(app);
const post = require('./Models/adminPost');  
var {Server} = require('socket.io');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
var io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
  


  
const adminRouter = require('./Routes/admin_route');
const userRouter = require('./Routes/user_route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//connect to the database if needed 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://delvadiyamv:mvd246@blogdata.d2h8lsr.mongodb.net/?retryWrites=true&w=majority&appName=blogdata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err)); 
  const{objectID} = require('mongodb');

app.use('/', adminRouter);
app.use('/', userRouter);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('newPost', (data) => {
    console.log('New post created:', data);
    socket.broadcast.emit('newPost', data);
    //io.emit('newPost', data); 
   
  });
  socket.on('updateViews', async (postId) => {
   console.log('Post viewed:', postId);
    var data = await post.findOneAndUpdate({ _id: postId }, { $inc: { Views: 1 } }, { new: true });
    io.emit('viewsUpdated', { postId: postId, Views: data.Views  });  
  }); 
  
}); 
  
http.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


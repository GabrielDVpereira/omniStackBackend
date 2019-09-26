const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connetion', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});

mongoose.connect("mongodb+srv://oministack:gabriel299@cluster0-ldd1j.mongodb.net/oministack?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

 app.use((req,res, next) => {
   req.io = io;

   return next();
 });

 app.use(express.json());
 app.use(cors());
 app.use(express.urlencoded({extented: true}));
 app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
 app.use(require('./routes'));

 server.listen(process.env.PORT || 3333);

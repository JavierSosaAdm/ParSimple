const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/mainRouter');
const http = require('http');
const { Server : SocketServer } = require('socket.io')
const { create } = require('domain');

const server = express();
const app = http.createServer(server); //Envolvemos a server de express en un servidor http
const io = new SocketServer(app,{
  cors: {
    origin: '*' 
  }
}) // Creamos una instancia de SocketServer
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('message',(data) => {
    console.log(data)
    socket.broadcast.emit('message', data)     
  })
})

//!configuraciones del servidor

//!middlewares

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

//!configuracion de la cabecera

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
});

server.use(router) 

module.exports = server;
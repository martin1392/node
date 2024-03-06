
//instalar esto : npm i express socket.io
const app = require('express')();
const httpServer = require('http').createServer(app);
//const chalk = require('chalk');
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = 3000;

io.on('connection', (socket) => {
  /*
  const id_handshake = socket.id;
  let {payload} = socket.handshake.query;
  console.log(`${chalk.blue(`Nuevo dispositivo conectado: ${id_handshake}`)}`);
*/
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
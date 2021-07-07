const io = require('socket.io-client');

const socket = io('ws://localhost:4000');
const payload = {
  costRange: [
    {
      min: 0,
      max: 500,
    },
  ],
};

socket.emit('range', payload);

socket.on('range', (data) => {
  console.log('client', data);
});

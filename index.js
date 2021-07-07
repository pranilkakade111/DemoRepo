const express = require('express');
const axios = require('axios');

const app = express();
const baseUrl = 'http://localhost:8000';

app.use(express.static(`${__dirname}/public`));

// listen for request
const server = app.listen(4000, () => {
  console.log('Connected, server started listening on port :', 4000);
});

const io = require('socket.io')(server);

function getData(payload) {
  console.log('axios', payload);
  return axios.post(`${baseUrl}/books/priceRange`, payload);
}
io.on('connection', (socket) => {
  console.log('connected with soket..!');
  socket.on('range', async (payload) => {
    let result = [];
    result = await getData(payload);
    console.log('result', result);
    socket.emit('range', result.data);
  });
});

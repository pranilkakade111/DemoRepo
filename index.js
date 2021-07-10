const express = require('express');
const axios = require('axios');
const socket = require('socket.io');
require('dotenv').config();

const app = express();
const baseUrl = process.env.URL;
const port = process.env.SOCKET_PORT;
app.use(express.static(`${__dirname}/public/`));

// listen for request
const server = app.listen(port, () => {
  console.log('Connected, server started listening on port :', port);
});

const io = socket(server);

/**
  * @description this function takes books cost ranges as a parameter and
  * returns number of books, corrousponding ranges
  * @param {*} payload contains the books cost ranges
  */
const getData = (payload) => axios.post(`${baseUrl}/books/priceRange`, payload);

/**
 * @description establish connection with client, emit response as per
 * requested event by client
 * @param socket is reponsible to emit and on envets
 */
io.on('connection', (socket) => {
  console.log('connected with soket');
  socket.on('range', async (payload) => {
    let result = [];
    result = await getData(payload);
    socket.emit('range', result.data.data);
  });
});

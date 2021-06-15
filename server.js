const express = require('express');
const swaggerUi = require('swagger-ui-express');
const logger = require('./logger/logger');
const swaggerDoc = require('./swagger.json');
const dbConnection = require('./config/dbConfig');

require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (req, res) => {
  res.send('Welcome To Book-Store App...!');
});

require('./app/routes/route')(app);

app.listen(port, () => {
  logger.log('info', `Server Started Succesfully ${port}`);
});

new dbConnection(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).connect()
  .then((uri) => console.log(`Connected To ${uri} Successfully...!`))
  .catch((err) => console.log('could Not Connected To Database..!', err));

module.exports = app;

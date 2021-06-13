/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : route.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 06-05-2021
 ************************************************************************* */
const user = require('../controllers/user');
const book = require('../controllers/book');
const helper = require('../../utility/helper');

module.exports = (app) => {
  app.post('/user', helper.setUserRole('user'), user.userRegister);

  app.post('/admin', helper.setUserRole('admin'), user.userRegister);

  app.post('/userLogin', helper.setUserType('user'), user.login);

  app.post('/adminLogin', helper.setUserType('admin'), user.login);

  app.post('/forgotPassword', user.forgotPassword);

  app.post('/resetPassword', helper.verifyToken, user.resetPassword);

  app.post('/books', helper.verifyRole, book.createBook);

  app.get('/books', helper.verifyToken, book.getAllBooks);

  app.put('/books/:bookId', helper.verifyRole, book.updateBook);

  app.delete('/books/:bookId', helper.verifyRole, book.deleteBook);
};

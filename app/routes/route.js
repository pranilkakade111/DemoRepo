/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : route.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 06-06-2021
 ************************************************************************* */
const user = require('../controllers/user');
const book = require('../controllers/book');
const cart = require('../controllers/cart');
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

  app.put('/addToCart', helper.verifyToken, cart.addToCart);

  app.put('/removeFromCart', helper.verifyToken, cart.removeFromCart);

  app.put('/purchaseBook', helper.verifyToken, cart.purchaseBook);

  app.get('/getAllCart', helper.verifyToken, cart.getAllCart);

  app.get('/getCartById/:userId', helper.verifyToken, cart.getCartById);

  app.get('/books/:author', helper.verifyToken, book.searchByAuthor);

  app.get('/authorSearch', helper.verifyToken, book.searchAllAuthor);
};

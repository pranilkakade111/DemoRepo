/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : cart.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 17-06-2021
 ************************************************************************* */
const { reject } = require('async');
const cartModel = require('../models/cart');

class CartService {

  /**
  * @description      : It is used to add book to the cart taking data from control and sending to models
  * @param {cartData} : it contains data which we are passing from body
  * @returns          : Callback
  */
  addToCart = (cartData, callback) => {
    cartModel.addToCart(cartData, callback);  
  };

  /**
   * @description        : It is used to remove book from cart taking data from controller and sending to models
   * @param {cartDetail} : it contains data which we are passing from body
   * @returns            : callback
  */
  removeFromCart = (cartDetail, callback) => {
    cartModel.removeFromCart(cartDetail, callback);
  };

  /**
   * @description   : It is used to place order from cart taking data from controller and sending to models
   * @param {cart}  : it contains data which we are passing from body
   * @returns       : Promise
  */
  purchaseBook = (cart) => {
    return new Promise((resolve, reject) => {
      cartModel.purchaseBook(cart)
           .then((book) => {
             resolve(book);
           }).catch((err) => reject({ err })); 
    });   
  };

  /**
  * @description   : It is used to get all carts from book store taking data from controller and sending to models
  * @param {}      : it contains data which we are passing from body
  * @param {token} : its has login token and sending to helper to extract id of user
  * @returns       : Promise
  */
  getAllCart = () => {
    return new Promise((resolve, reject) => {
      cartModel.getAllCart()
      .then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  };

  /**
  * @description     : It is used to get a cart from book store taking data from controller and sending to models
  * @param {getCart} : it contains data which we are passing from body
  * @param {token}   : its has login token and sending to helper to extract id of user
  * @returns         : Promise
  */
  getCartById = (getCart) => {
    return new Promise((resolve, reject) =>{
      cartModel.getCartById(getCart)
      .then((cart) => {
        resolve(cart);
      }).catch((err) => {
        reject(err);
      });
    });
  };
};

module.exports = new CartService();

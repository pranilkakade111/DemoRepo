/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : cart.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 17-06-2021
 ************************************************************************* */
const mongoose = require('mongoose');
const cart = require('../services/cart');

const cartSchema = mongoose.Schema({
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPurchased: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false,
});

const Cart = mongoose.model('Cart', cartSchema);

class CartModel {

  /**
   * @description   : It adds book into the cart
   * @param {*} cartData
   * @returns       : Callback
  */
  addToCart = async (cartData, callback) => {
    const userId = cartData.userId;
    const bookId = cartData.bookId;
    
    const userPresent = await Cart.findOne({userId: userId});
     if(!userPresent) {
      const cart = new Cart({
        bookId: cartData.bookId,
        userId: cartData.userId,
    });
      cart.save(callback);
    } else {
      const cartCheck = await Cart.updateOne({userId}, { $addToSet: { bookId: bookId } });
      callback(null, cartCheck);
      }
  };

  /**
   * @description   : It removes book from cart
   * @param {*} cartDetail
   * @returns       : callback
  */
  removeFromCart = async (cartDetail, callback) => {
    const bookId = cartDetail.bookId;
    const userId = cartDetail.userId;

    const removeBook = await Cart.updateOne({userId}, { $pull: { bookId: bookId } });
    callback(null, removeBook);
  };

  /**
    * @description   : It changes the isPurchased to true in cart
    * @param {*} cart
    * @returns       : Promise
   */
  purchaseBook = (cart) => {
    return new Promise((resolve, reject) => {
      Cart.findOneAndUpdate({ userId: { $eq: cart.userId }, _id: { $eq: cart.cartId } }, {isPurchased: true}, {new: true})
      .then((data) => resolve({ data }))
      .catch((err) => reject({ err }));
    }); 
 };

 /**
 * @description     : getting all carts from the book store app
 * @returns         : Promise
 */
 getAllCart = async () => {
   const cartData = Cart.find();
   return cartData;
 };

 /**
 * @description     : getting a perticukar cart from the book store app
 * @returns         : Promise
 */
 getCartById = async (getCart) => {
    const cartData = await Cart.findById(getCart);
    return cartData;
 };
};

module.exports = new CartModel();

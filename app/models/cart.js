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

  checkBook = (bookID, callback) => {
     Cart.findOne({ bookId: bookID.bookId }, (err, bookResult) => {
       if (err) {
         callback(err, null);
       } else {
         callback(null, bookResult);
       }
     });
    };

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

  removeFromCart = async (cartDetail, callback) => {
    const bookId = cartDetail.bookId;
    const userId = cartDetail.userId;

    const removeBook = await Cart.updateOne({userId}, { $pull: { bookId: bookId } });
    callback(null, removeBook);
  };

  validPlaceOrder = (cart, callback) => {
    Cart.find({ cartId: cart.cartId }, (err, validCheck) => {
      console.log(cart.userId);
      if(cart.userId) {
        callback(null, validCheck);
      } else {
        callback(err, null);
      }
    });
  };

  purchaseBook = (cart) => {
    return new Promise((resolve, reject) => {
      Cart.findByIdAndUpdate(cart.cartId, {isPurchased: true}, {new: true})
      .then((data) => resolve({ data }))
      .catch((err) => reject({ err }));
    });
  
 };
};

module.exports = new CartModel();

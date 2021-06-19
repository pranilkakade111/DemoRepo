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
    
     Cart.find({ bookId: bookID.bookId }, (err, bookResult) => {
       if (err){
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
    console.log(userPresent);
     if(!userPresent) {
      const cart = new Cart({
        bookId: cartData.bookId,
        userId: cartData.userId,
    });
    cart.save(callback);
     } else {
      const cartCheck = await Cart.findOneAndUpdate(userId, { $addToSet: { bookId: bookId } }, {new: true});
       console.log(userId);
      // console.log(bookId);
      console.log(cartCheck);
      callback(null, cartCheck);
      }
  };

  removeFromCart = async (cartDetail, callback) => {
    const bookId = cartDetail.bookId;
    const userId = cartDetail.userId;

    const removeBook = await Cart.findOneAndUpdate (userId, { $pull: { bookId: bookId } });
    callback(null, removeBook);
  };

  purchaseBook = (userID, callback) => {
    Cart.findOneAndUpdate (userID, { isPurchased: false }, { new: true })
    .then((user) => {
      callback(null, user);
    }).catch((err) => {
      callback(err, null);
    });
  };
};

module.exports = new CartModel();

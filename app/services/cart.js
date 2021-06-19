const cartModel = require('../models/cart');

class CartService {
  addToCart = (cartData, callback) => {
    // cartModel.checkBook(cartData, (err, bookExist) =>{
    //   if (err) {
    //     err = {
    //       success: false,
    //       message: 'Something Went Wrong...!',
    //       err,
    //     }
    //     callback(err, null); 
    //   } else if (bookExist != 0) {
    //     let bookID = ''
    //      bookID = {
    //       success: false,
    //       message: 'Book Already Present In Cart...!',
    //      }
    //      callback(bookID, null);
    //   } else {
        cartModel.addToCart(cartData, callback); 
    //   }
    // });
  };

  removeFromCart = (cartDetail, callback) => {
    cartModel.removeFromCart(cartDetail, callback);
  };

  purchaseBook = (userID, callback) => {
    cartModel.purchaseBook(userID, callback);
  };
};

module.exports = new CartService();

const cartModel = require('../models/cart');

class CartService {

  addToCart = (cartData, callback) => {
    cartModel.addToCart(cartData, callback);  
  };

  removeFromCart = (cartDetail, callback) => {
    cartModel.removeFromCart(cartDetail, callback);
  };

  purchaseBook = (cart) => {
    return new Promise((resolve, reject) => {
      const order = cartModel.purchaseBook(cart);
      order.then((book) => resolve({ book }))
           .catch((err) => reject({ err })); 
    });
    
  };
};

module.exports = new CartService();

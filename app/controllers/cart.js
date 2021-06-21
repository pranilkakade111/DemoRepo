const cartService = require('../services/cart');

class CartController {

  addToCart = (req, res) => {
        const cartData = {
            bookId: req.body.bookId,
            userId: req.userId,
          };
          cartService.addToCart(cartData, (err, addCart) => {
            if(addCart == null || addCart == undefined || addCart == '' || err){
              return res.status(401).send({
                  success: false,
                  message: 'Failed To Add Book In A Cart..!!!',
                  err,
                 });
            } else {
              return res.status(200).send({
                success: true,
                message: 'Book Added In A Cart Successfully...!!! ',
                data: addCart, 
               });
            }
          }); 
  };

  removeFromCart = (req, res) => {
    const cartDetail = {
      bookId: req.body.bookId,
      userId: req.userId,
    };
    cartService.removeFromCart(cartDetail, (err, cartResults) =>{
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed To Remove Book In A Cart..!!!',
          err, 
         }); 
      } else {
        return res.status(200).send({
          success: true,
          message: 'Remove Book From The Cart Successfully...!!! ',
          data: cartResults, 
         });
      }
    });
  };

  purchaseBook = (req, res) => {
    const cart = req.params.cartId;

    cartService.purchaseBook(cart, (err, bookResult) => {
      if(bookResult === null || err){
        return res.status(404).send({
            success: false,
            message: 'Cart Not Found With An Id..!!' + cart,
        });
    }else {
        return res.status(200).send({
            success: true,
            message: 'Book Is Purchased By User Successfully....!!!!'
        });
    }
    });
  };
};

module.exports = new CartController();

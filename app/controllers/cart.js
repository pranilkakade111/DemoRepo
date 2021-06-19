const cartService = require('../services/cart');

class CartController {

  addToCart = (req, res) => {
        const cartData = {
            bookId: req.body.bookId,
            userId: req.userId,
          };
          cartService.addToCart(cartData, (err, cartResult) => {  
            if(cartResult == null || cartResult == undefined || cartResult == ''){
              return res.status(401).send({
                  success: false,
                  message: 'Failed To Add Book In A Cart..!!!',
                  err, 
                 });
            } else {
              return res.status(200).send({
                  success: true,
                  message: 'Book Added In A Cart Successfully...!!! ',
                  data: cartResult, 
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
    const userID = req.params.userId;

    cartService.purchaseBook(userID, (err, bookResult) => {
      if(bookResult === null || err){
        return res.status(404).send({
            success: false,
            message: 'User Not Found With An Id..!!' + userID,
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

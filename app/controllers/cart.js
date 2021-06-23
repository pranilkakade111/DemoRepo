/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : cart.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 17-06-2021
 ************************************************************************* */
const cartService = require('../services/cart');

class CartController {

  /**
  * @description : It is adding book to cart in bookstore
  * @param {*} req
  * @param {*} res
  * @method : addToCart from service.js
  */
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
                message: 'Book Added In A Cart Successfully...!!!',
                data: addCart, 
               });
            }
          }); 
  };

  /**
   * @description : It is remove book from cart
   * @param {*} req
   * @param {*} res
   * @method: removeFromCart from service.js
  */
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

  /**
   * @description : It is remove book from cart
   * @param {*} req
   * @param {*} res
   * @method: removeFromCart from service.js
  */
  purchaseBook = async (req, res) => {
    try {
      const cart = {
        cartId: req.body.cartId,
        userId: req.userId,
       }
       const cartResult = await cartService.purchaseBook(cart);
       if(cartResult.data == null || cartResult.data == undefined || cartResult.data == '') {
        return res.status(401).send({
          success: false,
          message: 'There is No Cart Id Associate With Log in User...!',
        }); 
       } else {
        return res.status(200).send({
          success: true,
          message: 'Purchase Book From Cart successfully..!',
          data: cartResult,
        });
       }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error...!',
        error,
      });
    }
         
  };

  /**
   * @description : It is getting all existing carts from bookStore
   * @param {*} req
   * @param {*} res
   * @method: getAllCarts from service.js
  */
  getAllCart = async (req, res) => {
    try {
      const getCart = await cartService.getAllCart();
      if(getCart !== null){
        return res.status(200).send({
            success: true,
            message: 'All Carts Retrived Successfully....!!!',
            data: getCart,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Retrive All Carts.....!!',
        });
      } 
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error...!',
        error,
      });
    }
  };

  /**
   * @description : It is getting a existing cart from bookStore
   * @param {*} req
   * @param {*} res
   * @method: getCartById from service.js
  */
  getCartById = async (req, res) => {
    try {
      const getCartId = req.params.cartId;

    const cartDataId = await cartService.getCartById(getCartId);
    if (cartDataId !== null) {
      return res.status(200).send({
        success: true,
        message: 'Retrived A Perticular Cart Successfully....!!!' + getCartId,
        data: cartDataId,
    });
    } else {
      return res.status(401).send({
        success: false,
        message: 'Failed To Retrive A Cart.....!!',
    });
  }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error...!',
        error,
      }); 
    }
    
  };
};

module.exports = new CartController();

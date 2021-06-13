/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : book.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 09-06-2021
 ************************************************************************* */
const bookService = require('../services/book');
const joi = require('@hapi/joi');

const validateBookSchema = joi.object({
    author: joi.string().required(), 
    title: joi.string().required(),
    image: joi.string().required(),
    quantity: joi.string().required(),
    price: joi.string().required(),
    description: joi.string().required(), 
});

class BookController {

   /**
   * @description Create A Book 
   * @param {*} req in json formate
   * @param {*} resp sends response from server
   */  
  createBook = async (req, res) => {
      try {
          const result = await validateBookSchema.validate(req.data);
          if(result.error){
            return res.send('Fields Can Not Be Empty');
          }
        const bookInfo = {
            author: req.body.author, 
            title: req.body.title,
            image: req.body.image,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
        };
          const bookData = await bookService.createBook(bookInfo);
          if(bookData !== null) {
            return res.status(200).send({
                success: true,
                message: 'Book Added Successfully...!',
                bookData,
            });
          } else {
              return res.status(400).send({
                 success: false,
                 message: 'Failed To Add Book..!'
              });
          } 
      } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'Internal Server Error..!',
            error,
         });
      }
    };
      
   /**
   * @description Retrive All The Books
   * @param {*} req in json formate
   * @param {*} resp sends response from server
   */
    getAllBooks = async (req, res) => {
        try {
            const bookData = await bookService.getAllBooks();
            if (bookData !== null) {
              return res.status(200).send({
                  success: true,
                  message: 'Retrive All Books Successfully...!',
                  data: bookData,
              });
            } else {
              return res.status(401).send({
                  success: false,
                  message: 'Failed To Retrive All Books...!'
              });
            }  
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Server Error..!',
                error,
             }); 
        }
      
    };

   /**
   * @description Update A Existing book With BookId 
   * @param {*} req in json formate
   * @param {*} res sends response from server
   */
    updateBook = async (req, res) => {
        try {
            if(!req.body.author || !req.body.title || !req.body.image || !req.body.quantity || !req.body.price || !req.body.description) {
                return res.status(401).send({
                   success: false,
                   message: 'Fields Can Not Be Empty..!'
                });
              }
            const bookInfo = {
                author: req.body.author, 
                title: req.body.title,
                image: req.body.image,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                bookId: req.params.bookId,
            }; 
            const updateData = await bookService.updateBook(bookInfo);
            if (updateData !== null) {
                return res.status(200).send({
                    success: true,
                    message: 'Update Book Successfully...!',
                    data: updateData,
                });
              } else {
                return res.status(401).send({
                    success: false,
                    message: 'Failed To Update Books...!'
                });
              }  

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Server Error..!',
                error,
            });
        }      
    };

   /**
   * @description Delete A Book From Database
   * @param {*} req in json formate
   * @param {*} res sends response from server
   */
    deleteBook = async (req, res) => {
        try {
            const idData = req.params.bookId;
            const dataDelete = await bookService.deleteBook(idData);
            if(dataDelete !== null) {
              return res.status(200).send({
                  success: true,
                  message: 'Delete Book Successfully...!',
              });
            } else {
              return res.status(401).send({
                  success: false,
                  message: 'Failed To Delete Book...!'
              });
            }  
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Server Error..!',
                error,
            });  
        }   
    };
};

module.exports = new BookController();

/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : book.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 09-06-2021
 ************************************************************************* */
const { reject, resolve } = require('bluebird');
const bookModel = require('../models/book');

class BookServices {

  /**
   * @description request for save data to database using model methods
   * @param {*}  bookDetails data to be saved in json format
   */
  createBook = (bookDetail) => {
    return new Promise((resolve, reject) => {
        bookModel.createBook(bookDetail)
        .then((bookData) => {
           return resolve(bookData);
        }).catch((err) => {
           return reject(err);
        });
    });
  };

   /**
   * @description Retrive All the Books Form the Database using models Method  
   */
  getAllBooks = () => {
    return new Promise((resolve, reject) => {
        bookModel.getAllBooks()
        .then((bookDetails) => {
            return resolve(bookDetails);
        }).catch((err) => {
           return reject(err);
        });
    });
  };

   /**
   * @description Update Book data to database using model methods
   * @param {*}  updateData holds bookId
   */
  updateBook = (updateData) => {
    return new Promise((resolve, reject) => {
      bookModel.updateBook(updateData)
      .then((bookPresent) => {
        return resolve(bookPresent);
      }).catch((err) => {
        return reject(err);
      });
    });
  };

  /**
   * @description Delete Book From The database using model methods
   * @param {*}  deleteData holds bookId 
   */
  deleteBook = (deleteData) => {
    return new Promise((resolve, reject) => {
      bookModel.deleteBook(deleteData)
      .then((dataDelete) => {
        return resolve(dataDelete);
      }).catch((err) => {
        return reject(err);
      });
    });
  };

  /**
   * @description Get A Book From The database using model methods
   * @param {*}  searchField holds Author Name 
   */
  searchByAuthor = async (searchField) => {
    let searchdata = [];
    searchdata = await bookModel.searchByAuthor(searchField);
    return searchdata;
  };

  /**
   * @description Get All Book From The database using model methods 
   */
  searchAllAuthor = async () => {
    let dataSearch = [];
    dataSearch = await bookModel.searchAllAuthor();
    return dataSearch;
  };

  pricefilter = async (booksCostRange) => {
    try {
      let result = [];
      for (let i = 0; i < booksCostRange.length; i++) {
          let booksInRange = { range: '', numberOfBooks: '' };
          booksInRange.range = `${booksCostRange[i].min}-${booksCostRange[i].max}`;
          booksInRange.numberOfBooks = await bookModel.pricefilter(booksCostRange[i]);
          result[i] = booksInRange;
      }
      return result;
    } catch (error) {
      return error;
    }
  };
};

module.exports = new BookServices();

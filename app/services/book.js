const { reject, resolve } = require('bluebird');
const bookModel = require('../models/book');

class BookServices {

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

};

module.exports = new BookServices();

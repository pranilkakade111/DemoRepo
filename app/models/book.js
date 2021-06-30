/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : book.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 09-06-2021
 ************************************************************************* */
const mongoose = require('mongoose');
const { callbackPromise } = require('nodemailer/lib/shared');

const BookSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
},{
    timestamps: true
});
BookSchema.set("versionKey", false)

const Book = mongoose.model('Book', BookSchema);

class BookModel {
  
  /**
   * @description save request Book data to database
   * @param {*} bookDetail holds data to be saved in json formate
   */
  createBook = async (bookDetail) => {
    const book = new Book({
        author: bookDetail.author, 
        title: bookDetail.title,
        image: bookDetail.image,
        quantity: bookDetail.quantity,
        price: bookDetail.price,
        description: bookDetail.description,
    });
    const booksData = await book.save();
    return booksData;
  };

  /**
   * @description retrive all Book from database
   */
  getAllBooks = async () => {
    const books = await Book.find();
    return books;
  };

   /**
   * @description update Book data existed in database
   * @param {*} bookUpdate holds _id that is bookId
   */
  updateBook = async (bookUpdate) => {
    const updateBookData = await Book.findByIdAndUpdate(bookUpdate.bookId, { 
        author: bookUpdate.author, 
        title: bookUpdate.title,
        image: bookUpdate.image,
        quantity: bookUpdate.quantity,
        price: bookUpdate.price,
        description: bookUpdate.description 
    }, {new: true});
    return updateBookData;
  };

   /**
   * @description remove Book from database
   * @param {*} data holds _id that is bookId
   */
  deleteBook = async (data) => {
    const dataId = await Book.findByIdAndRemove(data);
    return dataId; 
  };

  searchByAuthor = async (searchField) => {
    const field = searchField;
    const result = await Book.aggregate([
      {$match: {author: field}},
      {
          $group: { _id: '$author', Books: { $push: '$title' }, Count: { $sum: 1 } }
      },
      { $project: { Owner: '$_id', Books: '$Books', Count: '$Count', _id: 0 } }
  ]);
  return result;
  };

  searchByAuthor = async (searchField) => {
    const field = searchField;
    const result = await Book.aggregate([
      {$match: {author: field}},
      {
          $group: { _id: '$author', Books: { $push: '$title' }, Count: { $sum: 1 } }
      },
      { $project: { Owner: '$_id', Books: '$Books', Count: '$Count', _id: 0 } }
  ]);
  return result;
  };

  searchAllAuthor = async () => {
    const data = await Book.aggregate([
      {
          $group: { _id: '$author', Books: { $push: '$title' }, Count: { $sum: 1 } }
      },
      { $project: { Owner: '$_id', Books: '$Books', Count: '$Count', _id: 0 } }
  ]);
  return data;
  };

  pricefilter = async (booksCostRange) => {
    try {
      let minPrice = booksCostRange.min;
      let maxPrice = booksCostRange.max;
      const result = await Book.find({ price: { $lte: maxPrice, $gte: minPrice } }).countDocuments();
      return result;
  } catch (error) {
      return error;
  }
  };
};

module.exports = new BookModel();

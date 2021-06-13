const mongoose = require('mongoose');

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

  getAllBooks = async () => {
    const books = await Book.find();
    return books;
  };

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

  deleteBook = async (data) => {
    const dataId = await Book.findByIdAndRemove(data);
    return dataId; 
  };

};

module.exports = new BookModel();

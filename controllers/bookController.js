const Book = require('../models/book');
const Author = require('../models/author');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch books', details: err.message });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;

    // Ensure the author exists
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(400).json({ error: 'Author does not exist' });
    }

    // Check if the ISBN already exists
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ error: 'Book with this ISBN already exists' });
    }

    // Create the new book
    const newBook = new Book({ title, author, isbn, availableCopies });
    await newBook.save();

    // Update the author's books array
    existingAuthor.books.push(newBook._id);
    await existingAuthor.save();

    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ error: 'Failed to add book', details: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update book details
    Object.assign(book, req.body);
    await book.save();

    res.status(200).json(book);
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ error: 'Failed to update book', details: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Remove the book reference from the author
    const author = await Author.findById(deletedBook.author);
    if (author) {
      author.books = author.books.filter(bookId => bookId.toString() !== id);
      await author.save();
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ error: 'Failed to delete book', details: err.message });
  }
};

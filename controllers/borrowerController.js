const Borrower = require('../models/borrower');
const Book = require('../models/book'); // Import the Book model

exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find(); // Fetch all borrowers
    res.status(200).json(borrowers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch borrowers' });
  }
};

exports.addBorrower = async (req, res) => {
  try {
    const { name, borrowedBooks, membershipActive, membershipType } = req.body;

    // Validate the borrowedBooks array
    if (!borrowedBooks || !Array.isArray(borrowedBooks) || borrowedBooks.length === 0) {
      return res.status(400).json({ error: 'Borrowed books must be provided and cannot be empty' });
    }

    // Fetch all books by their IDs to ensure they exist
    const books = await Book.find({ _id: { $in: borrowedBooks } });

    // Check if all provided book IDs are valid
    if (books.length !== borrowedBooks.length) {
      return res.status(404).json({ error: 'One or more books not found' });
    }

    // Check for available copies
    for (const book of books) {
      if (book.availableCopies <= 0) {
        return res.status(400).json({ error: `Book '${book.title}' is currently out of stock.` });
      }
    }

    // Create a new borrower
    const borrower = new Borrower({
      name,
      borrowedBooks,
      membershipActive,
      membershipType,
    });

    // Save the borrower
    await borrower.save();

    // Update the available copies of borrowed books (decrement by 1)
    await Book.updateMany(
      { _id: { $in: borrowedBooks } },
      { $inc: { availableCopies: -1 } }
    );

    res.status(201).json(borrower);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(400).json({ error: 'Failed to add borrower', details: err.message });
  }
};

exports.updateBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(borrower);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    await Borrower.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Borrower deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

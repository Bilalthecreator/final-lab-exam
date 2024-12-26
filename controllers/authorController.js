const Author = require('../models/author');

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find(); // Fetches all authors
    res.status(200).json(authors);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

// Add a new author
exports.addAuthor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validation for missing fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    // Create a new author
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: 'Failed to add author', details: err.message });
  }
};

// Update an existing author
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(200).json(updatedAuthor);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: 'Failed to update author', details: err.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);

    // Ensure the author is not linked to any books
    if (author.books.length > 0) {
      return res.status(400).json({ error: 'Cannot delete an author linked to books.' });
    }

    await Author.findByIdAndDelete(id);
    res.status(200).json({ message: 'Author deleted successfully.' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: 'Failed to delete author', details: err.message });
  }
};

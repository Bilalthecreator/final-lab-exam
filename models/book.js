const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true, // Removes unnecessary spaces
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'Author is required'],
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    match: [/^(97(8|9))?\d{1,5}[- ]?\d{1,7}[- ]?\d{1,7}[- ]?(\d|X)$/, 'ISBN must be a valid 10 or 13-digit number'],
  },
  availableCopies: {
    type: Number,
    required: [true, 'Available copies are required'],
    min: [0, 'Available copies cannot be negative'],
  },
});

// Middleware to remove references to the book from the Author model after deletion
bookSchema.post('findOneAndDelete', async function (doc) {
  if (doc && doc.author) {
    const Author = mongoose.model('Author');
    await Author.findByIdAndUpdate(doc.author, { $pull: { books: doc._id } });
  }
});

module.exports = mongoose.model('Book', bookSchema);

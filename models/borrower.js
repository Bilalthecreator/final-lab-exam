const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',  // Reference to Book model
    },
  ],
  membershipActive: {
    type: Boolean,
    required: true,
  },
  membershipType: {
    type: String,
    enum: ['standard', 'premium'],
    required: true,
  },
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

module.exports = Borrower;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email address'],
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+92-3\d{2}-\d{7}$/, 'Phone number must be in the format +92-3xx-xxxxxxx']
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
    validate: {
      validator: function (value) {
        return value.length <= 5; 
      },
      message: 'An author can only be linked to 5 books at most'
    }
  }]
});

module.exports = mongoose.model('Author', authorSchema);

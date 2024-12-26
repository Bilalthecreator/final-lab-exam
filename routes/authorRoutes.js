const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Route to get all authors
router.get('/', authorController.getAllAuthors);

// Route to add a new author
router.post('/', authorController.addAuthor);

// Route to update an author by ID
router.put('/:id', authorController.updateAuthor);

// Route to delete an author by ID
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;

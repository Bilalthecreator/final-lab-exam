const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');


// Route to add a new borrower
router.post('/', borrowerController.addBorrower);
// Route to get all borrowers
router.get('/', borrowerController.getAllBorrowers);
// Route to update a borrower by ID
router.put('/:id', borrowerController.updateBorrower);

// Route to delete a borrower by ID
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router;

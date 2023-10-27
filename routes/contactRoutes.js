const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  sendMessageToUser,
  toggleContactStatus,
} = require('../controllers/contactController');

// Route to handle the submission of the contact form
router.post('/', submitContactForm);

// Route to get all contacts
router.get('/', getAllContacts);

// Route to get contact by ID
router.get('/:id', getContactById);

// Route to update contact by ID
router.put('/:id', updateContact);

// Route to delete contact by ID
router.delete('/:id', deleteContact);

// Route to send a message to a user by email
router.post('/:id/send-message', sendMessageToUser);

// Route to change contact status by ID
router.put('/:id/toggle-status', toggleContactStatus);



module.exports = router;

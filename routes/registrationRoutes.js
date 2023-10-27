const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController'); 

router.post('/registrationList', registrationController.createRegistration);
router.get('/registrationList', registrationController.getRegistrations);
router.get('/registrationList/:id', registrationController.getRegistrationById);
router.put('/registrationList/:id', registrationController.updateRegistration);
router.delete('/registrationList/:id', registrationController.deleteRegistration);

module.exports = router;

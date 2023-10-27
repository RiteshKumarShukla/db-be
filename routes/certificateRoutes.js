const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.post('/certificatesList', certificateController.createCertificate);
router.get('/certificatesList', certificateController.getCertificates);
router.get('/certificatesList/:id', certificateController.getCertificateById);
router.put('/certificatesList/:id', certificateController.updateCertificate);
router.delete('/certificatesList/:id', certificateController.deleteCertificate);

module.exports = router;

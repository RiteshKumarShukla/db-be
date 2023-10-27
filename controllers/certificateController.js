const Certificate = require('../models/Certificate');

// Create a new certificate
const createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    const savedCertificate = await certificate.save();
    res.status(201).json(savedCertificate);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the certificate' });
  }
};

// Get all certificates
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve certificates' });
  }
};

// Get a single certificate by ID
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the certificate' });
  }
};

// Update a certificate by ID
const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Could not update the certificate' });
  }
};

// Delete a certificate by ID
const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndRemove(req.params.id);
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the certificate' });
  }
};

module.exports = {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
};

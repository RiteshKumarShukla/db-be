const Registration = require('../models/Registration');

// Create a new registration
const createRegistration = async (req, res) => {
  try {
    const registration = new Registration(req.body);
    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the registration' });
  }
};

// Get all registrations (fix variable name to "registrations")
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find(); 
    res.json(registrations); 
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve registrations' });
  }
};

// Get a single registration by ID
const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the registration' });
  }
};

// Update a registration by ID
const updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Could not update the registration' });
  }
};

// Delete a registration by ID
const deleteRegistration = async (req, res) => {
  try {
    await Registration.findByIdAndRemove(req.params.id);
    res.json({ message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the registration' });
  }
};

module.exports = {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

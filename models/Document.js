const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name: String,  // New field: Name
    email: String, // New field: Email
    phone: String, // New field: Phone
    pan: String,
    addressProof: String,
    registrationNumber: String,
    bankAccount: String,
    identityProof: String,
    passportPhoto: String,
    uploadedAt: Date,
});

module.exports = mongoose.model('Document', documentSchema);

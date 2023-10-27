const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            pan,
            addressProof,
            registrationNumber,
            bankAccount,
            identityProof,
            passportPhoto,
        } = req.body;

        const document = new Document({
            name,
            email,
            phone,
            pan,
            addressProof,
            registrationNumber,
            bankAccount,
            identityProof,
            passportPhoto,
            uploadedAt: new Date(),
        });

        // Update the file paths for the uploaded documents
        document.pan = req.files.pan[0].path;
        document.addressProof = req.files.addressProof[0].path;
        document.registrationNumber = req.files.registrationNumber[0].path;
        document.bankAccount = req.files.bankAccount[0].path;
        document.identityProof = req.files.identityProof[0].path;
        document.passportPhoto = req.files.passportPhoto[0].path;

        await document.save();
        res.status(201).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading documents.' });
    }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching documents.' });
    }
};

// Get a document by ID
exports.getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }
        res.status(200).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching document.' });
    }
};

// Update a document by ID
exports.updateDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        // Update the document fields as needed
        document.name = req.body.name;
        document.email = req.body.email;
        document.phone = req.body.phone;
        document.pan = req.body.pan;
        document.addressProof = req.body.addressProof;
        document.registrationNumber = req.body.registrationNumber;
        document.bankAccount = req.body.bankAccount;
        document.identityProof = req.body.identityProof;
        document.passportPhoto = req.body.passportPhoto;

        await document.save();
        res.status(200).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating document.' });
    }
};

// Delete a document by ID
exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndRemove(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }
        res.status(200).json({ message: 'Document deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting document.' });
    }
};

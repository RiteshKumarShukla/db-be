const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const archiver = require('archiver');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Specify the destination directory
    },
    filename: (req, file, callback) => {
        const uniqueFilename = `${uuid.v4()}-${file.originalname}`;
        callback(null, uniqueFilename); // Do not include 'uploads/' in the filename
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

router.post('/api/upload', upload.fields([
    { name: 'pan', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'registrationNumber', maxCount: 1 },
    { name: 'bankAccount', maxCount: 1 },
    { name: 'identityProof', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
]), documentController.uploadDocument);

router.get('/api/documents/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'File not found' });
        }
    });
});

router.get('/api/documents/download-all', async (req, res) => {
    try {
        const documents = await Document.find();

        const zip = archiver('zip', { zlib: { level: 9 } });

        res.attachment('all_documents.zip');
        zip.pipe(res);

        documents.forEach((document) => {
            for (const fieldName of Object.keys(document._doc)) {
                const filePath = document[fieldName];
                const fileStream = fs.createReadStream(filePath);
                zip.append(fileStream, { name: path.basename(filePath) });
            }
        });

        zip.finalize();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating the zip file.' });
    }
});

// Get all documents
router.get('/api/documents', documentController.getAllDocuments);

// Get a document by ID
router.get('/api/documents/:id', documentController.getDocumentById);

// Update a document by ID
router.put('/api/documents/:id', documentController.updateDocument);

// Delete a document by ID
router.delete('/api/documents/:id', documentController.deleteDocument);

module.exports = router;

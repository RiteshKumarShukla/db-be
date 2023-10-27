const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// Create a new certification
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const certification = new Certification(req.body);
        await certification.save();
        res.status(201).send(certification);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create certification', message: error.message });
    }
});

// Get all certifications
router.get('/', async (req, res) => {
    try {
        const certifications = await Certification.find();
        res.status(200).send(certifications);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch certifications', message: error.message });
    }
});

// Get a certification by ID
router.get('/:id', async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) {
            return res.status(404).send({ error: 'Certification not found' });
        }
        res.status(200).send(certification);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch certification', message: error.message });
    }
});

// Update a certification by ID
router.patch('/:id', async (req, res) => {
    try {
        const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!certification) {
            return res.status(404).send({ error: 'Certification not found' });
        }
        res.status(200).send(certification);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update certification', message: error.message });
    }
});

// Delete a certification by ID
router.delete('/:id', async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);
        if (!certification) {
            return res.status(404).send({ error: 'Certification not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete certification', message: error.message });
    }
});

// Update the status of a certification by ID
router.patch('/:id/update-status', async (req, res) => {
    console.log('Request to update status received:', req.body);
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "review", "approved"];

        if (!validStatuses.includes(status)) {
            return res.status(400).send({ error: 'Invalid status provided' });
        }

        const certification = await Certification.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!certification) {
            return res.status(404).send({ error: 'Certification not found' });
        }

        res.status(200).send(certification);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update certification status', message: error.message });
    }
});



module.exports = router;

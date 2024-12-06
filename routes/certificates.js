const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const sgMail = require('@sendgrid/mail');
const getCertificateEmailTemplate = require('../templates/certificateEmail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Store new certificate
router.post('/store', async (req, res) => {
    try {
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.json({ 
            success: true, 
            message: 'Certificate stored successfully',
            certificate 
        });
    } catch (error) {
        console.error('Store error:', error);
        res.status(400).json({ message: error.message });
    }
});

// Issue certificate
router.post('/issue/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        certificate.isIssued = true;
        certificate.issuedDate = new Date();
        certificate.blockchainTxHash = req.body.txHash;
        certificate.certificateHash = req.body.certificateHash;
        await certificate.save();

        const msg = {
            to: certificate.email,
            from: process.env.SENDGRID_VERIFIED_SENDER,
            subject: 'Your Academic Certificate Has Been Issued',
            html: getCertificateEmailTemplate({
                ...certificate.toObject(),
                txHash: req.body.txHash,
                certificateHash: req.body.certificateHash
            })
        };

        await sgMail.send(msg);
        
        res.json({ 
            success: true, 
            message: 'Certificate issued and email sent successfully',
            certificate 
        });
    } catch (error) {
        console.error('Issue error:', error);
        res.status(400).json({ message: error.message });
    }
});

// Get all certificates
router.get('/', async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.json(certificates);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get certificate by ID
router.get('/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.json(certificate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Verify certificate
router.post('/verify', async (req, res) => {
    try {
        const certificate = await Certificate.findOne({
            certificateHash: req.body.certificateHash
        });
        
        if (!certificate) {
            return res.status(404).json({ 
                verified: false,
                message: 'Certificate not found' 
            });
        }

        res.json({ 
            verified: true,
            message: 'Certificate verified successfully',
            certificate 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get certificates by student email
router.get('/student/:email', async (req, res) => {
    try {
        const certificates = await Certificate.find({ email: req.params.email });
        res.json(certificates);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Request certificate correction
router.post('/correction/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        certificate.correctionRequest = {
            status: 'pending',
            details: req.body.correctionDetails,
            requestDate: new Date()
        };
        await certificate.save();

        res.json({ 
            success: true, 
            message: 'Correction request submitted successfully',
            certificate 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update correction status
router.patch('/correction/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        certificate.correctionRequest.status = req.body.status;
        certificate.correctionRequest.responseDate = new Date();
        certificate.correctionRequest.response = req.body.response;
        await certificate.save();

        res.json({ 
            success: true, 
            message: 'Correction status updated successfully',
            certificate 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

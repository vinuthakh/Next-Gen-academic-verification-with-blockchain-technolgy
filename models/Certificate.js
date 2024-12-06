const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true
    },
    studentName: {
        type: String,
        required: true
    },
    usn: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    semester: String,
    academicYear: String,
    subjects: [{
        code: String,
        name: String,
        credits: Number,
        internal: Number,
        external: Number,
        total: Number,
        grade: String,
        gradePoint: Number
    }],
    sgpa: Number,
    result: String,
    blockchainTxHash: String,
    isIssued: {
        type: Boolean,
        default: false
    },
    issuedAt: {
        type: Date,
        default: Date.now
    },
    issuedDate: {
        type: Date
    }
});

module.exports = mongoose.model('Certificate', certificateSchema);

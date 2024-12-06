import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Grid, 
    Alert,
    Card,
    CardContent 
} from '@mui/material';

const VerifyCertificate = () => {
    const [certificateHash, setCertificateHash] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/certificates/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ certificateHash })
            });

            const data = await response.json();
            setVerificationResult(data);
        } catch (error) {
            setVerificationResult({
                verified: false,
                message: 'Verification failed. Please try again.'
            });
        }
        setLoading(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1e3c72' }}>
                    Verify Certificate
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Certificate Hash"
                            value={certificateHash}
                            onChange={(e) => setCertificateHash(e.target.value)}
                            placeholder="Enter certificate hash"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleVerify}
                            disabled={loading}
                            fullWidth
                            sx={{
                                backgroundColor: '#1e3c72',
                                '&:hover': { backgroundColor: '#2a5298' }
                            }}
                        >
                            {loading ? 'Verifying...' : 'Verify Certificate'}
                        </Button>
                    </Grid>
                </Grid>

                {verificationResult && (
                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <Alert 
                                severity={verificationResult.verified ? "success" : "error"}
                                sx={{ mb: 2 }}
                            >
                                {verificationResult.message}
                            </Alert>

                            {verificationResult.verified && verificationResult.certificate && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Certificate Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography><strong>Student Name:</strong> {verificationResult.certificate.studentName}</Typography>
                                            <Typography><strong>USN:</strong> {verificationResult.certificate.usn}</Typography>
                                            <Typography><strong>SGPA:</strong> {verificationResult.certificate.sgpa}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography><strong>Result:</strong> {verificationResult.certificate.result}</Typography>
                                            <Typography><strong>Issue Date:</strong> {new Date(verificationResult.certificate.issuedDate).toLocaleDateString()}</Typography>
                                            <Typography><strong>Blockchain Hash:</strong> {verificationResult.certificate.blockchainTxHash}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                )}
            </Paper>
        </Box>
    );
};

export default VerifyCertificate;

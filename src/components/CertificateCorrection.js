import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

const CertificateCorrection = () => {
    const [certificates, setCertificates] = useState([]);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [correctionDetails, setCorrectionDetails] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchUserCertificates();
    }, []);

    const fetchUserCertificates = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail'); // Get user email from storage
            const response = await fetch(`http://localhost:5000/api/certificates/student/${userEmail}`);
            const data = await response.json();
            setCertificates(data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        }
    };

    const handleSubmitCorrection = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/certificates/correction/${selectedCertificate._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correctionDetails })
            });

            const data = await response.json();
            if (data.success) {
                setStatus('Correction request submitted successfully');
                setCorrectionDetails('');
                setSelectedCertificate(null);
                fetchUserCertificates(); // Refresh the list
            }
        } catch (error) {
            setStatus('Failed to submit correction request');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1e3c72', mb: 3 }}>
                    Certificate Correction Request
                </Typography>

                {status && (
                    <Alert 
                        severity={status.includes('success') ? 'success' : 'error'} 
                        sx={{ mb: 3 }}
                        onClose={() => setStatus('')}
                    >
                        {status}
                    </Alert>
                )}

                <TableContainer component={Paper} sx={{ mb: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell>Certificate ID</TableCell>
                                <TableCell>Issue Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {certificates.map((cert) => (
                                <TableRow key={cert._id}>
                                    <TableCell>{cert.certificateId}</TableCell>
                                    <TableCell>
                                        {cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString() : 'Not issued'}
                                    </TableCell>
                                    <TableCell>
                                        {cert.correctionRequest?.status || 'No request'}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => setSelectedCertificate(cert)}
                                            disabled={cert.correctionRequest?.status === 'pending'}
                                        >
                                            Request Correction
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {selectedCertificate && (
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Submit Correction Request
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Correction Details"
                                        value={correctionDetails}
                                        onChange={(e) => setCorrectionDetails(e.target.value)}
                                        placeholder="Please describe the corrections needed..."
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmitCorrection}
                                        disabled={!correctionDetails}
                                        sx={{
                                            backgroundColor: '#1e3c72',
                                            '&:hover': { backgroundColor: '#2a5298' }
                                        }}
                                    >
                                        Submit Request
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Paper>
        </Box>
    );
};

export default CertificateCorrection;

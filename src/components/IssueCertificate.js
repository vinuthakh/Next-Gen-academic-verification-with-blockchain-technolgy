import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    CircularProgress
} from '@mui/material';
import { ethers } from 'ethers';
import { getContract } from '../utils/contractInteraction';

const IssueCertificate = () => {
    const [status, setStatus] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPendingCertificates();
    }, []);

    const fetchPendingCertificates = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/certificates');
            const data = await response.json();
            const pendingCerts = data.filter(cert => !cert.isIssued);
            console.log('Pending certificates:', pendingCerts);
            setCertificates(pendingCerts);
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('Error fetching certificates');
        } finally {
            setLoading(false);
        }
    };

    const handleIssue = async (certificateId) => {
        try {
            setStatus('Initiating blockchain transaction...');
            console.log('Step 1: Getting contract');
            const contract = await getContract();
            console.log('Step 2: Contract obtained', contract);

            console.log('Step 3: Generating hash');
            const certificateHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(certificateId)
            );
            console.log('Step 4: Hash generated', certificateHash);

            console.log('Step 5: Calling contract function');
            const tx = await contract.issueCertificate(certificateId, certificateHash);
            console.log('Step 6: Transaction initiated', tx);

            setStatus('Waiting for transaction confirmation...');
            const receipt = await tx.wait();
            console.log('Step 7: Transaction confirmed', receipt);
        } catch (error) {
            console.error('Transaction failed:', error);
            setStatus(`Error: ${error.message}`);
        }
    };


    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h5" sx={{ color: '#1e3c72' }}>
                        Issue Certificates
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={fetchPendingCertificates}
                        sx={{
                            borderColor: '#1e3c72',
                            color: '#1e3c72',
                            '&:hover': {
                                borderColor: '#2a5298',
                                backgroundColor: 'rgba(30, 60, 114, 0.1)'
                            }
                        }}
                    >
                        Refresh List
                    </Button>
                </Box>

                {status && (
                    <Alert
                        severity={status.includes('Error') ? 'error' : 'info'}
                        sx={{ mb: 2 }}
                        onClose={() => setStatus('')}
                    >
                        {status}
                    </Alert>
                )}

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell>USN</TableCell>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>SGPA</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {certificates.length > 0 ? (
                                    certificates.map((cert) => (
                                        <TableRow key={cert._id}>
                                            <TableCell>{cert.usn}</TableCell>
                                            <TableCell>{cert.studentName}</TableCell>
                                            <TableCell>{cert.sgpa}</TableCell>
                                            <TableCell>{cert.result}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleIssue(cert._id)}
                                                    sx={{
                                                        backgroundColor: '#1e3c72',
                                                        '&:hover': {
                                                            backgroundColor: '#2a5298'
                                                        }
                                                    }}
                                                >
                                                    Issue Certificate
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No pending certificates found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
};

export default IssueCertificate;

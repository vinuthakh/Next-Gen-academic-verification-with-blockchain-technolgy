import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { getContract } from '../utils/contractInteraction';

const VerifyCertificate = () => {
    const [certificateId, setCertificateId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);

    const handleVerifyCertificate = async () => {
        try {
            const contract = await getContract();
            const result = await contract.verifyCertificate(certificateId);
            setVerificationResult(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Verify Certificate</Typography>
            <TextField 
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                label="Certificate ID"
                fullWidth
                margin="normal"
            />
            <Button 
                variant="contained" 
                onClick={handleVerifyCertificate}
                sx={{ mt: 2 }}
            >
                Verify Certificate
            </Button>
            {verificationResult !== null && (
                <Typography sx={{ mt: 2 }}>
                    Certificate is {verificationResult ? 'Valid' : 'Invalid'}
                </Typography>
            )}
        </Box>
    );
};

export default VerifyCertificate;

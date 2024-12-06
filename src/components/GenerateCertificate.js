import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Grid, 
    Alert, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow 
} from '@mui/material';
import { getContract } from '../utils/contractInteraction';

const GenerateCertificate = () => {
    const [status, setStatus] = useState('');
    const csSubjects = [
        { code: '21CS61', name: 'Software enginnering and project management', credits: 3 },
        { code: '21CS62', name: 'Full stack development', credits: 4 },
        { code: '21IS643', name: 'Data mining and data warehousing', credits: 4 },
        { code: '21IS63', name: 'Software testing', credits: 3 },
        { code: '21ISL66', name: 'Software testing laboratory', credits: 3 },
        { code: '21ISMP67', name: 'Mini project', credits: 3 }
    ];

    const [formData, setFormData] = useState({
        studentName: '',
        usn: '',
        email: '',
        semester: '6',
        academicYear: '2023-24',
        marks: csSubjects.reduce((acc, subject) => ({
            ...acc,
            [subject.code]: {
                internal: '',
                external: '',
                total: '',
                grade: '',
                gradePoint: 0
            }
        }), {})
    });

    const calculateGrade = (total) => {
        if (total >= 90) return { grade: 'S', points: 10 };
        if (total >= 80) return { grade: 'A', points: 9 };
        if (total >= 70) return { grade: 'B', points: 8 };
        if (total >= 60) return { grade: 'C', points: 7 };
        if (total >= 50) return { grade: 'D', points: 6 };
        if (total >= 40) return { grade: 'E', points: 4 };
        return { grade: 'F', points: 0 };
    };

    const calculateSGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        csSubjects.forEach(subject => {
            const marks = formData.marks[subject.code];
            if (marks.total) {
                totalCredits += subject.credits;
                totalGradePoints += subject.credits * marks.gradePoint;
            }
        });

        return totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    };

    const isPass = () => {
        return Object.values(formData.marks).every(mark =>
            parseInt(mark.total) >= 40 &&
            parseInt(mark.internal) >= 16 &&
            parseInt(mark.external) >= 24
        );
    };

    const handleMarksChange = (subjectCode, type, value) => {
        const internal = type === 'internal' ? parseInt(value) || 0 : parseInt(formData.marks[subjectCode].internal) || 0;
        const external = type === 'external' ? parseInt(value) || 0 : parseInt(formData.marks[subjectCode].external) || 0;
        const total = internal + external;
        const { grade, points } = calculateGrade(total);

        setFormData(prev => ({
            ...prev,
            marks: {
                ...prev.marks,
                [subjectCode]: {
                    ...prev.marks[subjectCode],
                    [type]: value,
                    total,
                    grade,
                    gradePoint: points
                }
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            const certificateMetadata = {
                certificateId: formData.usn + '-' + new Date().getTime(),
                studentName: formData.studentName,
                usn: formData.usn,
                email: formData.email,
                semester: formData.semester,
                academicYear: formData.academicYear,
                subjects: csSubjects.map(subject => ({
                    code: subject.code,
                    name: subject.name,
                    credits: subject.credits,
                    ...formData.marks[subject.code]
                })),
                sgpa: calculateSGPA(),
                result: isPass() ? 'PASS' : 'FAIL'
            };

            const response = await fetch('http://localhost:5000/api/certificates/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificateMetadata)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            setStatus('Certificate generated successfully!');
        } catch (error) {
            console.error('Error details:', error);
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1e3c72', fontWeight: 'bold' }}>
                    Generate Marks Certificate - CS Department
                </Typography>

                {status && (
                    <Alert severity={status.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>
                        {status}
                    </Alert>
                )}

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Student Name"
                            value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="USN"
                            value={formData.usn}
                            onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                            required
                            placeholder="4GM21CS061"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </Grid>
                </Grid>

                <TableContainer sx={{ mb: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell>Subject Code</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Credits</TableCell>
                                <TableCell>Internal (40)</TableCell>
                                <TableCell>External (60)</TableCell>
                                <TableCell>Total (100)</TableCell>
                                <TableCell>Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {csSubjects.map((subject) => (
                                <TableRow key={subject.code}>
                                    <TableCell>{subject.code}</TableCell>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell>{subject.credits}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            size="small"
                                            InputProps={{ inputProps: { min: 0, max: 40 } }}
                                            value={formData.marks[subject.code].internal}
                                            onChange={(e) => handleMarksChange(subject.code, 'internal', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            size="small"
                                            InputProps={{ inputProps: { min: 0, max: 60 } }}
                                            value={formData.marks[subject.code].external}
                                            onChange={(e) => handleMarksChange(subject.code, 'external', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>{formData.marks[subject.code].total}</TableCell>
                                    <TableCell>{formData.marks[subject.code].grade}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ color: '#1e3c72' }}>
                        SGPA: {calculateSGPA()}
                    </Typography>
                    <Typography variant="h6" color={isPass() ? 'success.main' : 'error.main'}>
                        Result: {isPass() ? 'PASS' : 'FAIL'}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    sx={{ 
                        mt: 3,
                        backgroundColor: '#1e3c72',
                        '&:hover': {
                            backgroundColor: '#2a5298'
                        }
                    }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Generate Marks Certificate
                </Button>
            </Paper>
        </Box>
    );
};

export default GenerateCertificate;

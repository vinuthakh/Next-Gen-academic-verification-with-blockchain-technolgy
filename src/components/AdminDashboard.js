import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedIcon from '@mui/icons-material/Verified';
import ViewListIcon from '@mui/icons-material/ViewList';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const dashboardItems = [
        {
            title: 'Generate Certificate',
            icon: <AssignmentIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            path: '/generate',
            description: 'Create new certificates for students'
        },
        {
            title: 'Issue Certificates',
            icon: <VerifiedIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
            path: '/issue',
            description: 'Issue certificates to verified students'
        },
        {
            title: 'Correction QUERIES',
            icon: <ViewListIcon sx={{ fontSize: 40, color: '#ed6c02' }} />,
            path: '/view-certificates',
            description: 'Browse and manage all certificates'
        }
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold', mb: 4 }}>
                Admin Dashboard
            </Typography>

            <Grid container spacing={4}>
                {dashboardItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.title}>
                        <Card 
                            elevation={3}
                            sx={{
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }}
                        >
                            <CardActionArea 
                                onClick={() => navigate(item.path)}
                                sx={{ height: '100%' }}
                            >
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    {item.icon}
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;

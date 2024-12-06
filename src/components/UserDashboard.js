import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

const UserDashboard = () => {
    const navigate = useNavigate();

    const dashboardItems = [
        {
            title: 'Verify Certificate',
            icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            path: '/verify',
            description: 'Verify your certificate authenticity'
        },
        {
            title: 'Request Correction',
            icon: <EditNoteIcon sx={{ fontSize: 40, color: '#d32f2f' }} />,
            path: '/correction',
            description: 'Submit certificate correction requests'
        },
        {
            title: 'My Certificates',
            icon: <FolderSpecialIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
            path: '/view-certificates',
            description: 'View all your certificates'
        }
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold', mb: 4 }}>
                Student Dashboard
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

export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Grid, 
    Paper, 
    Typography, 
    Card, 
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCertificates: 0,
        recentCertificates: []
    });

    // Mock data for demonstration
    useEffect(() => {
        setStats({
            totalCertificates: 150,
            recentCertificates: [
                { id: '4GM21CS061', date: '2024-01-27' },
                { id: '4GM21CS062', date: '2024-01-26' },
                { id: '4GM21CS063', date: '2024-01-25' }
            ]
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Statistics Cards */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Total Certificates
                            </Typography>
                            <Typography variant="h3">
                                {stats.totalCertificates}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Certificates */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Certificates
                        </Typography>
                        <List>
                            {stats.recentCertificates.map((cert) => (
                                <ListItem key={cert.id}>
                                    <ListItemText 
                                        primary={cert.id}
                                        secondary={`Issued: ${cert.date}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button 
                                variant="contained" 
                                onClick={() => window.location.href = '/issue'}
                            >
                                Issue New Certificate
                            </Button>
                            <Button 
                                variant="outlined"
                                onClick={() => window.location.href = '/verify'}
                            >
                                Verify Certificate
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;

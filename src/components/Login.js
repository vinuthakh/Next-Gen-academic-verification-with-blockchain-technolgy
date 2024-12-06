import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Tab, Tabs, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [tab, setTab] = useState(0);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Admin credentials - in real app, this should be in backend
    const adminUser = {
        username: 'admin',
        password: 'admin123'
    };

    // Regular user credentials for testing
    const regularUser = {
        username: 'user',
        password: 'user123'
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setError('');
        setCredentials({ username: '', password: '' });
    };

    const validateForm = () => {
        if (!credentials.username.trim() || !credentials.password.trim()) {
            setError('Please fill in all fields');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        if (tab === 0) { // Admin Login
            if (credentials.username === adminUser.username && 
                credentials.password === adminUser.password) {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('username', credentials.username);
                navigate('/admin-dashboard');
            } else {
                setError('Invalid admin credentials');
            }
        } else { // User Login
            if (credentials.username === regularUser.username && 
                credentials.password === regularUser.password) {
                localStorage.setItem('userRole', 'user');
                localStorage.setItem('username', credentials.username);
                navigate('/user-dashboard');
            } else {
                setError('Invalid user credentials');
            }
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Paper elevation={3} sx={{ 
                p: 4, 
                width: '100%', 
                maxWidth: 400,
                borderRadius: 2
            }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ 
                    color: '#1976d2',
                    fontWeight: 600,
                    mb: 3
                }}>
                    Certificate Verification System
                </Typography>
                
                <Tabs 
                    value={tab} 
                    onChange={handleTabChange} 
                    centered 
                    sx={{ 
                        mb: 3,
                        '& .MuiTab-root': {
                            fontWeight: 500
                        }
                    }}
                >
                    <Tab label="Admin Login" />
                    <Tab label="User Login" />
                </Tabs>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        label="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            username: e.target.value
                        })}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                        autoComplete="username"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            password: e.target.value
                        })}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                        autoComplete="current-password"
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ 
                            mt: 2,
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0'
                            }
                        }}
                    >
                        {tab === 0 ? 'Login as Admin' : 'Login as User'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;

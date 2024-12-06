import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box,
    Container,
    IconButton
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
});

const StyledButton = styled(Button)({
    margin: '0 8px',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)',
    },
    transition: 'transform 0.2s',
});

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const adminMenuItems = [
        { path: '/admin-dashboard', label: 'Dashboard' },
        { path: '/generate', label: 'Generate Certificate' },
        { path: '/issue', label: 'Issue Certificate' },
        { path: '/view-certificates', label: 'View Certificates' },
    ];

    const userMenuItems = [
        { path: '/user-dashboard', label: 'Dashboard' },
        { path: '/verify', label: 'Verify Certificate' },
        { path: '/correction', label: 'Request Correction' },
        { path: '/view-certificates', label: 'My Certificates' },
    ];

    const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

    return (
        <StyledAppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEXT GEN ACADEMIC VERIFICATION
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {menuItems.map((item) => (
                            <StyledButton
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderBottom: location.pathname === item.path ? '3px solid white' : 'none',
                                    borderRadius: '0',
                                }}
                            >
                                {item.label}
                            </StyledButton>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton 
                            onClick={handleLogout}
                            sx={{ 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'rotate(180deg)',
                                },
                                transition: 'transform 0.3s',
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Navigation;

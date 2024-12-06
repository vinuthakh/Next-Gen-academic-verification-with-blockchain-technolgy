import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import Navigation from './components/Navigation';
import Login from './components/Login';
import IssueCertificate from './components/IssueCertificate';
import VerifyCertificate from './components/VerifyCertificate';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import GenerateCertificate from './components/GenerateCertificate';
import ViewCertificates from './components/ViewCertificates';
import CertificateCorrection from './components/CertificateCorrection';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
    }
    return children;
};

const styles = {
    backgroundMain: {
        minHeight: '100vh',
        background: `url('/images/graduation-cap.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        overflow: 'hidden'
    },
    contentWrapper: {
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'  // Subtle white overlay for better content visibility
    }
};
// Added missing closing brace and semicolon

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e3c72',
        },
        secondary: {
            main: '#2a5298',
        }
    }
}); // Moved theme creation outside of styles object



function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.backgroundMain}>
                <Box
                    component="img"
                    src="/images/overlay-pattern.png"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.1,
                        pointerEvents: 'none'
                    }}
                />
                <Box sx={styles.contentWrapper}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />

                            <Route
                                path="/admin-dashboard"
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <AdminDashboard />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/generate"
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <GenerateCertificate />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/issue"
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <IssueCertificate />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/user-dashboard"
                                element={
                                    <ProtectedRoute allowedRoles={['user']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <UserDashboard />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/view-certificates"
                                element={
                                    <ProtectedRoute allowedRoles={['user', 'admin']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <ViewCertificates />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/correction"
                                element={
                                    <ProtectedRoute allowedRoles={['user']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <CertificateCorrection />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/verify"
                                element={
                                    <ProtectedRoute allowedRoles={['user', 'admin']}>
                                        <>
                                            <Navigation />
                                            <Container maxWidth="md">
                                                <Box sx={{ my: 4 }}>
                                                    <VerifyCertificate />
                                                </Box>
                                            </Container>
                                        </>
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </BrowserRouter>
                </Box>
            </Box>
        </ThemeProvider>
    );
}


export default App;

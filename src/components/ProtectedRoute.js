import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole !== allowedRole) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

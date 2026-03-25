import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import PageLoader from '../components/ui/PageLoader';

/**
 * ProtectedRoute component handles access control for routes.
 * It checks for authentication and role-based authorization.
 * 
 * @param {Array} allowedRoles - List of roles permitted to access the route
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but user data is not yet available, wait
  if (!user) {
    return <PageLoader />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to a dedicated Unauthorized page instead of silently redirecting to home
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import PageLoader from '../components/ui/PageLoader';
import { extractRoleName } from '../utils/auth';

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

  const roleName = extractRoleName(user);

  if (allowedRoles && !allowedRoles.some((role) => role.toLowerCase() === roleName)) {
    console.warn(`Access denied for role: ${roleName ?? 'unknown'}. Allowed roles: ${allowedRoles.join(', ')}`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

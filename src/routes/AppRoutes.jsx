import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { ROLES } from '../utils/constants';

// Components
import PageLoader from '../components/ui/PageLoader';
import ProtectedRoute from './ProtectedRoute';

// Layouts
const AuthLayout = lazy(() => import('../features/common/components/AuthLayout'));
const AdminLayout = lazy(() => import('../features/common/components/AdminLayout'));
const CustomerLayout = lazy(() => import('../features/common/components/CustomerLayout'));

// Pages
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));
const UnauthorizedPage = lazy(() => import('../features/auth/pages/UnauthorizedPage'));
const AdminDashboard = lazy(() => import('../features/admin/pages/Dashboard'));
const UsersPage = lazy(() => import('../features/admin/pages/Users'));
const BookingsPage = lazy(() => import('../features/admin/pages/Bookings'));
const RoomsPage = lazy(() => import('../features/admin/pages/Rooms'));
const ReviewsPage = lazy(() => import('../features/admin/pages/Reviews'));
const RoomCategoriesPage = lazy(() => import('../features/admin/pages/RoomCategories'));
const InventoryPage = lazy(() => import('../features/admin/pages/Inventory'));
const ServiceAvailabilityPage = lazy(() => import('../features/admin/pages/ServiceAvailability'));
const CustomerDashboard = lazy(() => import('../features/customer/pages/Dashboard'));
const RoomPage = lazy(() => import('../features/customer/pages/RoomPage'));
const HotelDetails = lazy(() => import('../features/customer/pages/HotelDetails'));
const RoomService = lazy(() => import('../features/customer/pages/RoomService'));
const NotFound = lazy(() => import('../features/common/pages/NotFound'));

/**
 * RootRedirect Component
 * Handles the initial entry point of the application.
 * Redirects users to the appropriate dashboard based on their auth status and role.
 */
const RootRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but user data is not yet available, wait
  if (!user) {
    return <PageLoader />;
  }

  if (user.role === ROLES.ADMIN) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Default to customer dashboard for all other authenticated users (prevents loop with /login)
  return <Navigate to="/customer" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. Root Route */}
        <Route path="/" element={<RootRedirect />} />

        {/* 2. Public / Auth Routes */}
        <Route element={isAuthenticated ? <Navigate to="/" replace /> : <AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 3. Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="categories" element={<RoomCategoriesPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="availability" element={<ServiceAvailabilityPage />} />
            <Route path="settings" element={<div className="p-6 text-gray-800 bg-white rounded-xl shadow-sm">Admin Settings (Coming Soon)</div>} />
            <Route path="security" element={<div className="p-6 text-gray-800 bg-white rounded-xl shadow-sm">Security & Permissions (Coming Soon)</div>} />
          </Route>
        </Route>

        {/* 4. Customer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="rooms" element={<RoomPage />} />
            <Route path="hotels/:id" element={<HotelDetails />} />
            <Route path="room-service" element={<RoomService />} />
            <Route path="bookings" element={<div className="p-6 text-gray-800 bg-white rounded-xl shadow-sm">My Bookings (Coming Soon)</div>} />
          </Route>
        </Route>

        {/* 5. Catch-all / 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

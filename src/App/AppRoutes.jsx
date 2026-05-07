import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { ROLES } from '../utils/constants';
import { extractRoleName } from '../utils/auth';

// Components
import PageLoader from '../components/ui/PageLoader';
import ProtectedRoute from './ProtectedRoute';

// Layouts
const AuthLayout = lazy(() => import('../features/admin/components/AuthLayout'));
const AdminLayout = lazy(() => import('../features/admin/components/AdminLayout'));
const CustomerLayout = lazy(() => import('../features/admin/components/CustomerLayout'));

// Pages
const LoginPage = lazy(() => import('../features/admin/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../features/admin/pages/auth/RegisterPage'));
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
const ProductService = lazy(() => import('../features/customer/pages/ProductService'));
const MyBookings = lazy(() => import('../features/customer/pages/MyBookings'));

const CheckoutPage = lazy(() => import('../features/customer/pages/Checkout'));
const SupportPage = lazy(() => import('../features/customer/pages/Support'));
const ConfirmationPage = lazy(() => import('../features/customer/pages/Confirmation'));
const ExploreCategoriesPage = lazy(() => import('../features/customer/pages/ExploreCategories'));
const NotFound = lazy(() => import('../components/ui/NotFound'));


const RootRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
  // If authenticated but user data is not yet available, wait
    return <PageLoader />;
  }

  const isAdminRole = [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF].includes(extractRoleName(user));
  if (isAdminRole) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/customer" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
     
        <Route path="/" element={<RootRedirect />} />

       
        <Route element={isAuthenticated ? <Navigate to="/" replace /> : <AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>


        {/* Admin Protected Routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STAFF]} />}> */}
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
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}> */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="rooms" element={<RoomPage />} />
            <Route path="hotels/:id" element={<HotelDetails />} />
            {/* <Route path="product-service" element={<ProductService />} /> */}
            <Route path="bookings" element={<MyBookings />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
            <Route path="explore" element={<ExploreCategoriesPage />} />
          </Route>
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

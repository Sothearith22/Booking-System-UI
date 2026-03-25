import api from '../../../services/axios';

export const bookingService = {
  // Rooms
  getRooms: () => api.get('/v1/rooms'),
  getAvailableRooms: () => api.get('/v1/rooms/available'),
  getRoom: (id) => api.get(`/v1/rooms/${id}`),
  createRoom: (data) => api.post('/v1/rooms', data), // Admin/Staff
  updateRoom: (id, data) => api.put(`/v1/rooms/${id}`, data), // Admin/Staff
  deleteRoom: (id) => api.delete(`/v1/rooms/${id}`), // Admin/Staff

  // Services
  getServices: () => api.get('/v1/services'),
  getService: (id) => api.get(`/v1/services/${id}`),
  createService: (data) => api.post('/v1/services', data), // Admin/Staff
  updateService: (id, data) => api.put(`/v1/services/${id}`, data), // Admin/Staff
  deleteService: (id) => api.delete(`/v1/services/${id}`), // Admin/Staff

  // Products
  getProducts: () => api.get('/v1/products'),
  getProduct: (id) => api.get(`/v1/products/${id}`),
  createProduct: (data) => api.post('/v1/products', data), // Admin/Staff
  updateProduct: (id, data) => api.put(`/v1/products/${id}`, data), // Admin/Staff
  deleteProduct: (id) => api.delete(`/v1/products/${id}`), // Admin/Staff

  // Bookings (General/Staff)
  getAllBookings: () => api.get('/v1/bookings'),
  confirmBooking: (id) => api.put(`/v1/bookings/${id}/confirm`),
  
  // Bookings (Customer)
  getMyBookings: () => api.get('/v1/my-bookings'),
  createBooking: (data) => api.post('/v1/bookings', data),
  getBooking: (id) => api.get(`/v1/bookings/${id}`),
  cancelBooking: (id) => api.delete(`/v1/bookings/${id}`),

  // Booking Histories
  getAllBookingHistories: () => api.get('/v1/booking-histories'),
  getBookingHistory: (bookingId) => api.get(`/v1/booking-histories/${bookingId}`),

  // Service Availability
  getServiceAvailability: () => api.get('/v1/service_availability'),
  getServiceAvailabilityById: (id) => api.get(`/v1/service_availability/${id}`),
  createServiceAvailability: (data) => api.post('/v1/service_availability', data), // Admin/Staff
  updateServiceAvailability: (id, data) => api.put(`/v1/service_availability/${id}`, data), // Admin/Staff
  deleteServiceAvailability: (id) => api.delete(`/v1/service_availability/${id}`), // Admin/Staff

  // Reviews
  getReviews: () => api.get('/v1/reviews'),
  getReview: (id) => api.get(`/v1/reviews/${id}`),
  createReview: (data) => api.post('/v1/reviews', data),
  updateReview: (id, data) => api.put(`/v1/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/v1/reviews/${id}`),

  // Notifications
  getNotifications: () => api.get('/v1/notifications'),
  getNotification: (id) => api.get(`/v1/notifications/${id}`),
  sendNotification: (data) => api.post('/v1/notifications', data), // Admin/Staff
  markAllNotificationsRead: () => api.patch('/v1/notifications/read-all'),
  markNotificationRead: (id) => api.patch(`/v1/notifications/${id}/read`),
  clearAllNotifications: () => api.delete('/v1/notifications/clear-all'),
  deleteNotification: (id) => api.delete(`/v1/notifications/${id}`),

  // Booking Statuses (v1 Read)
  getBookingStatuses: () => api.get('/v1/booking-statuses'),
  getBookingStatus: (id) => api.get(`/v1/booking-statuses/${id}`),
};

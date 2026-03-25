/**
 * Application-wide constants
 */

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: 'strict',
};

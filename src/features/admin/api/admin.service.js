import { MOCK_ROOMS, MOCK_USERS } from '../../../data/mock';

let rooms = [...MOCK_ROOMS];
let users = [...MOCK_USERS];
let bookings = [
  {
    id: 9421,
    user_id: 2,
    room_id: 1,
    guest_name: 'Emma Miller',
    guest_initials: 'EM',
    room_name: 'Deluxe Ocean View',
    room_number: '302',
    check_in: '2026-03-24',
    check_out: '2026-03-28',
    status: 'confirmed',
    payment: 'paid',
    total_price: 1240
  },
  {
    id: 9418,
    user_id: 3,
    room_id: 2,
    guest_name: 'John Walker',
    guest_initials: 'JW',
    room_name: 'Standard Suite',
    room_number: '104',
    check_in: '2026-03-25',
    check_out: '2026-03-26',
    status: 'pending',
    payment: 'unpaid',
    total_price: 215
  },
  {
    id: 9399,
    user_id: 4,
    room_id: 3,
    guest_name: 'Lucas Reed',
    guest_initials: 'LR',
    room_name: 'Luxury Villa',
    room_number: 'V-02',
    check_in: '2026-03-26',
    check_out: '2026-04-02',
    status: 'confirmed',
    payment: 'paid',
    total_price: 3500
  },
  {
    id: 9388,
    user_id: 5,
    room_id: 4,
    guest_name: 'Sophia Chen',
    guest_initials: 'SC',
    room_name: 'Standard Single',
    room_number: '205',
    check_in: '2026-03-22',
    check_out: '2026-03-23',
    status: 'cancelled',
    payment: 'refunded',
    total_price: 145
  },
  {
    id: 9375,
    user_id: 6,
    room_id: 5,
    guest_name: 'Marcus Brown',
    guest_initials: 'MB',
    room_name: 'Presidential Suite',
    room_number: '701',
    check_in: '2026-04-10',
    check_out: '2026-04-15',
    status: 'confirmed',
    payment: 'paid',
    total_price: 5200
  },
  {
    id: 9362,
    user_id: 7,
    room_id: 6,
    guest_name: 'Olivia Park',
    guest_initials: 'OP',
    room_name: 'Garden View Double',
    room_number: '118',
    check_in: '2026-03-28',
    check_out: '2026-03-31',
    status: 'confirmed',
    payment: 'paid',
    total_price: 870
  },
  {
    id: 9351,
    user_id: 8,
    room_id: 7,
    guest_name: 'David Kim',
    guest_initials: 'DK',
    room_name: 'Executive Suite',
    room_number: '510',
    check_in: '2026-04-01',
    check_out: '2026-04-05',
    status: 'pending',
    payment: 'unpaid',
    total_price: 1680
  },
  {
    id: 9340,
    user_id: 9,
    room_id: 8,
    guest_name: 'Rachel Foster',
    guest_initials: 'RF',
    room_name: 'Alpine Mountain Lodge',
    room_number: '302',
    check_in: '2026-03-20',
    check_out: '2026-03-22',
    status: 'confirmed',
    payment: 'paid',
    total_price: 560
  }
];

export const adminService = {
  // Rooms
  getRooms: () => Promise.resolve({ data: rooms }),
  addRoom: (data) => {
    const newRoom = { id: Date.now(), ...data };
    rooms.push(newRoom);
    return Promise.resolve({ data: newRoom });
  },
  updateRoom: (id, data) => {
    rooms = rooms.map(r => r.id === id ? { ...r, ...data } : r);
    return Promise.resolve({ data: rooms.find(r => r.id === id) });
  },
  deleteRoom: (id) => {
    rooms = rooms.filter(r => r.id !== id);
    return Promise.resolve({ data: { success: true } });
  },

  // Bookings
  getBookings: () => Promise.resolve({ data: bookings }),
  updateBookingStatus: (id, status) => {
    bookings = bookings.map(b => b.id === id ? { ...b, status } : b);
    return Promise.resolve({ data: bookings.find(b => b.id === id) });
  },

  // Users
  getUsers: () => Promise.resolve({ data: users }),
  updateUserStatus: (id, status) => {
    users = users.map(u => u.id === id ? { ...u, status } : u);
    return Promise.resolve({ data: users.find(u => u.id === id) });
  }
};

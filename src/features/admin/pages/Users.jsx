import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../api/admin.service';
import Button from '../../../components/ui/button/Button';
import Modal from '../../../components/ui/modal/Modal';
import {
  Loader2,
  Search,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Edit,
  Trash2,
  Users,
  UserCheck,
  ShieldCheck,
  Clock,
  Filter,
} from 'lucide-react';

// ── Role badge config ────────────────────────────────────────────

const ROLE_CONFIG = {
  manager:      { label: 'Manager',      bg: 'bg-blue-600',    text: 'text-white' },
  receptionist: { label: 'Receptionist', bg: 'bg-blue-500',    text: 'text-white' },
  admin:        { label: 'Admin',        bg: 'bg-gray-700',    text: 'text-white' },
  staff:        { label: 'Staff',        bg: 'bg-amber-500',   text: 'text-white' },
  customer:     { label: 'Customer',     bg: 'bg-emerald-500', text: 'text-white' },
};

const STATUS_CONFIG = {
  active:   { label: 'Active',   dot: 'bg-emerald-500', text: 'text-emerald-600' },
  inactive: { label: 'Inactive', dot: 'bg-gray-400',    text: 'text-gray-500' },
  pending:  { label: 'Pending',  dot: 'bg-amber-500',   text: 'text-amber-600' },
};

// ── Mock enriched user list ──────────────────────────────────────

const ENRICHED_USERS = [
  { id: 1, name: 'Sarah Miller',     email: 'sarah.m@luxstay.com',      initials: 'SM', role: 'manager',      department: 'Front Desk',    status: 'active',   last_login: '2 hours ago' },
  { id: 2, name: 'David Chen',       email: 'd.chen@luxstay.com',       initials: 'DC', role: 'receptionist', department: 'Guest Services', status: 'active',   last_login: 'Yesterday' },
  { id: 3, name: 'James Wilson',     email: 'j.wilson@luxstay.com',     initials: 'JW', role: 'admin',        department: 'IT Security',   status: 'inactive', last_login: '12 May 2024' },
  { id: 4, name: 'Elena Rodriguez',  email: 'e.rodriguez@luxstay.com',  initials: 'ER', role: 'receptionist', department: 'Reservations',  status: 'active',   last_login: 'Just now' },
  { id: 5, name: 'Kevin Brown',      email: 'k.brown@luxstay.com',      initials: 'KB', role: 'staff',        department: 'Maintenance',   status: 'pending',  last_login: 'Never' },
  { id: 6, name: 'Linda Park',       email: 'l.park@luxstay.com',       initials: 'LP', role: 'manager',      department: 'Housekeeping',  status: 'active',   last_login: '3 hours ago' },
  { id: 7, name: 'Tom Harris',       email: 't.harris@luxstay.com',     initials: 'TH', role: 'staff',        department: 'F&B',           status: 'active',   last_login: '1 day ago' },
  { id: 8, name: 'Amy Foster',       email: 'a.foster@luxstay.com',     initials: 'AF', role: 'receptionist', department: 'Front Desk',    status: 'active',   last_login: '4 hours ago' },
];

// ── Stat Card ────────────────────────────────────────────────────

const StatCard = ({ label, value, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      {subtitle && (
        <span className={`text-xs font-semibold ${subtitleColor || 'text-gray-400'}`}>{subtitle}</span>
      )}
    </div>
  </div>
);

// ── Main Page ────────────────────────────────────────────────────

const ROWS_PER_PAGE = 5;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'staff', department: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(ENRICHED_USERS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const admins = users.filter(u => u.role === 'admin' || u.role === 'manager').length;
    const pending = users.filter(u => u.status === 'pending').length;
    return { total, active, admins, pending };
  }, [users]);

  // Filter + search
  const filteredUsers = useMemo(() => {
    let list = [...users];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      );
    }
    if (roleFilter !== 'all') list = list.filter(u => u.role === roleFilter);
    if (statusFilter !== 'all') list = list.filter(u => u.status === statusFilter);
    return list;
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ROWS_PER_PAGE));
  const pagedUsers = filteredUsers.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, roleFilter, statusFilter]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const initials = newUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    setUsers(prev => [...prev, {
      id: Date.now(),
      ...newUser,
      initials,
      status: 'pending',
      last_login: 'Never',
    }]);
    setNewUser({ name: '', email: '', role: 'staff', department: '' });
    setIsAddModalOpen(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <p className="text-gray-500 font-medium">Loading users…</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">Users</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create, edit and manage staff accounts and permissions.</p>
        </div>
        <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/20" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={18} /> Add New User
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email or department…"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="receptionist">Receptionist</option>
            <option value="staff">Staff</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
            <Filter size={14} /> More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Login</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Users size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-base font-bold text-gray-900">No users found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                pagedUsers.map(user => {
                  const rc = ROLE_CONFIG[user.role] || ROLE_CONFIG.staff;
                  const sc = STATUS_CONFIG[user.status] || STATUS_CONFIG.active;
                  return (
                    <tr key={user.id} className="group hover:bg-blue-50/30 transition-colors">
                      {/* User */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {user.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${rc.bg} ${rc.text}`}>
                          {rc.label}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                        {user.department}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${sc.text}`}>
                          <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 italic">
                        {user.last_login}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > ROWS_PER_PAGE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Showing <span className="font-bold text-gray-900">{(currentPage - 1) * ROWS_PER_PAGE + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredUsers.length)}</span> of <span className="font-bold text-gray-900">{filteredUsers.length}</span> users
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === currentPage ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-100'}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards (below table like screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.total} subtitle="+2 this month" subtitleColor="text-emerald-600" />
        <StatCard label="Active Now" value={stats.active} />
        <StatCard label="Admin Roles" value={stats.admins} />
        <StatCard label="Pending Invites" value={stats.pending} subtitle={stats.pending > 0 ? 'Expiring soon' : ''} subtitleColor="text-amber-600" />
      </div>

      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
            <input required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Sarah Miller" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
            <input required type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. sarah@luxstay.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Role</label>
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option value="staff">Staff</option>
                <option value="receptionist">Receptionist</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Department</label>
              <input required value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Front Desk" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 flex items-center justify-center gap-2"><UserPlus size={16} /> Create User</Button>
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;

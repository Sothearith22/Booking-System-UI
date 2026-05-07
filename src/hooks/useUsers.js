import { useEffect, useMemo, useState } from 'react';
import { userService } from '../services/userService';
import { extractUserRecord, extractUsersList, normalizeUser } from '../utils/userUtils';
import { getApiErrorMessage } from '../utils/auth';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);

  //  fetch
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await userService.getAll();
        const list = extractUsersList(data);

        setUsers(list.map(normalizeUser));
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // stats
  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => ['admin','manager'].includes(u.role)).length,
    pending: users.filter(u => u.status === 'pending').length,
  }), [users]);

  //  filter
  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return users.filter(u => {
      const roleLabel = String(u.role || '').toLowerCase();
      const department = String(u.department || '').toLowerCase();
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        roleLabel.includes(q) ||
        department.includes(q);

      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  //  actions
  const createUser = async (payload) => {
    const data = await userService.create(payload);
    const newUser = normalizeUser(extractUserRecord(data) ?? payload, users.length);

    setUsers(prev => [newUser, ...prev]);
  };

  const deleteUser = async (user) => {
    await userService.remove(user.apiId || user.id);
    setUsers(prev => prev.filter(u => u.id !== user.id));
  };

  return {
    users,
    loading,
    error,

    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,

    currentPage,
    setCurrentPage,

    stats,
    filteredUsers,

    createUser,
    deleteUser,
  };
};

import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { MOCK_USERS } from '../data/mock';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
    Cookies.remove('token');
    Cookies.remove('user');
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = Cookies.get('user');

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setAuthState({
              user: parsedUser,
              isAuthenticated: true,
              loading: false
            });
            return;
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          logout();
        }
      }
      
      setAuthState(prev => ({ ...prev, loading: false }));
    };

    // Simulate network delay for initial load
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, [logout]);

  const login = async ({ email, password }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(u => u.email === email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In a real mock, we'd check password, but for demo we just allow any
    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(7);
    
    setAuthState({
      user,
      isAuthenticated: true,
      loading: false
    });

    Cookies.set('token', mockToken, { expires: 7, secure: true, sameSite: 'strict' });
    Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true, sameSite: 'strict' });

    return { user, token: mockToken };
  };

  const register = async (userData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Just return success for demo
    return { status: 'success', message: 'User registered successfully' };
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

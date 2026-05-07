import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import Alert from '../../../../components/ui/Alert';
import { getApiErrorMessage, getHomePathForRole } from '../../../../utils/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    
    const trimmedEmail = email.trim();

    try {
      const userData = await login({ email: trimmedEmail, password });

      const requestedPath = location.state?.from?.pathname;
      const fallbackPath = getHomePathForRole(userData.user?.role);
      const redirectPath =
        requestedPath && !['/login', '/register'].includes(requestedPath)
          ? requestedPath
          : fallbackPath;

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Login failed. Please check your credentials.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">Login to your account</h2>
      
      {successMessage && (
        <Alert type="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            required
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            required
            autoComplete="current-password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      
      <p className="text-center text-sm text-gray-500">
        Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
      </p>

    </div>
  );
};

export default LoginPage;

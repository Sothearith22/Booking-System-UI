import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import Alert from '../../../../components/ui/Alert';
import Button from '../../../../components/ui/Button';
import { getApiErrorMessage } from '../../../../utils/auth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate('/login', { 
        state: { message: 'Registration successful! Please login with your new account.' },
        replace: true,
      });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Registration is temporarily unavailable. Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">Join our booking system today</p>
      </div>
      
      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            required
            autoComplete="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all" 
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input 
            type="email" 
            name="email"
            required
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all" 
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            name="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
        </div>
        
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Sign in instead
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import AuthButton from '../../components/auth/AuthButton';
import ErrorMessage from '../../components/auth/ErrorMessage';
import { CheckCircle } from 'lucide-react';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL query params
    const params = new URLSearchParams(location.search);
    const resetToken = params.get('token');
    
    if (!resetToken) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    } else {
      setToken(resetToken);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }
    setLoading(true);
    try {
      // Call your backend API for password reset
      await axios.post('/api/auth/reset-password', {
        token,
        password: formData.password
      });
      
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your account"
      illustrationTitle="Secure Your Account"
      illustrationDescription="Create a strong, unique password to protect your ParkEase account"
    >
      {success ? (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <CheckCircle size={60} className="text-lime-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Password Reset Successful</h3>
          <p className="text-gray-400 mb-6">
            Your password has been reset successfully. You'll be redirected to the login page shortly.
          </p>
          <div className="mt-8">
            <Link to="/login">
              <AuthButton type="button" variant="primary">
                Go to Login
              </AuthButton>
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          <ErrorMessage message={error} />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FormInput
              id="password"
              name="password"
              type="password"
              label="New Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
            <div className="mt-8">
              <AuthButton
                type="submit"
                disabled={loading || !token}
                isLoading={loading}
              >
                Reset Password
              </AuthButton>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Remember your password?{' '}
                <Link to="/login" className="text-lime-400 hover:text-lime-300 transition-colors font-medium">
                  Back to login
                </Link>
              </p>
            </div>
          </motion.form>
        </>
      )}
    </AuthLayout>
  );
};

export default ResetPasswordPage;

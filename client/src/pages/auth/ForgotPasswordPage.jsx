import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import AuthButton from '../../components/auth/AuthButton';
import ErrorMessage from '../../components/auth/ErrorMessage';
import { CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    try {
      // Call your backend API for password reset
      await axios.post('/api/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      illustrationTitle="Password Recovery"
      illustrationDescription="We'll send you a secure link to reset your password and regain access to your ParkEase account"
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
          <h3 className="text-xl font-semibold text-white mb-2">Check your email</h3>
          <p className="text-gray-400 mb-6">
            We've sent a password reset link to <span className="text-lime-400">{email}</span>.
            Please check your inbox and follow the instructions.
          </p>
          <div className="mt-8">
            <Link to="/login">
              <AuthButton type="button" variant="outline" onClick={() => {}}>
                Return to Login
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
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
            <div className="mt-8">
              <AuthButton onClick={() => {}}
                type="submit"
                disabled={loading}
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

export default ForgotPasswordPage;

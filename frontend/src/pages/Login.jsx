import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await axios.post(`${BACKEND_URL}/api/auth/register`, formData);
        setError('');
        alert('Registration successful! Please login.');
        setIsRegister(false);
        setFormData({ ...formData, name: '', password: '' });
      } else {
        const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        const { access_token, user } = response.data;

        localStorage.setItem('token', access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userName', user.name);

        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      setError(err.response?.data?.detail || `${isRegister ? 'Registration' : 'Login'} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">CampusGPT</h1>
          <p className="text-gray-400 mt-2">{isRegister ? 'Create your account' : 'Sign in to your account'}</p>
        </div>

        {/* Login/Register Card */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-8">
          <form onSubmit={handleSubmit} data-testid="login-form">
            {/* Name (only for registration) */}
            {isRegister && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                data-testid="email-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  data-testid="password-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 pr-10 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['student', 'faculty', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    data-testid={`role-${role}`}
                    onClick={() => setFormData({ ...formData, role })}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                      formData.role === role
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700/30 border border-gray-600 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div data-testid="error-message" className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isRegister ? 'Creating Account...' : 'Signing in...') : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                {isRegister ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>

          {/* Demo Credentials - Only show in login mode */}
          {!isRegister && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-300 mb-3 font-medium">Demo Credentials:</p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Student:</span>
                  <span className="font-mono text-gray-300">student@campus.com / student123</span>
                </div>
                <div className="flex justify-between">
                  <span>Faculty:</span>
                  <span className="font-mono text-gray-300">faculty@campus.com / faculty123</span>
                </div>
                <div className="flex justify-between">
                  <span>Admin:</span>
                  <span className="font-mono text-gray-300">admin@campus.com / admin123</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
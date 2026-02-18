import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border border-[#1F2937] bg-[#111827] shadow-md shadow-black/20">
          <CardHeader className="pb-4 pt-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F172A] text-[#F9FAFB]">
              <GraduationCap size={28} />
            </div>
            <h1 className="text-2xl font-semibold text-[#F9FAFB]">CampusGPT</h1>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              {isRegister ? 'Create your account' : 'Sign in to your account'}
            </p>
          </CardHeader>
          <CardContent className="pb-6 pt-0">
            <form onSubmit={handleSubmit} data-testid="login-form" className="space-y-4">
              {isRegister && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#E5E7EB]">Full name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="h-11 rounded-xl border-[#1F2937] bg-[#020617] text-sm text-[#F9FAFB] placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#6366F1]"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#E5E7EB]">Email address</label>
                <Input
                  type="email"
                  data-testid="email-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="h-11 rounded-xl border-[#1F2937] bg-[#020617] text-sm text-[#F9FAFB] placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#6366F1]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#E5E7EB]">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    data-testid="password-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-[#1F2937] bg-[#020617] pr-10 text-sm text-[#F9FAFB] placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#6366F1]"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:bg-transparent hover:text-[#F9FAFB]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#E5E7EB]">Select role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['student', 'faculty', 'admin'].map((role) => (
                    <Button
                      key={role}
                      type="button"
                      data-testid={`role-${role}`}
                      onClick={() => setFormData({ ...formData, role })}
                      variant={formData.role === role ? 'default' : 'outline'}
                      className={`h-10 rounded-xl text-xs font-medium capitalize ${
                        formData.role === role
                          ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                          : 'border-[#1F2937] bg-[#020617] text-[#E5E7EB] hover:bg-[#111827]'
                      }`}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>

              {error && (
                <div
                  data-testid="error-message"
                  className="rounded-xl border border-[#EF4444] bg-[#450a0a] px-3 py-2 text-xs text-[#fecaca]"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="login-submit-button"
                disabled={loading}
                className="mt-2 h-10 w-full rounded-xl bg-[#6366F1] text-sm font-medium text-white hover:bg-[#4F46E5] disabled:opacity-50"
              >
                {loading
                  ? isRegister
                    ? 'Creating account...'
                    : 'Signing in...'
                  : isRegister
                  ? 'Create account'
                  : 'Sign in'}
              </Button>
            </form>

            <div className="mt-6 border-t border-[#1F2937] pt-4 text-center text-xs text-[#9CA3AF]">
              <span>
                {isRegister ? 'Already have an account?' : "Don’t have an account?"}{' '}
              </span>
              <Button
                type="button"
                variant="link"
                className="px-1 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5]"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                }}
              >
                {isRegister ? 'Sign in' : 'Create account'}
              </Button>
            </div>

            {!isRegister && (
              <div className="mt-4 border-t border-[#1F2937] pt-4 text-xs text-[#9CA3AF]">
                <p className="mb-2 font-medium text-[#E5E7EB]">Demo credentials</p>
                <div className="space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Student</span>
                    <span className="text-[#E5E7EB]">student@campus.com / student123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Faculty</span>
                    <span className="text-[#E5E7EB]">faculty@campus.com / faculty123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admin</span>
                    <span className="text-[#E5E7EB]">admin@campus.com / admin123</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
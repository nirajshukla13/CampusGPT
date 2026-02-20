import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { GraduationCap, Eye, EyeOff, Sparkles, BookOpen, Users, Mail, Lock, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { appColors } from '../config/colors.js';

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
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
        // Validate all fields are filled
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill out all fields');
          setLoading(false);
          return;
        }
        
        await authAPI.register(formData);
        setError('');
        alert('Registration successful! Please login.');
        setIsRegister(false);
        setFormData({ ...formData, name: '', password: '' });
      } else {
        // Validate login fields
        if (!formData.email || !formData.password) {
          setError('Please fill out all fields');
          setLoading(false);
          return;
        }
        
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        console.log(response)
        const { access_token, user } = response.data;

        localStorage.setItem('token', access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userName', user.name);
        
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      console.error('Auth error:', err);
      const errorMessage = err.response?.data?.detail || err.message || `${isRegister ? 'Registration' : 'Login'} failed. Please try again.`;
      
      // Add more specific error messages
      if (err.response?.status === 422) {
        setError('Invalid input. Please check all fields are filled correctly.');
      } else if (err.response?.status === 401) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err.response?.status === 400) {
        setError(errorMessage);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8" style={{ backgroundColor: appColors.mainBackground }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="border border-border shadow-xl shadow-black/20 backdrop-blur-sm" style={{ backgroundColor: appColors.sidebarBackground }}>
          <CardHeader className="space-y-4 pb-6 pt-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                CampusGPT
              </h1>
              <p className="text-sm text-muted-foreground">
                {isRegister ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pb-8 pt-2">
            <form onSubmit={handleSubmit} data-testid="login-form" className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full name</label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="h-11 rounded-xl border-border bg-surface-2 pl-10 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    data-testid="email-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isRegister ? "name@student.com" : "you@example.com"}
                    className="h-11 rounded-xl border-border bg-surface-2 pl-10 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    required
                  />
                </div>
                {isRegister && (
                  <p className="text-xs text-muted-foreground pl-1">
                    Use @student.com, @faculty.com, or @admin.com domain
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    data-testid="password-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-border bg-surface-2 pl-10 pr-10 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 hover:bg-surface"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              {error && (
                <div
                  data-testid="error-message"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="login-submit-button"
                disabled={loading}
                className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#111827] px-4 text-foreground font-medium">
                  {isRegister ? 'Already have an account?' : "Don't have an account?"}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full rounded-xl border-border bg-surface-2 text-sm font-medium text-foreground hover:bg-surface hover:text-primary transition-colors"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Sign in instead' : 'Create new account'}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
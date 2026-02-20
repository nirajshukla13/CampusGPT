import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { GraduationCap, Eye, EyeOff, Sparkles, BookOpen, Users } from 'lucide-react';
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
      <div className="w-full max-w-md">
        <Card className="shadow-xl shadow-black/20" style={{ borderColor: appColors.cardBorder, backgroundColor: appColors.sidebarBackground }}>
          <CardHeader className="space-y-1 pb-4 pt-6 text-center sm:pt-8">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg sm:mb-4 sm:h-16 sm:w-16" style={{ backgroundColor: appColors.primaryButton }}>
              <GraduationCap size={28} className="sm:h-8 sm:w-8" style={{ color: appColors.primaryText }} />
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: appColors.primaryText }}>
              CampusGPT
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: appColors.mutedText }}>
              {isRegister ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
            </p>
          </CardHeader>

          <CardContent className="space-y-4 pb-6 pt-2 sm:space-y-5 sm:pb-8">
            <form onSubmit={handleSubmit} data-testid="login-form" className="space-y-3 sm:space-y-4">
              {isRegister && (
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs font-medium sm:text-sm" style={{ color: appColors.secondaryText }}>Full name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="h-10 rounded-lg text-sm sm:h-11"
                    style={{
                      borderColor: appColors.inputBorder,
                      backgroundColor: appColors.inputBackground,
                      color: appColors.primaryText,
                    }}
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-medium sm:text-sm" style={{ color: appColors.secondaryText }}>Email address</label>
                <Input
                  type="email"
                  data-testid="email-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isRegister ? "name@student.com" : "you@example.com"}
                  className="h-10 rounded-lg text-sm sm:h-11"
                  style={{
                    borderColor: appColors.inputBorder,
                    backgroundColor: appColors.inputBackground,
                    color: appColors.primaryText,
                  }}
                  required
                />
                {isRegister && (
                  <p className="text-[10px] sm:text-xs" style={{ color: appColors.mutedText }}>
                    Use @student.com, @faculty.com, or @admin.com domain
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-medium sm:text-sm" style={{ color: appColors.secondaryText }}>Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    data-testid="password-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="h-10 rounded-lg pr-10 text-sm sm:h-11"
                    style={{
                      borderColor: appColors.inputBorder,
                      backgroundColor: appColors.inputBackground,
                      color: appColors.primaryText,
                    }}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                    style={{
                      color: appColors.mutedForeground,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = appColors.cardBorder;
                      e.currentTarget.style.color = appColors.secondaryText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = appColors.mutedForeground;
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} className="sm:h-[18px] sm:w-[18px]" /> : <Eye size={16} className="sm:h-[18px] sm:w-[18px]" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div
                  data-testid="error-message"
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-300 sm:px-4 sm:py-3 sm:text-sm"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="login-submit-button"
                disabled={loading}
                className="h-10 w-full rounded-lg text-sm font-semibold disabled:opacity-50 sm:h-11"
                style={{
                  backgroundColor: appColors.primaryButton,
                  color: appColors.primaryText,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = appColors.primaryButtonHover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = appColors.primaryButton;
                  }
                }}
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
                <div className="w-full border-t" style={{ borderColor: appColors.cardBorder }} />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 sm:px-4" style={{ backgroundColor: appColors.sidebarBackground, color: appColors.mutedForeground }}>
                  {isRegister ? 'Already have an account?' : "Don't have an account?"}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="h-9 w-full rounded-lg border text-xs font-medium sm:h-10 sm:text-sm"
              style={{
                borderColor: appColors.cardBorder,
                backgroundColor: appColors.inputBackground,
                color: appColors.secondaryText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = appColors.border;
                e.currentTarget.style.backgroundColor = appColors.cardBorder;
                e.currentTarget.style.color = appColors.primaryText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = appColors.cardBorder;
                e.currentTarget.style.backgroundColor = appColors.inputBackground;
                e.currentTarget.style.color = appColors.secondaryText;
              }}
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Sign in instead' : 'Create new account'}
            </Button>

            <p className="text-center text-[10px] sm:text-xs" style={{ color: appColors.mutedForeground }}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

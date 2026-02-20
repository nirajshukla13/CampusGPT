import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import Layout from '../components/Layout';
import { User, Mail, Shield, Calendar, Award, BookOpen, TrendingUp, Clock, Settings, Bell, Lock, Edit2, Save, X, Camera, Key, Globe, Moon, Sun } from 'lucide-react';
import { appColors } from '../config/colors.js';

const Profile = () => {
  const role = localStorage.getItem('role') || 'student';
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: true,
    language: 'English'
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setEditedName(response.data.name);
      setLoading(false);
    } catch (err) {
      console.error('Profile fetch error:', err);
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to load profile';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editedName });
    setIsEditing(false);
    // TODO: Add API call to save profile changes
  };

  const handleCancelEdit = () => {
    setEditedName(user?.name);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysActive = (dateString) => {
    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'student': return { backgroundColor: appColors.studentColor };
      case 'faculty': return { backgroundColor: appColors.facultyColor };
      case 'admin': return { backgroundColor: appColors.adminColor };
      default: return { backgroundColor: appColors.mutedForeground };
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'student': return { backgroundColor: `${appColors.studentColor}33`, color: appColors.studentColor, borderColor: `${appColors.studentColor}4D` };
      case 'faculty': return { backgroundColor: `${appColors.facultyColor}33`, color: appColors.facultyColor, borderColor: `${appColors.facultyColor}4D` };
      case 'admin': return { backgroundColor: `${appColors.adminColor}33`, color: appColors.adminColor, borderColor: `${appColors.adminColor}4D` };
      default: return { backgroundColor: `${appColors.mutedForeground}33`, color: appColors.mutedText, borderColor: `${appColors.mutedForeground}4D` };
    }
  };

  const getRoleStats = (role) => {
    switch(role) {
      case 'student':
        return [
          { icon: BookOpen, label: 'Enrolled Courses', value: '6', color: appColors.studentColor },
          { icon: Clock, label: 'Study Hours', value: '124h', color: appColors.success },
          { icon: Award, label: 'Achievements', value: '12', color: appColors.accentOrange }
        ];
      case 'faculty':
        return [
          { icon: BookOpen, label: 'Courses Teaching', value: '4', color: appColors.facultyColor },
          { icon: User, label: 'Total Students', value: '156', color: appColors.studentColor },
          { icon: TrendingUp, label: 'Avg. Rating', value: '4.8', color: appColors.success }
        ];
      case 'admin':
        return [
          { icon: User, label: 'Total Users', value: '342', color: appColors.adminColor },
          { icon: Shield, label: 'System Status', value: 'Active', color: appColors.success },
          { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: appColors.studentColor }
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <Layout role={role}>
        <div className="min-h-screen p-4 sm:p-6 md:p-8" style={{ backgroundColor: appColors.mainBackground }}>
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-6 sm:h-8 rounded w-1/2 sm:w-1/4" style={{ backgroundColor: appColors.cardBorder }}></div>
              <div className="h-48 sm:h-64 rounded" style={{ backgroundColor: appColors.cardBorder }}></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout role={role}>
        <div className="min-h-screen p-4 sm:p-6 md:p-8" style={{ backgroundColor: appColors.mainBackground }}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg border p-3 sm:p-4 text-sm sm:text-base" style={{ backgroundColor: `${appColors.error}33`, borderColor: appColors.error, color: appColors.error }}>
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={role}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 sm:mb-2" style={{ color: appColors.primaryText }}>My Profile</h1>
            <p className="text-sm sm:text-base md:text-lg" style={{ color: appColors.mutedText }}>Manage your account information and preferences</p>
          </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Main Profile Card */}
            <div className="rounded-xl overflow-hidden shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder, borderWidth: '1px', borderStyle: 'solid' }}>
              <div className="px-4 py-6 sm:px-6 sm:py-8 relative" style={getRoleColor(user?.role)}>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <User size={40} className="sm:w-12 sm:h-12" style={{ color: user?.role === 'student' ? appColors.studentColor : user?.role === 'faculty' ? appColors.facultyColor : appColors.adminColor }} />
                    </div>
                    <button className="absolute bottom-3 sm:bottom-4 right-0 p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: appColors.primaryButton }}>
                      <Camera size={14} className="sm:w-4 sm:h-4" style={{ color: appColors.primaryText }} />
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="w-full space-y-2 sm:space-y-3">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-center text-lg sm:text-xl font-bold"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: appColors.primaryText }}
                      />
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={handleSaveProfile}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-colors"
                          style={{ backgroundColor: appColors.success, color: appColors.primaryText }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = appColors.successHover}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appColors.success}
                        >
                          <Save size={14} className="sm:w-4 sm:h-4" /> Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-colors"
                          style={{ backgroundColor: appColors.error, color: appColors.primaryText }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = appColors.errorHover}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appColors.error}
                        >
                          <X size={14} className="sm:w-4 sm:h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-center" style={{ color: appColors.primaryText }}>{user?.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 sm:p-1.5 rounded-lg transition-colors"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Edit2 size={14} className="sm:w-4 sm:h-4" style={{ color: appColors.primaryText }} />
                      </button>
                    </div>
                  )}
                  
                  <span className="mt-3 px-4 py-1.5 rounded-full text-sm font-semibold border" style={getRoleBadgeColor(user?.role)}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                  <Mail size={18} className="sm:w-5 sm:h-5 flex-shrink-0" style={{ color: appColors.mutedText }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs font-medium" style={{ color: appColors.mutedText }}>Email Address</p>
                    <p className="text-xs sm:text-sm truncate" style={{ color: appColors.primaryText }}>{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                  <Calendar size={18} className="sm:w-5 sm:h-5 flex-shrink-0" style={{ color: appColors.mutedText }} />
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs font-medium" style={{ color: appColors.mutedText }}>Member Since</p>
                    <p className="text-xs sm:text-sm" style={{ color: appColors.primaryText }}>{formatDate(user?.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                  <Clock size={18} className="sm:w-5 sm:h-5 flex-shrink-0" style={{ color: appColors.mutedText }} />
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs font-medium" style={{ color: appColors.mutedText }}>Days Active</p>
                    <p className="text-xs sm:text-sm" style={{ color: appColors.primaryText }}>{getDaysActive(user?.created_at)} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-xl shadow-md shadow-black/20 border p-4 sm:p-6" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4" style={{ color: appColors.primaryText }}>Quick Actions</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg border transition-all group"
                  style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${appColors.cardBorder}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = appColors.inputBackground;
                  }}
                >
                  <Settings size={18} className="sm:w-5 sm:h-5 transition-colors" style={{ color: appColors.mutedText }} onMouseEnter={(e) => e.currentTarget.style.color = appColors.primaryButton} />
                  <span className="text-xs sm:text-sm font-medium group-hover:text-white transition-colors" style={{ color: appColors.secondaryText }}>Preferences</span>
                </button>
                <button className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg border transition-all group" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.cardBorder}80`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appColors.inputBackground}>
                  <Key size={18} className="sm:w-5 sm:h-5 transition-colors" style={{ color: appColors.mutedText }} />
                  <span className="text-xs sm:text-sm font-medium group-hover:text-white transition-colors" style={{ color: appColors.secondaryText }}>Change Password</span>
                </button>
                <button className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg border transition-all group" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.cardBorder}80`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appColors.inputBackground}>
                  <Bell size={18} className="sm:w-5 sm:h-5 transition-colors" style={{ color: appColors.mutedText }} />
                  <span className="text-xs sm:text-sm font-medium group-hover:text-white transition-colors" style={{ color: appColors.secondaryText }}>Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-2.5 sm:space-x-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg border transition-all group" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.cardBorder}80`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appColors.inputBackground}>
                  <Lock size={18} className="sm:w-5 sm:h-5 transition-colors" style={{ color: appColors.mutedText }} />
                  <span className="text-xs sm:text-sm font-medium group-hover:text-white transition-colors" style={{ color: appColors.secondaryText }}>Privacy & Security</span>
                </button>
              </div>
            </div>

            {/* Preferences Panel */}
            {showPreferences && (
              <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: appColors.primaryText }}>Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                    <div className="flex items-center gap-3">
                      <Bell size={18} style={{ color: appColors.primaryButton }} />
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Email Notifications</span>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                      className="w-12 h-6 rounded-full transition-colors relative"
                      style={{ backgroundColor: preferences.emailNotifications ? appColors.primaryButton : appColors.cardBorder }}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform`} style={{ backgroundColor: appColors.primaryText, transform: preferences.emailNotifications ? 'translateX(24px)' : 'translateX(0)' }}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                    <div className="flex items-center gap-3">
                      <Moon size={18} style={{ color: appColors.facultyColor }} />
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                      className="w-12 h-6 rounded-full transition-colors relative"
                      style={{ backgroundColor: preferences.darkMode ? appColors.facultyColor : appColors.cardBorder }}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform`} style={{ backgroundColor: appColors.primaryText, transform: preferences.darkMode ? 'translateX(24px)' : 'translateX(0)' }}></div>
                    </button>
                  </div>

                  <div className="p-3 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Globe size={18} style={{ color: appColors.success }} />
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Language</span>
                    </div>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                      style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder, color: appColors.primaryText }}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats and Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {getRoleStats(user?.role).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="rounded-xl border p-4 sm:p-6 transition-all shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${appColors.cardBorder}4D`; e.currentTarget.style.borderColor = appColors.border; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = appColors.sidebarBackground; e.currentTarget.style.borderColor = appColors.cardBorder; }}>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: appColors.inputBackground }}>
                        <Icon size={20} className="sm:w-6 sm:h-6" style={{ color: stat.color }} />
                      </div>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1" style={{ color: appColors.primaryText }}>{stat.value}</p>
                    <p className="text-xs sm:text-sm" style={{ color: appColors.mutedText }}>{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Achievements & Badges */}
            {user?.role === 'student' && (
              <div className="rounded-xl border p-4 sm:p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold" style={{ color: appColors.primaryText }}>Achievements</h3>
                  <span className="text-xs" style={{ color: appColors.mutedText }}>12 Total</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                  <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border transition-all cursor-pointer group" style={{ backgroundColor: `${appColors.accentOrange}33`, borderColor: `${appColors.accentOrange}66` }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.accentOrange}4D`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${appColors.accentOrange}33`}>
                    <Award size={22} className="mb-1.5 sm:mb-2 sm:w-7 sm:h-7" style={{ color: appColors.accentOrange }} />
                    <span className="text-[10px] sm:text-xs text-center" style={{ color: appColors.secondaryText }}>First Course</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border transition-all cursor-pointer group" style={{ backgroundColor: `${appColors.studentColor}33`, borderColor: `${appColors.studentColor}66` }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.studentColor}4D`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${appColors.studentColor}33`}>
                    <BookOpen size={22} className="mb-1.5 sm:mb-2 sm:w-7 sm:h-7" style={{ color: appColors.studentColor }} />
                    <span className="text-[10px] sm:text-xs text-center" style={{ color: appColors.secondaryText }}>5 Courses</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border transition-all cursor-pointer group" style={{ backgroundColor: `${appColors.facultyColor}33`, borderColor: `${appColors.facultyColor}66` }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.facultyColor}4D`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${appColors.facultyColor}33`}>
                    <TrendingUp size={22} className="mb-1.5 sm:mb-2 sm:w-7 sm:h-7" style={{ color: appColors.facultyColor }} />
                    <span className="text-[10px] sm:text-xs text-center" style={{ color: appColors.secondaryText }}>Top 10%</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border transition-all cursor-pointer group" style={{ backgroundColor: `${appColors.success}33`, borderColor: `${appColors.success}66` }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appColors.success}4D`} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${appColors.success}33`}>
                    <Clock size={22} className="mb-1.5 sm:mb-2 sm:w-7 sm:h-7" style={{ color: appColors.success }} />
                    <span className="text-[10px] sm:text-xs text-center" style={{ color: appColors.secondaryText }}>100 Hours</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="rounded-xl border p-4 sm:p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6" style={{ color: appColors.primaryText }}>Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium" style={{ color: appColors.mutedText }}>Full Name</label>
                  <p className="text-base font-medium" style={{ color: appColors.primaryText }}>{user?.name}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" style={{ color: appColors.mutedText }}>User ID</label>
                  <p className="text-sm font-mono" style={{ color: appColors.primaryText }}>{user?.id?.substring(0, 8)}...</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" style={{ color: appColors.mutedText }}>Email Address</label>
                  <p className="text-base" style={{ color: appColors.primaryText }}>{user?.email}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" style={{ color: appColors.mutedText }}>Account Type</label>
                  <p className="text-base capitalize" style={{ color: appColors.primaryText }}>{user?.role}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" style={{ color: appColors.mutedText }}>Account Status</label>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: appColors.success }}></span>
                    <p className="text-base" style={{ color: appColors.primaryText }}>Active</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium" style={{ color: appColors.mutedText }}>Last Login</label>
                  <p className="text-base" style={{ color: appColors.primaryText }}>Just now</p>
                </div>
              </div>
            </div>

            {/* Skills & Progress (Student Only) */}
            {user?.role === 'student' && (
              <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
                <h3 className="text-lg font-semibold mb-6" style={{ color: appColors.primaryText }}>Skills & Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Python Programming</span>
                      <span className="text-sm font-medium" style={{ color: appColors.studentColor }}>85%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: appColors.cardBorder }}>
                      <div className="h-2 rounded-full" style={{ width: '85%', backgroundColor: appColors.studentColor }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Web Development</span>
                      <span className="text-sm font-medium" style={{ color: appColors.facultyColor }}>72%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: appColors.cardBorder }}>
                      <div className="h-2 rounded-full" style={{ width: '72%', backgroundColor: appColors.facultyColor }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Data Science</span>
                      <span className="text-sm font-medium" style={{ color: appColors.success }}>68%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: appColors.cardBorder }}>
                      <div className="h-2 rounded-full" style={{ width: '68%', backgroundColor: appColors.success }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: appColors.secondaryText }}>Machine Learning</span>
                      <span className="text-sm font-medium" style={{ color: appColors.accentOrange }}>54%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: appColors.cardBorder }}>
                      <div className="h-2 rounded-full" style={{ width: '54%', backgroundColor: appColors.accentOrange }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bio Section */}
            <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: appColors.primaryText }}>About</h3>
                <button className="text-sm font-medium flex items-center gap-1" style={{ color: appColors.primaryButton }} onMouseEnter={(e) => e.currentTarget.style.color = appColors.primaryButtonHover} onMouseLeave={(e) => e.currentTarget.style.color = appColors.primaryButton}>
                  <Edit2 size={14} /> Edit
                </button>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: appColors.secondaryText }}>
                {user?.role === 'student' 
                  ? "Passionate computer science student with a keen interest in artificial intelligence and machine learning. Always eager to learn new technologies and apply them to solve real-world problems."
                  : user?.role === 'faculty'
                  ? "Experienced educator dedicated to fostering an engaging learning environment. Specialized in modern teaching methodologies and student mentorship."
                  : "Experienced system administrator ensuring smooth operations and optimal performance of the campus management system."}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: `${appColors.studentColor}33`, color: appColors.studentColor, borderColor: `${appColors.studentColor}4D` }}>
                  {user?.role === 'student' ? 'Python' : user?.role === 'faculty' ? 'Teaching' : 'Administration'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: `${appColors.facultyColor}33`, color: appColors.facultyColor, borderColor: `${appColors.facultyColor}4D` }}>
                  {user?.role === 'student' ? 'React' : user?.role === 'faculty' ? 'Research' : 'Security'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: `${appColors.success}33`, color: appColors.success, borderColor: `${appColors.success}4D` }}>
                  {user?.role === 'student' ? 'Machine Learning' : user?.role === 'faculty' ? 'Mentorship' : 'Analytics'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: `${appColors.accentOrange}33`, color: appColors.accentOrange, borderColor: `${appColors.accentOrange}4D` }}>
                  {user?.role === 'student' ? 'Team Player' : user?.role === 'faculty' ? 'Innovation' : 'Management'}
                </span>
              </div>
            </div>

            {/* Activity Overview */}
            <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: appColors.primaryText }}>Recent Activity</h3>
                <button className="text-sm font-medium" style={{ color: appColors.primaryButton }} onMouseEnter={(e) => e.currentTarget.style.color = appColors.primaryButtonHover} onMouseLeave={(e) => e.currentTarget.style.color = appColors.primaryButton}>View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: appColors.studentColor }}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: appColors.primaryText }}>Login detected from new location</p>
                    <p className="text-xs mt-1" style={{ color: appColors.mutedText }}>Today at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: appColors.success }}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: appColors.primaryText }}>Profile viewed</p>
                    <p className="text-xs mt-1" style={{ color: appColors.mutedText }}>Just now</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-lg border" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: appColors.facultyColor }}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: appColors.primaryText }}>Account created</p>
                    <p className="text-xs mt-1" style={{ color: appColors.mutedText }}>{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { User, Mail, Shield, Calendar, Award, BookOpen, TrendingUp, Clock, Settings, Bell, Lock, Edit2, Save, X, Camera, Key, Globe, Moon, Sun } from 'lucide-react';

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
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setEditedName(response.data.name);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
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
      case 'student': return 'bg-blue-600';
      case 'faculty': return 'bg-Blue-600';
      case 'admin': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'student': return 'bg-blue-600/20 text-blue-300 border border-blue-500/30';
      case 'faculty': return 'bg-purple-600/20 text-purple-300 border border-purple-500/30';
      case 'admin': return 'bg-orange-600/20 text-orange-300 border border-orange-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border border-gray-500/30';
    }
  };

  const getRoleStats = (role) => {
    switch(role) {
      case 'student':
        return [
          { icon: BookOpen, label: 'Enrolled Courses', value: '6', color: 'text-blue-600' },
          { icon: Clock, label: 'Study Hours', value: '124h', color: 'text-green-600' },
          { icon: Award, label: 'Achievements', value: '12', color: 'text-yellow-600' }
        ];
      case 'faculty':
        return [
          { icon: BookOpen, label: 'Courses Teaching', value: '4', color: 'text-purple-600' },
          { icon: User, label: 'Total Students', value: '156', color: 'text-blue-600' },
          { icon: TrendingUp, label: 'Avg. Rating', value: '4.8', color: 'text-green-600' }
        ];
      case 'admin':
        return [
          { icon: User, label: 'Total Users', value: '342', color: 'text-orange-600' },
          { icon: Shield, label: 'System Status', value: 'Active', color: 'text-green-600' },
          { icon: TrendingUp, label: 'Uptime', value: '99.9%', color: 'text-blue-600' }
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <Layout role={role}>
        <div className="min-h-screen p-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-1/4"></div>
              <div className="h-64 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout role={role}>
        <div className="min-h-screen p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-300">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={role}>
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400 text-lg">Manage your account information and preferences</p>
          </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Card */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden backdrop-blur-sm">
              <div className={`${getRoleColor(user?.role)} px-6 py-8 relative`}>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
                      <User size={48} className={`${user?.role === 'student' ? 'text-blue-600' : user?.role === 'faculty' ? 'text-purple-600' : 'text-orange-600'}`} />
                    </div>
                    <button className="absolute bottom-4 right-0 bg-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={16} className="text-white" />
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="w-full space-y-3">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-center text-xl font-bold placeholder-white/50"
                      />
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
                        >
                          <Save size={16} /> Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
                        >
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-white text-center">{user?.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} className="text-white" />
                      </button>
                    </div>
                  )}
                  
                  <span className={`mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-3 p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <Mail size={20} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                    <p className="text-sm text-white truncate">{user?.email}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center space-x-3 p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <Calendar size={20} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Member Since</p>
                    <p className="text-sm text-white">{formatDate(user?.created_at)}</p>
                  </div>
                </div>

                {/* Days Active */}
                <div className="flex items-center space-x-3 p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <Clock size={20} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Days Active</p>
                    <p className="text-sm text-white">{getDaysActive(user?.created_at)} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group"
                >
                  <Settings size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Preferences</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group">
                  <Key size={20} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Change Password</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group">
                  <Bell size={20} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all group">
                  <Lock size={20} className="text-gray-400 group-hover:text-pink-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Privacy & Security</span>
                </button>
              </div>
            </div>

            {/* Preferences Panel */}
            {showPreferences && (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-blue-400" />
                      <span className="text-sm text-gray-300">Email Notifications</span>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-600'
                      } relative`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.emailNotifications ? 'translate-x-6' : ''
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Moon size={18} className="text-purple-400" />
                      <span className="text-sm text-gray-300">Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.darkMode ? 'bg-purple-600' : 'bg-gray-600'
                      } relative`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.darkMode ? 'translate-x-6' : ''
                      }`}></div>
                    </button>
                  </div>

                  <div className="p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe size={18} className="text-emerald-400" />
                      <span className="text-sm text-gray-300">Language</span>
                    </div>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
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
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getRoleStats(user?.role).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:bg-gray-800/70 hover:border-gray-600 transition-all backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gray-700/50`}>
                        <Icon size={24} className={stat.color} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Achievements & Badges */}
            {user?.role === 'student' && (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Achievements</h3>
                  <span className="text-xs text-gray-400">12 Total</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-3 bg-yellow-600/20 border border-yellow-600/40 rounded-lg hover:bg-yellow-600/30 transition-all cursor-pointer group">
                    <Award size={28} className="text-yellow-400 mb-2" />
                    <span className="text-xs text-gray-300 text-center">First Course</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-600/20 border border-blue-600/40 rounded-lg hover:bg-blue-600/30 transition-all cursor-pointer group">
                    <BookOpen size={28} className="text-blue-400 mb-2" />
                    <span className="text-xs text-gray-300 text-center">5 Courses</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-purple-600/20 border border-purple-600/40 rounded-lg hover:bg-purple-600/30 transition-all cursor-pointer group">
                    <TrendingUp size={28} className="text-purple-400 mb-2" />
                    <span className="text-xs text-gray-300 text-center">Top 10%</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-emerald-600/20 border border-emerald-600/40 rounded-lg hover:bg-emerald-600/30 transition-all cursor-pointer group">
                    <Clock size={28} className="text-emerald-400 mb-2" />
                    <span className="text-xs text-gray-300 text-center">100 Hours</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <p className="text-base text-white font-medium">{user?.name}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">User ID</label>
                  <p className="text-sm text-white font-mono">{user?.id?.substring(0, 8)}...</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <p className="text-base text-white">{user?.email}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Account Type</label>
                  <p className="text-base text-white capitalize">{user?.role}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Account Status</label>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-base text-white">Active</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Last Login</label>
                  <p className="text-base text-white">Just now</p>
                </div>
              </div>
            </div>

            {/* Skills & Progress (Student Only) */}
            {user?.role === 'student' && (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-6">Skills & Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Python Programming</span>
                      <span className="text-sm text-blue-400 font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Web Development</span>
                      <span className="text-sm text-purple-400 font-medium">72%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Data Science</span>
                      <span className="text-sm text-emerald-400 font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-300">Machine Learning</span>
                      <span className="text-sm text-amber-400 font-medium">54%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bio Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">About</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                  <Edit2 size={14} /> Edit
                </button>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {user?.role === 'student' 
                  ? "Passionate computer science student with a keen interest in artificial intelligence and machine learning. Always eager to learn new technologies and apply them to solve real-world problems."
                  : user?.role === 'faculty'
                  ? "Experienced educator dedicated to fostering an engaging learning environment. Specialized in modern teaching methodologies and student mentorship."
                  : "Experienced system administrator ensuring smooth operations and optimal performance of the campus management system."}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">
                  {user?.role === 'student' ? 'Python' : user?.role === 'faculty' ? 'Teaching' : 'Administration'}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                  {user?.role === 'student' ? 'React' : user?.role === 'faculty' ? 'Research' : 'Security'}
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs border border-emerald-500/30">
                  {user?.role === 'student' ? 'Machine Learning' : user?.role === 'faculty' ? 'Mentorship' : 'Analytics'}
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs border border-amber-500/30">
                  {user?.role === 'student' ? 'Team Player' : user?.role === 'faculty' ? 'Innovation' : 'Management'}
                </span>
              </div>
            </div>

            {/* Activity Overview */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Login detected from new location</p>
                    <p className="text-xs text-gray-400 mt-1">Today at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Profile viewed</p>
                    <p className="text-xs text-gray-400 mt-1">Just now</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Account created</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(user?.created_at)}</p>
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

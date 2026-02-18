import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Users, GraduationCap, UserCheck, Shield } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <Layout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Admin Dashboard</h1>
            <p className="text-gray-400 text-lg">Monitor and manage your CampusGPT system</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Total Users</h3>
              <p data-testid="total-users" className="text-3xl font-bold text-white">
                {stats?.total_users || 0}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Students</h3>
              <p data-testid="students-count" className="text-3xl font-bold text-white">
                {stats?.students || 0}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <UserCheck className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Faculty</h3>
              <p data-testid="faculty-count" className="text-3xl font-bold text-white">
                {stats?.faculty || 0}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Admins</h3>
              <p data-testid="admin-count" className="text-3xl font-bold text-white">
                {stats?.admin || 0}
              </p>
            </div>
          </div>

          {/* System Stats */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-6">System Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                <span className="text-gray-300">Total Queries Processed</span>
                <span className="font-semibold text-white">1,234</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                <span className="text-gray-300">Active Sessions</span>
                <span className="font-semibold text-white">87</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                <span className="text-gray-300">System Uptime</span>
                <span className="font-semibold text-emerald-400">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
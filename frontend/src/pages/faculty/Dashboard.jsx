import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { FileText, Users, TrendingUp } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function FacultyDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/faculty/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  return (
    <Layout role="faculty">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Faculty Dashboard</h1>
            <p className="text-gray-400 text-lg">Manage your courses and student engagement</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FileText className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Uploaded Content</h3>
              <p data-testid="uploaded-content-count" className="text-3xl font-bold text-white">
                {dashboardData?.uploaded_content || 0}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Student Queries</h3>
              <p data-testid="student-queries-count" className="text-3xl font-bold text-white">
                {dashboardData?.student_queries || 0}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-400 text-sm mb-1">Engagement</h3>
              <p data-testid="engagement-rate" className="text-3xl font-bold text-white">
                {dashboardData?.analytics?.engagement || '0%'}
              </p>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Analytics Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                <span className="text-gray-300">Total Views</span>
                <span className="font-semibold text-white">{dashboardData?.analytics?.views || 0}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                <span className="text-gray-300">Engagement Rate</span>
                <span className="font-semibold text-white">{dashboardData?.analytics?.engagement || '0%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
import React from 'react';
import Layout from '../../components/Layout';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function FacultyInsights() {
  return (
    <Layout role="faculty">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Insights & Analytics</h1>
            <p className="text-gray-400 text-lg">Monitor student engagement and content performance</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-400">Total Views</h3>
                <Eye size={20} className="text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">1,234</p>
              <p className="text-sm text-emerald-400">+12% from last week</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-400">Active Students</h3>
                <Users size={20} className="text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">342</p>
              <p className="text-sm text-emerald-400">+8% from last week</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-400">Engagement</h3>
                <TrendingUp size={20} className="text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">85%</p>
              <p className="text-sm text-emerald-400">+5% from last week</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-400">Queries</h3>
                <BarChart3 size={20} className="text-amber-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">567</p>
              <p className="text-sm text-emerald-400">+15% from last week</p>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Usage Trends</h2>
            <div className="h-64 flex items-center justify-center bg-gray-700/30 border border-gray-600 rounded-lg">
              <p className="text-gray-400">Chart visualization will be implemented here</p>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Most Asked Topics</h2>
            <div className="space-y-3">
              {[
                { topic: 'Library Hours', count: 45 },
                { topic: 'Assignment Submission', count: 38 },
                { topic: 'Course Materials', count: 32 },
                { topic: 'Exam Schedule', count: 28 }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all">
                  <span className="text-white">{item.topic}</span>
                  <span className="text-sm font-medium text-blue-400">{item.count} queries</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
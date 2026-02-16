import React from 'react';
import Layout from '../../components/Layout';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function FacultyInsights() {
  return (
    <Layout role="faculty">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Insights & Analytics</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
              <Eye size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-green-600 mt-1">+12% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Active Students</h3>
              <Users size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">342</p>
            <p className="text-sm text-green-600 mt-1">+8% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Engagement</h3>
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-green-600 mt-1">+5% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Queries</h3>
              <BarChart3 size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">567</p>
            <p className="text-sm text-green-600 mt-1">+15% from last week</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Trends</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization will be implemented here</p>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Most Asked Topics</h2>
          <div className="space-y-3">
            {[
              { topic: 'Library Hours', count: 45 },
              { topic: 'Assignment Submission', count: 38 },
              { topic: 'Course Materials', count: 32 },
              { topic: 'Exam Schedule', count: 28 }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{item.topic}</span>
                <span className="text-sm font-medium text-blue-600">{item.count} queries</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
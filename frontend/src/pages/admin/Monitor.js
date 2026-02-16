import React from 'react';
import Layout from '../../components/Layout';
import { Activity, Server, Database, Cpu } from 'lucide-react';

export default function AdminMonitor() {
  return (
    <Layout role="admin">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">System Monitor</h1>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Server className="text-green-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Server Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium text-gray-900">15 days 7 hours</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="text-blue-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Database</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Collections</span>
                <span className="font-medium text-gray-900">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-600">CPU Usage</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">32%</span>
                <span className="text-sm text-gray-500 mb-1">Average</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Memory Usage</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">58%</span>
                <span className="text-sm text-gray-500 mb-1">Of 8GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Storage Used</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">2.4GB</span>
                <span className="text-sm text-gray-500 mb-1">Of 50GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '4.8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { time: '2 min ago', event: 'New user registered', type: 'success' },
              { time: '15 min ago', event: 'Database backup completed', type: 'success' },
              { time: '1 hour ago', event: 'System maintenance scheduled', type: 'info' },
              { time: '3 hours ago', event: 'API rate limit reached', type: 'warning' }
            ].map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.type === 'success' ? 'bg-green-600' :
                    log.type === 'warning' ? 'bg-yellow-600' :
                    'bg-blue-600'
                  }`}></div>
                  <span className="text-gray-900">{log.event}</span>
                </div>
                <span className="text-sm text-gray-500">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
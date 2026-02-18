import React from 'react';
import Layout from '../../components/Layout';
import { Activity, Server, Database, Cpu } from 'lucide-react';

export default function AdminMonitor() {
  return (
    <Layout role="admin">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">System Monitor</h1>
            <p className="text-gray-400 text-lg">Real-time system health and performance metrics</p>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Server className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-white">Server Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <span className="text-gray-300">Status</span>
                  <span className="font-medium text-emerald-400">Online</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <span className="text-gray-300">Uptime</span>
                  <span className="font-medium text-white">15 days 7 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Database className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-white">Database</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <span className="text-gray-300">Status</span>
                  <span className="font-medium text-emerald-400">Connected</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <span className="text-gray-300">Collections</span>
                  <span className="font-medium text-white">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={18} className="text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">CPU Usage</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">32%</span>
                  <span className="text-sm text-gray-400 mb-1">Average</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={18} className="text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">Memory Usage</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">58%</span>
                  <span className="text-sm text-gray-400 mb-1">Of 8GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Database size={18} className="text-emerald-400" />
                  <span className="text-sm font-medium text-gray-300">Storage Used</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">2.4GB</span>
                  <span className="text-sm text-gray-400 mb-1">Of 50GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{ width: '4.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { time: '2 min ago', event: 'New user registered', type: 'success' },
                { time: '15 min ago', event: 'Database backup completed', type: 'success' },
                { time: '1 hour ago', event: 'System maintenance scheduled', type: 'info' },
                { time: '3 hours ago', event: 'API rate limit reached', type: 'warning' }
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      log.type === 'success' ? 'bg-emerald-400' :
                      log.type === 'warning' ? 'bg-amber-400' :
                      'bg-blue-400'
                    }`}></div>
                    <span className="text-white">{log.event}</span>
                  </div>
                  <span className="text-sm text-gray-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
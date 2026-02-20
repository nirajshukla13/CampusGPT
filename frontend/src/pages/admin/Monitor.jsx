import React from 'react';
import Layout from '../../components/Layout';
import { Activity, Server, Database, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { appColors } from '../../config/colors.js';

export default function AdminMonitor() {
  return (
    <Layout role="admin">
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl" style={{ color: appColors.primaryText }}>System monitor</h1>
          <p className="text-sm md:text-base" style={{ color: appColors.mutedText }}>
            Real-time system health and performance metrics.
          </p>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F2937] text-[#F9FAFB]">
                  <Server size={18} />
                </div>
                <CardTitle className="text-sm font-semibold text-[#F9FAFB]">
                  Server status
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#1F2937] bg-[#020617] px-3 py-2 text-sm">
                <span className="text-[#E5E7EB]">Status</span>
                <span className="font-medium text-[#10B981]">Online</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#1F2937] bg-[#020617] px-3 py-2 text-sm">
                <span className="text-[#E5E7EB]">Uptime</span>
                <span className="font-medium text-[#F9FAFB]">15 days 7 hours</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F2937] text-[#F9FAFB]">
                  <Database size={18} />
                </div>
                <CardTitle className="text-sm font-semibold text-[#F9FAFB]">Database</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#1F2937] bg-[#020617] px-3 py-2 text-sm">
                <span className="text-[#E5E7EB]">Status</span>
                <span className="font-medium text-[#10B981]">Connected</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#1F2937] bg-[#020617] px-3 py-2 text-sm">
                <span className="text-[#E5E7EB]">Collections</span>
                <span className="font-medium text-[#F9FAFB]">5</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#F9FAFB]">
              Performance metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Cpu size={16} className="text-[#6366F1]" />
                  <span className="text-xs font-medium text-[#E5E7EB]">CPU usage</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-semibold text-[#F9FAFB]">32%</span>
                  <span className="mb-1 text-xs text-[#9CA3AF]">Average</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#1F2937]">
                  <div
                    className="h-2 rounded-full bg-[#6366F1]"
                    style={{ width: '32%' }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Activity size={16} className="text-[#A855F7]" />
                  <span className="text-xs font-medium text-[#E5E7EB]">Memory usage</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-semibold text-[#F9FAFB]">58%</span>
                  <span className="mb-1 text-xs text-[#9CA3AF]">Of 8GB</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#1F2937]">
                  <div
                    className="h-2 rounded-full bg-[#A855F7]"
                    style={{ width: '58%' }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Database size={16} className="text-[#10B981]" />
                  <span className="text-xs font-medium text-[#E5E7EB]">Storage used</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-semibold text-[#F9FAFB]">2.4GB</span>
                  <span className="mb-1 text-xs text-[#9CA3AF]">Of 50GB</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#1F2937]">
                  <div
                    className="h-2 rounded-full bg-[#10B981]"
                    style={{ width: '4.8%' }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#F9FAFB]">
              Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                { time: '2 min ago', event: 'New user registered', type: 'success' },
                { time: '15 min ago', event: 'Database backup completed', type: 'success' },
                { time: '1 hour ago', event: 'System maintenance scheduled', type: 'info' },
                { time: '3 hours ago', event: 'API rate limit reached', type: 'warning' },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-[#1F2937] bg-[#020617] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        log.type === 'success'
                          ? 'bg-[#10B981]'
                          : log.type === 'warning'
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#6366F1]'
                      }`}
                    />
                    <span className="text-[#E5E7EB]">{log.event}</span>
                  </div>
                  <span className="text-xs text-[#9CA3AF]">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
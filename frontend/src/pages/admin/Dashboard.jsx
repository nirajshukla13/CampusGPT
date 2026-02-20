import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import { Users, GraduationCap, UserCheck, Shield } from 'lucide-react';
import { appColors } from '../../config/colors.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <Layout role="admin">
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl" style={{ color: appColors.primaryText }}>Admin dashboard</h1>
          <p className="text-sm md:text-base" style={{ color: appColors.mutedText }}>
            Monitor and manage your CampusGPT system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <Users size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Total users</h3>
            <p data-testid="total-users" className="text-2xl font-semibold" style={{ color: appColors.primaryText }}>
              {stats?.total_users || 0}
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <GraduationCap size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Students</h3>
            <p data-testid="students-count" className="text-2xl font-semibold" style={{ color: appColors.primaryText }}>
              {stats?.students || 0}
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <UserCheck size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Faculty</h3>
            <p data-testid="faculty-count" className="text-2xl font-semibold" style={{ color: appColors.primaryText }}>
              {stats?.faculty || 0}
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <Shield size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Admins</h3>
            <p data-testid="admin-count" className="text-2xl font-semibold" style={{ color: appColors.primaryText }}>
              {stats?.admin || 0}
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
          <h2 className="mb-4 text-base font-semibold" style={{ color: appColors.primaryText }}>System statistics</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
              <span style={{ color: appColors.secondaryText }}>Total queries processed</span>
              <span className="font-semibold" style={{ color: appColors.primaryText }}>1,234</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
              <span style={{ color: appColors.secondaryText }}>Active sessions</span>
              <span className="font-semibold" style={{ color: appColors.primaryText }}>87</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
              <span style={{ color: appColors.secondaryText }}>System uptime</span>
              <span className="font-semibold" style={{ color: appColors.success }}>99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
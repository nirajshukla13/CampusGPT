import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import { Users, GraduationCap, UserCheck, Shield } from 'lucide-react';

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
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Admin dashboard</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            Monitor and manage your CampusGPT system.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <Users size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Total users</h3>
            <p data-testid="total-users" className="text-2xl font-semibold text-[#F9FAFB]">
              {stats?.total_users || 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <GraduationCap size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Students</h3>
            <p data-testid="students-count" className="text-2xl font-semibold text-[#F9FAFB]">
              {stats?.students || 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <UserCheck size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Faculty</h3>
            <p data-testid="faculty-count" className="text-2xl font-semibold text-[#F9FAFB]">
              {stats?.faculty || 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <Shield size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Admins</h3>
            <p data-testid="admin-count" className="text-2xl font-semibold text-[#F9FAFB]">
              {stats?.admin || 0}
            </p>
          </div>
        </div>

        {/* System Stats */}
        <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
          <h2 className="mb-4 text-base font-semibold text-[#F9FAFB]">System statistics</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3">
              <span className="text-[#E5E7EB]">Total queries processed</span>
              <span className="font-semibold text-[#F9FAFB]">1,234</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3">
              <span className="text-[#E5E7EB]">Active sessions</span>
              <span className="font-semibold text-[#F9FAFB]">87</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3">
              <span className="text-[#E5E7EB]">System uptime</span>
              <span className="font-semibold text-[#10B981]">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
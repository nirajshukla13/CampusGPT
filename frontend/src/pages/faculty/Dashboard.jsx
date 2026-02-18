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
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Faculty dashboard</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            Monitor content performance and student engagement.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <FileText size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Uploaded content</h3>
            <p
              data-testid="uploaded-content-count"
              className="text-2xl font-semibold text-[#F9FAFB]"
            >
              {dashboardData?.uploaded_content || 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <Users size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Student queries</h3>
            <p
              data-testid="student-queries-count"
              className="text-2xl font-semibold text-[#F9FAFB]"
            >
              {dashboardData?.student_queries || 0}
            </p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F2937] text-[#F9FAFB]">
                <TrendingUp size={20} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium text-[#9CA3AF]">Engagement</h3>
            <p data-testid="engagement-rate" className="text-2xl font-semibold text-[#F9FAFB]">
              {dashboardData?.analytics?.engagement || '0%'}
            </p>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
          <h2 className="mb-4 text-base font-semibold text-[#F9FAFB]">Analytics overview</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3">
              <span className="text-[#E5E7EB]">Total views</span>
              <span className="font-semibold text-[#F9FAFB]">
                {dashboardData?.analytics?.views || 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3">
              <span className="text-[#E5E7EB]">Engagement rate</span>
              <span className="font-semibold text-[#F9FAFB]">
                {dashboardData?.analytics?.engagement || '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { facultyAPI } from '../../services/api';
import { FileText, Users, TrendingUp } from 'lucide-react';
import { appColors } from '../../config/colors.js';

export default function FacultyDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await facultyAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  return (
    <Layout role="faculty">
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl" style={{ color: appColors.primaryText }}>Faculty dashboard</h1>
          <p className="text-sm md:text-base" style={{ color: appColors.mutedText }}>
            Monitor content performance and student engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <FileText size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Uploaded content</h3>
            <p
              data-testid="uploaded-content-count"
              className="text-2xl font-semibold"
              style={{ color: appColors.primaryText }}
            >
              {dashboardData?.uploaded_content || 0}
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <Users size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Student queries</h3>
            <p
              data-testid="student-queries-count"
              className="text-2xl font-semibold"
              style={{ color: appColors.primaryText }}
            >
              {dashboardData?.student_queries || 0}
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: appColors.cardBorder }}>
                <TrendingUp size={20} style={{ color: appColors.primaryText }} />
              </div>
            </div>
            <h3 className="mb-1 text-sm font-medium" style={{ color: appColors.mutedText }}>Engagement</h3>
            <p data-testid="engagement-rate" className="text-2xl font-semibold" style={{ color: appColors.primaryText }}>
              {dashboardData?.analytics?.engagement || '0%'}
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-6 shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
          <h2 className="mb-4 text-base font-semibold" style={{ color: appColors.primaryText }}>Analytics overview</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
              <span style={{ color: appColors.secondaryText }}>Total views</span>
              <span className="font-semibold" style={{ color: appColors.primaryText }}>
                {dashboardData?.analytics?.views || 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ backgroundColor: appColors.inputBackground, borderColor: appColors.cardBorder }}>
              <span style={{ color: appColors.secondaryText }}>Engagement rate</span>
              <span className="font-semibold" style={{ color: appColors.primaryText }}>
                {dashboardData?.analytics?.engagement || '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
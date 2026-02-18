import React from 'react';
import Layout from '../../components/Layout';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function FacultyInsights() {
  return (
    <Layout role="faculty">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Insights &amp; analytics</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            Monitor student engagement and how your content performs.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#9CA3AF]">Total views</h3>
              <Eye size={18} className="text-[#6366F1]" />
            </div>
            <p className="mb-1 text-2xl font-semibold text-[#F9FAFB]">1,234</p>
            <p className="text-xs text-[#10B981]">+12% from last week</p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#9CA3AF]">Active students</h3>
              <Users size={18} className="text-[#22D3EE]" />
            </div>
            <p className="mb-1 text-2xl font-semibold text-[#F9FAFB]">342</p>
            <p className="text-xs text-[#10B981]">+8% from last week</p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#9CA3AF]">Engagement</h3>
              <TrendingUp size={18} className="text-[#10B981]" />
            </div>
            <p className="mb-1 text-2xl font-semibold text-[#F9FAFB]">85%</p>
            <p className="text-xs text-[#10B981]">+5% from last week</p>
          </div>

          <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#9CA3AF]">Queries</h3>
              <BarChart3 size={18} className="text-[#F59E0B]" />
            </div>
            <p className="mb-1 text-2xl font-semibold text-[#F9FAFB]">567</p>
            <p className="text-xs text-[#10B981]">+15% from last week</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
          <h2 className="mb-4 text-base font-semibold text-[#F9FAFB]">Usage trends</h2>
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-[#1F2937] bg-[#020617]">
            <p className="text-sm text-[#6B7280]">
              Chart visualization will be implemented here.
            </p>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-6 shadow-md shadow-black/20">
          <h2 className="mb-4 text-base font-semibold text-[#F9FAFB]">Most asked topics</h2>
          <div className="space-y-3 text-sm">
            {[
              { topic: 'Library hours', count: 45 },
              { topic: 'Assignment submission', count: 38 },
              { topic: 'Course materials', count: 32 },
              { topic: 'Exam schedule', count: 28 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#020617] px-4 py-3"
              >
                <span className="text-[#E5E7EB]">{item.topic}</span>
                <span className="text-xs font-medium text-[#6366F1]">
                  {item.count} queries
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
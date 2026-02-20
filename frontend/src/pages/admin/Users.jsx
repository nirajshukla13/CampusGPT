import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import { User, Mail } from 'lucide-react';
import { appColors } from '../../config/colors.js';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Layout role="admin">
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl" style={{ color: appColors.primaryText }}>User management</h1>
          <p className="text-sm md:text-base" style={{ color: appColors.mutedText }}>
            View and manage all system users.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="border-b border-[#1F2937] bg-[#020617]">
                <tr>
                  <th className="px-3 py-2.5 text-left text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:px-6 sm:py-3 sm:text-xs">
                    User
                  </th>
                  <th className="hidden px-3 py-2.5 text-left text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:table-cell sm:px-6 sm:py-3 sm:text-xs">
                    Email
                  </th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF] sm:px-6 sm:py-3 sm:text-xs">
                    Role
                  </th>
                  <th className="hidden px-3 py-2.5 text-left text-[10px] font-medium uppercase tracking-wide text-[#9CA3AF] md:table-cell sm:px-6 sm:py-3 sm:text-xs">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    data-testid={`user-row-${user.id}`}
                    className="hover:bg-[#020617]"
                  >
                    <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-[#F9FAFB] sm:h-9 sm:w-9">
                          <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <span className="block truncate text-xs font-medium text-[#F9FAFB] sm:text-sm">{user.name}</span>
                          <span className="block truncate text-[10px] text-[#9CA3AF] sm:hidden">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-3 sm:table-cell sm:px-6 sm:py-4">
                      <div className="flex items-center gap-2 text-xs text-[#E5E7EB] sm:text-sm">
                        <Mail size={12} className="text-[#9CA3AF] sm:w-[14px] sm:h-[14px]" />
                        {user.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize sm:px-3 sm:py-1 sm:text-xs ${
                          user.role === 'admin'
                            ? 'border border-[#EF4444]/40 bg-[#7f1d1d] text-[#fecaca]'
                            : user.role === 'faculty'
                            ? 'border border-[#6366F1]/40 bg-[#1e1b4b] text-[#E0E7FF]'
                            : 'border border-[#10B981]/40 bg-[#064E3B] text-[#A7F3D0]'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-3 text-[10px] text-[#9CA3AF] md:table-cell sm:px-6 sm:py-4 sm:text-xs">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
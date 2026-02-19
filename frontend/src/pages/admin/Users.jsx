import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import { User, Mail } from 'lucide-react';

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
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">User management</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            View and manage all system users.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827] shadow-md shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#1F2937] bg-[#020617]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
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
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2937] text-[#F9FAFB]">
                          <User size={18} />
                        </div>
                        <span className="font-medium text-[#F9FAFB]">{user.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2 text-[#E5E7EB]">
                        <Mail size={14} className="text-[#9CA3AF]" />
                        {user.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
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
                    <td className="whitespace-nowrap px-6 py-4 text-xs text-[#9CA3AF]">
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
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, MessageSquare, History, Upload, BarChart3, Users, Activity, User } from 'lucide-react';

const Layout = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const getNavItems = () => {
    switch(role) {
      case 'student':
        return [
          { path: '/student/dashboard', icon: Home, label: 'Dashboard' },
          { path: '/student/chat', icon: MessageSquare, label: 'Chat' },
          { path: '/student/history', icon: History, label: 'History' },
          { path: '/student/profile', icon: User, label: 'Profile' }
        ];
      case 'faculty':
        return [
          { path: '/faculty/dashboard', icon: Home, label: 'Dashboard' },
          { path: '/faculty/upload', icon: Upload, label: 'Upload' },
          { path: '/faculty/insights', icon: BarChart3, label: 'Insights' },
          { path: '/faculty/profile', icon: User, label: 'Profile' }
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
          { path: '/admin/users', icon: Users, label: 'Users' },
          { path: '/admin/monitor', icon: Activity, label: 'Monitor' },
          { path: '/admin/profile', icon: User, label: 'Profile' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">CampusGPT</h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">{role} Portal</p>
        </div>
        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                data-testid={`nav-${item.label.toLowerCase()}`}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800">Welcome, {userName}</h2>
          <button
            data-testid="logout-button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut,
  Home,
  MessageSquare,
  History,
  Upload,
  BarChart3,
  Users,
  Activity,
  User,
  Calendar,
  BookOpen,
  Menu,
} from 'lucide-react';
import { Button } from './ui/button.jsx';

const Layout = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('userName') || 'User';
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const getNavItems = () => {
    switch (role) {
      case 'student':
        return [
          { path: '/student/dashboard', icon: Home, label: 'Dashboard' },
          { path: '/student/chat', icon: MessageSquare, label: 'Chat' },
          { path: '/student/history', icon: History, label: 'History' },
          { path: '/student/resources', icon: BookOpen, label: 'Resources' },
          { path: '/student/events', icon: Calendar, label: 'Events' },
          { path: '/student/profile', icon: User, label: 'Profile' },
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
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`flex h-full flex-col border-r border-border bg-background transition-[width] duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-sm font-semibold">
              CG
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-base font-semibold tracking-tight">CampusGPT</h1>
                <p className="mt-0.5 text-xs capitalize text-muted-foreground">{role} portal</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <Button
                key={item.path}
                type="button"
                variant="ghost"
                size="sm"
                data-testid={`nav-${item.label.toLowerCase()}`}
                onClick={() => navigate(item.path)}
                className={`mb-1 flex w-full items-center justify-start gap-3 rounded-xl px-3 text-sm font-medium ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-elevated px-6">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-foreground">
              Welcome,&nbsp;
              <span className="text-primary">{userName}</span>
            </h2>
            <p className="mt-0.5 text-xs capitalize text-muted-foreground">{role} portal</p>
          </div>
          <Button
            type="button"
            data-testid="logout-button"
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-2 rounded-xl px-3 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background px-6 py-6">
          <div className="mx-auto h-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-border bg-background transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-card text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm">
              CG
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-sm font-semibold tracking-tight sm:text-base">CampusGPT</h1>
                <p className="mt-0.5 text-[10px] capitalize text-muted-foreground sm:text-xs">{role} portal</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-8 w-8 text-muted-foreground hover:bg-surface-2 hover:text-foreground sm:h-9 sm:w-9 lg:flex"
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-surface-2 hover:text-foreground lg:hidden"
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3 sm:py-4">
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
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`mb-1 flex w-full items-center justify-start gap-3 rounded-xl px-3 py-2 text-xs font-medium sm:text-sm ${
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
        <header className="flex h-14 items-center justify-between border-b border-border bg-elevated px-3 sm:h-16 sm:px-4 md:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-9 w-9 text-muted-foreground hover:bg-surface-2 hover:text-foreground lg:hidden"
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
              Welcome,&nbsp;
              <span className="text-primary">{userName}</span>
            </h2>
            <p className="mt-0.5 hidden text-xs capitalize text-muted-foreground sm:block">{role} portal</p>
          </div>
          <Button
            type="button"
            data-testid="logout-button"
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center gap-1.5 rounded-xl px-2 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground sm:gap-2 sm:px-3 sm:text-sm"
          >
            <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
          <div className="mx-auto h-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
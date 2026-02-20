import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "./ui/button.jsx";
import { appColors } from "../config/colors.js";

const Layout = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "User";
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarColors = appColors;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const getNavItems = () => {
    switch (role) {
      case "student":
        return [
          { path: "/student/dashboard", icon: Home, label: "Dashboard" },
          { path: "/student/chat", icon: MessageSquare, label: "Chat" },
          { path: "/student/history", icon: History, label: "History" },
          { path: "/student/resources", icon: BookOpen, label: "Resources" },
          { path: "/student/events", icon: Calendar, label: "Events" },
          { path: "/student/profile", icon: User, label: "Profile" },
        ];
      case "faculty":
        return [
          { path: "/faculty/dashboard", icon: Home, label: "Dashboard" },
          { path: "/faculty/upload", icon: Upload, label: "Upload" },
          { path: "/faculty/insights", icon: BarChart3, label: "Insights" },
          { path: "/faculty/profile", icon: User, label: "Profile" },
        ];
      case "admin":
        return [
          { path: "/admin/dashboard", icon: Home, label: "Dashboard" },
          { path: "/admin/users", icon: Users, label: "Users" },
          { path: "/admin/monitor", icon: Activity, label: "Monitor" },
          { path: "/admin/profile", icon: User, label: "Profile" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const getBreadcrumbs = () => {
    const pathname = location.pathname;
    
    if (pathname === '/login') {
      return [];
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments.length > 0) {
      breadcrumbs.push({ label: 'Home', path: `/${pathSegments[0]}/dashboard` });
    }

    const pageLabels = {
      dashboard: 'Dashboard',
      chat: 'Chat',
      history: 'History',
      resources: 'Resources',
      events: 'Events',
      profile: 'Profile',
      upload: 'Upload',
      insights: 'Insights',
      users: 'Users',
      monitor: 'Monitor',
      architecture: 'Architecture',
      workflow: 'Workflow',
    };

    if (pathSegments.length > 1) {
      const currentPage = pathSegments[1];
      const label = pageLabels[currentPage] || currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
      breadcrumbs.push({ label, path: pathname });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      <style>{`
        :root {
          --sidebar-main-bg: ${sidebarColors.mainBackground};
          --sidebar-bg: ${sidebarColors.sidebarBackground};
          --sidebar-border: ${sidebarColors.border};
          --sidebar-text-primary: ${sidebarColors.primaryText};
          --sidebar-text-secondary: ${sidebarColors.secondaryText};
          --sidebar-accent: ${sidebarColors.accentOrange};
          --sidebar-hover-bg: ${sidebarColors.hoverBackground};
          --sidebar-hover-border: ${sidebarColors.hoverBorder};
          --sidebar-hover-text: ${sidebarColors.hoverText};
          --sidebar-active-bg: ${sidebarColors.activeBackground};
        }
      `}</style>
      <div
        className="flex h-screen text-foreground"
        style={{ backgroundColor: sidebarColors.mainBackground }}
      >
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col overflow-hidden border-r transition-[width,transform] duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${isCollapsed ? "w-20" : "w-[240px]"}`}
          style={{
            backgroundColor: sidebarColors.sidebarBackground,
            borderColor: sidebarColors.border,
          }}
        >
          <div
            className={`flex h-full flex-col transition-[padding] duration-300 ease-in-out ${isCollapsed ? "p-2" : ""}`}
          >
            {/* Logo Area - aligns with navbar */}
            <div
              className={`flex items-center transition-[padding,margin] duration-300 ease-in-out ${isCollapsed ? "mb-4 justify-center p-2" : "px-5 pt-3 pb-3 sm:pt-3 sm:pb-3 md:pt-4 md:pb-4 min-h-10"}`}
            >
              {!isCollapsed ? (
                <>
                  <div className="flex w-full items-center justify-between min-h-10">
                    <h1
                      className="text-base font-semibold tracking-tight sm:text-lg"
                      style={{ color: sidebarColors.primaryText }}
                    >
                      CampusGPT
                    </h1>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden h-8 w-8 sm:h-9 sm:w-9 lg:flex"
                      style={{
                        color: sidebarColors.secondaryText,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2e2e2e";
                        e.currentTarget.style.color = sidebarColors.primaryText;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color =
                          sidebarColors.secondaryText;
                      }}
                      type="button"
                      onClick={() => setIsCollapsed((prev) => !prev)}
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-8 w-8 sm:h-9 sm:w-9 lg:flex"
                  style={{
                    color: sidebarColors.secondaryText,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2e2e2e";
                    e.currentTarget.style.color = sidebarColors.primaryText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = sidebarColors.secondaryText;
                  }}
                  type="button"
                  onClick={() => setIsCollapsed((prev) => !prev)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              {/* Close button for mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:hidden"
                style={{ color: sidebarColors.secondaryText }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    sidebarColors.hoverBackground;
                  e.currentTarget.style.color = sidebarColors.primaryText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = sidebarColors.secondaryText;
                }}
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            {/* Separator - aligns with navbar bottom */}
            {!isCollapsed && (
              <div
                className="mb-8 border-t"
                style={{ borderColor: sidebarColors.border }}
              />
            )}

            {/* Navigation */}
            <nav className={`flex-1 space-y-2 overflow-y-auto transition-[padding] duration-300 ease-in-out ${isCollapsed ? "px-2" : "px-5"}`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  location.pathname.startsWith(`${item.path}/`);

                return (
                  <button
                    key={item.path}
                    type="button"
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex h-10 w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors border ${
                      isCollapsed ? "justify-center px-0" : ""
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? sidebarColors.activeBackground
                        : "transparent",
                      color: isActive
                        ? sidebarColors.accentOrange
                        : sidebarColors.secondaryText,
                      borderColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          sidebarColors.hoverBackground;
                        e.currentTarget.style.color = sidebarColors.hoverText;
                        e.currentTarget.style.borderColor =
                          sidebarColors.hoverBorder;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color =
                          sidebarColors.secondaryText;
                        e.currentTarget.style.borderColor = "transparent";
                      }
                    }}
                  >
                    <Icon
                      className="h-[18px] w-[18px] flex-shrink-0"
                      style={{ color: "currentColor" }}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout Button - always at bottom */}
            <div className={`mt-auto ${isCollapsed ? "p-2 pt-4" : "px-5 pt-4"}`}>
              <div
                className="border-t"
                style={{ borderColor: sidebarColors.border }}
              />
              <button
                type="button"
                data-testid="logout-button"
                onClick={handleLogout}
                className={`mt-4 flex h-10 w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors border ${
                  isCollapsed ? "justify-center px-0" : ""
                }`}
                style={{
                  backgroundColor: "transparent",
                  color: sidebarColors.secondaryText,
                  borderColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2e2e2e";
                  e.currentTarget.style.color = sidebarColors.hoverText;
                  e.currentTarget.style.borderColor = sidebarColors.hoverBorder;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = sidebarColors.secondaryText;
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <LogOut
                  className="h-[18px] w-[18px] flex-shrink-0"
                  style={{ color: "currentColor" }}
                />
                {!isCollapsed && <span className="truncate">Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Navbar with Breadcrumbs and Role Badge */}
          {breadcrumbs.length > 0 && (
            <div className="flex min-h-10 items-center justify-between border-b px-3 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4" style={{ backgroundColor: appColors.mainBackground, borderColor: appColors.border }}>
              <nav className="mx-auto max-w-7xl flex-1">
                <div className="flex items-center gap-2 text-sm">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <span className="mx-1" style={{ color: appColors.mutedText, opacity: 0.5 }}>
                            /
                          </span>
                        )}
                        {isLast ? (
                          <span style={{ color: appColors.primaryText }}>
                            {crumb.label}
                          </span>
                        ) : (
                          <button
                            onClick={() => navigate(crumb.path)}
                            className="transition-opacity hover:opacity-80"
                            style={{ color: appColors.mutedText, opacity: 0.6 }}
                          >
                            {crumb.label}
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </nav>
              <div
                className="inline-flex items-center rounded-md border px-2 py-0.5 shrink-0"
                style={{
                  backgroundColor: "rgba(249, 115, 22, 0.12)",
                  borderColor: appColors.accentOrange,
                  color: appColors.accentOrange,
                }}
              >
                <span className="text-[9px] font-medium capitalize sm:text-[10px]">
                  {role} portal
                </span>
              </div>
            </div>
          )}
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-1" style={{ backgroundColor: appColors.mainBackground }}>
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;

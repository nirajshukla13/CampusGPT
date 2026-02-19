import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { studentAPI } from '../../services/api';
import {
  Search,
  Clock,
  MessageSquare,
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  Bookmark,
  History,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await studentAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const stats = [
    {
      icon: MessageSquare,
      label: 'Total Queries',
      value: dashboardData?.stats?.total_queries || '0',
      helper: 'All-time CampusGPT questions',
    },
    {
      icon: History,
      label: 'This Week',
      value: dashboardData?.stats?.weekly_queries || '0',
      helper: 'Queries in the last 7 days',
    },
    {
      icon: Bookmark,
      label: 'Saved',
      value: dashboardData?.stats?.saved_queries || '0',
      helper: 'Bookmarked answers',
    },
    {
      icon: Award,
      label: 'Streak',
      value: dashboardData?.stats?.streak || '0',
      helper: 'Consecutive active days',
    },
  ];

  const quickActions = [
    { icon: Search, label: 'New Query', link: '/student/chat' },
    { icon: History, label: 'History', link: '/student/history' },
    { icon: BookOpen, label: 'Resources', link: '/student/resources' },
    { icon: Calendar, label: 'Events', link: '/student/events' },
  ];

  const trendingTopics = [
    { topic: 'Library Hours', queries: 45, icon: BookOpen },
    { topic: 'Exam Schedule', queries: 38, icon: Calendar },
    { topic: 'Course Registration', queries: 32, icon: Target },
    { topic: 'Campus Events', queries: 28, icon: Sparkles }
  ];

  const suggestions = ['Library hours', 'Course schedule', 'Campus map', 'Dining options'];

  return (
    <Layout role="student">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold md:text-3xl">Student dashboard</h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Track your CampusGPT usage and jump back into your work.
            </p>
          </div>
          <div className="hidden h-6 w-24 md:block" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="bg-card border border-border rounded-xl shadow-md shadow-black/20"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.helper}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Ask CampusGPT */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-card border border-border rounded-xl shadow-md shadow-black/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Ask CampusGPT
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Get instant answers about campus life, courses, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      data-testid="campus-gpt-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask anything about your campus..."
                      className="h-11 w-full rounded-xl border-border bg-surface-2 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <Button
                    type="button"
                    data-testid="search-button"
                    className="h-10 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Get answer
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {/* Suggested Queries */}
                <div className="pt-2">
                  <p className="mb-2 flex items-center gap-2 text-xs font-medium text-[#9CA3AF]">
                    <Sparkles className="h-3 w-3 text-[#22D3EE]" />
                    Try asking:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <Badge
                        key={suggestion}
                        type="button"
                        asChild={false}
                        className="cursor-pointer rounded-full border-0 bg-[#1F2937] px-3 py-1 text-xs font-normal text-[#E5E7EB] hover:bg-[#111827]"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-card border border-border rounded-xl shadow-md shadow-black/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  Quick actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant="ghost"
                      onClick={() => navigate(action.link)}
                      className="flex w-full items-center justify-start gap-3 rounded-xl border border-border bg-surface-2 px-3 py-3 text-sm font-medium text-foreground hover:bg-surface"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{action.label}</span>
                      <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground" />
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Queries */}
          <Card className="bg-card border border-border rounded-xl shadow-md shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Recent queries
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Your latest CampusGPT conversations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData?.recent_queries && dashboardData.recent_queries.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.recent_queries.map((query) => (
                    <Button
                      key={query.id}
                      type="button"
                      variant="ghost"
                      data-testid={`recent-query-${query.id}`}
                      className="flex w-full items-start justify-start gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-left text-sm font-normal text-foreground hover:bg-surface"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-card">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate">{query.query}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{query.timestamp}</p>
                      </div>
                      <ArrowRight className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <MessageSquare className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No recent queries yet.</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Start a chat to see your history here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="bg-card border border-border rounded-xl shadow-md shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Trending topics
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Popular questions other students are asking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={topic.topic}
                      className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card">
                          <Icon className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{topic.topic}</p>
                          <p className="text-xs text-muted-foreground">
                            {topic.queries} queries
                          </p>
                        </div>
                      </div>
                      {/* Minimal tag without extra accent colors */}
                      <Badge className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        Trending
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
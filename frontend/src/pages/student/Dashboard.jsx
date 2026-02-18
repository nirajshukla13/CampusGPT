import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import axios from 'axios';
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
  BarChart3,
  Zap,
  Target,
  Star,
  ArrowRight,
  Menu
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/student/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      change: '+12%',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: History, 
      label: 'This Week', 
      value: dashboardData?.stats?.weekly_queries || '0', 
      change: '+8%',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Bookmark, 
      label: 'Saved', 
      value: dashboardData?.stats?.saved_queries || '0', 
      change: '+5',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      icon: Award, 
      label: 'Streak', 
      value: dashboardData?.stats?.streak || '0', 
      change: 'days',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const quickActions = [
    { icon: Search, label: 'New Query', color: 'bg-blue-500', link: '/student/chat' },
    { icon: History, label: 'History', color: 'bg-purple-500', link: '/student/history' },
    { icon: BookOpen, label: 'Resources', color: 'bg-emerald-500', link: '/student/resources' },
    { icon: Calendar, label: 'Events', color: 'bg-amber-500', link: '/student/events' }
  ];

  const trendingTopics = [
    { topic: 'Library Hours', queries: 45, icon: BookOpen },
    { topic: 'Exam Schedule', queries: 38, icon: Calendar },
    { topic: 'Course Registration', queries: 32, icon: Target },
    { topic: 'Campus Events', queries: 28, icon: Sparkles }
  ];

  return (
    <Layout role="student">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Welcome back!
                </h1>
                <p className="text-gray-400 text-lg">Ready to explore your campus knowledge?</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Student
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-emerald-400 text-sm font-semibold">{stat.change}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* CampusGPT Search - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-800/90 to-gray-800/50 border-gray-700 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    Ask CampusGPT
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Get instant answers about campus life, courses, and more
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                      <input
                        type="text"
                        data-testid="campus-gpt-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ask anything about your campus..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/90 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    data-testid="search-button"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Get Answer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  {/* Suggested Queries */}
                  <div className="pt-4">
                    <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Try asking:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Library hours', 'Course schedule', 'Campus map', 'Dining options'].map((suggestion, i) => (
                        <button 
                          key={i}
                          onClick={() => setSearchQuery(suggestion)}
                          className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-sm transition-all hover:scale-105"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => navigate(action.link)}
                        className="w-full flex items-center gap-4 p-4 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600 rounded-xl transition-all hover:scale-105 group"
                      >
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">{action.label}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-white transition-colors" />
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Queries */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Recent Queries
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your latest conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData?.recent_queries ? (
                  <div className="space-y-3">
                    {dashboardData.recent_queries.map((query) => (
                      <div
                        key={query.id}
                        data-testid={`recent-query-${query.id}`}
                        className="flex items-start gap-3 p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl border border-gray-600 transition-all hover:scale-102 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white group-hover:text-blue-300 transition-colors">{query.query}</p>
                          <p className="text-sm text-gray-400 mt-1">{query.timestamp}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No recent queries</p>
                    <p className="text-gray-500 text-sm mt-1">Start asking questions to see them here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Trending Topics
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Popular questions this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl border border-gray-600 transition-all hover:scale-102 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                            <Icon size={16} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-emerald-300 transition-colors">{topic.topic}</p>
                            <p className="text-xs text-gray-400">{topic.queries} queries</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
}
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Bell, Bookmark, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function StudentEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Academic', 'Sports', 'Cultural', 'Workshop', 'Social'];

  const events = [
    {
      id: 1,
      title: 'Annual Tech Symposium 2026',
      date: 'Feb 25, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      category: 'Academic',
      attendees: 250,
      featured: true,
      description: 'Join us for the biggest tech event of the year featuring speakers from top companies.'
    },
    {
      id: 2,
      title: 'Spring Basketball Championship',
      date: 'Feb 28, 2026',
      time: '5:00 PM - 8:00 PM',
      location: 'Sports Complex',
      category: 'Sports',
      attendees: 500,
      featured: true,
      description: 'Cheer for your team in the inter-college basketball finals!'
    },
    {
      id: 3,
      title: 'Cultural Night: Global Fusion',
      date: 'Mar 5, 2026',
      time: '6:00 PM - 10:00 PM',
      location: 'Open Air Theater',
      category: 'Cultural',
      attendees: 400,
      featured: false,
      description: 'Experience diverse cultures through music, dance, and food.'
    },
    {
      id: 4,
      title: 'AI & Machine Learning Workshop',
      date: 'Mar 10, 2026',
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Lab 3',
      category: 'Workshop',
      attendees: 75,
      featured: false,
      description: 'Hands-on workshop on building ML models with Python and TensorFlow.'
    },
    {
      id: 5,
      title: 'Freshers Welcome Party',
      date: 'Mar 12, 2026',
      time: '7:00 PM - 11:00 PM',
      location: 'Campus Grounds',
      category: 'Social',
      attendees: 600,
      featured: true,
      description: 'Welcome all new students with music, games, and entertainment!'
    },
    {
      id: 6,
      title: 'Career Fair 2026',
      date: 'Mar 15, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'Exhibition Hall',
      category: 'Academic',
      attendees: 800,
      featured: false,
      description: 'Meet with recruiters from 50+ companies and explore career opportunities.'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'from-blue-500 to-cyan-500',
      'Sports': 'from-orange-500 to-red-500',
      'Cultural': 'from-purple-500 to-pink-500',
      'Workshop': 'from-emerald-500 to-teal-500',
      'Social': 'from-amber-500 to-orange-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <Layout role="student">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Campus Events
            </h1>
            <p className="text-gray-400 text-lg">Discover and join exciting events happening on campus</p>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search events..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Upcoming Events</p>
                    <p className="text-3xl font-bold text-white">{events.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Calendar className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 overflow-x-auto">
                <Filter className="text-gray-400" size={20} />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category.toLowerCase()
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(event.category)} text-white border-0`}>
                          {event.category}
                        </Badge>
                        {event.featured && (
                          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                    </div>
                    <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600 transition-all">
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-amber-400" />
                    </button>
                  </div>
                  <CardDescription className="text-gray-400 mt-3">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Calendar size={16} className="text-blue-400" />
                      </div>
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Clock size={16} className="text-purple-400" />
                      </div>
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <MapPin size={16} className="text-emerald-400" />
                      </div>
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <Users size={16} className="text-pink-400" />
                      </div>
                      <span className="text-sm">{event.attendees} attendees</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all font-semibold shadow-lg hover:shadow-purple-500/50">
                      Register Now
                    </button>
                    <button className="px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-700/50 transition-all">
                      <Bell size={20} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <div className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-xl font-medium text-gray-300 mb-2">No events found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

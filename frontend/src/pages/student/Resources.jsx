import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { BookOpen, FileText, Video, Download, Search, Star, TrendingUp, Clock, Eye, Filter, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function StudentResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const resourceTypes = ['All', 'PDF', 'Video', 'Link', 'Slides'];

  const resources = [
    {
      id: 1,
      title: 'Introduction to Data Structures',
      type: 'PDF',
      subject: 'Computer Science',
      size: '2.5 MB',
      downloads: 1234,
      views: 5678,
      uploadedBy: 'Prof. Sarah Johnson',
      date: 'Feb 10, 2026',
      featured: true,
      description: 'Comprehensive guide covering arrays, linked lists, stacks, and queues.'
    },
    {
      id: 2,
      title: 'Calculus Video Lectures - Series',
      type: 'Video',
      subject: 'Mathematics',
      size: '450 MB',
      downloads: 890,
      views: 3421,
      uploadedBy: 'Prof. Michael Chen',
      date: 'Feb 12, 2026',
      featured: true,
      description: '10-part video series on integral and differential calculus.'
    },
    {
      id: 3,
      title: 'Digital Marketing Fundamentals',
      type: 'Slides',
      subject: 'Business',
      size: '15 MB',
      downloads: 567,
      views: 2134,
      uploadedBy: 'Prof. Emily Davis',
      date: 'Feb 14, 2026',
      featured: false,
      description: 'PowerPoint presentation covering SEO, SEM, and social media marketing.'
    },
    {
      id: 4,
      title: 'Python Programming Resources',
      type: 'Link',
      subject: 'Computer Science',
      size: '-',
      downloads: 2345,
      views: 8901,
      uploadedBy: 'Dr. James Wilson',
      date: 'Feb 8, 2026',
      featured: true,
      description: 'Curated collection of Python tutorials, documentation, and practice problems.'
    },
    {
      id: 5,
      title: 'Physics Lab Manual 2026',
      type: 'PDF',
      subject: 'Physics',
      size: '8.3 MB',
      downloads: 456,
      views: 1876,
      uploadedBy: 'Dr. Robert Kumar',
      date: 'Jan 25, 2026',
      featured: false,
      description: 'Complete lab manual with experiments, procedures, and safety guidelines.'
    },
    {
      id: 6,
      title: 'English Literature Analysis',
      type: 'PDF',
      subject: 'English',
      size: '1.8 MB',
      downloads: 678,
      views: 2345,
      uploadedBy: 'Prof. Lisa Anderson',
      date: 'Feb 15, 2026',
      featured: false,
      description: 'Critical analysis of major literary works and movements.'
    },
    {
      id: 7,
      title: 'Machine Learning Crash Course',
      type: 'Video',
      subject: 'Computer Science',
      size: '780 MB',
      downloads: 1567,
      views: 6789,
      uploadedBy: 'Dr. Alan Turing',
      date: 'Feb 5, 2026',
      featured: true,
      description: 'Intensive video course covering ML fundamentals and practical applications.'
    },
    {
      id: 8,
      title: 'Chemistry Reference Tables',
      type: 'PDF',
      subject: 'Chemistry',
      size: '3.2 MB',
      downloads: 890,
      views: 3456,
      uploadedBy: 'Prof. Marie Curie',
      date: 'Jan 30, 2026',
      featured: false,
      description: 'Essential periodic table, equations, and chemical properties reference.'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return FileText;
      case 'Video': return Video;
      case 'Link': return LinkIcon;
      case 'Slides': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'PDF': 'from-red-500 to-pink-500',
      'Video': 'from-blue-500 to-cyan-500',
      'Link': 'from-emerald-500 to-teal-500',
      'Slides': 'from-amber-500 to-orange-500'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  return (
    <Layout role="student">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Learning Resources
            </h1>
            <p className="text-gray-400 text-lg">Access study materials, lectures, and educational content</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Resources</p>
                    <p className="text-3xl font-bold text-white">{resources.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <BookOpen className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Downloads</p>
                    <p className="text-3xl font-bold text-white">8.6K</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Download className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Views</p>
                    <p className="text-3xl font-bold text-white">34.6K</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Eye className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">New Today</p>
                    <p className="text-3xl font-bold text-white">3</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Bar */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources by title, subject, or description..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
                />
              </div>
            </CardContent>
          </Card>

          {/* Type Filter */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 overflow-x-auto">
                <Filter className="text-gray-400" size={20} />
                {resourceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type.toLowerCase())}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedType === type.toLowerCase()
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card 
                  key={resource.id}
                  className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getTypeColor(resource.type)} flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="text-white" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-gray-700/50 text-gray-300 border-gray-600">
                            {resource.subject}
                          </Badge>
                          {resource.featured && (
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl text-white mb-1">{resource.title}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock size={16} />
                          <span>{resource.date}</span>
                        </div>
                        <Badge className={`bg-gradient-to-r ${getTypeColor(resource.type)} text-white border-0`}>
                          {resource.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{resource.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download size={16} />
                          <span>{resource.downloads}</span>
                        </div>
                        {resource.size !== '-' && (
                          <span className="text-gray-500">• {resource.size}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        Uploaded by <span className="text-gray-300 font-medium">{resource.uploadedBy}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all font-semibold shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2">
                        <Download size={18} />
                        Download
                      </button>
                      <button className="px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-700/50 transition-all">
                        <Star size={20} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <div className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-xl font-medium text-gray-300 mb-2">No resources found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

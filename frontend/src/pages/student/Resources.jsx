import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { BookOpen, FileText, Video, Download, Search, Star, TrendingUp, Clock, Eye, Filter, Link as LinkIcon, FileCode, FolderOpen, Play, ExternalLink, Award, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { appColors } from '../../config/colors.js';

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
      uploadedBy: 'Prof. Priya Sharma',
      date: 'Feb 10, 2026',
      featured: true,
      description: 'Comprehensive guide covering arrays, linked lists, stacks, and queues.',
      downloadUrl: '/Dsa.pdf'
    },
    {
      id: 2,
      title: 'Calculus Video Lectures - Series',
      type: 'Video',
      subject: 'Mathematics',
      size: '450 MB',
      downloads: 890,
      views: 3421,
      uploadedBy: 'Prof. Rajesh Kumar',
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
      uploadedBy: 'Prof. Anjali Patel',
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
      uploadedBy: 'Dr. Arjun Reddy',
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
      uploadedBy: 'Dr. Vikram Singh',
      date: 'Jan 25, 2026',
      featured: false,
      description: 'Complete lab manual with experiments, procedures, and safety guidelines.',
      downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 6,
      title: 'English Literature Analysis',
      type: 'PDF',
      subject: 'English',
      size: '1.8 MB',
      downloads: 678,
      views: 2345,
      uploadedBy: 'Prof. Neha Verma',
      date: 'Feb 15, 2026',
      featured: false,
      description: 'Critical analysis of major literary works and movements.',
      downloadUrl: 'https://www.africau.edu/images/default/sample.pdf'
    },
    {
      id: 7,
      title: 'Machine Learning Crash Course',
      type: 'Video',
      subject: 'Computer Science',
      size: '780 MB',
      downloads: 1567,
      views: 6789,
      uploadedBy: 'Dr. Sanjay Gupta',
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
      uploadedBy: 'Prof. Kavya Iyer',
      date: 'Jan 30, 2026',
      featured: false,
      description: 'Essential periodic table, equations, and chemical properties reference.',
      downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
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

  const getSubjectColor = (subject) => {
    const colors = {
      'Computer Science': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      'Mathematics': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      'Business': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      'Physics': 'from-orange-500/20 to-red-500/20 border-orange-500/30',
      'English': 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
      'Chemistry': 'from-teal-500/20 to-cyan-500/20 border-teal-500/30'
    };
    return colors[subject] || 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
  };

  const getSubjectBadgeColor = (subject) => {
    return 'bg-primary/90 border-primary/30';
  };

  const getTypeColor = (type) => {
    const colors = {
      'PDF': 'bg-primary/10 text-primary border-primary/30',
      'Video': 'bg-primary/10 text-primary border-primary/30',
      'Link': 'bg-primary/10 text-primary border-primary/30',
      'Slides': 'bg-primary/10 text-primary border-primary/30'
    };
    return colors[type] || 'bg-primary/10 text-primary border-primary/30';
  };

  const getResourceImage = (type) => {
    const images = {
      'PDF': 'https://picsum.photos/seed/pdf/400/300',
      'Video': 'https://picsum.photos/seed/video/400/300',
      'Link': 'https://picsum.photos/seed/link/400/300',
      'Slides': 'https://picsum.photos/seed/slides/400/300'
    };
    return images[type] || images.PDF;
  };

  const handleDownload = (resource) => {
    if (resource.downloadUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.download = resource.title + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Download URL not available for this resource.');
    }
  };

  return (
    <Layout role="student">
      <div style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <FolderOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Learning Resources
              </h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground md:text-base pl-15">
            Explore curated study materials, video lectures, and educational content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border border-border shadow-md shadow-black/20 transition-all hover:border-primary/50" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Resources</p>
                  <p className="text-3xl font-bold text-foreground">{resources.length}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderOpen size={22} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-md shadow-black/20 transition-all hover:border-primary/50" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Downloads</p>
                  <p className="text-3xl font-bold text-foreground">8.6K</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Download size={22} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-md shadow-black/20 transition-all hover:border-primary/50" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Views</p>
                  <p className="text-3xl font-bold text-foreground">34.6K</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Eye size={22} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-md shadow-black/20 transition-all hover:border-primary/50" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">This Week</p>
                  <p className="text-3xl font-bold text-foreground">2</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock size={22} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-4 border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources by title, subject, or description..."
                className="h-11 w-full rounded-xl border-border bg-surface-2 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Type Filter */}
        <Card className="mb-6 border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 overflow-x-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {resourceTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedType === type.toLowerCase() ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type.toLowerCase())}
                  className={`h-9 rounded-xl px-4 text-xs font-medium whitespace-nowrap ${
                    selectedType === type.toLowerCase()
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border bg-surface-2 text-foreground hover:bg-surface'
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid with Enhanced Design */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card
                key={resource.id}
                className="group relative overflow-hidden border border-border shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                style={{ backgroundColor: appColors.sidebarBackground }}
              >
                {/* Resource Type Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={getResourceImage(resource.type)}
                    alt={resource.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  {/* Type Badge with Icon */}
                  <div className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-xl border backdrop-blur-sm px-3 py-1.5 text-xs font-bold ${getTypeColor(resource.type)}`}>
                    <TypeIcon size={14} />
                    {resource.type}
                  </div>

                  {/* Featured Badge */}
                  {resource.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-xl border border-primary/30 bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white">
                      <Star className="h-3 w-3 fill-white" />
                      Featured
                    </div>
                  )}

                  {/* Large Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <TypeIcon size={80} className="text-white" />
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Subject Badge */}
                  <div className="mb-3">
                    <Badge className={`border backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white ${getSubjectBadgeColor(resource.subject)}`}>
                      {resource.subject}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-xs text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Stats Row */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Eye size={14} className="text-purple-400" />
                      <span className="font-medium">{resource.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download size={14} className="text-green-400" />
                      <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                    </div>
                    {resource.size !== '-' && (
                      <div className="flex items-center gap-1.5">
                        <FileText size={14} className="text-blue-400" />
                        <span className="font-medium">{resource.size}</span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Footer: Uploader & Date */}
                  <div className="mb-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={14} className="text-primary" />
                      <span className="font-medium text-foreground">{resource.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock size={14} />
                      <span>{resource.date}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => handleDownload(resource)}
                      className="flex-1 h-10 rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 w-10 rounded-xl border-border bg-surface-2 text-muted-foreground hover:bg-surface hover:text-primary transition-colors"
                    >
                      <Star size={16} />
                    </Button>
                    {resource.type === 'Video' && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 w-10 rounded-xl border-border bg-surface-2 text-muted-foreground hover:bg-surface hover:text-primary transition-colors"
                      >
                        <Play size={16} />
                      </Button>
                    )}
                    {resource.type === 'Link' && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 w-10 rounded-xl border-border bg-surface-2 text-muted-foreground hover:bg-surface hover:text-primary transition-colors"
                      >
                        <ExternalLink size={16} />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <div className="p-10 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-1 text-sm font-semibold text-foreground">No resources found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          </Card>
        )}
      </div>
      </div>
    </Layout>
  );
}

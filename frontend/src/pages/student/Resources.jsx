import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { BookOpen, FileText, Video, Download, Search, Star, TrendingUp, Clock, Eye, Filter, Link as LinkIcon } from 'lucide-react';
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

  return (
    <Layout role="student">
      <div style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Learning resources</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Access study materials, lectures, and educational content.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Total resources</p>
                  <p className="text-2xl font-semibold text-foreground">{resources.length}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                  <BookOpen size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Downloads</p>
                  <p className="text-2xl font-semibold text-foreground">8.6K</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                  <Download size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Total views</p>
                  <p className="text-2xl font-semibold text-foreground">34.6K</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                  <Eye size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">New today</p>
                  <p className="text-2xl font-semibold text-foreground">3</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                  <TrendingUp size={20} />
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card
                key={resource.id}
                className="border border-border shadow-md shadow-black/20"
                style={{ backgroundColor: appColors.sidebarBackground }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                      <TypeIcon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="border border-border bg-surface-2 text-xs font-medium text-foreground">
                          {resource.subject}
                        </Badge>
                        {resource.featured && (
                          <Badge className="border border-border bg-surface-2 text-xs font-medium text-muted-foreground">
                            <Star className="mr-1 h-3 w-3 text-primary" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="mb-1 text-sm font-semibold text-foreground">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        {resource.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock size={14} className="text-muted-foreground" />
                        <span>{resource.date}</span>
                      </div>
                        <Badge className="border border-border bg-surface-2 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{resource.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={14} />
                        <span>{resource.downloads}</span>
                      </div>
                      {resource.size !== '-' && <span className="text-muted-foreground">• {resource.size}</span>}
                    </div>
                    <div className="text-muted-foreground">
                      Uploaded by{' '}
                      <span className="font-medium text-foreground">{resource.uploadedBy}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      className="flex-1 h-10 rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-xl border-border bg-surface-2 text-sm text-foreground hover:bg-surface"
                    >
                      <Star size={18} />
                    </Button>
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

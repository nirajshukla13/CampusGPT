import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Bell, Bookmark, TrendingUp, Award, Music, Trophy, BookOpen, Heart, Flag, Cpu, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import axios from 'axios';
import { appColors } from '../../config/colors.js';

export default function StudentEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop', 'Academic', 'NSS', 'NCC', 'Other'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/events/upcoming', {
        params: { limit: 50 }
      });
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getEventImage = (category) => {
    const images = {
      technical: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
      cultural: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop',
      sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop',
      workshop: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      academic: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
      nss: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop',
      ncc: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=800&auto=format&fit=crop',
      other: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop'
    };
    return images[category?.toLowerCase()] || images.other;
  };

  const getEventIcon = (category) => {
    const icons = {
      technical: Cpu,
      cultural: Music,
      sports: Trophy,
      workshop: Award,
      academic: BookOpen,
      nss: Heart,
      ncc: Flag,
      other: Star
    };
    const IconComponent = icons[category?.toLowerCase()] || icons.other;
    return <IconComponent className="h-6 w-6" />;
  };

  const getMonthDay = (dateStr) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    };
  };

  if (loading) {
    return (
      <Layout role="student">
        <div className="flex h-96 items-center justify-center">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="student">
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Campus Events Timeline
              </h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground md:text-base pl-15">
            Explore upcoming events in chronological order
          </p>
        </div>

        {/* Search and quick stats */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search events..."
                    className="h-11 w-full rounded-xl border-border bg-surface-2 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming events</p>
                  <p className="text-2xl font-semibold text-foreground">{events.length}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                  <Calendar size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="mb-6 border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 overflow-x-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`h-9 rounded-xl px-4 text-xs font-medium whitespace-nowrap ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border bg-surface-2 text-foreground hover:bg-surface'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events Timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent md:left-1/2" />
          
          {/* Timeline Events */}
          <div className="space-y-12">
            {filteredEvents.map((event, index) => {
              const dateInfo = getMonthDay(event.date);
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={event.id}
                  className={`relative flex items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Date Badge - Always on left for mobile, alternates on desktop */}
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border-2 border-primary bg-primary/10 shadow-md shadow-black/20">
                      <span className="text-[10px] font-bold text-primary">{dateInfo.month}</span>
                      <span className="text-2xl font-bold text-foreground">{dateInfo.day}</span>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center">
                    <div className="absolute h-6 w-6 animate-ping rounded-full bg-primary/30" />
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-[#020617] text-primary">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className={`flex-1 ${isEven ? 'md:pr-12' : 'md:pl-12'} pl-8`}>
                    <Card
                      className="group overflow-hidden border border-border shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                      style={{ backgroundColor: appColors.sidebarBackground }}
                    >
                      {/* Event Image */}
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={getEventImage(event.category)}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        {/* Category Badge on Image */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <Badge className="flex items-center gap-1.5 border border-primary/30 bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                            {getEventIcon(event.category)}
                            {event.category}
                          </Badge>
                          {event.is_featured && (
                            <Badge className="flex items-center gap-1 border border-primary/30 bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                              <Star className="h-3 w-3 fill-white" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Event Title on Image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white line-clamp-2">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <CardDescription className="mb-4 text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </CardDescription>

                        {/* Event Details */}
                        <div className="mb-4 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-foreground">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2">
                              <Calendar size={16} className="text-primary" />
                            </div>
                            <div>
                              <span className="font-medium">{formatDate(event.date)}</span>
                              <span className="ml-2 text-muted-foreground">({event.day})</span>
                            </div>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-3 text-sm text-foreground">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2">
                                <MapPin size={16} className="text-foreground" />
                              </div>
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.organizer && (
                            <div className="flex items-center gap-3 text-sm text-foreground">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2">
                                <Users size={16} className="text-primary" />
                              </div>
                              <span>{event.organizer}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            className="flex-1 h-11 rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Register Now
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-11 rounded-xl border-border bg-surface-2 text-foreground hover:bg-surface hover:text-primary transition-colors"
                          >
                            <Bell size={18} />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-11 rounded-xl border-border bg-surface-2 text-foreground hover:bg-surface hover:text-primary transition-colors"
                          >
                            <Bookmark size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <Card className="border border-border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground }}>
            <div className="p-10 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-1 text-sm font-semibold text-foreground">No events found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

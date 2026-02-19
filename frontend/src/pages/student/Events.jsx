import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Bell, Bookmark, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import axios from 'axios';

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
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Campus events</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Discover and join exciting events happening on campus.
          </p>
        </div>

        {/* Search and quick stats */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border border-border bg-card shadow-md shadow-black/20">
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

          <Card className="border border-border bg-card shadow-md shadow-black/20">
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
        <Card className="mb-6 border border-border bg-card shadow-md shadow-black/20">
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="border border-border bg-card shadow-md shadow-black/20 transition-transform duration-150 hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="border border-border bg-surface-2 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {event.category}
                      </Badge>
                      {event.is_featured && (
                        <Badge className="border border-border bg-surface-2 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          <Star className="mr-1 h-3 w-3 text-primary" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-sm font-semibold text-foreground">
                      {event.title}
                    </CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg border border-border bg-surface-2 text-muted-foreground hover:bg-surface"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="mt-3 text-xs text-muted-foreground">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-3 text-xs">
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2">
                      <Calendar size={14} className="text-primary" />
                    </div>
                    <span>{formatDate(event.date)} ({event.day})</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2">
                        <MapPin size={14} className="text-foreground" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.organizer && (
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2">
                        <Users size={14} className="text-primary" />
                      </div>
                      <span>{event.organizer}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    className="flex-1 h-10 rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Register now
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-xl border-border bg-surface-2 text-sm text-foreground hover:bg-surface"
                  >
                    <Bell size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="border border-border bg-card shadow-md shadow-black/20">
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

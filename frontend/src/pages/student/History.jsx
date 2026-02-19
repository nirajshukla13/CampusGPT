import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { studentAPI } from '../../services/api';
import { Clock, MessageSquare, Sparkles, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function StudentHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await studentAPI.getHistory();
      setHistory(response.data.queries || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const filteredHistory = history.filter(item => 
    item.query?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role="student">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">Query history</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Review your past conversations with CampusGPT.
          </p>
        </div>

        <Card className="mb-4 border border-border bg-card shadow-md shadow-black/20">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your history..."
                  className="h-11 w-full rounded-xl border-border bg-surface-2 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="hidden h-10 items-center gap-2 rounded-xl border-border bg-surface-2 text-sm font-medium text-foreground hover:bg-surface md:flex"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredHistory.length === 0 ? (
          <Card className="border border-border bg-card shadow-md shadow-black/20">
            <div className="p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
                <Clock size={32} className="text-muted-foreground" />
              </div>
              <p className="mb-1 text-sm font-semibold text-foreground">No query history yet</p>
              <p className="text-xs text-muted-foreground">
                Start asking questions to see your history here.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card
                key={item.id}
                data-testid={`history-item-${item.id}`}
                className="border border-border bg-card shadow-md shadow-black/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-1 items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-2">
                        <MessageSquare size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="mb-1 text-sm font-semibold text-foreground">
                          {item.query}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock size={12} className="text-muted-foreground" />
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="flex-shrink-0 rounded-full border border-border bg-surface-2 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      <Sparkles className="mr-1 h-3 w-3 text-primary" />
                      AI response
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-sm leading-relaxed text-foreground">{item.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredHistory.length > 0 && (
          <div className="text-center text-xs text-muted-foreground">
            <p>
              Showing {filteredHistory.length}{' '}
              {filteredHistory.length === 1 ? 'result' : 'results'}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Clock, MessageSquare, Sparkles, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function StudentHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/student/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Query History
            </h1>
            <p className="text-gray-400 text-lg">Review your past conversations with CampusGPT</p>
          </div>

          {/* Search and Filter */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search your history..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
                  />
                </div>
                <button className="px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-700 transition-all flex items-center gap-2">
                  <Filter size={20} />
                  Filter
                </button>
              </div>
            </CardContent>
          </Card>

          {/* History List */}
          {filteredHistory.length === 0 ? (
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <div className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                  <Clock size={40} className="text-white" />
                </div>
                <p className="text-xl font-medium text-gray-300 mb-2">No query history yet</p>
                <p className="text-gray-500">Start asking questions to see your history here</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item, index) => (
                <Card 
                  key={item.id} 
                  data-testid={`history-item-${item.id}`} 
                  className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl text-white mb-2">{item.query}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock size={14} />
                            <span>{item.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 flex-shrink-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Response
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Results Count */}
          {filteredHistory.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Showing {filteredHistory.length} {filteredHistory.length === 1 ? 'result' : 'results'}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
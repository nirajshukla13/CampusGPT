import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Clock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function StudentHistory() {
  const [history, setHistory] = useState([]);

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

  return (
    <Layout role="student">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Query History</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {history.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Clock size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No query history yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {history.map((item) => (
                <div key={item.id} data-testid={`history-item-${item.id}`} className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.query}</h3>
                    <span className="text-sm text-gray-500">{item.timestamp}</span>
                  </div>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Send, MessageSquare } from 'lucide-react';

export default function StudentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'This is a placeholder response. CampusGPT AI integration will be added here.', 
        sender: 'bot' 
      }]);
    }, 500);
  };

  return (
    <Layout role="student">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Chat with CampusGPT</h1>
            <p className="text-gray-400">Ask me anything about your campus</p>
          </div>

          <div className="flex-1 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-auto">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                    <MessageSquare size={40} className="text-white" />
                  </div>
                  <p className="text-xl font-medium text-gray-300 mb-2">Start a conversation</p>
                  <p className="text-gray-500">Ask me about courses, events, campus facilities, and more!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      data-testid={`message-${idx}`}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-5 py-3 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-gray-700/50 text-gray-100 border border-gray-600'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-700 bg-gray-800/30">
              <div className="flex gap-3">
                <input
                  type="text"
                  data-testid="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
                />
                <button
                  data-testid="send-button"
                  onClick={handleSend}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center gap-2 font-semibold"
                >
                  <Send size={20} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
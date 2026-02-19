import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { Send, MessageSquare, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { Badge } from '../../components/ui/badge';
import { queryAPI, studentAPI } from '../../services/api';

export default function StudentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('campus-rag');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await studentAPI.getHistory();
      setChatHistory(response.data.queries || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const currentQuestion = input;
    setInput('');
    setIsLoading(true);

    // Add placeholder bot message
    const botMessageIndex = messages.length + 1;
    setMessages((prev) => [
      ...prev,
      { text: '', sender: 'bot', citations: [], isStreaming: true },
    ]);

    try {
      if (model === 'campus-rag') {
        // Use streaming for Campus RAG
        const reader = await queryAPI.askQuestion(currentQuestion, true);
        const decoder = new TextDecoder();
        let accumulatedText = '';
        let sources = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === 'sources') {
                  sources = data.data;
                } else if (data.type === 'chunk') {
                  accumulatedText += data.data;
                  // Update the bot message with accumulated text
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[botMessageIndex] = {
                      text: accumulatedText,
                      sender: 'bot',
                      citations: sources,
                      isStreaming: true,
                    };
                    return newMessages;
                  });
                } else if (data.type === 'done') {
                  // Mark streaming as complete
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[botMessageIndex] = {
                      text: accumulatedText,
                      sender: 'bot',
                      citations: sources,
                      isStreaming: false,
                    };
                    return newMessages;
                  });
                  // Reload history to include new query
                  loadChatHistory();
                } else if (data.type === 'error') {
                  console.error('Streaming error:', data.message);
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[botMessageIndex] = {
                      text: `Error: ${data.message}`,
                      sender: 'bot',
                      citations: [],
                      isStreaming: false,
                    };
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        }
      } else {
        // GPT-4.0 - use non-streaming (placeholder for now)
        const response = await queryAPI.askQuestion(currentQuestion, false);
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[botMessageIndex] = {
            text: response.data.answer,
            sender: 'bot',
            citations: response.data.sources || [],
            isStreaming: false,
          };
          return newMessages;
        });
        loadChatHistory();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[botMessageIndex] = {
          text: 'Sorry, there was an error processing your request. Please try again.',
          sender: 'bot',
          citations: [],
          isStreaming: false,
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistoryChat = (query) => {
    // Load a previous chat into the current conversation
    setMessages([
      { text: query.question, sender: 'user' },
      { text: query.answer, sender: 'bot', citations: query.sources || [] },
    ]);
  };

  return (
    <Layout role="student">
      <div className="flex h-[calc(100vh-4rem)] gap-6">
        {/* Chat history sidebar */}
        <Card className="hidden h-full w-72 flex-col border border-border bg-card shadow-md shadow-black/20 md:flex">
          <CardContent className="flex flex-1 flex-col p-4">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Chats
                </p>
                <p className="text-sm font-semibold text-foreground">Recent conversations</p>
              </div>
              <Button
                type="button"
                size="icon"
                onClick={() => setMessages([])}
                className="h-8 w-8 rounded-lg bg-surface-2 text-xs text-foreground hover:bg-surface"
              >
                +
              </Button>
            </div>
            <div className="flex-1 space-y-2 overflow-auto">
              {chatHistory.slice(0, 10).map((query, idx) => (
                <div
                  key={query._id || idx}
                  onClick={() => loadHistoryChat(query)}
                  className="cursor-pointer rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-foreground hover:bg-surface transition-colors"
                >
                  <p className="truncate">{query.question}</p>
                </div>
              ))}
              {chatHistory.length === 0 && (
                <div className="text-center text-xs text-muted-foreground pt-4">
                  No chat history yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat window */}
        <Card className="flex h-full flex-1 flex-col border border-border bg-card shadow-md shadow-black/20">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">Chat with CampusGPT</p>
              <p className="text-xs text-muted-foreground">
                Ask about courses, events, campus facilities, and more.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-9 w-40 rounded-lg border-border bg-surface-2 text-xs text-foreground">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="border-border bg-surface-2 text-xs text-foreground">
                  <SelectItem value="campus-rag">CampusGPT · RAG</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4.0</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-2 py-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-surface-2 text-[10px] text-foreground">
                    U
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Student</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-foreground">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <p className="mb-1 text-sm font-semibold text-foreground">
                  Start a conversation with CampusGPT
                </p>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Ask about your timetable, exam schedule, course requirements, or anything else about
                  campus.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    data-testid={`message-${idx}`}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex max-w-[75%] flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {msg.sender === 'bot' ? (
                          <>
                            <Bot className="h-3 w-3" />
                            <span>CampusGPT</span>
                          </>
                        ) : (
                          <>
                            <UserIcon className="h-3 w-3" />
                            <span>You</span>
                          </>
                        )}
                      </div>
                      <Card
                        className={
                          msg.sender === 'user'
                            ? 'border-none bg-surface-2 text-foreground rounded-2xl'
                            : 'border border-border bg-card text-foreground rounded-2xl'
                        }
                      >
                        <CardContent className="p-3 text-sm leading-relaxed">
                          {msg.text || (msg.isStreaming && <Loader2 className="h-4 w-4 animate-spin" />)}
                        </CardContent>
                      </Card>
                      {msg.sender === 'bot' && msg.citations && msg.citations.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={`sources-${idx}`} className="border-none">
                            <AccordionTrigger className="text-xs text-muted-foreground hover:text-foreground">
                              Sources
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              {msg.citations.map((source) => (
                                <div
                                  key={source.id}
                                  className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-foreground"
                                >
                                  <div className="flex flex-col gap-1">
                                    <span className="font-medium">{source.name}</span>
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <Badge className="rounded-full border-0 bg-surface-2 px-2 py-0.5 text-[10px] text-foreground">
                                        {source.label}
                                      </Badge>
                                      <Badge className="rounded-full border-0 bg-surface-2 px-2 py-0.5 text-[10px] text-foreground">
                                        Page {source.page}
                                      </Badge>
                                      <Badge className="rounded-full border-0 bg-surface-2 px-2 py-0.5 text-[10px] text-foreground">
                                        {source.timestamp}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border bg-surface-2 px-4 py-3">
            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Input
                type="text"
                data-testid="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your campus..."
                disabled={isLoading}
                className="h-11 flex-1 rounded-xl border-border bg-surface-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                data-testid="send-button"
                disabled={isLoading || !input.trim()}
                className="h-10 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
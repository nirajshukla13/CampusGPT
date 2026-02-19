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
      <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 md:h-[calc(100vh-4rem)] md:flex-row md:gap-6">
        {/* Chat history sidebar */}
        <Card className="hidden h-full w-full flex-col border border-border bg-card shadow-md shadow-black/20 md:flex md:w-72">
          <CardContent className="flex flex-1 flex-col p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Chats
                </p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">Recent conversations</p>
              </div>
              <Button
                type="button"
                size="icon"
                onClick={() => setMessages([])}
                className="h-7 w-7 rounded-lg bg-surface-2 text-xs text-foreground hover:bg-surface sm:h-8 sm:w-8"
              >
                +
              </Button>
            </div>
            <div className="flex-1 space-y-2 overflow-auto">
              {chatHistory.slice(0, 10).map((query, idx) => (
                <div
                  key={query._id || idx}
                  onClick={() => loadHistoryChat(query)}
                  className="cursor-pointer rounded-xl border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-surface sm:px-3 sm:py-2"
                >
                  <p className="truncate">{query.question}</p>
                </div>
              ))}
              {chatHistory.length === 0 && (
                <div className="pt-4 text-center text-xs text-muted-foreground">
                  No chat history yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat window */}
        <Card className="flex h-full flex-1 flex-col border border-border bg-card shadow-md shadow-black/20">
          {/* Top bar */}
          <div className="flex flex-col gap-2 border-b border-border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground sm:text-sm">Chat with CampusGPT</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Ask about courses, events, campus facilities, and more.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-8 w-32 rounded-lg border-border bg-surface-2 text-xs text-foreground sm:h-9 sm:w-40">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="border-border bg-surface-2 text-xs text-foreground">
                  <SelectItem value="campus-rag">CampusGPT · RAG</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4.0</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-1.5 py-0.5 sm:gap-2 sm:px-2 sm:py-1">
                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                  <AvatarFallback className="bg-surface-2 text-[9px] text-foreground sm:text-[10px]">
                    U
                  </AvatarFallback>
                </Avatar>
                <span className="text-[10px] text-muted-foreground sm:text-xs">Student</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-auto px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-foreground sm:mb-4 sm:h-14 sm:w-14">
                  <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <p className="mb-1 text-xs font-semibold text-foreground sm:text-sm">
                  Start a conversation with CampusGPT
                </p>
                <p className="max-w-sm px-4 text-[10px] text-muted-foreground sm:text-xs">
                  Ask about your timetable, exam schedule, course requirements, or anything else about
                  campus.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 sm:space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    data-testid={`message-${idx}`}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex max-w-[85%] flex-col gap-1.5 sm:max-w-[75%] sm:gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:gap-2 sm:text-xs">
                        {msg.sender === 'bot' ? (
                          <>
                            <Bot className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>CampusGPT</span>
                          </>
                        ) : (
                          <>
                            <UserIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>You</span>
                          </>
                        )}
                      </div>
                      <Card
                        className={
                          msg.sender === 'user'
                            ? 'rounded-2xl border-none bg-surface-2 text-foreground'
                            : 'rounded-2xl border border-border bg-card text-foreground'
                        }
                      >
                        <CardContent className="p-2.5 text-xs leading-relaxed sm:p-3 sm:text-sm">
                          {msg.text || (msg.isStreaming && <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" />)}
                        </CardContent>
                      </Card>
                      {msg.sender === 'bot' && msg.citations && msg.citations.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={`sources-${idx}`} className="border-none">
                            <AccordionTrigger className="text-[10px] text-muted-foreground hover:text-foreground sm:text-xs">
                              Sources
                            </AccordionTrigger>
                            <AccordionContent className="space-y-1.5 sm:space-y-2">
                              {msg.citations.map((source) => (
                                <div
                                  key={source.id}
                                  className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-foreground sm:flex-row sm:items-center sm:justify-between sm:px-3 sm:py-2"
                                >
                                  <span className="text-[10px] font-medium sm:text-xs">{source.name}</span>
                                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                                    <Badge className="rounded-full border-0 bg-surface-2 px-1.5 py-0.5 text-[9px] text-foreground sm:px-2 sm:text-[10px]">
                                      {source.label}
                                    </Badge>
                                    <Badge className="rounded-full border-0 bg-surface-2 px-1.5 py-0.5 text-[9px] text-foreground sm:px-2 sm:text-[10px]">
                                      Page {source.page}
                                    </Badge>
                                    <Badge className="rounded-full border-0 bg-surface-2 px-1.5 py-0.5 text-[9px] text-foreground sm:px-2 sm:text-[10px]">
                                      {source.timestamp}
                                    </Badge>
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
          <div className="border-t border-border bg-surface-2 px-3 py-2.5 sm:px-4 sm:py-3">
            <form
              className="flex gap-2 sm:gap-3"
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
                placeholder="Ask a question..."
                disabled={isLoading}
                className="h-10 flex-1 rounded-xl border-border bg-surface-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary sm:h-11 sm:text-sm"
              />
              <Button
                type="submit"
                data-testid="send-button"
                disabled={isLoading || !input.trim()}
                className="h-10 rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 sm:h-10 sm:px-5 sm:text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Send</span>
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
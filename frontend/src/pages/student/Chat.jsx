import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Send, MessageSquare, Bot, User as UserIcon } from 'lucide-react';
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

export default function StudentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('campus-rag');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'This is a placeholder response. CampusGPT AI integration will be added here.',
          sender: 'bot',
          citations: [
            { id: 1, label: 'PDF', name: 'Campus Handbook', page: 5, timestamp: '00:12:34' },
            { id: 2, label: 'Slide', name: 'Orientation Deck', page: 12, timestamp: '00:03:21' },
          ],
        },
      ]);
    }, 500);
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
                className="h-8 w-8 rounded-lg bg-surface-2 text-xs text-foreground hover:bg-surface"
              >
                +
              </Button>
            </div>
            <div className="flex-1 space-y-2 overflow-auto">
              <div className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-foreground">
                <p className="truncate">What are the library hours this week?</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-foreground">
                <p className="truncate">Explain my course credit requirements.</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-foreground">
                <p className="truncate">Upcoming campus events this month?</p>
              </div>
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
                        <CardContent className="p-3 text-sm leading-relaxed">{msg.text}</CardContent>
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
                className="h-11 flex-1 rounded-xl border-border bg-surface-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                data-testid="send-button"
                className="h-10 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
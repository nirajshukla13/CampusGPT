import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import {
    Send,
    MessageSquare,
    Bot,
    User as UserIcon,
    Loader2,
    Download
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import MermaidDiagram from "@/components/MermaidDiagram";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion";
import { Badge } from "../../components/ui/badge";
import { queryAPI, studentAPI } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [model, setModel] = useState("campus-rag");
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const [historyLoading, setHistoryLoading] = useState(false);

    const { sessionId: paramSessionId } = useParams();
    const navigate = useNavigate();

    const [sessionId, setSessionId] = useState(null);
    const [isSessionReady, setIsSessionReady] = useState(false);
    const [creatingSession, setCreatingSession] = useState(false);

    useEffect(() => {
        const initializeSession = async () => {
            if (paramSessionId) {
                setSessionId(paramSessionId);
                setIsSessionReady(true);
            } else {
                try {
                    const res = await studentAPI.createSession();
                    const newId = res.data.session_id;

                    setSessionId(newId);

                    navigate(`/student/chat/${newId}`, { replace: true });

                    setIsSessionReady(true);
                } catch (err) {
                    console.error("Failed to create session", err);
                }
            }
        };

        initializeSession();
    }, [paramSessionId, navigate]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        loadChatHistory();
    }, []);

    const loadChatHistory = async () => {
        try {
            setHistoryLoading(true);
            const res = await studentAPI.getHistory();
            setChatHistory(res.data.queries || []);
        } catch (e) {
            console.error(e);
        } finally {
            setHistoryLoading(false)
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const question = input;
        setInput("");
        setIsLoading(true);

        // Add user + bot placeholder
        setMessages((prev) => [
            ...prev,
            { text: question, sender: "user" },
            { text: "", sender: "bot", citations: [], diagram: null, loading: true },
        ]);

        try {
            const res = await queryAPI.askQuestion(question, sessionId);
            console.log(res)
            const answerObj = res?.data?.answer || {};
            if (!answerObj.answer) {
                throw new Error("Invalid structured response");
            }

            const answerText = answerObj?.answer || "";
            const rawCitations = answerObj?.citations || [];

            const citations = rawCitations.map((c, index) => ({
                id: c.document_id || index,
                name: c.document_name || "",
                download_ref: c.document_url || "",
                uploaded_by: c.uploaded_by || "",
            }));

            const uniqueCitations = Array.from(
                new Map(
                    citations.map(c => [`${c.document_id}-${c.chunk_index}`, c])
                ).values()
            );

            const diagram = res?.data?.diagram || null;

            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1
                        ? {
                            text: answerText,
                            sender: "bot",
                            citations: uniqueCitations,
                            diagram,
                            loading: false,
                        }
                        : msg
                )
            );

            loadChatHistory();
        } catch (e) {
            console.error(e);

            setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                    text: "Something went wrong. Please try again.",
                    sender: "bot",
                    citations: [],
                    loading: false,
                };
                return copy;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = async () => {
        try {
            setCreatingSession(true);
            const res = await studentAPI.createSession();
            const newId = res.data.session_id;

            setMessages([]);
            setSessionId(newId);

            navigate(`/student/chat/${newId}`);
            loadChatHistory();
        } catch (err) {
            console.error(err);
        } finally {
            setCreatingSession(false);
        }
    };

    const loadHistoryChat = (query) => {
        const normalizedCitations = (query.sources || []).map((s, index) => ({
            id: s.document_id || index,
            name: s.document_name || "",
            download_ref: s.document_url || "",
            uploaded_by: s.uploaded_by || "",
        }));

        setMessages([
            {
                text: query.question,
                sender: "user",
            },
            {
                text: query.answer,
                sender: "bot",
                citations: normalizedCitations,
                diagram: query.diagram || null,
                loading: false,
            },
        ]);
    };

    return (
        <Layout role="student">
            <div className="relative">

                {/* Full Page Loader */}
                {creatingSession && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">
                                Creating new chat...
                            </p>
                        </div>
                    </div>
                )}
                <div className="flex h-[calc(100vh-4rem)] gap-4">
                    {/* Chat history sidebar */}
                    <Card className="hidden h-full w-72 flex-col border border-border bg-card shadow-md shadow-black/20 md:flex">
                        <CardContent className="flex flex-1 flex-col p-4">
                            <div className="mb-4 flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Chats
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                        Recent conversations
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    size="icon"
                                    onClick={handleNewChat}
                                    disabled={creatingSession}
                                    className="h-8 w-8 rounded-lg bg-surface-2 text-xs text-foreground hover:bg-surface"
                                >
                                    +
                                </Button>
                            </div>
                            <div className="flex-1 space-y-2 overflow-auto">
                                {historyLoading ? (
                                    <div className="flex items-center justify-center pt-6">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </div>
                                ) : chatHistory.length === 0 ? (
                                    <div className="text-center text-xs pt-4">
                                        No chat history yet
                                    </div>
                                ) : (
                                    chatHistory.slice(0, 10).map((query, idx) => (
                                        <div
                                            key={query._id || idx}
                                            onClick={() => loadHistoryChat(query)}
                                            className="cursor-pointer rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-foreground hover:bg-surface transition-colors"
                                        >
                                            <p className="truncate">{query.question}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chat window */}
                    <Card className="flex h-full flex-1 flex-col border border-border bg-card shadow-md shadow-black/20">
                        {/* Top bar */}
                        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                            <div className="space-y-0.5">
                                <p className="text-sm font-semibold text-foreground">
                                    Chat with CampusGPT
                                </p>
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
                                        Ask about your timetable, exam schedule, course requirements,
                                        or anything else about campus.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            data-testid={`message-${idx}`}
                                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className="flex max-w-[75%] flex-col gap-2">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    {msg.sender === "bot" ? (
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
                                                        msg.sender === "user"
                                                            ? "border-none bg-surface-2 text-foreground rounded-2xl"
                                                            : "border-none bg-transparent text-foreground"
                                                    }
                                                >
                                                    {/* Diagram FIRST */}
                                                    {msg.diagram && (
                                                        <div className="mb-4 space-y-2">
                                                            {msg.diagram.explanation && (
                                                                <p className="text-sm">
                                                                    {msg.diagram.explanation}
                                                                </p>
                                                            )}

                                                            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
                                                                <MermaidDiagram chart={msg.diagram.diagram} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Then Answer Text */}
                                                    <CardContent className="p-0 text-sm leading-relaxed">
                                                        {msg.loading ? (
                                                            <div className="flex items-center gap-2">
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                                <span>Generating response...</span>
                                                            </div>
                                                        ) : (
                                                            msg.text || "No answer returned"
                                                        )}
                                                    </CardContent>
                                                </Card>
                                                {msg.sender === "bot" &&
                                                    msg.citations &&
                                                    msg.citations.length > 0 && (
                                                        <Accordion
                                                            type="single"
                                                            collapsible
                                                            className="w-full"
                                                        >
                                                            <AccordionItem
                                                                value={`sources-${idx}`}
                                                                className="border-none"
                                                            >
                                                                <AccordionTrigger className="text-xs text-muted-foreground hover:text-foreground">
                                                                    Sources
                                                                </AccordionTrigger>
                                                                <AccordionContent className="space-y-2">
                                                                    {msg.citations.map((source) => (
                                                                        <div
                                                                            key={source.id}
                                                                            className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-foreground"
                                                                        >
                                                                            {/* Left Side - Document Info */}
                                                                            <div className="flex flex-col">
                                                                                <span className="font-medium text-sm">
                                                                                    {source.name}
                                                                                </span>
                                                                                {source.uploaded_by && (
                                                                                    <span className="text-[11px] text-muted-foreground">
                                                                                        Uploaded by {source.uploaded_by}
                                                                                    </span>
                                                                                )}
                                                                            </div>

                                                                            {/* Right Side - Download Icon */}
                                                                            {source.download_ref && (
                                                                                <a
                                                                                    href={source.download_ref}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="p-2 rounded-md hover:bg-background transition-colors"
                                                                                >
                                                                                    <Download className="h-4 w-4 text-primary" />
                                                                                </a>
                                                                            )}
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
            </div>
        </Layout>
    );
}

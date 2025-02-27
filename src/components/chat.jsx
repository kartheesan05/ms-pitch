"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Copy, ArrowDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { MessageContent } from "./message-content";
import { cn } from "@/lib/utils";

const CubeLoader = ({ size = 14, className }) => (
  <motion.div
    animate={{
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    }}
    className={cn("text-cyan-400", className)}
  >
    <MessageSquare size={size} />
  </motion.div>
);

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [error, setError] = useState(null);
  
  const scrollAreaRef = useRef(null);
  const latestMessageRef = useRef(null);

  const scrollToBottom = () => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Check if we need to show the scroll button
  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
      return () => scrollArea.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(messageId);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isStreaming) return;
    
    setError(null);

    // Add user message
    const userMessage = {
      id: String(Date.now()),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input immediately after sending
    setInput("");
    setIsLoading(true);
    setIsStreaming(true);

    try {
      // Make API call to chat endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add assistant response with markdown content
      const assistantMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: data.content || "I don't have a response for that yet.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      setError("Something went wrong. Please try again.");
      
      // Add error message
      const errorMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className="h-[calc(100vh-2.5rem)] bg-neutral-900 text-white antialiased w-[70%] rounded-lg border border-zinc-800">
      <div className="max-w-full mx-auto h-full flex flex-col px-4">
        <div className="flex-1 py-4 overflow-y-auto" ref={scrollAreaRef} onScroll={handleScroll}>
          <div className="space-y-6 px-6">
            {error && (
              <div className="text-red-500 text-center p-2 bg-red-950/20 rounded">
                {error}
              </div>
            )}
            
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  ref={index === messages.length - 1 ? latestMessageRef : null}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "w-full")}
                >
                  <div className="flex gap-3 items-start">
                    {message.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-cyan-600/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <CubeLoader size={14} className="opacity-100" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm leading-relaxed break-words",
                          message.role === "user" 
                            ? "bg-zinc-800" 
                            : "bg-transparent"
                        )}
                      >
                        <MessageContent content={message.content} />
                      </div>
                      {message.role === "assistant" && message.content && (
                        <div className="mt-2 flex justify-start">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                            onClick={() => copyToClipboard(message.content, message.id)}
                          >
                            <Copy className={cn("h-4 w-4 mr-2", copied === message.id && "text-green-500")} />
                            {copied === message.id ? "Copied!" : ""}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loading indicator when waiting for response */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-full"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-600/20 flex items-center justify-center mt-1 flex-shrink-0">
                    <CubeLoader size={14} className="opacity-100" />
                  </div>
                  <div className="bg-transparent px-4 py-3 rounded-lg flex items-center space-x-2">
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400/70 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-400/70 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-400/70 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {showScrollButton && (
            <Button
              size="icon"
              variant="outline"
              className="fixed bottom-20 right-8 rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="py-4 flex gap-2 relative">
          <div className="relative flex-1 group">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Message..."
              className="text-sm h-10 px-4 rounded-full bg-neutral-800/50 border-0 focus-visible:ring-1 focus-visible:ring-cyan-600 shadow-[0_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_1px_1px_rgba(255,255,255,0.2)] transition-shadow"
              disabled={isLoading || isStreaming}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || isStreaming || !input.trim()}
              className="absolute right-1 top-1 h-8 w-8 rounded-full bg-transparent hover:bg-neutral-700/50"
            >
              {isLoading || isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

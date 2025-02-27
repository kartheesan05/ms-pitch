"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Copy, ArrowDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { MessageContent } from "./message-content";
import { cn } from "@/lib/utils";

// The URL of your local backend server
const BACKEND_URL = "http://localhost:8000/query";

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

export function Chat({ isSidebarCollapsed }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [error, setError] = useState(null);
  const [streamedText, setStreamedText] = useState("");
  
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

  // Handle scroll events for scroll button visibility
  const handleScroll = (event) => {
    const viewport = event.currentTarget;
    const maxScroll = viewport.scrollHeight - viewport.clientHeight;
    const isNearBottom = maxScroll - viewport.scrollTop < 100;
    setShowScrollButton(!isNearBottom);
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, streamedText]);

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
    setStreamedText("");

    try {
      // Create a placeholder message for streaming content
      const streamMessageId = String(Date.now() + 1);
      setMessages((prev) => [...prev, {
        id: streamMessageId,
        role: "assistant",
        content: "",
        isStreaming: true
      }]);
      
      // Create form data for the request
      const formData = new FormData();
      
      // Add the user's latest message as query
      formData.append('role', 'user');
      formData.append('query', input);
      
      // Add conversation history if needed
      if (messages.length > 0) {
        // Include previous conversation as context
        const history = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        // formData.append('history', JSON.stringify(history));
      }

      // Make direct API call to the backend server with form data
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        
        // Update the message being streamed
        setMessages((prevMessages) => 
          prevMessages.map((msg) => 
            msg.id === streamMessageId 
              ? { ...msg, content: accumulatedText, isStreaming: true } 
              : msg
          )
        );
        
        setStreamedText(accumulatedText); // This helps trigger the scroll effect
      }

      // Complete the streamed message
      setMessages((prevMessages) => 
        prevMessages.map((msg) => 
          msg.id === streamMessageId 
            ? { ...msg, content: accumulatedText, isStreaming: false } 
            : msg
        )
      );

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
    <div className={cn(
      "h-[calc(100vh-2.5rem)] bg-neutral-900 text-white antialiased rounded-lg border border-zinc-800 transition-all duration-300",
      isSidebarCollapsed ? "w-[90%]" : "w-[80%]"
    )}>
      <div className="max-w-full mx-auto h-full flex flex-col px-4">
        <ScrollArea 
          className="flex-1 py-4" 
          ref={scrollAreaRef}
          onScroll={handleScroll}
        >
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
                            : "bg-transparent w-full"
                        )}
                      >
                        <MessageContent content={message.content} />
                        {message.isStreaming && (
                          <span className="inline-block ml-1 animate-pulse">▋</span>
                        )}
                      </div>
                      {message.role === "assistant" && message.content && !message.isStreaming && (
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
            {isLoading && !isStreaming && (
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
        </ScrollArea>

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

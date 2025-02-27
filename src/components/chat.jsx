"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { DocumentReference } from "./document-reference";
import { MessageContent } from "./message-content";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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
      
      // Add error message
      const errorMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-96px)] flex justify-center items-center"
    >
      {/* Centered Chat Card */}
      <Card className="w-full max-w-3xl bg-gray-900/50 border-gray-800 h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.role === "user"
                        ? "bg-[#00ff9d]/10 border-[1.5px] border-[#00ff9d]/30"
                        : "bg-gray-800/50 border border-gray-700/50"
                    } rounded-lg p-4`}
                  >
                    <MessageContent content={message.content} />
                    {message.role === "assistant" && message.documents && (
                      <DocumentReference documents={message.documents} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about your onboarding..."
              className="bg-gray-800/50 border-gray-700 focus:ring-[#00ff9d] focus:border-[#00ff9d]"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="custom"
              className="min-w-[40px] bg-[#00ff9d] hover:bg-[#00ff9d]/90 text-black font-medium transition-colors duration-200 disabled:bg-gray-600 disabled:text-gray-400"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

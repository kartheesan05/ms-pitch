"use client";

import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { DocumentReference } from "./document-reference";
import { MessageContent } from "./message-content";

// Pre-generated messages for demonstration
const initialMessages = [
  {
    id: "1",
    role: "user",
    content: "What are the steps for setting up my work laptop?",
  },
  {
    id: "2",
    role: "assistant",
    content: `Here's how to set up your work laptop:

1. Connect to the company WiFi using your employee ID as username
2. Log in with your temporary credentials (check your work email)
3. Install the required software from the company portal (portal.company.com)
4. Set up 2FA using the Microsoft Authenticator app
5. Join the company Slack workspace

Let me know if you need help with any of these steps!`,
    documents: [
      {
        id: 1,
        title: "IT Onboarding Guide 2024",
        relevance: 95,
      },
      {
        id: 2,
        title: "Software Installation Manual",
        relevance: 88,
      },
      {
        id: 3,
        title: "Security Protocols",
        relevance: 82,
      },
    ],
  },
  {
    id: "3",
    role: "user",
    content: "How do I request time off?",
  },
  {
    id: "4",
    role: "assistant",
    content: `To request time off:

1. Log into Workday
2. Navigate to "Time Off" section
3. Select the dates and type of leave (vacation, sick, etc.)
4. Add any necessary comments
5. Submit for manager approval

Remember: Please give at least 2 weeks notice for vacation requests when possible. Sick leave can be requested on the same day.`,
    documents: [
      {
        id: 4,
        title: "Employee Leave Policy",
        relevance: 96,
      },
      {
        id: 5,
        title: "Workday User Guide",
        relevance: 85,
      },
      {
        id: 6,
        title: "HR Guidelines 2024",
        relevance: 78,
      },
    ],
  },
];

export function Chat() {
  const {
    messages: aiMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat();
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Combine initial messages with AI messages
  useEffect(() => {
    if (aiMessages.length > 0) {
      setMessages([...initialMessages, ...aiMessages]);
    }
  }, [aiMessages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-gray-900/50 border-gray-800">
        <div className="h-[600px] overflow-y-auto p-4 space-y-6">
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
                        ? "bg-[#00ff9d]/10 border-[1.5px] border-[#00ff9d]/30 dark:border-[#00ff9d]/20"
                        : "bg-gray-800/50 border border-gray-700/50"
                    } rounded-lg p-4`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>
                {message.role === "assistant" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <DocumentReference documents={message.documents} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
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
              className="bg-[#00ff9d] hover:bg-[#00ff9d]/90 text-black font-medium transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

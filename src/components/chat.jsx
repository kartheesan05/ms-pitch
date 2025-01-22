"use client";

import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ListChecks } from "lucide-react";
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
    role: "assistant",
    content: "Welcome to Axel! I'll be your personal assistant at TechCorp.",
    documents: [
      {
        id: 1,
        title: "TechCorp Welcome Guide",
        relevance: 95,
      },
      {
        id: 2,
        title: "Employee Handbook",
        relevance: 85,
      },
    ],
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Hi Sarah, I've set up a personalized onboarding checklist for you. Let's begin by setting up your development environment.",
    documents: [
      {
        id: 3,
        title: "Onboarding Checklist",
        relevance: 98,
      },
      {
        id: 4,
        title: "Development Setup Guide",
        relevance: 92,
      },
    ],
  },
  {
    id: "3",
    role: "user",
    content: "Great! What do I need to do?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "I'll guide you through the IDE setup process. Would you like me to guide you through each step?",
    documents: [
      {
        id: 5,
        title: "IDE Installation Guide",
        relevance: 96,
      },
      {
        id: 6,
        title: "Development Tools Setup",
        relevance: 90,
      },
    ],
  },
  {
    id: "5",
    role: "user",
    content: "How do I set up my local development environment?",
  },
  {
    id: "6",
    role: "assistant",
    content:
      "I'll show you how to set up your local environment. Let me know if you need help with any of these steps!",
    documents: [
      {
        id: 7,
        title: "Local Environment Setup Guide",
        relevance: 98,
      },
      {
        id: 8,
        title: "Development Best Practices",
        relevance: 85,
      },
    ],
  },
  {
    id: "7",
    role: "assistant",
    content:
      "Sarah, let me show you your team structure and the meetings I've scheduled for your onboarding this week.",
    documents: [
      {
        id: 9,
        title: "Team Organization Chart",
        relevance: 95,
      },
      {
        id: 10,
        title: "Meeting Schedule Template",
        relevance: 88,
      },
    ],
  },
  {
    id: "8",
    role: "user",
    content: "Yes, please show me my calendar.",
  },
  {
    id: "9",
    role: "assistant",
    content: "Here's your schedule. You can adjust meeting times if needed.",
    documents: [
      {
        id: 11,
        title: "Onboarding Calendar",
        relevance: 96,
      },
      {
        id: 12,
        title: "Meeting Guidelines",
        relevance: 82,
      },
    ],
  },
  {
    id: "10",
    role: "assistant",
    content:
      "Your team's standup meeting starts in 10 minutes. The standup will be in Meeting Room 3 or join via Zoom: meeting-id-123",
    documents: [
      {
        id: 13,
        title: "Sprint Progress Report",
        relevance: 94,
      },
      {
        id: 14,
        title: "Standup Meeting Protocol",
        relevance: 88,
      },
    ],
  },
  {
    id: "11",
    role: "user",
    content:
      "Thanks, Axel! Can you also remind me to review the code repository afterward?",
  },
  {
    id: "12",
    role: "assistant",
    content: "Done! I'll remind you after the meeting.",
    documents: [
      {
        id: 15,
        title: "Repository Access Guide",
        relevance: 90,
      },
      {
        id: 16,
        title: "Code Review Guidelines",
        relevance: 85,
      },
    ],
  },
  {
    id: "13",
    role: "user",
    content: "Axel, can you show me my onboarding progress?",
  },
  {
    id: "14",
    role: "assistant",
    content:
      "You've completed 3 of 4 onboarding tasks (75% complete). Here's your progress:\n\nCompleted:\n- Development environment setup\n- Team introductions\n- Project access and tools\n\nRemaining:\n- HR Documentation\n\nWould you like to tackle the HR documentation next?",
    documents: [
      {
        id: 17,
        title: "Onboarding Progress Tracker",
        relevance: 97,
      },
      {
        id: 18,
        title: "HR Documentation Guide",
        relevance: 92,
      },
    ],
  },
  {
    id: "15",
    role: "user",
    content: "Yes, let's do that.",
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Great! You can access all the necessary forms at: hr.techcorp.com/onboarding. Let me know if you have any questions!",
    documents: [
      {
        id: 19,
        title: "HR Forms and Policies",
        relevance: 96,
      },
      {
        id: 20,
        title: "Employee Documentation",
        relevance: 88,
      },
    ],
  },
];

// Default responses based on keywords
const defaultResponses = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! How can I help you with your onboarding today?",
    documents: [
      {
        id: "default-1",
        title: "TechCorp Welcome Guide",
        relevance: 90,
      },
    ],
  },
  {
    keywords: ["thank", "thanks"],
    response: "You're welcome! Let me know if you need anything else.",
    documents: [
      {
        id: "default-2",
        title: "Support Resources",
        relevance: 85,
      },
    ],
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    response:
      "Goodbye! Don't hesitate to reach out if you have more questions.",
    documents: [
      {
        id: "default-3",
        title: "Contact Information",
        relevance: 88,
      },
    ],
  },
];

// Default fallback response
const fallbackResponse = {
  response:
    "I understand you have a question about that. Let me help you find the relevant information in our documentation.",
  documents: [
    {
      id: "default-4",
      title: "General Documentation",
      relevance: 80,
    },
  ],
};

export function Chat({ onShowInstructions }) {
  const {
    messages: aiMessages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
  } = useChat({
    api: "/api/langGraph",
    body: {
      user_id : "user-1",
      name: "Sarah",
    },
    streamProtocol: "text"
  });
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Custom submit handler with default responses
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: String(messages.length + 1),
      role: "user",
      content: input,
    };

    // Find matching response or use fallback
    const lowercaseInput = input.toLowerCase();
    const matchingResponse =
      defaultResponses.find((response) =>
        response.keywords.some((keyword) => lowercaseInput.includes(keyword))
      ) || fallbackResponse;

    // Add assistant response
    const assistantMessage = {
      id: String(messages.length + 2),
      role: "assistant",
      content: matchingResponse.response,
      documents: matchingResponse.documents,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    handleInputChange({ target: { value: "" } }); // Clear input
  };

  // Check if a message contains step-by-step instructions
  const hasInstructions = (content) => {
    return content.includes("\n1.") || content.includes("steps");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto h-[calc(100vh-96px)]"
    >
      <Card className="bg-gray-900/50 border-gray-800 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
                    {message.role === "assistant" &&
                      hasInstructions(message.content) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShowInstructions(true)}
                          className="mt-3 text-[#00ff9d] hover:text-[#00ff9d] hover:bg-[#00ff9d]/10"
                        >
                          <ListChecks className="w-4 h-4 mr-2" />
                          Show Instructions
                        </Button>
                      )}
                  </div>
                </div>
                {message.role === "assistant" && message.documents && (
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
          <form onSubmit={originalHandleSubmit} className="flex gap-2">
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

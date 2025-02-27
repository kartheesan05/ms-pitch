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

// Mock onboarding tasks data
const onboardingTasks = [
  {
    id: 1,
    title: "Set Up Development Environment",
    status: "incomplete",
    progress: 0,
    dueDate: "2024-03-20",
    priority: "high",
    steps: [
      "Install VS Code and required extensions",
      "Clone company repository",
      "Set up local development environment",
      "Run test project",
    ],
  },
  {
    id: 2,
    title: "Submit Personal Documents",
    status: "incomplete",
    progress: 0,
    dueDate: "2024-03-21",
    priority: "medium",
    documents: ["ID", "Proof of Address"],
  },
  {
    id: 3,
    title: "Complete Compliance Training",
    status: "incomplete",
    progress: 0,
    dueDate: "2024-03-22",
    priority: "medium",
    quiz: {
      required: true,
      passingScore: 80,
    },
  },
  {
    id: 4,
    title: "Read and Acknowledge Remote Work Policy",
    status: "incomplete",
    progress: 0,
    dueDate: "2024-03-23",
    priority: "low",
    acknowledgement: true,
  },
];

// Updated initial messages for the new onboarding flow
const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi John! Welcome to Axel. Your onboarding journey is ready. Let me know if you have any questions!",
    documents: [
      {
        id: 1,
        title: "Onboarding Guide",
        relevance: 95,
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

// Task-specific responses and interactions
const taskResponses = {
  1: {
    // Set Up Development Environment
    initial: {
      content:
        "Let's set up your development environment. I'll guide you through each step:\n\n1. Install VS Code\n2. Set up essential extensions\n3. Clone the company repository\n4. Configure your local environment\n\nShall we start with installing VS Code?",
      documents: [
        { id: "dev-1", title: "Development Setup Guide", relevance: 98 },
        { id: "dev-2", title: "VS Code Configuration", relevance: 95 },
      ],
    },
    steps: {
      vs_code: {
        question: "I have VS Code installed",
        response:
          "Great! Let's install these essential extensions for our tech stack:\n\n1. ESLint\n2. Prettier\n3. GitLens\n4. React Developer Tools\n\nI'll help you configure them once installed. Let me know when you're ready.",
        documents: [
          { id: "dev-3", title: "VS Code Extensions Guide", relevance: 96 },
        ],
      },
      extensions: {
        question: "I've installed the extensions",
        response:
          "Perfect! Now let's clone the company repository. Here's the command:\n\n```bash\ngit clone https://github.com/company/main-repo.git\n```\n\nOnce cloned, I'll help you set up the environment variables.",
        documents: [
          { id: "dev-4", title: "Repository Setup Guide", relevance: 97 },
        ],
      },
      repository: {
        question: "I've cloned the repository",
        response:
          "Excellent! Let's set up your environment variables:\n\n1. Copy `.env.example` to `.env`\n2. I'll help you fill in the required values\n3. Run `npm install`\n4. Start the development server\n\nNeed the values for your .env file?",
        documents: [
          { id: "dev-5", title: "Environment Configuration", relevance: 98 },
        ],
      },
      complete: {
        question: "Yes, I need the env values",
        response:
          "Here are your development environment variables:\n\nAPI_KEY=dev_123456\nDATABASE_URL=localhost:5432\nREDIS_HOST=127.0.0.1\n\nOnce you've added these, run `npm run dev` to start the server. Let me know if you see the welcome screen!",
        documents: [
          { id: "dev-6", title: "Local Development Guide", relevance: 99 },
        ],
      },
    },
  },
  2: {
    // Submit Personal Documents
    initial: {
      content:
        "For your personal documents, we need:\n\n1. Government-issued ID\n2. Proof of address (utility bill/bank statement)\n\nYou can securely upload them through our HR portal. Would you like me to guide you through the upload process?",
      documents: [
        { id: "doc-1", title: "Document Submission Guide", relevance: 98 },
        { id: "doc-2", title: "HR Portal Instructions", relevance: 95 },
      ],
    },
    steps: {
      guide: {
        question: "Yes, please guide me",
        response:
          "Here's how to upload your documents:\n\n1. Visit: hr.company.com/upload\n2. Login with your company email\n3. Click 'Submit Documents'\n4. Upload files in PDF format\n5. Add document descriptions\n\nThe portal is ready for your uploads. Need help with the file requirements?",
        documents: [
          { id: "doc-3", title: "Document Requirements", relevance: 97 },
        ],
      },
      requirements: {
        question: "What are the file requirements?",
        response:
          "Document requirements:\n\n- PDF format only\n- Max 5MB per file\n- Must be less than 3 months old\n- Clear, legible scan\n- Color copies preferred\n\nLet me know once you've uploaded the documents!",
        documents: [
          { id: "doc-4", title: "File Specifications", relevance: 96 },
        ],
      },
      complete: {
        question: "I've uploaded the documents",
        response:
          "Perfect! I can see your documents have been received. Our HR team will review them within 24 hours. I'll notify you once they're approved. Is there anything else you need help with?",
        documents: [
          { id: "doc-5", title: "Document Processing", relevance: 98 },
        ],
      },
    },
  },
  3: {
    // Complete Compliance Training
    initial: {
      content:
        "Time for your compliance training! This includes:\n\n1. Data Security (15 mins)\n2. Code of Conduct (20 mins)\n3. Privacy Guidelines (10 mins)\n\nReady to start with the Data Security module?",
      documents: [
        { id: "train-1", title: "Compliance Training Overview", relevance: 98 },
        { id: "train-2", title: "Training Schedule", relevance: 94 },
      ],
    },
    steps: {
      start: {
        question: "Yes, I'm ready to start",
        response:
          "Great! I'm launching the Data Security module now. Key points to note:\n\n- Watch the full video\n- Take notes on security protocols\n- Quiz at the end (80% to pass)\n\nClick 'Start Module' when you're ready.",
        documents: [
          { id: "train-3", title: "Data Security Module", relevance: 97 },
        ],
      },
      module_complete: {
        question: "I've completed the module",
        response:
          "Excellent! You scored 90% on the Data Security quiz. Ready for the Code of Conduct module? This one covers:\n\n- Professional behavior\n- Communication guidelines\n- Conflict resolution\n\nShall we proceed?",
        documents: [{ id: "train-4", title: "Code of Conduct", relevance: 96 }],
      },
      complete: {
        question: "Yes, continue",
        response:
          "You've completed all compliance training modules!\n\nFinal Scores:\n- Data Security: 90%\n- Code of Conduct: 85%\n- Privacy Guidelines: 95%\n\nGreat job! You've passed all requirements.",
        documents: [
          { id: "train-5", title: "Training Completion", relevance: 99 },
        ],
      },
    },
  },
  4: {
    // Remote Work Policy
    initial: {
      content:
        "Let's review our Remote Work Policy. Key sections:\n\n1. Work Hours and Availability\n2. Communication Guidelines\n3. Equipment and Security\n4. Performance Expectations\n\nWould you like me to walk you through each section?",
      documents: [
        { id: "policy-1", title: "Remote Work Policy", relevance: 98 },
        { id: "policy-2", title: "Policy Guidelines", relevance: 95 },
      ],
    },
    steps: {
      review: {
        question: "Yes, please explain",
        response:
          "Let's start with Work Hours and Availability:\n\n- Core hours: 10 AM - 4 PM (your local time)\n- Flexible schedule around core hours\n- Update calendar with availability\n- Respond within 2 hours during work hours\n\nShall we move to Communication Guidelines?",
        documents: [
          { id: "policy-3", title: "Work Hours Policy", relevance: 97 },
        ],
      },
      communication: {
        question: "Yes, tell me about communication",
        response:
          "Communication Guidelines:\n\n- Use Slack for quick questions\n- Email for formal communication\n- Daily standup at 10 AM\n- Weekly team meetings\n- Keep camera on during meetings\n\nReady to review Equipment and Security?",
        documents: [
          { id: "policy-4", title: "Communication Guidelines", relevance: 96 },
        ],
      },
      complete: {
        question: "Yes, I understand the policy",
        response:
          "Great! To complete this task, please acknowledge that you've read and understood the Remote Work Policy. Click the 'I Acknowledge' button below.\n\nNeed any clarification before proceeding?",
        documents: [
          { id: "policy-5", title: "Policy Acknowledgment", relevance: 99 },
        ],
      },
    },
  },
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
      user_id: "user-1",
      name: "John",
    },
    streamProtocol: "text",
  });

  const [messages, setMessages] = useState(initialMessages);
  const [tasks, setTasks] = useState(onboardingTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCurrentStep("initial");
    const taskResponse = taskResponses[task.id].initial;
    const taskMessage = {
      id: String(messages.length + 1),
      role: "assistant",
      content: taskResponse.content,
      documents: taskResponse.documents,
    };
    setMessages((prev) => [...prev, taskMessage]);
  };

  const getNextStep = (taskId, currentStep) => {
    const steps = Object.keys(taskResponses[taskId].steps);
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1];
  };

  const handleTaskComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: "complete", progress: 100 }
          : task
      )
    );

    // Check if all tasks are complete
    const allComplete = tasks.every((task) => task.status === "complete");
    if (allComplete) {
      setShowConfetti(true);
      const completionMessage = {
        id: String(messages.length + 1),
        role: "assistant",
        content:
          "Congratulations, John! You've completed your onboarding journey. You're all set to start your role. If you need anything, I'm always here to help!",
        documents: [
          {
            id: "completion",
            title: "Onboarding Complete",
            relevance: 100,
          },
        ],
      };
      setMessages((prev) => [...prev, completionMessage]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: String(messages.length + 1),
      role: "user",
      content: input,
    };

    let assistantMessage;

    if (selectedTask) {
      const taskSteps = taskResponses[selectedTask.id].steps;
      let nextResponse;

      if (currentStep === "initial") {
        // After initial message, move to first step
        nextResponse = taskSteps[Object.keys(taskSteps)[0]];
        setCurrentStep(Object.keys(taskSteps)[0]);
      } else if (currentStep) {
        // Move to next step in sequence
        const nextStep = getNextStep(selectedTask.id, currentStep);
        if (nextStep) {
          nextResponse = taskSteps[nextStep];
          setCurrentStep(nextStep);
        } else {
          // If no more steps, complete the task
          handleTaskComplete(selectedTask.id);
          nextResponse = {
            response:
              "Great job! You've completed this task. Would you like to move on to the next one?",
            documents: [
              { id: "completion", title: "Task Complete", relevance: 100 },
            ],
          };
          setCurrentStep(null);
        }
      }

      assistantMessage = {
        id: String(messages.length + 2),
        role: "assistant",
        content: nextResponse.response,
        documents: nextResponse.documents,
      };
    } else {
      // Default responses for when no task is selected
      const lowercaseInput = input.toLowerCase();
      const matchingResponse =
        defaultResponses.find((response) =>
          response.keywords.some((keyword) => lowercaseInput.includes(keyword))
        ) || fallbackResponse;

      assistantMessage = {
        id: String(messages.length + 2),
        role: "assistant",
        content: matchingResponse.response,
        documents: matchingResponse.documents,
      };
    }

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
      className="max-w-7xl mx-auto h-[calc(100vh-96px)] flex gap-4"
    >

      {/* Right Panel - Chat */}
      <Card className="flex-1 bg-gray-900/50 border-gray-800 h-full flex flex-col">
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

      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
        >
          {/* Add your confetti animation component here */}
        </motion.div>
      )}
    </motion.div>
  );
}

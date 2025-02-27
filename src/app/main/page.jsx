"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Chat } from "@/components/chat";
import { AppSidebar } from "@/components/app-sidebar";
import { AnimatePresence } from "framer-motion";

// Initial steps data structure
const initialSteps = [
  {
    title: "Set up development environment",
    completed: false,
    subSteps: [
      "Download Visual Studio Code",
      "Install required extensions",
      "Configure workspace settings",
      "Set up debugging configurations",
    ],
  },
  {
    title: "Configure workspace and tools",
    completed: false,
    subSteps: [
      "Install Node.js LTS version",
      "Clone repository",
      "Install dependencies",
      "Set up environment variables",
    ],
  },
  {
    title: "Team introductions and meetings",
    completed: false,
    subSteps: [
      "Meet frontend team",
      "Meet backend team",
      "Meet DevOps team",
      "Attend project overview",
    ],
  },
  {
    title: "HR documentation and policies",
    completed: false,
    subSteps: [
      "Complete personal information",
      "Review company policies",
      "Sign required documents",
      "Set up benefits",
    ],
  },
  {
    title: "Project onboarding and access",
    completed: false,
    subSteps: [
      "Get repository access",
      "Review coding standards",
      "Set up project tools",
      "Complete initial tasks",
    ],
  },
];

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSkipLoading = () => {
    setIsLoading(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen 
            key="loading" 
            onComplete={() => setIsLoading(false)}
            onSkip={handleSkipLoading}
          />
        ) : (
          <div
            key="chat"
            className="min-h-screen flex text-white bg-gradient-to-b from-neutral-900 to-black"
          >
            {/* Sidebar with toggle functionality */}
            <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0' : 'w-64'}`}>
              <AppSidebar 
                isCollapsed={isSidebarCollapsed} 
                onToggle={toggleSidebar} 
              />
            </div>
            
            {/* Chat content area */}
            <div className="flex-1 flex justify-center items-center">
              <Chat isSidebarCollapsed={isSidebarCollapsed} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

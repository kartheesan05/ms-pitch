"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Chat } from "@/components/chat";
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

  const handleSkipLoading = () => {
    setIsLoading(false);
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
            className="min-h-screen text-white"
          >
            <div className="flex">
              <main>
                <div className="container mx-auto p-4">
                  <Chat/>
                </div>
              </main>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { SidePanel } from "@/components/side-panel";
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

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState(initialSteps);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const handleStepComplete = (index) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i === index ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <div
            key="chat"
            className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
          >
            <Header />
            <div className="flex">
              <SidePanel
                steps={steps}
                onStepComplete={handleStepComplete}
                isOpen={showSidePanel}
                onOpenChange={setShowSidePanel}
              />
              <main
                className={`flex-1 transition-all duration-300 ${
                  showSidePanel ? "pl-[400px]" : "pl-0"
                }`}
              >
                <div className="container mx-auto p-4">
                  <Chat onShowInstructions={setShowSidePanel} />
                </div>
              </main>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

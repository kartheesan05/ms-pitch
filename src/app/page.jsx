"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState("welcome");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="flex w-full h-[calc(100vh-2.5rem)] gap-5">
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <Chat isSidebarCollapsed={isCollapsed} />
      </div>
    </main>
  );
}

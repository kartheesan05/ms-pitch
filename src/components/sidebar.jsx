"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MessageSquare, HelpCircle, FileText, Settings, User, Briefcase, PlusCircle, BookOpen } from "lucide-react";

const onboardingSteps = [
  {
    id: "welcome",
    title: "Welcome & Introduction",
    icon: HelpCircle,
    description: "Get acquainted with our company culture, mission, and values. Learn about our team structure and key contacts."
  },
  {
    id: "setup",
    title: "Setup & Resources",
    icon: Settings,
    description: "Set up your workstation, access credentials, software tools, and learn about available resources for your role."
  },
  {
    id: "policies",
    title: "Company Policies",
    icon: FileText,
    description: "Review important company policies including working hours, time off, benefits, and other HR-related information."
  },
  {
    id: "training",
    title: "Training Plan",
    icon: BookOpen, 
    description: "Access your personalized training plan with the skills and knowledge you'll need to develop in your new role."
  },
  {
    id: "team",
    title: "Meet Your Team",
    icon: User,
    description: "Get introduced to your immediate team members, learn about their roles, and schedule 1:1 meetings to establish connections."
  },
  {
    id: "projects",
    title: "First Projects",
    icon: Briefcase,
    description: "Review your first assignments and projects. Get details about expectations, timelines, and available support resources."
  }
];

export function Sidebar({ isCollapsed, setIsCollapsed, currentStep, setCurrentStep }) {
  const [selectedStep, setSelectedStep] = useState(null);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleStepClick = (step) => {
    setCurrentStep(step.id);
    setSelectedStep(selectedStep && selectedStep.id === step.id ? null : step);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-[calc(100vh-2.5rem)] bg-neutral-900 border-r border-zinc-800 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-80"
      )}
    >
      <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-800">
        <motion.h2
          initial={false}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-white truncate"
        >
          {isCollapsed ? "" : "Onboarding Guide"}
        </motion.h2>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-zinc-400 hover:text-white">
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2 py-4">
        <div className={cn("space-y-6", isCollapsed && "flex flex-col items-center")}>
          {onboardingSteps.map((step) => {
            const isActive = currentStep === step.id;
            const IconComponent = step.icon;
            
            return (
              <div key={step.id} className="space-y-2">
                <Button 
                  variant="ghost"
                  onClick={() => handleStepClick(step)}
                  className={cn(
                    "flex items-center justify-start w-full gap-3 py-2 transition-colors",
                    isCollapsed ? "justify-center px-2" : "px-3",
                    isActive 
                      ? "bg-cyan-600/20 text-cyan-100 hover:bg-cyan-600/30 hover:text-cyan-100" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  )}
                >
                  <IconComponent size={18} className={isActive ? "text-cyan-100" : "text-zinc-400"} />
                  {!isCollapsed && (
                    <span className="truncate">{step.title}</span>
                  )}
                </Button>
                
                {selectedStep && selectedStep.id === step.id && !isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-9 pr-3 text-sm text-zinc-400"
                  >
                    <p>{step.description}</p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-zinc-800 p-4">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          <motion.div 
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : "auto" }}
            className="overflow-hidden"
          >
            {!isCollapsed && (
              <p className="text-sm text-zinc-400">Chat History</p>
            )}
          </motion.div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-zinc-400 hover:text-white"
          >
            <PlusCircle size={isCollapsed ? 18 : 16} className="mr-0 md:mr-2" />
            {!isCollapsed && <span>New Chat</span>}
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="mt-3 space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-zinc-400 hover:text-white text-sm"
            >
              <MessageSquare size={14} className="mr-2" />
              <span className="truncate">Previous Chat 1</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-zinc-400 hover:text-white text-sm"
            >
              <MessageSquare size={14} className="mr-2" />
              <span className="truncate">Previous Chat 2</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

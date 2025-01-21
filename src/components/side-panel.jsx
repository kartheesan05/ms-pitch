"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ListChecks } from "lucide-react";
import { useState, useEffect } from "react";
import { StepInstructions } from "./step-instructions";
import { Card } from "@/components/ui/card";

export function SidePanel({ steps, onStepComplete, isOpen, onOpenChange }) {
  const completedSteps = steps.filter((step) => step.completed).length;
  const PANEL_WIDTH = 400; // Increased from 320

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleOpen = () => {
    onOpenChange(true);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ x: -PANEL_WIDTH }}
        animate={{ x: isOpen ? 0 : -PANEL_WIDTH }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-[400px] z-40"
      >
        <Card className="h-full bg-gray-900/50 border-gray-800">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
            <div className="flex items-center gap-3">
              <ListChecks className="w-5 h-5 text-[#00ff9d]" />
              <div>
                <h2 className="font-medium text-white text-lg">
                  Onboarding Steps
                </h2>
                <p className="text-sm text-gray-400">
                  {completedSteps} of {steps.length} completed
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-800/50 rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-[#00ff9d]" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto h-[calc(100vh-64px-64px)] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            <StepInstructions steps={steps} onStepComplete={onStepComplete} />
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleOpen}
            className="fixed top-[76px] left-4 p-2 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 rounded-md transition-colors z-40 group"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#00ff9d]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TitleBar } from "./ui/title-bar";
import { FirstStep } from "./steps/first-step";
import { SecondStep } from "./steps/second-step";
import { FinalStep } from "./steps/final-step";
import { loadingSteps } from "./config";

export function LoadingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handleStepComplete = () => {
    if (currentStep < loadingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsReady(true);
    }
  };

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 0:
        return <FirstStep step={loadingSteps[0]} onComplete={handleStepComplete} />;
      case 1:
        return <SecondStep step={loadingSteps[1]} onComplete={handleStepComplete} />;
      default:
        return <FinalStep isReady={isReady} onComplete={onComplete} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      <TitleBar />
      {/* Base gradient and overlays */}
      {/* ...existing overlay code... */}

      {/* Content */}
      <div className="relative text-center px-4 max-w-2xl mx-auto">
        {renderCurrentStep()}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }) {
  const [isReady, setIsReady] = useState(false);
  const [client, setClient] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    {
      icon: "👋",
      title: "Welcome!",
      description: "Getting ready to transform your onboarding experience",
    },
    {
      icon: "🎨",
      title: "Setting up your workspace",
      description: "Customizing the perfect environment for you",
    },
    {
      icon: "🔮",
      title: "Preparing AI magic",
      description: "Loading our intelligent assistant capabilities",
    },
    {
      icon: "🚀",
      title: "Systems check",
      description: "Running final optimizations",
    },
    {
      icon: "✨",
      title: "All set!",
      description: "Your personalized experience awaits",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClient(true);
    }

    // Sequence through the loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 1500);

    // Set ready state after all steps
    const timer = setTimeout(() => {
      setIsReady(true);
    }, loadingSteps.length * 1500 + 500);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 157, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%)",
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(0, 255, 157, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(0, 255, 255, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(0, 255, 157, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      {/* Content */}
      <div className="relative text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-4 mb-6"
          >
            <span className="text-6xl animate-bounce">
              {loadingSteps[currentStep].icon}
            </span>
            <div className="space-y-2">
              <h2 className="text-white text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
                {loadingSteps[currentStep].title}
              </h2>
              <p className="text-white/80 text-lg">
                {loadingSteps[currentStep].description}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              {loadingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-8 bg-gradient-to-r from-[#00ff9d] to-[#00ffff]"
                      : index < currentStep
                      ? "w-4 bg-white/60"
                      : "w-4 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {isReady && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Meet your new
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
                  onboarding assistant.
                </span>
              </h1>
            </motion.div>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.8 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full 
            bg-[#00ff9d] text-black font-medium transition-all duration-200
            hover:bg-[#00ffff] hover:shadow-[0_0_20px_rgba(0,255,157,0.5)]
            ${isReady ? "cursor-pointer" : "cursor-default opacity-50"}`}
          disabled={!isReady}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Floating particles */}
      {client && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00ff9d]/20 rounded-full"
              initial={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

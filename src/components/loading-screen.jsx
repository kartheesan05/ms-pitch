"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }) {
  const [isReady, setIsReady] = useState(false);
  const [client, setClient] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [subStepIndex, setSubStepIndex] = useState(0);
  const [subStepsComplete, setSubStepsComplete] = useState(false);
  const [profileProgress, setProfileProgress] = useState(0);

  const loadingSteps = [
    {
      icon: "🔑",
      title: "Initializing Secure Access",
      description: "Establishing connection with company systems",
      subSteps: [
        {
          title: "Authenticating with SSO",
          duration: 2000,
        },
        {
          title: "Connecting to Company ERP",
          duration: 3000,
        },
        {
          title: "Fetching Employee Profile",
          duration: 2500,
        },
        {
          title: "Validating Access Permissions",
          duration: 1500,
        },
        {
          title: "Preparing Personalization Data",
          duration: 2000,
        }
      ]
    },
    {
      icon: "👤",
      title: "Building Digital Profile",
      description: "Creating your personalized AI assistant context",
      subSteps: [
        {
          title: "Analyzing Position Requirements",
          duration: 2500,
          progress: 0,
        },
        {
          title: "Mapping Professional Skills",
          duration: 2000,
          progress: 0,
        },
        {
          title: "Processing Department Context",
          duration: 2800,
          progress: 0,
        },
        {
          title: "Building Knowledge Graph",
          duration: 3000,
          progress: 0,
        },
        {
          title: "Finalizing Assistant Personality",
          duration: 2000,
          progress: 0,
        }
      ]
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

    // Only run the progress animation for non-first and non-second steps
    if (currentStep > 1) {
      const progressInterval = setInterval(() => {
        setStepProgress((prev) => {
          if (prev < 100) return prev + 2;
          return prev;
        });
      }, 20);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < loadingSteps.length - 1 && stepProgress >= 100) {
            setStepProgress(0);
            return prev + 1;
          }
          if (prev === loadingSteps.length - 1 && stepProgress >= 100) {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
            setIsReady(true);
          }
          return prev;
        });
      }, 1000);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
      };
    }
  }, [stepProgress, currentStep]);

  useEffect(() => {
    if (currentStep === 0) {
      const executeSubSteps = async () => {
        for (let i = 0; i < loadingSteps[0].subSteps.length; i++) {
          setSubStepIndex(i);
          await new Promise(resolve => 
            setTimeout(resolve, loadingSteps[0].subSteps[i].duration)
          );
        }
        setSubStepsComplete(true);
        setStepProgress(100);
        // Move to next step after a small delay
        setTimeout(() => {
          setCurrentStep(1);
          setStepProgress(0);
        }, 1000);
      };
      executeSubSteps();
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 1) {
      const executeSecondStepAnimation = async () => {
        for (let i = 0; i < loadingSteps[1].subSteps.length; i++) {
          setSubStepIndex(i);
          const duration = loadingSteps[1].subSteps[i].duration;
          const startTime = Date.now();
          
          // Complete each sub-step's progress animation
          while (Date.now() - startTime < duration) {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            setProfileProgress(progress);
            await new Promise(resolve => setTimeout(resolve, 20));
          }
          
          // Ensure we reach 100% for current sub-step
          setProfileProgress(100);
          
          // Add a small pause between sub-steps
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // After all sub-steps complete, wait a moment before moving to next step
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentStep(2);
        setStepProgress(0);
      };
      
      executeSecondStepAnimation();
    }
  }, [currentStep]);

  const renderSubSteps = () => {
    if (currentStep !== 0) return null;

    return (
      <div className="w-full max-w-md space-y-3 mt-4">
        {loadingSteps[0].subSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              {index < subStepIndex ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : index === subStepIndex ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/20" />
              )}
            </div>
            <span className={`text-sm ${
              index <= subStepIndex ? 'text-white' : 'text-white/40'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderSecondStep = () => {
    if (currentStep !== 1) return null;

    return (
      <div className="w-full max-w-4xl grid grid-cols-2 gap-8 items-center">
        <div className="text-left space-y-4">
          <h3 className="text-3xl font-bold text-white">
            Building Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
              Digital Twin
            </span>
          </h3>
          <p className="text-white/80">
            Creating a comprehensive understanding of your role and expertise to provide personalized assistance.
          </p>
        </div>
        
        <div className="space-y-6">
          {loadingSteps[1].subSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${
                  index <= subStepIndex ? 'text-white' : 'text-white/40'
                }`}>
                  {step.title}
                </span>
                {index === subStepIndex && (
                  <span className="text-[#00ff9d] text-sm">
                    Processing...
                  </span>
                )}
              </div>
              <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: index < subStepIndex ? "100%" : 
                           index === subStepIndex ? `${profileProgress}%` : "0%" 
                  }}
                  className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00ffff] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
            
            {renderSubSteps()}
            {renderSecondStep()}
            
            {/* Progress bar only shows for non-first steps */}
            {currentStep !== 0 && (
              <div className="w-full max-w-md space-y-2">
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stepProgress}%` }}
                    transition={{ duration: 0.2 }}
                    className="h-full bg-[#00ff9d] rounded-full"
                  />
                </div>
              </div>
            )}
            
            {/* Step indicators */}
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

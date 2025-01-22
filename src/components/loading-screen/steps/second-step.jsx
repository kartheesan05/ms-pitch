import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function SecondStep({ onComplete, step }) {
  const [subStepIndex, setSubStepIndex] = useState(0);
  const [profileProgress, setProfileProgress] = useState(0);

  useEffect(() => {
    const executeAnimation = async () => {
      for (let i = 0; i < step.subSteps.length; i++) {
        setSubStepIndex(i);
        const duration = step.subSteps[i].duration;
        const startTime = Date.now();
        
        while (Date.now() - startTime < duration) {
          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          setProfileProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        
        setProfileProgress(100);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    };
    
    executeAnimation();
  }, []);

  return (
    <div className="w-full max-w-5xl grid grid-cols-2 gap-16 items-start">
      <div className="text-left space-y-6 sticky top-0">
        <h3 className="text-4xl font-bold text-white leading-tight">
          Building Your
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
            Digital Twin
          </span>
        </h3>
        <p className="text-white/80 text-lg leading-relaxed">
          Creating a comprehensive understanding of your role and expertise to provide personalized assistance.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-[#00ff9d] to-[#00ffff] rounded-full" />
      </div>
      
      <div className="space-y-8">
        {step.subSteps.map((substep, index) => (
          <div key={index} className="relative bg-white/5 rounded-lg p-6 transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  {index < subStepIndex ? (
                    <div className="w-5 h-5 text-[#00ff9d]">✓</div>
                  ) : index === subStepIndex ? (
                    <div className="w-3 h-3 bg-[#00ff9d] rounded-full animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 bg-white/20 rounded-full" />
                  )}
                </div>
                <span className={`text-base font-medium ${
                  index <= subStepIndex ? 'text-white' : 'text-white/40'
                }`}>
                  {substep.title}
                </span>
              </div>
              {index === subStepIndex && (
                <span className="text-[#00ff9d] text-sm font-medium animate-pulse">
                  In Progress
                </span>
              )}
            </div>
            <div className="relative h-1 bg-gray-800/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: index < subStepIndex ? "100%" : 
                         index === subStepIndex ? `${profileProgress}%` : "0%" 
                }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff9d] to-[#00ffff] rounded-full"
                transition={{ ease: "easeInOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

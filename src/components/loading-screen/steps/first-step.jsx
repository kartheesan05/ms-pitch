import { Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";


  useEffect(() => {
    const executeSubSteps = async () => {
      for (let i = 0; i < step.subSteps.length; i++) {
        setSubStepIndex(i);
        await new Promise(resolve => 
          setTimeout(resolve, step.subSteps[i].duration)
        );
      }
      setTimeout(onComplete, 1000);
    };
    executeSubSteps();
  }, []);

  return (
    <div className="w-full max-w-md space-y-3 mt-4">
      {step.subSteps.map((substep, index) => (
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
            {substep.title}
          </span>
        </div>
      ))}
    </div>
  );


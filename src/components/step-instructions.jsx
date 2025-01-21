"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

export function StepInstructions({ steps, onStepComplete }) {
  return (
    <div className="space-y-6 my-2">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-10"
        >
          <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8">
            <button
              onClick={() => onStepComplete(index)}
              className="focus:outline-none hover:scale-110 transition-transform"
            >
              {step.completed ? (
                <CheckCircle2 className="w-6 h-6 text-[#00ff9d]" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400 hover:text-[#00ff9d]/50 transition-colors cursor-pointer" />
              )}
            </button>
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-3 w-0.5 h-full bg-gray-800" />
            )}
          </div>
          <div
            className={`bg-gray-800/50 hover:bg-gray-800/70 transition-colors rounded-lg p-4 border border-gray-700/50 group ${
              step.completed ? "border-[#00ff9d]/20" : ""
            }`}
          >
            <h3
              className={`text-lg font-medium ${
                step.completed
                  ? "text-[#00ff9d]"
                  : "text-white group-hover:text-[#00ff9d]"
              } transition-colors`}
            >
              {step.title}
            </h3>
            {step.description && (
              <p className="text-sm text-gray-400 mt-2">{step.description}</p>
            )}
            {step.subSteps && step.subSteps.length > 0 && (
              <ul className="mt-3 space-y-2">
                {step.subSteps.map((subStep, subIndex) => (
                  <motion.li
                    key={subIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + subIndex * 0.05 }}
                    className={`text-sm flex items-center gap-3 group/item ${
                      step.completed ? "text-gray-400" : "text-gray-300"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        step.completed
                          ? "bg-[#00ff9d]/30"
                          : "bg-[#00ff9d]/30 group-hover/item:bg-[#00ff9d]/50"
                      }`}
                    />
                    <span
                      className={`transition-colors ${
                        step.completed ? "" : "group-hover/item:text-white"
                      }`}
                    >
                      {subStep}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

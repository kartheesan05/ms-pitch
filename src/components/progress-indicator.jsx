"use client";

import { motion } from "framer-motion";

export function ProgressIndicator({ progress, total }) {
  const percentage = (progress / total) * 100;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Progress</span>
        <span className="text-[#00ff9d] font-medium">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-[#00ff9d] rounded-full"
        />
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{progress} completed</span>
        <span>{total - progress} remaining</span>
      </div>
    </div>
  );
}

"use client";

import { motion, usePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function MessageContent({ content }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isPresent] = usePresence();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Remove numbered lists from content if present
    let processedContent = content;
    if (content.includes("\n1.")) {
      const lines = content.split("\n");
      const nonStepLines = lines.filter((line) => {
        const isStep = line.match(/^\d+\.\s+.+/);
        const isSubStep = line.match(/^\s*-\s+.+/);
        return !isStep && !isSubStep;
      });
      processedContent = nonStepLines.join("\n").trim();
    }

    if (isPresent) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedContent(processedContent.slice(0, index));
        index++;
        if (index > processedContent.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [content, isPresent]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="prose prose-invert max-w-none"
    >
      {displayedContent}
      {!isDone && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-[#00ff9d] ml-1"
        />
      )}
    </motion.div>
  );
}

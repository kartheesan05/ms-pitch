"use client";

import { motion, usePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { ProgressIndicator } from "./progress-indicator";

export function MessageContent({ content }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isPresent] = usePresence();
  const [isDone, setIsDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if content contains progress information
  const getProgressInfo = (content) => {
    const progressMatch = content.match(/(\d+)%|(\d+)\s*of\s*(\d+)/);
    if (progressMatch) {
      if (progressMatch[1]) {
        // Percentage format
        const percentage = parseInt(progressMatch[1]);
        const total = 100;
        return { progress: Math.round((percentage / 100) * total), total };
      } else if (progressMatch[2] && progressMatch[3]) {
        // X of Y format
        return {
          progress: parseInt(progressMatch[2]),
          total: parseInt(progressMatch[3]),
        };
      }
    }
    return null;
  };

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

  const progressInfo = getProgressInfo(content);

  // If not client-side yet, show plain content to avoid hydration issues
  if (!mounted) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="prose prose-invert max-w-none"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {displayedContent}
        </ReactMarkdown>
        {!isDone && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-[#00ff9d] ml-1"
          />
        )}
      </motion.div>
      {isDone && progressInfo && (
        <ProgressIndicator
          progress={progressInfo.progress}
          total={progressInfo.total}
        />
      )}
    </div>
  );
}

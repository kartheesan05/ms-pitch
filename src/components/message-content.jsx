"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function MessageContent({ content, className }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not client-side yet, show plain content to avoid hydration issues
  if (!mounted) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <ReactMarkdown
      className={cn(
        "prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-md",
        "prose-pre:my-2 prose-code:text-cyan-400 prose-headings:text-cyan-300",
        "prose-a:text-cyan-400 prose-p:leading-relaxed prose-li:my-0 prose-ul:my-1 prose-ol:my-1",
        "prose-strong:text-white prose-img:rounded-md",
        className
      )}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
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
      <div className="relative text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-white mb-8"
        >
          Meet your new
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
            onboarding assistant.
          </span>
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#00ff9d]/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
